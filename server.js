const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

// Connect to MongoDB
connectDB();

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());

// ============ ROUTES ============
//api health check
app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API!");
});
//auth routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
//task routes
app.use('/api/v1/tasks', require('./routes/taskRoutes'));
//admin routes
app.use('/api/v1/admin', require('./routes/adminRoutes'));











const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});