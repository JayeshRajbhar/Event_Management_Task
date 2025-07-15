# Event Management Task API

Here I have build a RESTful API for managing events and user registrations built with Node.js, Express, and PostgreSQL.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JayeshRajbhar/Event_Management_Task.git
cd event-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_URL=your_database_host
PORT=5000
```

4. Start the server:
```bash
node app.js
```

The API will be available at `http://localhost:5000`

## API Description

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Users
- `POST /users` - Create a new user

#### Events
- `POST /events` - Create a new event
- `GET /events/:id` - Get event details with registered users
- `POST /events/:id/register` - Register user for an event
- `DELETE /events/:id/register` - Cancel user registration
- `GET /events/upcoming/list` - List all upcoming events
- `GET /events/:id/stats` - Get event statistics

## Example Requests/Responses

### Create User
**Request:**
```http
POST /api/users
Content-Type: application/json

{
  "name": "Ankush",
  "email": "Ankush@example.com"
}
```

**Response:**
```json
{
  "id": "XYZ",
  "name": "Ankush",
  "email": "Ankush@example.com",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Create Event
**Request:**
```http
POST /api/events
Content-Type: application/json

{
  "title": "Tech Conference 2025",
  "dateTime": "2025-12-15T09:00:00Z",
  "location": "Mumbai",
  "capacity": 500
}
```

**Response:**
```json
{
  "eventId": "XYZ"
}
```

### Get Event Details
**Request:**
```http
GET /api/events/<eventId>
```

**Response:**
```json
{
  "id": "XYZ",
  "title": "Tech Conference 2025",
  "dateTime": "2025-12-15T09:00:00.000Z",
  "location": "Mumbai",
  "capacity": 500,
  "registrations": [
    {
      "id": "abcd",
      "name": "Ankush",
      "email": "ankush@example.com"
    },
    {
      "id": "XYZ",
      "name": "Ankush1",
      "email": "ankush1@example.com"
    }
  ]
}
```

### Register User for Event
**Request:**
```http
POST /api/events/<eventId>/register
Content-Type: application/json

{
  "userId": "XYZ"
}
```

**Response:**
```json
{
  "message": "Registration successful"
}
```

### Cancel Registration
**Request:**
```http
DELETE /api/events/<eventId>/register
Content-Type: application/json

{
  "userId": "XYZ"
}
```

**Response:**
```json
{
  "message": "Registration cancelled"
}
```

### List Upcoming Events
**Request:**
```http
GET /api/events/upcoming/list
```

**Response:**
```json
[
  {
    "id": "XYZ",
    "title": "Tech Conference 2025",
    "dateTime": "2025-12-15T09:00:00.000Z",
    "location": "Convention Center",
    "capacity": 500
  },
  {
    "id": "abcd",
    "title": "React Workshop",
    "dateTime": "2025-12-20T14:00:00.000Z",
    "location": "Tech Hub",
    "capacity": 50
  }
]
```

### Get Event Statistics
**Request:**
```http
GET /api/events/<eventId>/stats
```

**Response:**
```json
{
  "totalRegistrations": 150,
  "remainingCapacity": 350,
  "capacityUsedPercentage": 30.0
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "error": "Event is full"
}
```

**404 Not Found:**
```json
{
  "error": "Event or User not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

## Business Rules

- Maximum event capacity: 1000
- Users cannot register for past events
- Users cannot register for the same event twice
- Events cannot exceed their capacity limit
- All email addresses must be unique

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Environment:** dotenv
- **Deployment:** Render PostgreSQL
