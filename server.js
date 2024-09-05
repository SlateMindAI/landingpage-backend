const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const waitingListRoutes = require('./routes/waitingListRoutes');
const cors = require('cors');



dotenv.config();

connectDB();

const app = express();
// Middleware to handle JSON body
app.use(express.json());  // This parses incoming JSON requests

app.use(cors({
    origin: 'https://slatemindai.com',  // No trailing slash
    credentials: true,  // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Handle preflight requests for all routes
app.options('*', cors());

app.use('/api', waitingListRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
