import * as THREE from 'three';
import { Scene } from 'three';
import Camera from '../Camera';

import Experience from '../Experience';
import Sizes from '../Utils/Sizes';


export default class GalleryFloor {

  experience: Experience;
  scene: Scene;
  geometry!: THREE.PlaneGeometry;
  material!: THREE.ShaderMaterial | THREE.MeshStandardMaterial;
  mesh!: THREE.Mesh;
  raycaster!: THREE.Raycaster;
  pointer!: THREE.Vector2;
  size: Sizes;
  camera: Camera;
  intersect!: THREE.Intersection<THREE.Object3D<THREE.Event>>[];
  box!: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.size = this.experience.sizes;
    this.camera = this.experience.camera;
    this.box = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.1, 0.1),
      new THREE.MeshStandardMaterial({ color: "#ff0000" })
    )
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setRay();

    window.addEventListener('pointermove', (e) => {
      this.pointer.x = (e.clientX / this.size.width) * 2 - 1;
      this.pointer.y = - (e.clientY / this.size.height) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.camera.instance!)
      this.intersect = this.raycaster.intersectObject(this.mesh);
      if (this.intersect.length > 0) {
        const point = this.intersect[0].point;
        const mesh = this.box.clone();
        mesh.position.set(point.x, point.y, point.z);
        this.scene.add(mesh)
      }
    })
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2.0, 0.6, 2, 2);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#ff0000",
      wireframe: true
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    // this.mesh.rotation.y = -Math.PI * 0.5;
    this.mesh.position.set(-4.9, -0.3, 1.5);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  setRay() {
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }
}