const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to launch Minecraft
app.get('/launch', (req, res) => {
  // Path to your Minecraft jar file
  const minecraftPath = 'path/to/minecraft.jar';

  exec(`java -jar ${minecraftPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error launching Minecraft: ${error.message}`);
      return res.status(500).send('Error launching Minecraft');
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send('Error launching Minecraft');
    }
    console.log(`Minecraft output: ${stdout}`);
    res.send('Minecraft launched successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`JSLauncher backend listening at http://localhost:${port}`);
});