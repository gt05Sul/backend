const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API - Geração Tech',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerToken: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do usuário',
            },
            email: {
              type: 'string',
              description: 'Email do usuário',
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
            },
          },
          required: ['name', 'email', 'password'],
        },
        Address: {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              description: 'ID do usuário',
            },
            street: {
              type: 'string',
              description: 'Rua do endereço',
            },
            city: {
              type: 'string',
              description: 'Cidade do endereço',
            },
            state: {
              type: 'string',
              description: 'Estado do endereço',
            },
          },
          required: ['userId', 'street', 'city', 'state'],
        },
      },
    },
    security: [
      {
        bearerToken: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;