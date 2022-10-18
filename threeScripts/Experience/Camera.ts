import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from '@tweenjs/tween.js';

import Experience from './Experience';
import Sizes from './Utils/Sizes';

export default class Camera {
  experience: Experience;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLCanvasElement | undefined;
  instance: THREE.PerspectiveCamera | undefined;
  controls: OrbitControls | undefined;
  cameraPos: { x: number; y: number; z: number }[];
  cameraPosIndex: number;
  tween: any;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.cameraPosIndex = 0;

    this.cameraPos = [
      { x: 0, y: 3.8, z: 7.9 }, //initial 0
      { x: -4.5, y: 0.5, z: 3 }, //gallery 1
      { x: -2.8, y: 2.3, z: 3 }, //movinSphere 2
      { x: -0.3, y: 1.4, z: 3 }, //hexDome 3
      { x: 2.2, y: 0.5, z: 3 }, //twisArc 4
      { x: 4.6, y: 1.4, z: 3 }, //curtain 5
      { x: 6.0, y: 3.5, z: 3.2 }, //lamp 6
      { x: 3.45, y: 4.0, z: 3.0 }, //pipe 7
      { x: 0.9, y: 3.1, z: 3.0 }, //feather 8
      { x: -1.5, y: 4.0, z: 3.0 }, //ribbon 9
      { x: -4.1, y: 4.3, z: 3.3 }, //waffle 10
      { x: -2.8, y: 7.0, z: 3.0 }, //origami 11
      { x: -0.4, y: 6.0, z: 3.2 }, //town 12
      { x: 2.2, y: 5.85, z: 3.0 }, //deformSphere 13
      { x: 4.6, y: 6.35, z: 3.0 }, //fin 14
    ];

    this.setInstance();
    // this.setOrbitComtrols();

    const button = document.getElementsByClassName('button');

    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener('click', () => {
        switch (button[i].id) {
          case "pageButton0": {
            this.cameraPosIndex === 0 ? (this.cameraPosIndex = 14) : this.cameraPosIndex--;
            break;
          }
          case "pageButton15": {
            this.cameraPosIndex === 14 ? (this.cameraPosIndex = 0) : this.cameraPosIndex++;
            break;
          }
          default: {
            this.cameraPosIndex = i;
            break;
          }
        }
        this.tween = new TWEEN.Tween(this.instance!.position)
          .to(
            {
              x: this.cameraPos[this.cameraPosIndex].x,
              y: this.cameraPos[this.cameraPosIndex].y,
              z: this.cameraPos[this.cameraPosIndex].z,
            },
            1500,
          )
          .onUpdate((coords) => {
            this.instance!.position.set(coords.x, coords.y, coords.z);
          })
          .easing(TWEEN.Easing.Exponential.Out)
          .start();
      });
    }
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes!.width / this.sizes!.height,
      0.1,
      100,
    );
    this.instance.position.set(
      this.cameraPos[this.cameraPosIndex].x,
      this.cameraPos[this.cameraPosIndex].y,
      this.cameraPos[this.cameraPosIndex].z,
    );
    this.scene?.add(this.instance);
  }
  setOrbitComtrols() {
    if (this.instance) {
      this.controls = new OrbitControls(this.instance, this.canvas);
      this.controls.enableDamping = true;
    }
  }

  cameraTween() { }

  resize() {
    if (this.instance) {
      this.instance.aspect = this.sizes.width / this.sizes.height;
      this.instance.updateProjectionMatrix();
    }
  }

  update() {
    this.controls?.update();
    this.tween?.update();
  }
}
