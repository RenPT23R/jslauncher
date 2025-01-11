const express = require('express');
const path = require('path');
const app = express();
const port = 8080; // Changed port to 433

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`JSLauncher listening at http://localhost:${port}`);
});