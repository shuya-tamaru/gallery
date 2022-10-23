import * as THREE from 'three';

import Experience from '../Experience';
import Raycast from '../Utils/Raycast';
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
  raycast: Raycast;
  room!: THREE.Mesh;
  louver!: THREE.Mesh;
  objectDarkColor!: THREE.Mesh;
  objectLightColor!: THREE.Mesh;
  tree!: THREE.Mesh;
  leaves!: THREE.Mesh;
  youtube!: THREE.Mesh;
  insta!: THREE.Mesh;
  twitter!: THREE.Mesh;
  web!: THREE.Mesh;
  github!: THREE.Mesh;
  pinterest!: THREE.Mesh;
  intersects!: THREE.Intersection<THREE.Object3D<THREE.Event>>[];

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.raycast = this.experience.raycast;

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

    this.room = this.model.children.find((child) => child.name === 'room') as THREE.Mesh;
    this.setTextrue(this.room, 'room');

    this.louver = this.model.children.find((child) => child.name === 'louver') as THREE.Mesh;
    this.setTextrue(this.louver, 'louver');

    this.objectDarkColor = this.model.children.find(
      (child) => child.name === 'objectDarkColor',
    ) as THREE.Mesh;
    this.setTextrue(this.objectDarkColor, 'objectDarkColor');

    this.objectLightColor = this.model.children.find(
      (child) => child.name === 'objectLightColor',
    ) as THREE.Mesh;
    this.setTextrue(this.objectLightColor, 'objectLightColor');

    this.tree = this.modelTree.children.find((child) => child.name === 'tree') as THREE.Mesh;
    this.setTextrue(this.tree, 'tree');

    this.leaves = this.modelTree.children.find((child) => child.name === 'leaves') as THREE.Mesh;
    this.setTextrue(this.leaves, 'leaves');

    this.youtube = this.model.children.find((child) => child.name === 'youtube') as THREE.Mesh;
    this.setTextrue(this.youtube, 'youtube');

    this.insta = this.model.children.find((child) => child.name === 'insta') as THREE.Mesh;
    this.setTextrue(this.insta, 'insta');

    this.pinterest = this.model.children.find((child) => child.name === 'pinterest') as THREE.Mesh;
    this.setTextrue(this.pinterest, 'pinterest');

    this.twitter = this.model.children.find((child) => child.name === 'twitter') as THREE.Mesh;
    this.setTextrue(this.twitter, 'twitter');

    this.web = this.model.children.find((child) => child.name === 'web') as THREE.Mesh;
    this.setTextrue(this.web, 'web');

    this.github = this.model.children.find((child) => child.name === 'github') as THREE.Mesh;
    this.setTextrue(this.github, 'github');
  }

  setTextrue(mesh: THREE.Mesh, name: string) {
    let color = '';
    if (name === 'room') {
      color = '#ffffff';
    } else if (name === 'louver' || name === 'tree') {
      color = '#f0f8ff';
    } else if (name === 'objectDarkColor') {
      color = '#696969';
    } else if (name === 'leaves') {
      color = '#a9a9a9';
    } else if (name === 'objectLightColor') {
      color = '#ffffff';
    } else {
      //sns
      color = '#696969';;
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
