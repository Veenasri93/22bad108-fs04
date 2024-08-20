const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to read and send JSON data
app.get('/data', (req, res) => {
  // Path to the JSON file
  const filePath = path.join(__dirname, 'data.json');
  
  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Handle the error
      return res.status(500).json({ error: 'Failed to read JSON file' });
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      // Send the JSON data as a response
      res.json(jsonData);
    } catch (parseError) {
      // Handle JSON parsing errors
      res.status(500).json({ error: 'Failed to parse JSON data' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
