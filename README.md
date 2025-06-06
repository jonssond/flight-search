# Flight Search API

A Node.js/TypeScript backend API for searching flights. This is a **demo project** designed to showcase flight search functionality with read-only operations.

## ⚠️ Important Note

This is a **demonstration project** with limited functionality. The API only supports:
- **GET operations**: Retrieve and search flights
- **Database seeding/unseeding**: Populate or clear the database with mock data

**This project does NOT support:**
- ❌ CREATE new flights
- ❌ UPDATE existing flights  
- ❌ DELETE individual flights (only bulk unseed via script)

## Features

- Flight search and filtering
- TypeScript implementation
- TypeORM for database management
- Docker support for easy database setup
- Database seeding with mock flight data
- CORS enabled for frontend integration

## Prerequisites

Before running this project, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v16 or higher)
- **[npm](https://www.npmjs.com/)** (comes with Node.js)
- **[Docker](https://www.docker.com/)** and **[Docker Compose](https://docs.docker.com/compose/)**

## Full-Stack Setup

This backend API is designed to work with a React frontend. To run the complete application:

### Backend Setup (This Repository)

Follow the [Getting Started](#getting-started) section below.

### Frontend Setup

Clone and run the companion React frontend (follow the instructions of the README.md of flight-search-interface):

```bash
git clone https://github.com/jonssond/flight-search-interface
cd flight-search-interface
```

Make sure to start the backend API first, then the frontend application.

## Getting Started

### 1. Environment Setup

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

# Server Configuration
PORT=
NODE_ENV=
```

### 2. Database Setup

Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

This will start the database in detached mode.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

For development mode:
```bash
npm run dev
```

For production mode:
```bash
npm start
```

### 5. Seed the Database

Populate the database with mock flight data:

```bash
npm run db:seed
```

The server will be running at `http://localhost:3000` (or the port specified in your .env file).

## Available Scripts

### Development Scripts

- **`npm run dev`**: Starts the development server with hot-reload using ts-node-dev
- **`npm start`**: Starts the production server
- **`npm run build`**: Compiles TypeScript to JavaScript
- **`npm test`**: Runs the test suite (currently not configured)

### Database Scripts

- **`npm run db:seed`**: Populates the database with mock flight data
- **`npm run db:unseed`**: Clears all flight data from the database

## Project Structure

```
src/
├── config/
│   └── database/
│       ├── data-source.ts     # TypeORM configuration
│       └── seed/              # Database seeding scripts
├── controller/                # Route controllers
├── entity/                    # TypeORM entities
├── repository/                # Data access layer
├── route/                     # API routes
├── service/                   # Business logic
└── server.ts                  # Application entry point
```

## API Endpoints

The API provides the following endpoints:

- `GET /flights` - Retrieve all flights with optional filtering

*Note: This is a read-only API. Create, Update, and Delete operations are not supported.*

## Database Management

### Seeding Data

The project includes mock flight data for testing purposes. To populate your database:

```bash
npm run db:seed
```

### Clearing Data

To remove all flight data from the database:

```bash
npm run db:unseed
```

## Frontend Integration

This backend API is designed to work with the companion React frontend application available at:
**https://github.com/jonssond/flight-search-interface**

To run the full-stack application:

1. Start this backend API first (`npm run dev`)
2. Clone and run the frontend repository
3. Ensure CORS is properly configured for cross-origin requests

## Docker Support

The project includes Docker Compose configuration for the database. The compose file sets up:

- PostgreSQL database
- Proper networking for the application
- Volume persistence for database data