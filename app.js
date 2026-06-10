const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');



// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// ============ ROUTES ============
//api health check
app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API!");
});
//auth routes
app.use('/api/v1/auth', require('./src/routes/authRoutes'));
//task routes
app.use('/api/v1/tasks', require('./src/routes/taskRoutes'));
//admin routes
app.use('/api/v1/admin', require('./src/routes/adminRoutes'));

module.exports = app;