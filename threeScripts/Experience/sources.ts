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
  //model
  {
    name: 'galleryModel',
    type: 'dracoModel',
    path: 'models/gallery/galleryModel.glb',
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



// {
//   name: "curtain",
//   type: "texture",
//   path: "/textures/gallery-texture/curtain.jpg",
// },
// {
//   name: "deformSphere",
//   type: "texture",
//   path: "/textures/gallery-texture/deformSphere.jpg",
// },
// {
//   name: "feather",
//   type: "texture",
//   path: "/textures/gallery-texture/feather.jpg",
// },
// {
//   name: "town",
//   type: "texture",
//   path: "/textures/gallery-texture/town.jpg",
// },
// {
//   name: "dome",
//   type: "texture",
//   path: "/textures/gallery-texture/dome.jpg",
// },
// {
//   name: "icons",
//   type: "texture",
//   path: "/textures/gallery-texture/icons.jpg",
// },
// {
//   name: "louver",
//   type: "texture",
//   path: "/textures/gallery-texture/louver.jpg",
// },
// {
//   name: "movingFace",
//   type: "texture",
//   path: "/textures/gallery-texture/movingFace.jpg",
// },
// {
//   name: "origami",
//   type: "texture",
//   path: "/textures/gallery-texture/origami.jpg",
// },
// {
//   name: "paperLamp",
//   type: "texture",
//   path: "/textures/gallery-texture/paperLamp.jpg",
// },
// {
//   name: "pipe",
//   type: "texture",
//   path: "/textures/gallery-texture/pipe.jpg",
// },
// {
//   name: "ribbon",
//   type: "texture",
//   path: "/textures/gallery-texture/ribbon.jpg",
// },
// {
//   name: "room",
//   type: "texture",
//   path: "/textures/gallery-texture/room.jpg",
// },
// {
//   name: "texts",
//   type: "texture",
//   path: "/textures/gallery-texture/texts.jpg",
// },
// {
//   name: "twisArc",
//   type: "texture",
//   path: "/textures/gallery-texture/twisArc.jpg",
// },
// {
//   name: "waffle",
//   type: "texture",
//   path: "/textures/gallery-texture/waffle.jpg",
// },