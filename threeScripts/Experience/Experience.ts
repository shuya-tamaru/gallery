import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import Resources from './Utils/Resources';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import World from './World/World';
import { sources } from './sources';
import Raycast from './Utils/Raycast';

let instance: Experience | null = null;

export default class Experience {
  canvas: HTMLCanvasElement | undefined;
  sizes!: Sizes;
  time!: Time;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;
  raycast!: Raycast;
  resources!: Resources;

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
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}
