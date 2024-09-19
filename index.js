const express = require('express');
require('dotenv').config();
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8000;

const dbConnect = require('./config/dbConnect');

const providerRoutes = require('./routes/providerRoutes');



app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/", providerRoutes);



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