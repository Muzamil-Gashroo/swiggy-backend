const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())
app.use(express.static("public"));

const users = [
  { phone: "1234567890",  },
  { phone: "7889477183",  },
];

// Endpoint to get data from category.json
app.get('/categories', (req, res) => {
    // Path to category.json file
    const filePath = path.join(__dirname, 'data/category.json');

    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Parse JSON data
        try {
            const categories = JSON.parse(data);
            res.json(categories);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});
app.get('/top-restaurant-chains', (req, res) => {
    // Path to restaurantChains.json file
    const filePath = path.join(__dirname, 'data/restaurantChains.json');

    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Parse JSON data
        try {
            const restaurantChains = JSON.parse(data);
            res.json(restaurantChains);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

// POST /api/login
  app.post("/api/login", (req, res) => {
  const { phone, password } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone number is required" });
  }

  // Check user (in real app, check DB)
  const user = users.find(u => u.phone === phone && (!password || u.password === password));

  if (user) {
    return res.json({ success: true,  message: " Musaib, Login Successfull. Your server is running fine. " ,  });
  } else {
    return res.json({ success: false, message: "Invalid credentials" });
  }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
