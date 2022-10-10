import { setUncaughtExceptionCaptureCallback } from "process";
import * as THREE from "three";

import Experience from "../Experience";
import Resources from "../Utils/Resources";
import Time from "../Utils/Time";

type Child = THREE.Mesh | THREE.Object3D | THREE.Group;

export default class Model {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  time: Time;
  model!: THREE.Group;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.setModel();
  }

  setModel() {
    this.model = this.resources.items.galleryModel.scene;
    this.model.scale.set(1, 1, 1);
    this.model.rotation.y = -Math.PI * 0.5;
    this.scene.add(this.model);

    this.model.traverse((child: Child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    const room = this.model.children.find(
      (child) => child.name === "room"
    ) as THREE.Mesh;
    this.setTextrue(room, "room");

    const louver = this.model.children.find(
      (child) => child.name === "louver"
    ) as THREE.Mesh;
    this.setTextrue(louver, "louver");

    const objectsDarkColor = this.model.children.find(
      (child) => child.name === "objectsDarkColor"
    ) as THREE.Mesh;
    this.setTextrue(objectsDarkColor, "objectsDarkColor");

    const objectsMiddleColor = this.model.children.find(
      (child) => child.name === "objectsMiddleColor"
    ) as THREE.Mesh;
    this.setTextrue(objectsMiddleColor, "objectsMiddleColor");

    const objectsLightColor = this.model.children.find(
      (child) => child.name === "objectsLightColor"
    ) as THREE.Mesh;
    this.setTextrue(objectsLightColor, "objectsLightColor");

  }

  setTextrue(mesh: THREE.Mesh, name: string) {

    let color = "";
    if (name === "room") {
      color = "#ffffff"
    } else if (name === "louver") {
      color = "#f0f8ff"
    } else if (name === "objectsDarkColor") {
      color = "#808080"

    } else if (name === "objectsMiddleColor") {
      color = "#f0f8ff"

    } else if (name === "objectsLightColor") {
      color = "#ffffff"
    }


    if (mesh) {
      mesh.receiveShadow = true;
      if (mesh) {
        const material = new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide });
        mesh.material = material;
      }
    }
  }
}
