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
    this.geometry = new THREE.PlaneGeometry(100, 25, 1, 1);
  }

  setTextures() {
    this.textures = {};
    this.textures.color = this.resources.items.dirtColor;
    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.color.repeat.set(10, 10);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.dirtNormal;
    this.textures.normal.repeat.set(10, 10);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal
    });
  }


  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.position.set(0, -0.5, -6.5);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
