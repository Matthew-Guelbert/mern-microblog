# MERN Microblog

A microblogging social app built with the MERN stack (MongoDB, Express, React, Node.js).

---

## Project Structure

- **client/** — React frontend application  
- **server/** — Express backend API with MongoDB connection  

This project follows a simplified MVC pattern on the backend for maintainability.

---

## Features

- User authentication (Sign up / Log in)  
- Create, read, update, delete posts  
- Explore posts by tags  
- User profiles with bio, followers, and posts  
- Responsive UI with Tailwind CSS  
- Placeholder for future features like notifications and roles  

---

## Getting Started

### Prerequisites

- Node.js and npm installed  
- MongoDB cluster (Atlas or local)  
- [Optional] Postman or similar for API testing  

### Installation and Running

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/mern-microblog.git
    cd mern-microblog
    ```

2. Create `.env` files in both **server** and **client** folders (if needed) and add your environment variables, e.g.:

    ```env
    MONGO_URI=your_mongo_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret
    ```

3. Install dependencies for server and client:

    ```bash
    # Server dependencies
    cd server
    npm install

    # Client dependencies
    cd ../client
    npm install
    ```

4. Run backend and frontend servers in separate terminal windows:

    ```bash
    # Start the backend server
    cd ../server
    npm run dev
    ```

    ```bash
    # Start the frontend React app
    cd ../client
    npm start
    ```

---

## Next Steps / TODO

- Implement user authentication with JWT
- Implement OAuth to allow third party logins
- Connect frontend to backend APIs
- Add real CRUD operations for posts and users
- Enhance user profile pages
- Notifications and role-based access control
- Email verification and password reset
- Explore Socket.IO to implement real-time chatting
- Explore background jobs and queues
- Deployment!

---

## Contact 

Developed by Matthew Guelbert <br>
Email: contact.mguelbert@gmail.com <br>
Github: https://github.com/Matthew-Guelbert

