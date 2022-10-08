import * as THREE from "three";
import Camera from "./Camera";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

let instance: Experience | null = null;

export default class Experience {
  canvas: HTMLCanvasElement | undefined;
  sizes!: Sizes;
  time!: Time;
  scene!: THREE.Scene;
  camera!: Camera;

  constructor(canvas?: HTMLCanvasElement) {
    if (instance) {
      return instance;
    }
    instance = this;

    (window as any).experience = this;

    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera!.resize();
  }

  update() {
    this.camera.update();
  }
}
