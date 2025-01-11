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

  // Load missing texture
  const loader = new THREE.TextureLoader();
  const missingTexture = loader.load('assets/blocks/missing.png', createCube);

  function createCube(texture) {
    // Create material with the texture
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Create a simple cube geometry
    const geometry = new THREE.BoxGeometry();

    // Create a cube with the textured material
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Start the animation loop
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for a simple animation
    if (cube) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  }

  // Handle window resize events
  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {
    // Adjust camera aspect ratio and renderer size on window resize
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

document.getElementById('start-button').addEventListener('click', function() {
  document.querySelector('.title-screen').style.display = 'none';
  document.querySelector('.game-screen').style.display = 'block';
  init();
});