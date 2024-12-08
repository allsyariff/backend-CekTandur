## Authentication
### POST `/api/auth/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
- **Response**: 
- Success (201 Created)
  ```json
  {
    "status": 201,
    "message": "User registered successfully",
    "data": {
    "email": "newuser@example.com"
    }
  }

- Error (400 Bad Request)
  ```json
  {
    "status": 400,
    "message": "Invalid input",
    "error": {
    "details": "Email and password are required."
    }
  }

- Error (500 Internal Server Error)
  ```json
  {
    "status": 500,
  "message": "Internal server error",
  "error": {
    "details": "Error message here"
    }
  }

### POST `/api/auth/login`
- **Description**: Logs in a user and provides an authentication token.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
- **Response**: Returns a token for user authentication.

## User Management
### GET `/api/users/:userId`
- **Description**: Fetches information of a specific user.
- **Response**: Returns user data based on userId.

### PUT `/api/users/:userId`
- **Description**: Updates user information.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
- **Response**: Returns updated user data.

### DELETE `/api/users/:userId`
- **Description**: Deletes a user by userId.
- **Response**: Returns confirmation of user deletion.

## Plant Management
### GET `/api/plant`
- **Description**: Fetches a list of all plants.
- **Response**: Returns a list of all plants.

### GET `/api/plant/:className`
- **Description**: Fetches a list of plants based on a specific class.
- **Response**: Returns a list of plants based on the class.
- **Example**: `/api/plant/Class1`

### POST `/api/plant/history`
- **Description**: Logs plant history.
- **Request Body**:
  ```json
  {
    "userId": "string",
    "className": "string",
    "plantName": "string",
    "analysisResult": "string",
    "confidence": "number"
  }
- **Response**:
- Success (201 Created):
  ```json
  {
    "status": 201,
    "message": "Plant history saved successfully",
    "data": {
      "userId": "user123",
      "className": "Class1",
      "plantName": "Anggur",
      "analysisResult": "Healthy",
      "confidence": 95,
      "timestamp": "2024-12-08T12:34:56.000Z"
    }
  }
  

- Error (400 Bad Request):
  ```json
  {
    "status": 400,
    "message": "Missing required fields",
    "error": {
      "details": "Please provide userId, className, plantName, analysisResult, and confidence."
    }
  }
### GET `/api/plant/history/:userId`
- **Description**: Fetches a list of plant history for a specific user.
- **Response**: Returns a list of plant history for the user.




