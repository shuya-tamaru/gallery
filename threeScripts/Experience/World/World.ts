import * as THREE from "three";

import Experience from "../Experience";
import Resources from "../Utils/Resources";
import Environment from "./Environment";
import Floors from "./Floor";
import Model from "./Model";

export default class World {
  experience: Experience;
  scene: THREE.Scene;
  environment!: Environment;
  resources: Resources;
  floor!: Floors;
  model!: Model;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ wireframe: false })
    );
    this.scene.add(testMesh);

    this.resources.on("ready", () => {
      this.floor = new Floors();
      this.model = new Model();
      this.environment = new Environment();

      console.log("reso ready");
    });
  }
}
