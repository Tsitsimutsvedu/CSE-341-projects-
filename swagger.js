const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts'
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsDoc(options);
module.exports = { swaggerUi, specs };
