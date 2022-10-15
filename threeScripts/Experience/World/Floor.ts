import * as THREE from 'three';
import { Scene } from 'three';

import Experience from '../Experience';
import Resources from '../Utils/Resources';

export default class Floors {
  experience: Experience;
  scene: Scene;
  resources: Resources;
  geometry!: THREE.PlaneGeometry;
  textures!: { [prop: string]: any };
  material!: THREE.ShaderMaterial | THREE.MeshStandardMaterial;
  mesh!: THREE.Mesh;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    // this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(70, 40);
  }

  setTextures() {
    this.textures = {};
    this.textures.color = this.resources.items.grassColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.grassNormalTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ color: '#f0f8ff' });
    // this.material = new THREE.ShaderMaterial
    //   ({
    //     transparent: true,
    //     uniforms: {
    //       uAlpha: { value: 1.0 },
    //       uColor1: { value: new THREE.Color('#ff0000') },
    //       uColor2: { value: new THREE.Color('#ff0000') },
    //     },
    //     vertexShader: `
    //       varying vec2 vUv;
    //       void main()
    //       {
    //         vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    //         vec4 viewPosition = viewMatrix * modelPosition;
    //         vec4 projectedPosition = projectionMatrix * viewPosition;
    //         gl_Position = projectedPosition;
    //         vUv = uv;
    //       }
    //   `,
    //     fragmentShader: `
    //       varying vec2 vUv;
    //       uniform float uAlpha;
    //       uniform vec3 uColor1;
    //       uniform vec3 uColor2;

    //       void main()
    //       {
    //           float strength = distance(vUv, vec2(0.5));
    //           vec3 color = mix(uColor1, uColor2, strength - 0.4);
    //           gl_FragColor = vec4(color, uAlpha);
    //       }
    //   `
    //   })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.rotation.z = -Math.PI * 0.1;
    this.mesh.position.set(0, -2.4, 0);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
