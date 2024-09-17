// Import required dependencies
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize the express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Middleware to handle JSON requests
app.use(express.json({ extended: false }));

// Enable CORS to allow requests from React Native app
app.use(cors());

// Define your API routes
app.use('/api/auth', require('./routes/auth'));          // Authentication routes (login, register)
// app.use('/api/services', require('./routes/service'));    // Service-related routes

// Set the port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// // // const express = require('express');
// // // const dotenv = require('dotenv');
// // // const connectDB = require('./config/db');
// // // const cors = require('cors');

// // // // Load environment variables
// // // dotenv.config();

// // // // Connect to MongoDB
// // // connectDB();

// // // const app = express();

// // // // Middleware
// // // app.use(cors());
// // // app.use(express.json());

// // // // Routes
// // // app.use('/api/auth', require('./routes/auth'));

// // // // Define the port and start the server
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });

// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const cors = require('cors');

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/service', require('./routes/service'));
// app.use('/api/bookings', require('./routes/booking'));

// // Define the port and start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
