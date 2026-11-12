const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Database connection middleware for serverless
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Failed to connect to database:', error);
        res.status(500).send({ message: 'Database connection failed' });
    }
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const centerRoutes = require('./routes/centerRoutes');

// Use routes
app.use(userRoutes);
app.use(requestRoutes);
app.use(paymentRoutes);
app.use(centerRoutes);

app.get('/', (req, res) => {
    res.send('Blood Donation Backend is running');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;
