import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the version of OpenAPI
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'API documentation for Node.js application using Express, MongoDB, and Azure AD SSO',
    },
    servers: [
      {
        url: 'http://localhost:5000', // URL of the API
        description: 'Local Machine Server'
      },
      {
        url: 'https://tprm-api.dev.empliance.in', // URL of the API
        description: 'Dev Machine Server'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ]
  },
  apis: ['./routes/*.js', './routes/swaggerRoutes.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Serve Swagger UI
};

export default setupSwagger;
