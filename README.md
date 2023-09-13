Image Processing API 🖼️
Welcome to the Image Service! This is an efficient and modern platform built to handle image uploads and deliver resized images on-demand. Leveraging the capabilities of Express and TypeScript, it ensures performance and type safety for the optimum user experience.

Technical Overview 🛠️
Backend Framework: Express
Programming Language: TypeScript
Unit Testing: Done using Jasmine combined with ts-mockito for effective mocking.
End-to-End Testing: Implemented using Jest and supertest for comprehensive API testing.
Prerequisites 📋
Before diving into the setup, please ensure you have the following software installed on your local machine:

Docker
Docker Compose
Getting Started 🚀
Follow these steps to set up and run the Image Service:

Clone the Repository

Start by cloning the code to your local machine using:

bash
Copy code
git clone <repository-url>
Run the Application

Navigate to the root directory of the project and execute:

bash
Copy code
docker-compose up app
Testing 🔍
To ensure the Image Service runs seamlessly, we've incorporated both unit and end-to-end tests.

Unit Tests:

Run the unit tests using the following command:

bash
Copy code
docker-compose up test
End-to-End Tests:

To run the end-to-end tests, use:

bash
Copy code
docker-compose up e2e
Documentation 📚
When the application is running in development mode with default configuration, the comprehensive API documentation is accessible at:
http://localhost:3000/api/v1/docs

