import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from '@tweenjs/tween.js'

import Experience from "./Experience";
import Sizes from "./Utils/Sizes";

export default class Camera {
  experience: Experience;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLCanvasElement | undefined;
  instance: THREE.PerspectiveCamera | undefined;
  controls: OrbitControls | undefined;
  cameraPos: { x: number, y: number, z: number }[];
  cameraPosIndex: number;
  tween: any;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.cameraPosIndex = 0;

    this.cameraPos = [
      { x: 0, y: 4, z: 8 },//initial 0
      { x: -5, y: 0.5, z: 3 },//gallery 1
      { x: -3, y: 2.3, z: 3 },//movinSphere 2
      { x: -0.5, y: 1.4, z: 3 },//hexDome 3
      { x: 1.6, y: 0.5, z: 3 },//twisArc 4
      { x: 4.2, y: 1.4, z: 3 },//curtain 5
      { x: 6.0, y: 3.5, z: 3.2 },//lamp 6
      { x: 3.2, y: 4.0, z: 3.0 },//pipe 7
      { x: 1.0, y: 3.2, z: 3.0 },//feather 8
      { x: -1.5, y: 4.0, z: 3.0 },//ribbon 9
      { x: -4.1, y: 4.2, z: 3.2 },//waffle 10
      { x: -3.1, y: 7.0, z: 3.2 },//origami 11
      { x: -0.8, y: 6.0, z: 3.2 },//town 12
      { x: 1.8, y: 5.8, z: 3.2 },//deformSphere 13
      { x: 4.4, y: 6.4, z: 3.2 },//fin 14
    ]

    this.setInstance();
    // this.setOrbitComtrols();

    const button = document.getElementsByClassName('button');
    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener('click', () => {
        if (button[i].id === "plus") {
          this.cameraPosIndex === 14 ? this.cameraPosIndex = 0 : this.cameraPosIndex++;
        } else {
          this.cameraPosIndex === 0 ? this.cameraPosIndex = 14 : this.cameraPosIndex--;
        }

        this.tween = new TWEEN.Tween(this.instance!.position).to({
          x: this.cameraPos[this.cameraPosIndex].x,
          y: this.cameraPos[this.cameraPosIndex].y,
          z: this.cameraPos[this.cameraPosIndex].z,
        }, 1500)
          .onUpdate((coords) => {
            this.instance!.position.set(coords.x, coords.y, coords.z)
          })
          .easing(TWEEN.Easing.Exponential.Out)
          .start();

      })
    }
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes!.width / this.sizes!.height,
      0.1,
      100
    );
    this.instance.position.set(this.cameraPos[this.cameraPosIndex].x, this.cameraPos[this.cameraPosIndex].y, this.cameraPos[this.cameraPosIndex].z);
    this.scene?.add(this.instance);
  }
  setOrbitComtrols() {
    if (this.instance) {
      this.controls = new OrbitControls(this.instance, this.canvas);
      this.controls.enableDamping = true;
    }
  }

  cameraTween() {

  }

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
