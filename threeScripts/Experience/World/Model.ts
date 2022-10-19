import * as THREE from 'three';

import Experience from '../Experience';
import Resources from '../Utils/Resources';
import Time from '../Utils/Time';

type Child = THREE.Mesh | THREE.Object3D | THREE.Group;

export default class Model {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  time: Time;
  model!: THREE.Group;
  modelTree!: THREE.Group;
  textures: any;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.setModel();
  }

  setModel() {
    this.model = this.resources.items.galleryModel.scene;
    this.modelTree = this.resources.items.treeModel.scene;
    this.model.scale.set(1, 1, 1);
    this.model.rotation.y = -Math.PI * 0.5;
    this.modelTree.position.set(-1, 0, 5);
    this.modelTree.rotation.y = -Math.PI * 0.5;
    this.modelTree.scale.set(1.5, 1.5, 1.5);
    this.scene.add(this.model);
    this.scene.add(this.modelTree);

    this.model.traverse((child: Child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
    this.modelTree.traverse((child: Child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    const room = this.model.children.find((child) => child.name === 'room') as THREE.Mesh;
    this.setTextrue(room, 'room');

    const louver = this.model.children.find((child) => child.name === 'louver') as THREE.Mesh;
    this.setTextrue(louver, 'louver');


    const objectsDarkColor = this.model.children.find(
      (child) => child.name === 'objectsDarkColor',
    ) as THREE.Mesh;
    this.setTextrue(objectsDarkColor, 'objectsDarkColor');

    const objectsMiddleColor = this.model.children.find(
      (child) => child.name === 'objectsMiddleColor',
    ) as THREE.Mesh;
    this.setTextrue(objectsMiddleColor, 'objectsMiddleColor');

    const objectsLightColor = this.model.children.find(
      (child) => child.name === 'objectsLightColor',
    ) as THREE.Mesh;
    this.setTextrue(objectsLightColor, 'objectsLightColor');

    const tree = this.modelTree.children.find((child) => child.name === 'tree') as THREE.Mesh;
    this.setTextrue(tree, 'tree');

    const leaves = this.modelTree.children.find((child) => child.name === 'leaves') as THREE.Mesh;
    this.setTextrue(leaves, 'leaves');
  }

  setTextrue(mesh: THREE.Mesh, name: string) {


    let color = '';
    if (name === 'room') {
      color = '#ffffff';
    } else if (name === 'louver' || name === 'tree') {
      color = '#f0f8ff';
    } else if (name === 'objectsDarkColor') {
      color = '#696969';
    } else if (name === 'objectsMiddleColor' || name === 'leaves') {
      color = '#a9a9a9';
    } else if (name === 'objectsLightColor') {
      color = '#ffffff';
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


    // const curtain = this.model.children.find((child) => child.name === 'curtain') as THREE.Mesh;
    // this.setTextrue(curtain, 'curtain');

    // const deformSphere = this.model.children.find((child) => child.name === 'deformSphere') as THREE.Mesh;
    // this.setTextrue(deformSphere, 'deformSphere');

    // const feather = this.model.children.find((child) => child.name === 'feather') as THREE.Mesh;
    // this.setTextrue(feather, 'feather');

    // const town = this.model.children.find((child) => child.name === 'town') as THREE.Mesh;
    // this.setTextrue(town, 'town');

    // const dome = this.model.children.find((child) => child.name === 'dome') as THREE.Mesh;
    // this.setTextrue(dome, 'dome');

    // const icons = this.model.children.find((child) => child.name === 'icons') as THREE.Mesh;
    // this.setTextrue(icons, 'icons');

    // const movingFace = this.model.children.find((child) => child.name === 'movingFace') as THREE.Mesh;
    // this.setTextrue(movingFace, 'movingFace');

    // const origami = this.model.children.find((child) => child.name === 'origami') as THREE.Mesh;
    // this.setTextrue(origami, 'origami');

    // const pipe = this.model.children.find((child) => child.name === 'pipe') as THREE.Mesh;
    // this.setTextrue(pipe, 'pipe');

    // const paperLamp = this.model.children.find((child) => child.name === 'lamp') as THREE.Mesh;
    // this.setTextrue(paperLamp, 'paperLamp');

    // const texts = this.model.children.find((child) => child.name === 'texts') as THREE.Mesh;
    // this.setTextrue(texts, 'texts');

    // const twisArc = this.model.children.find((child) => child.name === 'twisArc') as THREE.Mesh;
    // this.setTextrue(twisArc, 'twisArc');

    // const waffle = this.model.children.find((child) => child.name === 'waffle') as THREE.Mesh;
    // this.setTextrue(waffle, 'waffle');

    // const ribbon = this.model.children.find((child) => child.name === 'ribbon') as THREE.Mesh;
    // this.setTextrue(ribbon, 'ribbon');


    // const textures = this.resources.items[name]
    // textures.encoding = THREE.sRGBEncoding;
    // textures.repeat.set(1.5, 1.5);
    // textures.wrapS = THREE.RepeatWrapping;
    // textures.wrapT = THREE.RepeatWrapping;
    // textures.flipY = false;
