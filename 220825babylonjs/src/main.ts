import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";

import './style.css';

import "@babylonjs/core/Materials/standardMaterial";
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
import "@babylonjs/core/Meshes/Builders/sphereBuilder";
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import "@babylonjs/core/Meshes/Builders/groundBuilder";

const canvas = document.createElement("canvas");
canvas.width = 1920;
canvas.height = 1080;
const engine = new Engine(canvas, true);
document.body.append(canvas);
let scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
let sphere = MeshBuilder.CreateSphere("sphere1",{
  diameter:2,
  segments:16
}, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 3;

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
MeshBuilder.CreateGround("ground1", {
  width:6,
  height:6,
  subdivisions:2
}, scene);

let g = -0.01;
let v = 0;

engine.runRenderLoop(() => {
  v += g * Math.sign(sphere.position.y);
  sphere.position.y += v;
  scene.render();
});