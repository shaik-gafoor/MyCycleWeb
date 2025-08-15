# MyCycleWeb Backend API

A RESTful API for managing cycle information in the MyCycleWeb application.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Start the production server:

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Health Check

- **GET** `/api/health` - Check if the API is running

### Cycles API

#### 1. Get All Cycles

- **GET** `/api/cycles`
- **Response**: Array of cycle objects

#### 2. Create Cycle

- **POST** `/api/cycles`
- **Request Body**:

```json
{
  "imageUrl": "https://drive.google.com/...",
  "title": "Cycle Name",
  "description": "Cycle description here",
  "cost": 1234
}
```

- **Response**: Created cycle object with unique ID

#### 3. Update Cycle

- **PUT** `/api/cycles/:id`
- **Request Body**:

```json
{
  "imageUrl": "https://drive.google.com/...",
  "title": "Updated Cycle Name",
  "description": "Updated cycle description here",
  "cost": 1500
}
```

- **Response**: Updated cycle object

#### 4. Delete Cycle

- **DELETE** `/api/cycles/:id`
- **Response**:

```json
{
  "success": true
}
```

## Project Structure

```
backend/
├── controllers/
│   └── cycleController.js    # Business logic for cycles
├── data/
│   └── cyclesData.js        # In-memory data storage
├── routes/
│   └── cycles.js            # Route definitions
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
├── server.js               # Main server file
└── README.md               # This file
```

## Testing with Postman

1. **Health Check**: GET `http://localhost:5000/api/health`
2. **Get All Cycles**: GET `http://localhost:5000/api/cycles`
3. **Create Cycle**: POST `http://localhost:5000/api/cycles`
4. **Update Cycle**: PUT `http://localhost:5000/api/cycles/{id}`
5. **Delete Cycle**: DELETE `http://localhost:5000/api/cycles/{id}`

## Notes

- Currently using in-memory data storage
- For production, replace with a proper database (MongoDB, PostgreSQL, etc.)
- All endpoints include proper error handling and validation
- CORS is enabled for frontend integration
