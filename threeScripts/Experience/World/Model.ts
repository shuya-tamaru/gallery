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

    const iconSns = this.model.children.find(
      (child) => child.name === "icon-sns"
    ) as THREE.Mesh;
    this.setTextrue(iconSns, "iconSns");

    const ribbon = this.model.children.find(
      (child) => child.name === "ribbon"
    ) as THREE.Mesh;
    this.setTextrue(ribbon, "ribbon");

    const movingFace = this.model.children.find(
      (child) => child.name === "moving-sphere"
    ) as THREE.Mesh;
    this.setTextrue(movingFace, "movingFace");

    const paperLamp = this.model.children.find(
      (child) => child.name === "lamp"
    ) as THREE.Mesh;
    this.setTextrue(paperLamp, "paperLamp");

    const hexDome = this.model.children.find(
      (child) => child.name === "dome"
    ) as THREE.Mesh;
    this.setTextrue(hexDome, "hexDome");

    const growingTown = this.model.children.find(
      (child) => child.name === "town"
    ) as THREE.Mesh;
    this.setTextrue(growingTown, "growingTown");

    const grassFeather = this.model.children.find(
      (child) => child.name === "feather"
    ) as THREE.Mesh;
    this.setTextrue(grassFeather, "grassFeather");

    const curtain = this.model.children.find(
      (child) => child.name === "curtain"
    ) as THREE.Mesh;
    this.setTextrue(curtain, "curtain");

    const origami = this.model.children.find(
      (child) => child.name === "origami"
    ) as THREE.Mesh;
    this.setTextrue(origami, "origami");

    const twisarc = this.model.children.find(
      (child) => child.name === "pavilion"
    ) as THREE.Mesh;
    this.setTextrue(twisarc, "twisarc");

    const waffle = this.model.children.find(
      (child) => child.name === "waffle"
    ) as THREE.Mesh;
    this.setTextrue(waffle, "waffle");

    const pipeConnection = this.model.children.find(
      (child) => child.name === "pipe"
    ) as THREE.Mesh;
    this.setTextrue(pipeConnection, "pipeConnection");

    const louver = this.model.children.find(
      (child) => child.name === "louver"
    ) as THREE.Mesh;
    this.setTextrue(louver, "louver");

    const deformedSphere = this.model.children.find(
      (child) => child.name === "deform-surf"
    ) as THREE.Mesh;
    this.setTextrue(deformedSphere, "deformedSphere");

    const textTop = this.model.children.find(
      (child) => child.name === "text-top"
    ) as THREE.Mesh;
    this.setTextrue(textTop, "textTop");

    const textBottom = this.model.children.find(
      (child) => child.name === "text-bottom"
    ) as THREE.Mesh;
    this.setTextrue(textBottom, "textBottom");
  }

  setTextrue(mesh: THREE.Mesh, name: string) {
    const texture = this.resources.items[name];
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = false;
    if (mesh) {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      mesh.material = material;
    }
  }
}
