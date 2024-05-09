import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//fog
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const alphaDoor = textureLoader.load("textures/door/alpha.jpg");
const ambientOcclusionDoor = textureLoader.load(
  "textures/door/ambientOcclusion.jpg"
);
const colorDoor = textureLoader.load("textures/door/color.jpg");
colorDoor.colorSpace = THREE.SRGBColorSpace;
const heightDoor = textureLoader.load("textures/door/height.jpg");
const metalnessDoor = textureLoader.load("textures/door/metalness.jpg");
const normalDoor = textureLoader.load("textures/door/normal.jpg");
const roughnessDoor = textureLoader.load("textures/door/roughness.jpg");

const colorBricks = textureLoader.load("textures/bricks/color.jpg");
colorBricks.colorSpace = THREE.SRGBColorSpace;
const ambientOcclusionBricks = textureLoader.load(
  "textures/bricks/ambientOcclusion.jpg"
);
const normalBricks = textureLoader.load("textures/bricks/normal.jpg");
const roughnessBricks = textureLoader.load("textures/bricks/roughness.jpg");

const colorGrass = textureLoader.load("textures/grass/color.jpg");
colorGrass.colorSpace = THREE.SRGBColorSpace;
const ambientOcclusionGrass = textureLoader.load(
  "textures/grass/ambientOcclusion.jpg"
);
const normalGrass = textureLoader.load("textures/grass/normal.jpg");
const roughnessGrass = textureLoader.load("textures/grass/roughness.jpg");

colorGrass.repeat.set(8, 8);
ambientOcclusionGrass.repeat.set(8, 8);
normalGrass.repeat.set(8, 8);
roughnessGrass.repeat.set(8, 8);

colorGrass.wrapS = THREE.RepeatWrapping;
ambientOcclusionGrass.wrapS = THREE.RepeatWrapping;
normalGrass.wrapS = THREE.RepeatWrapping;
roughnessGrass.wrapS = THREE.RepeatWrapping;

colorGrass.wrapT = THREE.RepeatWrapping;
ambientOcclusionGrass.wrapT = THREE.RepeatWrapping;
normalGrass.wrapT = THREE.RepeatWrapping;
roughnessGrass.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// group
const house = new THREE.Group();
scene.add(house);

//walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: colorBricks,
    aoMap: ambientOcclusionBricks,
    normalMap: normalBricks,
    roughnessMap: roughnessBricks,
  })
);
walls.position.y = 2.5 * 0.5;
house.add(walls);

//roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.2, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
house.add(roof);

roof.position.y = 2.5 + 1 * 0.5;
roof.rotation.y = Math.PI * 0.25;

//door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 128, 128),
  new THREE.MeshStandardMaterial({
    map: colorDoor,
    transparent: true,
    alphaMap: alphaDoor,
    aoMap: ambientOcclusionDoor,
    displacementMap: heightDoor,
    displacementScale: 0.1,
    metalnessMap: metalnessDoor,
    roughnessMap: roughnessDoor,
    normalMap: normalDoor,
  })
);
door.position.z = 2.00001;
door.position.y = 0.92;
house.add(door);

//bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.z = 3;
bush1.position.x = -1.5;
bush1.scale.x = 0.5;
bush1.scale.z = 0.5;
bush1.scale.y = 0.8;
house.add(bush1);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.z = 3;
bush2.position.x = 1.5;
bush2.scale.x = 0.5;
bush2.scale.z = 0.5;
bush2.scale.y = 0.8;
house.add(bush2);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.z = 2.5;
bush3.position.x = 2.5;
bush3.scale.x = 0.2;
bush3.scale.z = 0.2;
bush3.scale.y = 0.2;
house.add(bush3);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.z = 3.7;
bush4.position.x = -2;
bush4.scale.x = 0.3;
bush4.scale.z = 0.3;
bush4.scale.y = 0.3;
house.add(bush4);

//graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 15; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.y = 0.3;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  const gravePlacement = () => {
    grave.position.x = (Math.random() - 0.5) * 2 * 10;
    grave.position.z = (Math.random() - 0.5) * 2 * 10;
    if (
      grave.position.x > -3.5 &&
      grave.position.x < 3.5 &&
      grave.position.z > -3.5 &&
      grave.position.z < 3.5
    ) {
      gravePlacement();
    }
  };

  gravePlacement();

  graves.add(grave);
}
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: colorGrass,
    aoMap: ambientOcclusionGrass,
    normalMap: normalGrass,
    roughnessMap: roughnessGrass,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.26);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

moonLight.castShadow = true;

// Door Light
const doorLight = new THREE.PointLight("#ff7d46", 3, 7);
doorLight.position.set(0, 2.2, 2.7);
scene.add(doorLight);
doorLight.castShadow = true;

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#ff00ff", 6, 3);
ghost1.position.set(-4, 1, -4);
scene.add(ghost1);
ghost1.castShadow = true;
ghost1.shadow.camera.position.set(2, 2, 2);

const ghost1pointLightCameraHelper = new THREE.CameraHelper(
  ghost1.shadow.camera
);
scene.add(ghost1pointLightCameraHelper);

const ghost2 = new THREE.PointLight("#00ffff", 6, 3);
ghost2.position.set(4, 1, 4);
scene.add(ghost2);
ghost2.castShadow = true;

const ghost3 = new THREE.PointLight("#ffff00", 6, 3);
ghost3.position.set(-4, 1, 4);
scene.add(ghost3);
ghost3.castShadow = true;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#272837");
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  ghost1.position.x =
    Math.sin(elapsedTime * 0.1) * (Math.sin(elapsedTime * 0.4) + 3) * 2;
  ghost1.position.z =
    Math.cos(elapsedTime * 0.1) * (Math.cos(elapsedTime * 0.4) + 3) * 2;

  ghost2.position.x =
    Math.sin(2 + elapsedTime * 0.1) * (Math.sin(elapsedTime * 0.4) + 3) * 2;
  ghost2.position.z =
    Math.cos(2 + elapsedTime * 0.1) * (Math.cos(elapsedTime * 0.4) + 3) * 2;

  ghost3.position.x =
    Math.sin(4 + elapsedTime * 0.1) * (Math.sin(elapsedTime * 0.4) + 3) * 2;
  ghost3.position.z =
    Math.cos(4 + elapsedTime * 0.1) * (Math.cos(elapsedTime * 0.4) + 3) * 2;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
