import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  standalone: true,
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private stars!: THREE.Points;
  private animationFrameId!: number;

  ngOnInit(): void {
    this.initScene();
    this.animateStars();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 800;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 2000;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true });

    this.stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.stars);
  }

  private animateStars(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animateStars());

    this.stars.rotation.y += 0.0005;
    this.stars.rotation.x += 0.0002;

    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // 🛑 Ajout de la méthode pour supprimer Three.js lors du changement d'interface
  ngOnDestroy(): void {
    // Annuler l'animation
    cancelAnimationFrame(this.animationFrameId);

    // Supprimer tous les objets de la scène
    while (this.scene.children.length > 0) {
      const child = this.scene.children[0];
      this.scene.remove(child);
      if ((child as THREE.Mesh).geometry) {
        (child as THREE.Mesh).geometry.dispose();
      }
      if ((child as THREE.Mesh).material) {
        ((child as THREE.Mesh).material as THREE.Material).dispose();
      }
    }

    // Supprimer le renderer et le canvas du DOM
    this.renderer.dispose();
    if (this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
