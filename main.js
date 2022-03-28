import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const rockBaseColour = new THREE.TextureLoader().load(
  "./images/rock/rock-base-colour.jpg"
);
const rockNormal = new THREE.TextureLoader().load(
  "./images/rock/rock-normal.jpg"
);
const rockHeight = new THREE.TextureLoader().load(
  "./images/rock/rock-height.png"
);
const rockRoughness = new THREE.TextureLoader().load(
  "./images/rock/rock-roughness.jpg"
);
const rockAmbientOcclusion = new THREE.TextureLoader().load(
  "./images/rock/rock-ambient-occlusion.jpg"
);
const rock = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
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

const marsBaseColour = new THREE.TextureLoader().load(
  "./images/mars/mars-base-colour.jpeg"
);
const marsNormal = new THREE.TextureLoader().load(
  "./images/mars/mars-normal.jpeg"
);
const marsHeight = new THREE.TextureLoader().load(
  "./images/mars/mars-height.jpg"
);
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: marsBaseColour,
    normalMap: marsNormal,
    displacementMap: marsHeight,
    displacementScale: 0.2,
  })
);

scene.add(rock, mars);

rock.position.z = randomInt(-20, 20);
rock.position.x = randomInt(-30, 30);
rock.position.y = randomInt(-45, 45);

mars.position.z = randomInt(-20, 20);
mars.position.x = randomInt(-30, 30);
mars.position.y = randomInt(-45, 45);

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

const spaceTexture = new THREE.TextureLoader().load("./images/space.jpg");
scene.background = spaceTexture;

const objects = [rock, mars];

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  rock.rotation.x += 0.01;
  rock.rotation.y += 0.005;
  rock.rotation.z += 0.01;

  mars.rotation.x += 0.01;
  mars.rotation.y += 0.005;
  mars.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
