import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Experience from "./Experience";
import Sizes from "./Utils/Sizes";

export default class Camera {
  experience: Experience;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLCanvasElement | undefined;
  instance: THREE.PerspectiveCamera | undefined;
  controls: OrbitControls | undefined;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setOrbitComtrols();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes!.width / this.sizes!.height,
      0.1,
      100
    );
    this.instance.position.set(0, 10, 10);
    this.scene?.add(this.instance);
  }
  setOrbitComtrols() {
    if (this.instance) {
      this.controls = new OrbitControls(this.instance, this.canvas);
      this.controls.enableDamping = true;
    }
  }

  resize() {
    if (this.instance) {
      this.instance.aspect = this.sizes.width / this.sizes.height;
      this.instance.updateProjectionMatrix();
    }
  }

  update() {
    this.controls?.update();
  }
}
