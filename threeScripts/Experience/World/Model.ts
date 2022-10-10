import * as THREE from "three";

import Experience from "../Experience";
import Resources from "../Utils/Resources";
import Time from "../Utils/Time";

export default class Model {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  time: Time;
  model: any;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.resources = this.resources.items.buildingModel;
    this.time = this.experience.time;

    this.setModel();
    // this.setAnimation();
  }

  setModel() {
    this.model = this.resources.scene;
    this.model.scale.set(1, 1, 1);
    this.scene.add(this.model);

    this.model.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
}
