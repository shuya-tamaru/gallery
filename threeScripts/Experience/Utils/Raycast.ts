import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';
import Camera from '../Camera';

import Experience from '../Experience';
import Resources from '../Utils/Resources';
import Model from '../World/Model';
import Sizes from './Sizes';

export default class Raycast {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  instance: THREE.Raycaster;
  pointer: THREE.Vector2;
  sizes: Sizes;
  camera: Camera;
  model: Model | undefined;
  intersects!: THREE.Intersection<THREE.Object3D<THREE.Event>>[];
  canvas: HTMLCanvasElement | undefined;
  standardMaterial: THREE.MeshStandardMaterial;
  standardTextureMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.instance = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.model = this.experience.world.model;
    this.standardMaterial = new THREE.MeshStandardMaterial({ color: "#696969" })
    this.standardTextureMaterial = new THREE.MeshStandardMaterial();

    const agent = navigator.userAgent;
    if (!(agent.indexOf('iPhone') > 0 || agent.indexOf('iPad') > 0 || agent.indexOf('Android') > 0 || agent.indexOf('Mobile') > 0)) {
      this.rayIcon();
    }

  }

  rayIcon() {
    window.addEventListener('pointermove', (e) => {
      this.pointer.x = (e.clientX / this.sizes.width) * 2 - 1;
      this.pointer.y = - (e.clientY / this.sizes.height) * 2 + 1;
      this.instance.setFromCamera(this.pointer, this.camera.instance!);

      if (this.model) {
        const iconArray = [
          this.model.youtube,
          this.model.github,
          this.model.twitter,
          this.model.pinterest,
          this.model.web,
          this.model.insta,
        ];

        this.intersects = this.instance.intersectObjects(iconArray);

        if (this.intersects.length > 0) {
          const intersectObject = this.intersects[0].object as THREE.Mesh;
          const material = intersectObject.material as THREE.MeshStandardMaterial;
          this.canvas!.style.cursor = "pointer";
          switch (intersectObject.name) {
            case 'youtube':
              this.canvas!.onclick = () => open('https://www.youtube.com/c/studioTama', '_blank');
              material.color.set(new THREE.Color("#ff0000"));
              break;
            case 'insta':
              this.canvas!.onclick = () => open('https://www.instagram.com/shuya_tamaru/', '_blank');
              const texture = this.resources.items.iconTexture;
              texture.encoding = THREE.sRGBEncoding;
              texture.repeat.set(2, 2);
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              this.standardTextureMaterial.map = texture;
              intersectObject.material = this.standardTextureMaterial;
              this.canvas!.style.cursor = "pointer";
              break;
            case 'twitter':
              this.canvas!.onclick = () => open('https://twitter.com/tama20013', '_blank');
              material.color.set(new THREE.Color("#00acee"));
              break;
            case 'github':
              this.canvas!.onclick = () => open('https://github.com/shuya-tamaru', '_blank')
              material.color.set(new THREE.Color("#333"));
              break;
            case 'pinterest':
              this.canvas!.onclick = () => open('https://www.pinterest.jp/shuyatamaru/', '_blank')
              material.color.set(new THREE.Color("#c8232c"));
              break;
            case 'web':
              this.canvas!.onclick = () => open('https://styublog.com/', '_blank')
              material.color.set(new THREE.Color("#7f7fff"));
              break;
            default:
              break;
          }
        } else {
          this.canvas!.onclick = () => { };
          iconArray.map((icon) => {
            if (icon.name === "insta") {
              icon.material = this.standardMaterial;
            } else {
              const material = icon.material as THREE.MeshStandardMaterial;
              material.color.set(new THREE.Color('#696969'));
            }
            this.canvas!.style.cursor = "";
          })
        }

      }
    })
  }
}