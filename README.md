# Image Service

This service offers a robust solution for image uploading and retrieval of resized images. Built on the solid foundations of Express and TypeScript, it ensures efficient performance and type-safe code.

## Tech Stack 🚀

- **Core**: Express + TypeScript
- **Unit Testing**: Jasmine + ts-mockito
- **End-to-End Testing**: Jest + supertest

## Prerequisites 📋

Ensure you have the following installed on your local machine:

- Docker
- Docker Compose

## Getting Started 🚦

Follow these steps to get the service up and running:

1. **Clone the repository**

```bash
git clone <repository-url>
```

2. **Run the application**

Navigate to the root directory of the project and execute:

```bash
docker compose up app
```

## Testing 🧪
### Unit Tests

Execute the unit tests by running:

```bash
docker compose up test
```

### End to End Tests

For e2e tests, use the following command:

```bash
docker compose up e2e
```

## Documentation 📖

When running the service in development mode with default configurations, access the API documentation at:

http://localhost:3000/api/v1/docs

