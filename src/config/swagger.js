const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'Taskify API',
            version: '1.0.0',
            description: 'API documentation for Task Manager application',
        },
        servers:[
            {
                url: 'https://taskify-backend-984v.onrender.com',
                description: 'Production server'
            },

            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
         }]
    },
    apis: ['./src/routes/*.js'], // This is where it reads your route files for documentation
};


const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;