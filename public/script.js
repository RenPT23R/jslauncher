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

    // Ensure faceVertexUvs[0] is properly initialized (not [1])
    if (!geometry.faceVertexUvs[0]) {
      geometry.faceVertexUvs[0] = [];
    }

    // Define UV mapping for each face of the cube
    const texWidth = 16;  // Assuming the texture is 16x16
    const texHeight = 16;

    const uvMapping = [
      // Right face
      [new THREE.Vector2(12 / texWidth, 10 / texHeight), new THREE.Vector2(16 / texWidth, 10 / texHeight), new THREE.Vector2(16 / texWidth, 16 / texHeight), new THREE.Vector2(12 / texWidth, 16 / texHeight)],
      // Left face
      [new THREE.Vector2(4 / texWidth, 10 / texHeight), new THREE.Vector2(0 / texWidth, 10 / texHeight), new THREE.Vector2(0 / texWidth, 16 / texHeight), new THREE.Vector2(4 / texWidth, 16 / texHeight)],
      // Top face
      [new THREE.Vector2(4 / texWidth, 16 / texHeight), new THREE.Vector2(0 / texWidth, 16 / texHeight), new THREE.Vector2(0 / texWidth, 10 / texHeight), new THREE.Vector2(4 / texWidth, 10 / texHeight)],
      // Bottom face
      [new THREE.Vector2(4 / texWidth, 8 / texHeight), new THREE.Vector2(0 / texWidth, 8 / texHeight), new THREE.Vector2(0 / texWidth, 4 / texHeight), new THREE.Vector2(4 / texWidth, 4 / texHeight)],
      // Front face (North)
      [new THREE.Vector2(8 / texWidth, 10 / texHeight), new THREE.Vector2(4 / texWidth, 10 / texHeight), new THREE.Vector2(4 / texWidth, 8 / texHeight), new THREE.Vector2(8 / texWidth, 8 / texHeight)],
      // Back face (South)
      [new THREE.Vector2(16 / texWidth, 10 / texHeight), new THREE.Vector2(12 / texWidth, 10 / texHeight), new THREE.Vector2(12 / texWidth, 8 / texHeight), new THREE.Vector2(16 / texWidth, 8 / texHeight)]
    ];

    // Map the UVs to each face correctly
    for (let i = 0; i < 6; i++) {
      const uvs = uvMapping[i];

      // Ensure we're pushing two triangles per face (for each quad face)
      geometry.faceVertexUvs[0].push([uvs[0], uvs[1], uvs[2]]);
      geometry.faceVertexUvs[0].push([uvs[0], uvs[2], uvs[3]]);
    }

    // Ensure UVs are updated
    geometry.uvsNeedUpdate = true;

    // Create the cube and add it to the scene
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