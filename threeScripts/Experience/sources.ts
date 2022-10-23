export type Source = {
  name: string;
  type: string;
  path: string[] | string;
};

export const sources: Source[] = [
  {
    //cubeTexture
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      '/textures/environmentMap/px.jpg',
      '/textures/environmentMap/nx.jpg',
      '/textures/environmentMap/py.jpg',
      '/textures/environmentMap/ny.jpg',
      '/textures/environmentMap/pz.jpg',
      '/textures/environmentMap/nz.jpg',
    ],
  },
  {
    name: "iconTexture",
    type: "texture",
    path: "/textures/insta.jpeg",
  },
  //model
  {
    name: 'galleryModel',
    type: 'dracoModel',
    path: 'models/gallery/gallery.glb',
  },
  {
    name: 'treeModel',
    type: 'dracoModel',
    path: 'models/gallery/tree.glb',
  },
  {
    name: "dirtColor",
    type: "texture",
    path: "/textures/dirt/color.png",
  },
  {
    name: "dirtNormal",
    type: "texture",
    path: "/textures/dirt/normal.jpeg",
  },
];
