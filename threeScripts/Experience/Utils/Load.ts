import * as THREE from 'three';
import { gsap } from 'gsap';
import Experience from '../Experience';
import { Scene } from 'three';

export default class Load {
  experience: Experience;
  scene: Scene;
  loadingManager: THREE.LoadingManager;
  overlayGeometry!: THREE.PlaneGeometry;
  overlayMaterial!: THREE.ShaderMaterial;
  overlayMesh!: THREE.Mesh<any, any>;
  loadingBar: HTMLDivElement;
  loadingText: HTMLDivElement;
  text: HTMLSpanElement;

  constructor() {

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.loadingBar = document.querySelector('#loadingBar') as HTMLDivElement;
    this.loadingText = document.querySelector('#loadingText') as HTMLDivElement;
    this.text = document.getElementById('#spanText') as HTMLSpanElement;

    this.loadingManager = new THREE.LoadingManager(
      () => {
        this.text.style.cursor = 'pointer';
        this.loadingText.addEventListener('click', () => {
          gsap.to(this.overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
          this.loadingText.style.display = 'none';
        })
        window.setTimeout(() => {
          this.loadingBar.classList.add('ended');
          this.loadingBar.style.transform = "";
          this.text.innerHTML = 'Go to Gallery'
        }, 1000)
      },
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRation = itemsLoaded / itemsTotal;
        this.loadingBar.style.transform = `scaleX(${progressRation})`;
      }
    );
    this.setOverlayGeometry();
    this.setOverlayMaterial();
    this.setOverlayMesh();
  }

  setOverlayGeometry() {
    this.overlayGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
  }

  setOverlayMaterial() {
    this.overlayMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1.0 }
      },
      vertexShader: `
            void main()
            {
                gl_Position = vec4(position, 1.0);
            }
        `,
      fragmentShader: `
            uniform float uAlpha;
            void main()
            {
                gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
            }
        `
    })
  }

  setOverlayMesh() {
    this.overlayMesh = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial);
    this.scene.add(this.overlayMesh);
  }
}