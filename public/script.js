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
    if (!texture) {
      console.error("Texture is undefined, aborting cube creation");
      return;
    }

    // Create material with the loaded texture
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Create a simple cube geometry (BufferGeometry for modern Three.js)
    const geometry = new THREE.BoxBufferGeometry();

    const texWidth = 16;  // Assuming the texture is 16x16
    const texHeight = 16;

    // UV mapping for each face of the cube (adjusted for 16x16 texture)
    const uvMapping = [
      // Right face
      [new THREE.Vector2(12 / texWidth, 10 / texHeight), new THREE.Vector2(16 / texWidth, 10 / texHeight), new THREE.Vector2(16 / texWidth, 16 / texHeight), new THREE.Vector2(12 / texWidth, 16 / texHeight)],
      // Left face
      [new THREE.Vector2(4 / texWidth, 10 / texHeight), new THREE.Vector2(0 / texWidth, 10 / texHeight), new THREE.Vector2(0 / texWidth, 16 / texHeight), new THREE.Vector2(4 / texWidth, 16 / texHeight)],
      // Top face
      [new THREE.Vector2(4 / texWidth, 16 / texHeight), new THREE.Vector2(0 / texWidth, 16 / texHeight), new THREE.Vector2(0 / texWidth, 10 / texHeight), new THREE.Vector2(4 / texWidth, 10 / texHeight)],
      // Bottom face
      [new THREE.Vector2(4 / texWidth, 8 / texHeight), new THREE.Vector2(0 / texWidth, 8 / texHeight), new THREE.Vector2(0 / texWidth, 4 / texHeight), new THREE.Vector2(4 / texWidth, 4 / texHeight)],
      // Front face
      [new THREE.Vector2(8 / texWidth, 10 / texHeight), new THREE.Vector2(4 / texWidth, 10 / texHeight), new THREE.Vector2(4 / texWidth, 8 / texHeight), new THREE.Vector2(8 / texWidth, 8 / texHeight)],
      // Back face
      [new THREE.Vector2(16 / texWidth, 10 / texHeight), new THREE.Vector2(12 / texWidth, 10 / texHeight), new THREE.Vector2(12 / texWidth, 8 / texHeight), new THREE.Vector2(16 / texWidth, 8 / texHeight)]
    ];

    // Directly modify the UV attribute of the geometry
    const uvs = geometry.attributes.uv.array;
    for (let i = 0; i < 6; i++) {
      const uv = uvMapping[i];

      // Each face consists of 6 UV coordinates (2 triangles)
      const offset = i * 6; 

      // First triangle
      uvs[offset + 0] = uv[0].x;
      uvs[offset + 1] = uv[0].y;
      uvs[offset + 2] = uv[1].x;
      uvs[offset + 3] = uv[1].y;
      uvs[offset + 4] = uv[2].x;
      uvs[offset + 5] = uv[2].y;

      // Second triangle
      uvs[offset + 6] = uv[0].x;
      uvs[offset + 7] = uv[0].y;
      uvs[offset + 8] = uv[2].x;
      uvs[offset + 9] = uv[2].y;
      uvs[offset + 10] = uv[3].x;
      uvs[offset + 11] = uv[3].y;
    }

    // Mark UVs as needing an update
    geometry.attributes.uv.needsUpdate = true;

    // Create the cube mesh and add it to the scene
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