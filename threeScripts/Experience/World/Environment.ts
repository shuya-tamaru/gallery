import * as THREE from 'three';

import Experience from '../Experience';
import Resources from '../Utils/Resources';

export default class Environment {
  experience: Experience;
  scene: THREE.Scene;
  sunLight!: THREE.DirectionalLight;
  sunLight2!: THREE.DirectionalLight;
  resources: Resources;
  environmentMap: any;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 0.8);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-7, 10, 9);
    this.sunLight2 = this.sunLight.clone();
    this.sunLight2.position.set(7, 10, 10);

    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight2);
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 1.0;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encodeing = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();
  }
}
