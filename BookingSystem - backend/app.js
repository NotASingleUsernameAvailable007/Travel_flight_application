const express = require('express');
const cors = require('cors');
const app = express();
const travelRoutes = require('./routes/travel'); // Import the travel routes

app.use(cors());

app.use(express.json());

// Use the travel routes
app.use('/api/travel', travelRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
