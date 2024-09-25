const express = require('express');
require('dotenv').config();
const serviceRoutes = require('./routes/serviceRoutes');
const providerRoutes = require('./routes/providerRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const dbConnect = require('./config/dbConnect');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/", providerRoutes);
app.use('/', serviceRoutes); // Changed to use '/api/services'

// Database connection and server start
dbConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
        process.exit(1); 
    });