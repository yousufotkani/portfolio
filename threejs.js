import * as THREE from "./three/build/three.module.js ";
import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, cube, light, renderer;

function init() {
  const canvas = document.querySelector(".canvas");
  renderer = new THREE.WebGL1Renderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
  camera.position.z = 20;
  light = new THREE.DirectionalLight(0xf5f5f5, 1);
  light.position.set(4, 2, 1);
  scene.add(light);
 
  let loader = new GLTFLoader();
  loader.load("./plexusxtra.glb", function (glb) {
    var model = glb.scene;
    model.position.set(10, 1, 10);
    model.scale.set(3, 3, 3);
    model.rotation.x = -150;

    scene.add(model);
    mixer = new THREE.AnimationMixer(model );
    mixer.clipAction(gltf.animations[0]).play();
  });


  function animate(time) {
    time *= 0.001;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }             
  animate();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onWindowResize, false);
}

init();
