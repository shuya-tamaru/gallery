import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { Source } from "../sources";
import EventEmitter from "./EventEmitter";
import Load from "./Load";

type File = THREE.CubeTexture | THREE.TextureLoader | DRACOLoader | GLTFLoader;

export default class Resources extends EventEmitter {
  sources: Source[];
  items: {} | any;
  toLoad: number;
  loaded: number;
  loaders!: any;
  gltfLoader!: any;
  dracoLoader!: any;
  textureLoader!: any;
  cubeTextureLoader!: any;
  scene!: THREE.Group;
  loadingManager: THREE.LoadingManager;

  constructor(sources: Source[]) {
    super();
    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.loadingManager = new Load().loadingManager;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {


    this.loaders = {};
    if (this.loaders) {
      this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
      this.loaders.dracoLoader = new DRACOLoader();
      this.loaders.textureLoader = new THREE.TextureLoader();
      this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    }
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file: File) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "dracoModel") {
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
        this.loaders.gltfLoader.load(source.path, (file: File) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file: File) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file: File) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: Source, file: File) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      console.log("fin");
      this.trigger("ready");
    }
  }
}
