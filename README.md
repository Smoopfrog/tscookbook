# TSCookbook

Welcome to Tscookbook repository! This project is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. The app allows users to view, manage, and save recipes.

## Now Live

https://www.flavourfulplates.ca/

## Features

- **User Authentication**: Users can sign up, log in, and log out securely. Sessions are managed using Express session cookies.

- **Recipe Display**: Browse through a collection of delicious recipes with images, descriptions, and ingredients.

- **Tags and Filters**: Easily find recipes using applying filters based on custom tags for cuisine, dietary preferences, and more.

- **CRUD Operations**: Admin users can perform CRUD (Create, Read, Update, Delete) operations on recipes to keep the collection up to date.

## Tech Stack

- **Frontend**: The frontend is built using React with TypeScript. It provides a user-friendly interface to interact with the recipes.

- **Backend**: The backend is powered by Node.js and Express.js, serving as the API gateway for the frontend. It handles user authentication, recipe management, and database interactions.

- **Database**: MongoDB is used to store the recipe data, user profiles, and authentication tokens.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Smoopfrog/tscookbook.git
cd tscookbook
```

2. Install dependencies for both the frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables:

   - Create a `.env` file in the `backend` directory and set your MongoDB connection URI, session secret, and any other necessary variables.

   ```
   MONGO_DB_CONNECTION=your-mongodb-uri
   SESSION_SECRET=your-secret-key
   ```

4. Start the development servers:

```bash
# Start the frontend development server
cd frontend
npm start

# Start the backend development server
cd ../backend
npm start
```

5. Access the web app:

Open your web browser and navigate to `http://localhost:3000` to access the recipe web app.

---

Thank you for checking out my MERN Stack Recipe Web App, Tscookbook! If you have any questions or suggestions, feel free to open an issue or contact us. Happy cooking! 🍳🥘
