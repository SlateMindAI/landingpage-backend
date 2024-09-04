const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const waitingListRoutes = require('./routes/waitingListRoutes');
const cors = require('cors');



dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://www.slatemindai.com/', // Allows only this origin --> https://slatemind-frontend.onrender.com
}));

app.use('/api', waitingListRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
