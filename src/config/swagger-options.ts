export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Image Resizer API',
      version: '1.0.0',
      description: 'Api to resize images',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}
