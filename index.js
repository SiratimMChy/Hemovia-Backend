const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

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
