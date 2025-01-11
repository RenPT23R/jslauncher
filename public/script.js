import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

let scene, camera, renderer, cube;

function init() {
  // Initialize the scene
  scene = new THREE.Scene();

  // Initialize the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Initialize the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.game-screen').appendChild(renderer.domElement);

  // Add a simple cube to the scene
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Handle window resize events
  window.addEventListener('resize', onWindowResize, false);

  // Start the animation loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube for a simple animation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function onWindowResize() {
  // Adjust camera aspect ratio and renderer size on window resize
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

document.getElementById('start-button').addEventListener('click', function() {
  document.querySelector('.title-screen').style.display = 'none';
  document.querySelector('.game-screen').style.display = 'block';
  init();
});