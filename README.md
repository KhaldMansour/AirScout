# AirScout API

AirScout is a backend RESTful API built with **NestJS**, connected to a **MySQL** database, and integrated with the **IQAir API** to fetch air quality data. This project uses **TypeORM** for data modeling and migrations, and includes **Swagger** documentation for development and testing. It also supports **unit and integration testing**, and uses **ESLint** for static code analysis.

---

## 📦 Tech Stack

- **Node.js** with NestJS framework  
- **MySQL** (Dockerized)  
- **TypeORM** (with CLI migrations)  
- **Swagger** for API documentation  
- **Jest** for unit and integration tests  
- **ESLint** for static code analysis  
- **Docker + Docker Compose** for development environment  
- **GitHub Actions** for CI/CD pipelines

---

## 🚀 Getting Started

### 1. Clone the Repository

`git clone https://github.com/your-username/air-scout-api.git`  
`cd air-scout-api`

### 2. Environment Setup

add your api-key to `.env` file in the root directory:

 
`IQAIR_API_KEY=your_api_key `  
---

### 3. Run the App with Docker

`docker-compose up --build`

This will:
- Build the NestJS app container  
- Start the MySQL database  
- Run migrations automatically (`npm run migrate`)  
- Start the API server

---

## 🧪 API Documentation

After the app starts, visit:

`http://localhost:3000/api/docs`

This provides Swagger UI for testing and exploring API endpoints.

---


## 🧬 Database Migrations

Migrations are run automatically when the container starts.

To generate a new migration:

```
npm run typeorm:migration:generate -- -n MigrationName
```

To run migrations manually:

```bash
 npm run migrate
 ```

> These scripts assume `typeorm` CLI is correctly configured in your `package.json`.

---

## 🧪 Testing

The project includes both unit and integration tests using **Jest**.

- To run tests:  
```bash 
  npm run test
 ```
---

## 🧹 Code Quality

### Static Code Analysis with ESLint

To lint your code and detect issues:

```bash
 npm run lint
 ```
---

## 🛠️ GitHub Actions (CI/CD)

This project uses **GitHub Actions** to run pipelines for testing and static code analysis.

### Testing Pipeline

A GitHub Actions workflow is set up to automatically run **unit** and **integration tests** on each push to the repository. The workflow will:
- Set up the Node.js environment  
- Install dependencies  
- Run tests with Jest  
- Generate a test coverage report  

### Static Code Analysis Pipeline

The project also includes a GitHub Actions pipeline to automatically run **ESLint** on each push. This helps to ensure that the code adheres to consistent formatting and quality standards. The workflow will:
- Set up Node.js  
- Install dependencies  
- Run ESLint to check for code quality issues

---

