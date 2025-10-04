const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Temple API'
  },
  host: 'cse-341-projects-7.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json'; // ✅ stays in project root
const endpointsFiles = ['./routes/index.js', './routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);


