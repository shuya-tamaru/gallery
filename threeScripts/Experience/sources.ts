export type Source = {
  name: string;
  type: string;
  path: string[] | string;
};

export const sources: Source[] = [
  {
    //cubeTexture
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "/textures/environmentMap/px.jpg",
      "/textures/environmentMap/nx.jpg",
      "/textures/environmentMap/py.jpg",
      "/textures/environmentMap/ny.jpg",
      "/textures/environmentMap/pz.jpg",
      "/textures/environmentMap/nz.jpg",
    ],
  },
  //model
  {
    name: "galleryModel",
    type: "dracoModel",
    path: "models/gallery/galleryModel.glb",
  },
];





// {
//   name: "curtain",
//   type: "texture",
//   path: "/textures/gallkery-texture/curtain.jpg",
// },
// {
//   name: "deformedSphere",
//   type: "texture",
//   path: "/textures/gallkery-texture/deformedSphere.jpg",
// },
// {
//   name: "grassFeather",
//   type: "texture",
//   path: "/textures/gallkery-texture/grassFeather.jpg",
// },
// {
//   name: "growingTown",
//   type: "texture",
//   path: "/textures/gallkery-texture/growingTown.jpg",
// },
// {
//   name: "hexDome",
//   type: "texture",
//   path: "/textures/gallkery-texture/hexDome.jpg",
// },
// {
//   name: "iconSns",
//   type: "texture",
//   path: "/textures/gallkery-texture/icons.jpg",
// },
// {
//   name: "louver",
//   type: "texture",
//   path: "/textures/gallkery-texture/louver.jpg",
// },
// {
//   name: "movingFace",
//   type: "texture",
//   path: "/textures/gallkery-texture/movingFace.jpg",
// },
// {
//   name: "origami",
//   type: "texture",
//   path: "/textures/gallkery-texture/origami.jpg",
// },
// {
//   name: "paperLamp",
//   type: "texture",
//   path: "/textures/gallkery-texture/paperLamp.jpg",
// },
// {
//   name: "pipeConnection",
//   type: "texture",
//   path: "/textures/gallkery-texture/pipeConnection.jpg",
// },
// {
//   name: "ribbon",
//   type: "texture",
//   path: "/textures/gallkery-texture/ribbon.jpg",
// },
// {
//   name: "room",
//   type: "texture",
//   path: "/textures/gallkery-texture/room.jpg",
// },
// {
//   name: "textBottom",
//   type: "texture",
//   path: "/textures/gallkery-texture/text-bottom.jpg",
// },
// {
//   name: "textTop",
//   type: "texture",
//   path: "/textures/gallkery-texture/text-top.jpg",
// },
// {
//   name: "twisarc",
//   type: "texture",
//   path: "/textures/gallkery-texture/twisarc.jpg",
// },
// {
//   name: "waffle",
//   type: "texture",
//   path: "/textures/gallkery-texture/waffle.jpg",
// },
