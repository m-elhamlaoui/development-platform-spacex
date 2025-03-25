import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
    selector: 'app-solar-system',
    templateUrl: './solar-system.component.html',
    standalone: true,
    imports: [],
    styleUrls: ['./solar-system.component.css']
})
export class SolarSystemComponent implements OnInit, AfterViewInit, OnDestroy {
    private renderer: THREE.WebGLRenderer | null = null;
    private scene: THREE.Scene | null = null;
    private camera: THREE.PerspectiveCamera | null = null;
    private orbit: OrbitControls | null = null;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.createSolarSystem();
    }

    createSolarSystem() {
        // Create and store the renderer
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Create and store the scene
        this.scene = new THREE.Scene();

        // Create and store the camera
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // Create and store OrbitControls
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(-90, 140, 140);
        this.orbit.update();

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);

        const textureLoader = new THREE.TextureLoader();
        //this.scene.background = textureLoader.load('assets/textures/starts.jpg');
        const loader = new THREE.CubeTextureLoader();
        this.scene.background = loader.load([
            'assets/textures/stars.jpg',
            'assets/textures/stars.jpg',
            'assets/textures/stars.jpg',
            'assets/textures/stars.jpg',
            'assets/textures/stars.jpg',
            'assets/textures/stars.jpg'
        ]);
        // Create the Sun
        const sunGeo = new THREE.SphereGeometry(16, 30, 30);
        const sunMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load('assets/textures/sun.jpg')
        });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        this.scene.add(sun);

        // Create a helper function for planets
        const createPlanete = (size: number, texture: string, position: number, ring?: {
            innerRadius: number;
            outerRadius: number;
            texture: string
        }) => {
            const geo = new THREE.SphereGeometry(size, 30, 30);
            const mat = new THREE.MeshStandardMaterial({
                map: textureLoader.load(texture)
            });
            const mesh = new THREE.Mesh(geo, mat);
            const obj = new THREE.Object3D();
            obj.add(mesh);
            if (ring) {
                const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
                const ringMat = new THREE.MeshBasicMaterial({
                    map: textureLoader.load(ring.texture),
                    side: THREE.DoubleSide
                });
                const ringMesh = new THREE.Mesh(ringGeo, ringMat);
                obj.add(ringMesh);
                ringMesh.position.x = position;
                ringMesh.rotation.x = -0.5 * Math.PI;
            }
            this.scene?.add(obj);
            mesh.position.x = position;
            return {mesh, obj};
        };

        // Helper function for orbits
        const createOrbit = (radius: number) => {
            const orbitGeo = new THREE.RingGeometry(radius - 0.2, radius + 0.2, 64);
            const orbitMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                opacity: 0.5,
                transparent: true
            });
            const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
            orbitMesh.rotation.x = Math.PI / 2;
            this.scene?.add(orbitMesh);
        };

        // Create planets and their orbits
        const mercury = createPlanete(3.2, 'assets/textures/mercury.jpg', 28);
        createOrbit(28);

        const venus = createPlanete(5.8, 'assets/textures/venus.jpg', 44);
        createOrbit(44);

        const earth = createPlanete(6, 'assets/textures/earth.jpg', 62);
        createOrbit(62);

        const mars = createPlanete(4, 'assets/textures/mars.jpg', 78);
        createOrbit(78);

        const jupiter = createPlanete(12, 'assets/textures/jupiter.jpg', 100);
        createOrbit(100);

        const saturn = createPlanete(10, 'assets/textures/saturn.jpg', 138, {
            innerRadius: 10, outerRadius: 20, texture: 'assets/textures/saturn ring.png'
        });
        createOrbit(138);

        const uranus = createPlanete(7, 'assets/textures/uranus.jpg', 176, {
            innerRadius: 7, outerRadius: 12, texture: 'assets/textures/uranus-ring.png'
        });
        createOrbit(176);

        const neptune = createPlanete(7, 'assets/textures/neptune.jpg', 200);
        createOrbit(200);

        const pluto = createPlanete(2.8, 'assets/textures/pluto.jpg', 216);
        createOrbit(216);

        // Add lights
        const pointLight = new THREE.PointLight(0xffffff, 2, 300);
        pointLight.position.set(0, 0, 0);
        this.scene.add(pointLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(100, 100, 100);
        this.scene.add(directionalLight);

        // Animation function
        const animate = () => {
            // rotation
            sun.rotateY(0.004);
            mercury.mesh.rotateY(0.004);
            venus.mesh.rotateY(0.002);
            earth.mesh.rotateY(0.02);
            mars.mesh.rotateY(0.018);
            jupiter.mesh.rotateY(0.04);
            saturn.mesh.rotateY(0.038);
            uranus.mesh.rotateY(0.03);
            neptune.mesh.rotateY(0.032);
            pluto.mesh.rotateY(0.008);

            mercury.obj.rotateY(0.04);
            venus.obj.rotateY(0.015);
            earth.obj.rotateY(0.01);
            mars.obj.rotateY(0.008);
            jupiter.obj.rotateY(0.002);
            saturn.obj.rotateY(0.0009);
            uranus.obj.rotateY(0.0004);
            neptune.obj.rotateY(0.0001);
            pluto.obj.rotateY(0.00007);

            this.renderer?.render(this.scene!, this.camera!);
        };

        // Start the animation loop
        this.renderer.setAnimationLoop(animate);

        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    private onWindowResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    // Clean up Three.js resources when navigating away
    ngOnDestroy() {
        window.removeEventListener('resize', this.onWindowResize.bind(this));
        if (this.renderer) {
            // Dispose of the renderer and remove the canvas from the DOM
            this.renderer.dispose();
            if (this.renderer.domElement.parentElement) {
                this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
            }
        }
        if (this.scene) {
            // Traverse the scene and dispose geometries and materials
            this.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.geometry.dispose();
                    // Dispose materials properly
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach(mat => mat.dispose());
                    } else {
                        mesh.material.dispose();
                    }
                }
            });
        }
        if (this.orbit) {
            this.orbit.dispose();
        }
    }
}
