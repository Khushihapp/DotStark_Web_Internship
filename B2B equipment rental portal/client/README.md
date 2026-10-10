# B2B Equipment Rental Portal

## About the Project

This is my B2B Equipment Rental Portal project, made using the MERN stack. It allows users to view equipment, check its details and rental prices, and submit booking requests. It also has an admin page to view bookings and update their status.

## Features

* View equipment with images and rental prices.
* Search equipment by name or category.
* Filter equipment by category.
* View equipment details and specifications.
* Select rental dates and calculate the estimated rental cost.
* Submit equipment booking requests.
* View all bookings on the admin page.
* Update booking status.

## Technologies Used

* React.js
* Node.js
* Express.js
* MongoDB
* Mongoose
* JavaScript
* CSS
* Axios
* React Router

## Project Structure


B2B equipment rental portal/
├── client/
└── server/

The `client` folder contains the frontend code, and the `server` folder contains the backend code.

## How to Run the Project

### 1. Backend Setup

Open a terminal and run:


cd server
npm install


Create a `.env` file inside the server folder and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

node server.js

### 2. Frontend Setup

Open another terminal and run:

cd client
npm install
npm run dev


Open the local URL shown in the terminal, usually `http://localhost:5173`.



## API Endpoints

| Method |        Endpoint            | Description |
| ------ | -------------------------- |------------ |
| GET    | `/api/equipment`           |Get all equipment      |
| GET    | `/api/equipment/:id`       |Get details of one equipment|
| POST   | `/api/bookings`            | Create a booking   |
| GET    | `/api/bookings`            | Get all booking    |
| PATCH  | `/api/bookings/:id/status` | Update booking status  |

## Pages

* **Home Page:** Displays equipment with search and category filters.
* **Equipment Details Page:** Shows equipment specifications and the booking form.
* **Admin Bookings Page:** Displays bookings and allows their status to be updated.

## Testing

I tested the main features, including equipment search, category filters, equipment details, and booking submission. I also checked that bookings are saved in MongoDB and that status changes remain saved after refreshing the page.

## Future Improvements

* Add admin login and authentication.
* Add online payment functionality.


## Conclusion

This project helped me practise building a full-stack web application using React, Node.js, Express.js, and MongoDB. It connects the frontend with backend APIs and stores equipment and booking details in the database.

