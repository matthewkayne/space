import "./public/styles/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import marsBaseColourURL from "./public/images/mars-base-colour.jpg";
import marsHeightURL from "./public/images/mars-height.jpg";
import marsNormalURL from "./public/images/mars-normal.jpg";
import neptuneBaseColourURL from "./public/images/neptune-base-colour.jpg";
import rockAmbientOcclusionURL from "./public/images/rock-ambient-occlusion.jpg";
import rockBaseColourURL from "./public/images/rock-base-colour.jpg";
import rockHeightURL from "./public/images/rock-height.png";
import rockNormalURL from "./public/images/rock-normal.jpg";
import rockRoughnessURL from "./public/images/rock-roughness.jpg";
import spaceURL from "./public/images/space.jpg";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const marsBaseColour = new THREE.TextureLoader().load(marsBaseColourURL);
const marsNormal = new THREE.TextureLoader().load(marsNormalURL);
const marsHeight = new THREE.TextureLoader().load(marsHeightURL);
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: marsBaseColour,
    normalMap: marsNormal,
    displacementMap: marsHeight,
    displacementScale: 0.2,
  })
);

const neptuneBaseColour = new THREE.TextureLoader().load(neptuneBaseColourURL);

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: neptuneBaseColour,
  })
);

scene.add(mars, neptune);

mars.position.z = randomInt(-20, 20);
mars.position.x = randomInt(-30, 30);
mars.position.y = randomInt(-45, 45);

neptune.position.z = randomInt(-20, 20);
neptune.position.x = randomInt(-30, 30);
neptune.position.y = randomInt(-45, 45);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

function addRock() {
  const rockBaseColour = new THREE.TextureLoader().load(rockBaseColourURL);
  const rockNormal = new THREE.TextureLoader().load(rockNormalURL);
  const rockHeight = new THREE.TextureLoader().load(rockHeightURL);
  const rockRoughness = new THREE.TextureLoader().load(rockRoughnessURL);
  const rockAmbientOcclusion = new THREE.TextureLoader().load(
    rockAmbientOcclusionURL
  );
  const rock = new THREE.Mesh(
    new THREE.SphereGeometry(1, 12, 12),
    new THREE.MeshStandardMaterial({
      map: rockBaseColour,
      normalMap: rockNormal,
      displacementMap: rockHeight,
      displacementScale: 0.2,
      roughnessMap: rockRoughness,
      roughness: 0.5,
      aoMap: rockAmbientOcclusion,
      aoMapIntensity: 0.2,
    })
  );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  rock.position.set(x, y, z);

  scene.add(rock);
}

Array(10).fill().forEach(addRock);

const spaceTexture = new THREE.TextureLoader().load(spaceURL);
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  neptune.rotation.x += 0.05;
  neptune.rotation.y += 0.075;
  neptune.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  mars.rotation.x += 0.01;
  mars.rotation.y += 0.005;
  mars.rotation.z += 0.01;

  neptune.rotation.x += 0.01;
  neptune.rotation.y += 0.005;
  neptune.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
