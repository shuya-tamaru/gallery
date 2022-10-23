import * as THREE from 'three';

import Experience from '../Experience';
import Raycast from '../Utils/Raycast';
import Resources from '../Utils/Resources';
import Environment from './Environment';
import Floors from './Floor';
import GalleryFloor from './GalleryFloor';
import Model from './Model';

export default class World {
  experience: Experience;
  scene: THREE.Scene;
  environment!: Environment;
  resources: Resources;
  floor!: Floors;
  galleryFloor!: GalleryFloor;
  model!: Model;
  rascast!: Raycast;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.floor = new Floors();
      this.model = new Model();
      this.rascast = new Raycast();
      this.environment = new Environment();

      console.log('reso ready');
    });
  }
}
