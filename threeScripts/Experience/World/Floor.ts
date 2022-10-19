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
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
  }

  setTextures() {
    this.textures = {};
    this.textures.color = this.resources.items.dirtColor;
    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.color.repeat.set(20, 20);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.dirtNormal;
    this.textures.normal.repeat.set(20, 20);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal
    });
    // this.material.color.set("#ffffff");
    // this.material = new THREE.ShaderMaterial
    //   ({
    //     transparent: true,
    //     side: THREE.DoubleSide,
    //     uniforms: {
    //       uAlpha: { value: 1.0 },
    //       uColor1: { value: new THREE.Color('#f0f8ff') },
    //       uColor2: { value: new THREE.Color('#ffffff') },
    //     },
    //     vertexShader: `
    //     varying vec2 vUv;
    //       void main()
    //       {
    //         vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    //         vec4 viewPosition = viewMatrix * modelPosition;
    //         vec4 projectionPosition = projectionMatrix * viewPosition;

    //         gl_Position = projectionPosition;
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
    //         float strength = distance(vUv, vec2(0.5));
    //         vec3 color = mix(uColor1, uColor2, strength);
    //         gl_FragColor = vec4(color, uAlpha);
    //       }
    //   `
    //   })
  }


  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.position.set(0, -0.5, 0);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
