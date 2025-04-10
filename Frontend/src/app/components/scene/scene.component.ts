import {Component, ElementRef, ViewChild, OnDestroy, NgZone, AfterViewInit, OnInit, inject} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {CubeTextureLoader} from "three";
import {TravelService} from "../../services/travel-services.service";
import {CurrentTravelsReplyDto} from "../../DTO/getCurrentTravels.Reply.dto";
import {Observable} from "rxjs";
import {GLTFLoader,GLTF} from 'three/addons/loaders/GLTFLoader.js';



interface Trip {
  depart: string;
  arrive: string;
  dateDepart: string;
  dateArrive: string;
  percentage: number;
}

const ORBITAL_PERIODS_YEARS: { [key: string]: number } = {
  Mercury: 0.24,
  Venus: 0.62,
  Earth: 1.0,
  Mars: 1.88,
  Jupiter: 11.86,
  Saturn: 29.46,
  Uranus: 84.01,
  Neptune: 164.8,
};

const PLANET_CODES: { [key: string]: string } = {
  SUN: 'Sun',
  MER: 'Mercury',
  VEN: 'Venus',
  TRR: 'Earth',
  MRS: 'Mars',
  JUP: 'Jupiter',
  SAT: 'Saturn',
  URA: 'Uranus',
  NEP: 'Neptune',
};

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  standalone: true,
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements  OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private clock!: THREE.Clock;
  private controls!: OrbitControls; // For user camera control
  private loader!:CubeTextureLoader ;
  traveService = inject(TravelService);
  private trips!:Observable<CurrentTravelsReplyDto[]>;

  private sun!: THREE.Mesh;
  private planetObjects: Map<string, { mesh: THREE.Mesh; pivot: THREE.Object3D }> = new Map();
  private tripObjects: { arc: THREE.Line; shuttle: THREE.Mesh }[] = [];

  private frameId: number | null = null;


  // Inject NgZone for running animation loop outside Angular's change detection
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.trips = this.traveService.getCurrentTravels();
    this.initThreeJs();
    this.createSolarSystem(); // Create static planets
    this.createTrips();      // Create trip visualizations
    this.animate();          // Start the animation/render loop
    this.setupResizeListener(); // Handle window resize
  }

  ngOnDestroy(): void {
    // Cleanup logic when component is destroyed
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId); // Stop animation loop
    }
    this.controls?.dispose(); // Dispose OrbitControls listeners

    if (this.renderer) {
      this.renderer.dispose(); // Dispose WebGL context
      //cast shadows
      this.renderer.shadowMap.enabled = true;
      // Attempt to remove canvas from DOM
      const canvas = this.renderer.domElement;
      canvas?.parentElement?.removeChild(canvas);
    }

    // Dispose Three.js geometries, materials, textures to free memory
    this.scene?.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        // Handle material arrays or single materials
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else if (object.material) {
          // Dispose maps if they exist (basic check)
          const mat = object.material as any; // Use 'any' for broader map checking
          mat.map?.dispose();
          mat.normalMap?.dispose();
          mat.roughnessMap?.dispose();
          mat.metalnessMap?.dispose();
          mat.aoMap?.dispose();
          mat.emissiveMap?.dispose();
          mat.bumpMap?.dispose();
          mat.displacementMap?.dispose();
          mat.alphaMap?.dispose();
          // Dispose the material itself
          mat.dispose();
        }
      } else if (object instanceof THREE.Line) {
        object.geometry?.dispose();
        if(Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material?.dispose();
        }
      }
    });

    // Clear internal references
    this.planetObjects.clear();
    this.tripObjects = [];

    this.removeResizeListener(); // Remove resize listener
    console.log('Three.js scene cleaned up');
  }

  // --- Initialization ---
  private initThreeJs(): void {
    const container = this.rendererContainer.nativeElement;
    if (!container) {
      console.error("Renderer container element not found!");
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight || window.innerHeight * 0.8; // Fallback height

    // Scene
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000); // Far plane for large scene
    // Set a good initial static viewpoint (adjust X, Y, Z as needed)
    this.camera.position.set(-50, 80, 150);
    this.camera.lookAt(this.scene.position); // Look at the center (Sun)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable anti-aliasing
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high-DPI screens
    container.appendChild(this.renderer.domElement); // Add canvas to the container div

    // OrbitControls for user interaction
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Smooth camera movement inertia
    this.controls.dampingFactor = 0.1; // Damping intensity
    this.controls.screenSpacePanning = false; // Keep false for intuitive 3D panning
    this.controls.minDistance = 5;        // Minimum zoom distance
    this.controls.maxDistance = 1000;      // Maximum zoom distance (adjust for scene scale)
    this.controls.target.set(0, 0, 0);    // Point the controls orbit around (Sun's position)
    this.controls.update();              // Initial update
  }

  // --- Scene Creation ---
  private createSolarSystem(): void {
    // stars (Background)
    this.loader = new THREE.CubeTextureLoader();
    const texture = this.loader.load( [
      'stars.jpg',
      'stars.jpg',
      'stars.jpg',
      'stars.jpg',
      'stars.jpg',
      'stars.jpg',
    ]);
    this.scene.background = texture;

    // --- Sun ---
    const textureLoader = new THREE.TextureLoader();

    const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
    const sunMaterial = new THREE.MeshPhongMaterial({
      color: 0xffff00,        // Base color
      emissive: 0xffff00,     // Glowing color
      emissiveIntensity: 1.0, // Adjust glow strength
      shininess: 10           // A little highlight
    });

    this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
    this.scene.add(this.sun);
    // Add Sun to map (pivot is itself as it's at the origin)
    this.planetObjects.set('Sun', { mesh: this.sun, pivot: this.sun });
    // --- Lighting ---
    const pointLight = new THREE.PointLight(0xffffee, 6, 200000,0.1); // Color, Intensity, Distance
    this.scene.add(pointLight); // Light originates from the Sun's position (0,0,0)

    const pointLight1 = new THREE.PointLight(0xffffee, 6, 200000,0.1); // Color, Intensity, Distance
    pointLight1.position.copy(new THREE.Vector3(0, 100, 0));
    this.scene.add(pointLight1); // Light originates from the Sun's position (0,0,0)
    const ambientLight = new THREE.AmbientLight(0x555555); // Soft ambient light for non-lit areas
    this.scene.add(ambientLight);

    // --- Static Planets ---
    const planetData = [
      { name: 'Mercury', radius: 0.6, color: 0xaaaaaa, orbitRadius: 10, texture: '/mercury.jpg' },
      { name: 'Venus', radius: 0.9, color: 0xffeacd, orbitRadius: 15 , texture: '/venus.jpg'},
      { name: 'Earth', radius: 1, color: 0x4d91ff, orbitRadius: 21 , texture: '/earth.jpg'},
      { name: 'Mars', radius: 0.7, color: 0xff5733, orbitRadius: 28 , texture: '/mars.jpg'},
      { name: 'Jupiter', radius: 3.5, color: 0xd8caae, orbitRadius: 45 , texture: '/jupiter.jpg'},
      { name: 'Saturn', radius: 2.8, color: 0xf0e5c4, orbitRadius: 65 , texture: '/saturn.jpg'},
      { name: 'Uranus', radius: 1.8, color: 0x7fdbff, orbitRadius: 85 , texture: '/uranus.jpg'},
      { name: 'Neptune', radius: 1.7, color: 0x3d5aff, orbitRadius: 105 , texture: '/neptune.jpg'},
    ];



    // Get current date to calculate approximate static positions
    // Using context provided: Wednesday, April 9, 2025 at 1:50:56 PM +01:00
    const now = new Date("2025-04-09T13:50:56+01:00");
    const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000;

    console.log(`Calculating planet positions for date: ${now.toISOString()}`);

    planetData.forEach(data => {
      const geometry = new THREE.SphereGeometry(data.radius, 32, 32); // More segments for smoother spheres
      const planetTexture = textureLoader.load(data.texture);
      const material = new THREE.MeshStandardMaterial({
        map: planetTexture,  // <-- This is the crucial part
        roughness: 0.8 ,      // Adjust for how shiny/rough the surface should be
         metalness: 0.1,     // For some planet surfaces, you might set metalness = 0
      });
      const mesh = new THREE.Mesh(geometry, material);

      // Pivot point for positioning and potential future rotation axis
      const pivot = new THREE.Object3D();
      this.scene.add(pivot);
      mesh.position.x = data.orbitRadius; // Position planet relative to its pivot
      pivot.add(mesh);

      // --- Calculate Static Position (Approximate) ---
      const orbitalPeriod = ORBITAL_PERIODS_YEARS[data.name];
      if (orbitalPeriod) {
        // WARNING: This is a highly simplified approximation for visual purposes ONLY.
        // It does not account for elliptical orbits, inclination, correct epochs, etc.
        const totalRevolutionsSinceEpochZero = now.getTime() / (orbitalPeriod * millisecondsInYear);
        const currentAngle = (totalRevolutionsSinceEpochZero % 1.0) * Math.PI * 2; // Angle in radians
        pivot.rotation.y = currentAngle; // Set the static orbital angle
        console.log(`${data.name} angle (approx): ${(currentAngle * 180 / Math.PI).toFixed(1)} deg`);
      }
      // Ensure world matrix is updated *once* after setting rotation for correct positioning
      pivot.updateMatrixWorld(true);

      // --- Saturn's Rings (Static) ---
      if (data.name === 'Saturn') {
        const ringGeometry = new THREE.RingGeometry(data.radius * 1.2, data.radius * 2, 64); // Inner radius, outer radius, segments
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xaaaaaa,
          side: THREE.DoubleSide, // Render both sides of the rings
          transparent: true,
          opacity: 0.6
        });
        const ringsMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringsMesh.rotation.x = Math.PI * 0.45; // Apply tilt to the rings
        ringsMesh.position.copy(mesh.position); // Position rings relative to the pivot (at the planet's location)
        pivot.add(ringsMesh); // Add rings as a child of Saturn's pivot
        // Ensure ring's world matrix is also calculated
        ringsMesh.updateMatrixWorld(true);
      }

      // Store the planet's mesh and pivot point for later lookup
      this.planetObjects.set(data.name, { mesh, pivot });

      // Optional: Draw Orbit Lines for visual context
      const points = []; const segments = 128; // Smoother circle for orbit lines
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // Define points in the XZ plane directly
        points.push(new THREE.Vector3(Math.cos(theta) * data.orbitRadius, 0, Math.sin(theta) * data.orbitRadius));
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x3333333 }); // Dimmer orbit lines
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      this.scene.add(orbitLine);
    });
    console.log("Planets created and positioned statically.");
  }

  // --- Trip Visualization Creation ---
  private createTrips(): void {
    if (this.planetObjects.size === 0) {
      console.warn("Planet data not available for trip creation.");
      return;
    }

    // Reusable geometry/material for shuttles
    const shuttleGeometry = new THREE.ConeGeometry(0.3, 1, 8); // Cone: radius, height, segments
    shuttleGeometry.rotateX(Math.PI / 2); // Orient cone to point along its path
    const shuttleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Bright red shuttle


    const gltfLoader = new GLTFLoader();
    const url = 'scene.gltf';


    gltfLoader.load(url, (gltf) => {
      const shuttleMesh1 = gltf.scene;
      //make it smaller
      shuttleMesh1.scale.set(0.02, 0.02, 0.02);

      this.trips.subscribe(results =>{
        results.forEach((trip, index) => {
          console.log(trip)
          const startPlanetName = PLANET_CODES[trip.depart];
          const endPlanetName = PLANET_CODES[trip.arrive];

          const startPlanetData = this.planetObjects.get(startPlanetName);
          const endPlanetData = this.planetObjects.get(endPlanetName);

          if (!startPlanetData || !endPlanetData) {
            console.warn(`Cannot create trip ${index}: Planet data not found for ${trip.depart} or ${trip.arrive}`);
            return;
          }

          // Get current WORLD positions of the planet meshes
          const startPos = new THREE.Vector3();
          startPlanetData.mesh.getWorldPosition(startPos);

          const endPos = new THREE.Vector3();
          endPlanetData.mesh.getWorldPosition(endPos);

          // --- Create the Arc (using Quadratic Bezier Curve) ---
          const distance = startPos.distanceTo(endPos);
          // Calculate midpoint between planets
          const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.6);
          // Calculate control point for the arc (offset upwards from midpoint)
          // Arc height is proportional to the distance between planets (adjust 0.3 scale factor as needed)
          const controlPointOffset = distance * 0.3;
          const controlPos = midPoint.clone().add(new THREE.Vector3(-controlPointOffset, 0, 0));

          const curve = new THREE.QuadraticBezierCurve3(startPos, controlPos, endPos);
          const points = curve.getPoints(50); // Get points along the curve for the line geometry
          const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const arcMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 }); // Bright green arc line
          const arcLine = new THREE.Line(arcGeometry, arcMaterial);
          this.scene.add(arcLine);

          // --- Create and Position the Shuttle ---
          const shuttleMesh = new THREE.Mesh(shuttleGeometry, shuttleMaterial);

          // Calculate position on curve based on percentage (0.0 to 1.0)
          const percentageNormalized = Math.max(0, Math.min(1, trip.percentage / 100.0)); // Clamp percentage
          const shuttlePos = curve.getPointAt(percentageNormalized);
          shuttleMesh1.position.copy(shuttlePos);

          // Orient the shuttle to face along the curve's tangent
          const tangent = curve.getTangentAt(percentageNormalized).normalize();
          // Calculate a point slightly ahead on the tangent for lookAt target
          const lookAtPos = shuttlePos.clone().add(tangent);
          shuttleMesh1.lookAt(lookAtPos);

          this.scene.add(shuttleMesh1);

          // Store references to the created arc and shuttle
          this.tripObjects.push({ arc: arcLine, shuttle: shuttleMesh });
        });
      } )
    });
    console.log(`Created ${this.tripObjects.length} trip visualizations.`);
  }


  // --- Animation Loop ---
  private animate(): void {
    // Use NgZone.runOutsideAngular to prevent unnecessary change detection runs
    this.ngZone.runOutsideAngular(() => {
      const animateLoop = () => {
        // Schedule the next frame
        this.frameId = requestAnimationFrame(animateLoop);

        // Get time delta for frame-rate independent animations
        const delta = this.clock.getDelta();

        // --- Update Controls ---
        this.controls.update(); // ESSENTIAL for OrbitControls damping and interactions

        // --- Optional: Animate Self-Rotation ---
        const rotationSpeed = 0.1; // Adjust speed as needed
        this.sun.rotation.y += rotationSpeed * delta * 0.1; // Sun rotates slowly
        this.planetObjects.forEach(planetData => {
          // Rotate the planet mesh on its own axis (Y-axis)
          planetData.mesh.rotation.y += rotationSpeed * delta;
        });

        // --- NO Planet Orbit Updates (positions are static) ---
        // --- NO Camera Orbit Updates (handled by OrbitControls) ---

        // --- Render the Scene ---
        this.renderer.render(this.scene, this.camera);
      };
      // Start the loop
      animateLoop();
    });
  }

  // --- Window Resize Handling ---
  private onWindowResize = (): void => {
    const container = this.rendererContainer?.nativeElement;
    if (container && this.camera && this.renderer) {
      const width = container.clientWidth;
      const height = container.clientHeight;

      this.camera.aspect = width / height; // Update camera aspect ratio
      this.camera.updateProjectionMatrix(); // Apply aspect ratio change

      this.renderer.setSize(width, height); // Update renderer size
    }
  }

  private setupResizeListener(): void {
    window.addEventListener('resize', this.onWindowResize, false);
  }

  private removeResizeListener(): void {
    window.removeEventListener('resize', this.onWindowResize, false);
  }
}
