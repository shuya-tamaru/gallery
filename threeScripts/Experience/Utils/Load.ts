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
  overlayGeometry2!: THREE.PlaneGeometry;
  overlayMaterial2!: THREE.ShaderMaterial;
  overlayMesh2!: THREE.Mesh<any, any>;
  buttonContainer: HTMLDivElement;
  canvas: HTMLCanvasElement | undefined;

  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.loadingBar = document.querySelector('#loadingBar') as HTMLDivElement;
    this.loadingText = document.querySelector('#loadingText') as HTMLDivElement;
    this.text = document.getElementById('#spanText') as HTMLSpanElement;
    this.buttonContainer = document.querySelector('#buttonContainer') as HTMLDivElement;

    this.loadingManager = new THREE.LoadingManager(
      () => {
        this.canvas!.style.background = "linear-gradient(#ffffff,#e6e6fa)";
        this.text.style.cursor = 'pointer';
        this.text.innerHTML = 'Go to Gallery';
        this.loadingText.addEventListener('click', () => {
          gsap.to(this.overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 });
          this.buttonContainer.style.display = 'flex';
          this.loadingText.style.display = 'none';
        });
        window.setTimeout(() => {
          this.loadingBar.classList.add('ended');
          this.loadingBar.style.transform = '';
        }, 1000);
      },
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRation = itemsLoaded / itemsTotal;
        this.loadingBar.style.transform = `scaleX(${progressRation})`;
      },
    );
    this.setOverlayGeometry();
    this.setOverlayMaterial();
    this.setOverlayMesh();
  }

  setOverlayGeometry() {
    this.overlayGeometry = new THREE.PlaneGeometry(3, 2.0, 1, 1);
    this.overlayGeometry2 = new THREE.PlaneGeometry(70.0, 40.0, 1, 1);
  }

  setOverlayMaterial() {
    this.overlayMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1.0 },
        uColor1: { value: new THREE.Color('#ffffff') },
        uColor2: { value: new THREE.Color('#191970') },
      },
      vertexShader: `
            varying vec2 vUv;
            void main()
            {
                gl_Position = vec4(position, 1.0);
                vUv = uv;
            }
        `,
      fragmentShader: `
            varying vec2 vUv;
            uniform float uAlpha;
            uniform vec3 uColor1;
            uniform vec3 uColor2;

            void main()
            {
                float strength = distance(vUv, vec2(0.5));
                vec3 color = mix(uColor1, uColor2, strength - 0.42);
                gl_FragColor = vec4(color, uAlpha);
            }
        `,
    });
    this.overlayMaterial2 = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1.0 },
        uColor1: { value: new THREE.Color('#f0f8ff') },
        uColor2: { value: new THREE.Color('#ffffff') },
      },
      vertexShader: `
            varying vec2 vUv;
            void main()
            {
              vec4 modelPosition = modelMatrix * vec4(position, 1.0);
              vec4 viewPosition = viewMatrix * modelPosition;
              vec4 projectedPosition = projectionMatrix * viewPosition;
              gl_Position = projectedPosition;                
              vUv = uv;
            }
        `,
      fragmentShader: `
            varying vec2 vUv;
            uniform float uAlpha;
            uniform vec3 uColor1;
            uniform vec3 uColor2;

            void main()
            {
                float strength = distance(vUv, vec2(0.5));

                vec3 color = mix(uColor1, uColor2, strength + 0.2 );
                gl_FragColor = vec4(color, uAlpha);
            }
        `,
    });
  }

  setOverlayMesh() {
    this.overlayMesh = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial);
    this.overlayMesh2 = new THREE.Mesh(this.overlayGeometry2, this.overlayMaterial2);
    this.overlayMesh2.receiveShadow = true;
    this.overlayMesh2.position.set(0.0, 0.0, -12.0);
    this.scene.add(this.overlayMesh);
    // this.scene.add(this.overlayMesh2);
  }
}
