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

  // Load textures
  const loader = new THREE.TextureLoader();
  const missingTexture = loader.load('assets/blocks/missing.png');

  loader.load('assets/blocks/grass_block.png',
    (texture) => {
      createCube(texture);
    },
    undefined,
    () => {
      console.error('Error loading grass_block.png, using missing texture instead.');
      createCube(missingTexture);
    }
  );

  function createCube(texture) {
    // Create material with the texture
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Create geometry and manually set UV coordinates
    const geometry = new THREE.BoxGeometry();
    const uvMapping = [
      // Right
      { x: 0.75, y: 0.66 }, { x: 0.5, y: 0.66 }, { x: 0.5, y: 0.33 }, { x: 0.75, y: 0.33 },
      // Left
      { x: 0.25, y: 0.66 }, { x: 0, y: 0.66 }, { x: 0, y: 0.33 }, { x: 0.25, y: 0.33 },
      // Top
      { x: 0.25, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0.66 }, { x: 0.25, y: 0.66 },
      // Bottom
      { x: 0.25, y: 0.33 }, { x: 0, y: 0.33 }, { x: 0, y: 0 }, { x: 0.25, y: 0 },
      // Front (North)
      { x: 0.5, y: 0.66 }, { x: 0.25, y: 0.66 }, { x: 0.25, y: 0.33 }, { x: 0.5, y: 0.33 },
      // Back (South)
      { x: 1, y: 0.66 }, { x: 0.75, y: 0.66 }, { x: 0.75, y: 0.33 }, { x: 1, y: 0.33 },
    ];

    geometry.faceVertexUvs[0] = [];
    for (let i = 0; i < 6; i++) {
      const uv = uvMapping.slice(i * 4, i * 4 + 4);
      geometry.faceVertexUvs[0].push([uv[0], uv[1], uv[3]]);
      geometry.faceVertexUvs[0].push([uv[1], uv[2], uv[3]]);
    }
    geometry.uvsNeedUpdate = true;

    // Create a cube with the textured material
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

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