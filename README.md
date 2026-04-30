A simple Node.js Express API for generating and storing profile intelligence based on a given name. This service enriches a name with gender, age, and nationality predictions using public APIs and persists results in MongoDB.

Features

- Create a profile from a name using external APIs
- Fetch all stored profiles
- Retrieve a profile by ID
- Delete a profile by ID
- Supports optional filtering by `gender`, `country_id`, and `age_group`
- Includes CORS headers for cross-origin requests

Technology Stack

- Node.js
- Express
- MongoDB / Mongoose
- Axios
- dotenv
- UUID v7



Prerequisites

- Node.js 18+ installed
- MongoDB instance running or MongoDB Atlas connection URL

Installation

1. Clone or copy the project into a local folder.
2. From the project root, install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the following variable:

```env
MONGO_URI=<your-mongodb-connection-string>
```

Run the server

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

The API will listen on port `8080` by default, or the value set in `PORT`.

API Endpoints

Health check

- `GET /`
- Response: `{ status: "ok", message: "Profile Intelligence API is running" }`

Create a profile

- `POST /api/profiles`
- Body JSON:

```json
{
  "name": "Jesutofunmi"
}
```

- Success response: `201 Created`
- Stored data includes: `id`, `name`, `gender`, `gender_probability`, `sample_size`, `age`, `age_group`, `country_id`, `country_probability`, `created_at`

Get a profile by ID

- `GET /api/profiles/:id`
- Example: `/api/profiles/646f...`

List all profiles

- `GET /api/profiles`
- Optional query parameters:
  - `gender`
  - `country_id`
  - `age_group`

Delete a profile

- `DELETE /api/profiles/:id`

Notes

- The service uses external APIs: `genderize.io`, `agify.io`, and `nationalize.io`
- Duplicate names are rejected and return an existing profile reference
- Profiles are persisted in MongoDB using a custom string ID

Project Structure

- `index.js` — application entry point
- `config/db.js` — MongoDB connection logic
- `router/user.routes.js` — Express route definitions
- `controller/user.controller.js` — request handlers and business logic
- `model/user.model.js` — Mongoose profile model
- `middleware/user.middleware.js` — CORS middleware

Scripts

- `npm start` — run the server
- `npm run dev` — run the server with `nodemon`