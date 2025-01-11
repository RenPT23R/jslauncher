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

    // Manually set UV coordinates
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

    const uvFaces = [
      geometry.faceVertexUvs[0][0],
      geometry.faceVertexUvs[0][1],
      geometry.faceVertexUvs[0][2],
      geometry.faceVertexUvs[0][3],
      geometry.faceVertexUvs[0][4],
      geometry.faceVertexUvs[0][5],
    ];

    uvFaces.forEach((face, index) => {
      const uv = uvMapping.slice(index * 4, index * 4 + 4);
      face[0].set(uv[0].x, uv[0].y);
      face[1].set(uv[1].x, uv[1].y);
      face[2].set(uv[2].x, uv[2].y);
      face[3].set(uv[3].x, uv[3].y);
    });

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