import * as THREE from 'three';

let scene, camera, renderer, cube;

function init() {
  console.log("Initializing Three.js...");

  // Initialize the scene
  scene = new THREE.Scene();

  // Initialize the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Initialize the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add a simple cube to the scene
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Handle window resize events
  window.addEventListener('resize', onWindowResize, false);

  // Start the animation loop
  animate();
  console.log("Three.js initialized and rendering...");
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

// Initialize the scene when the window loads
window.onload = init;