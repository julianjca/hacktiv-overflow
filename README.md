# Hacktiv Overflow
Client Link : https://hacktiv-overflow-fe655.firebaseapp.com/
Server Link : https://rama.minimalistdeveloper.xyz

## Simple stack overflow clone site with express and vue js

This is a project for Hacktiv 8 Coding Bootcamp

## REST API

List of routes

| Route                     | HTTP   | Description              |
| ------------------------- | ------ | ------------------------ |
| `/users/login`            | POST   | Login                    |
| `/users/register`         | POST   | Register                 |
| `/users/auth`             | GET    | User Authentication      |
| `/users`                  | GET    | Get All Users            |
| `/users/:id`              | PUT    | Delete User By ID        |
| `/users/:id`              | DELETE | Update User by ID        |
| `/users/facebook`         | POST   | User Login With Facebook |
| `/questions`              | POST   | Create Question          |
| `/questions/:id`          | PUT    | Update Question By ID    |
| `/questions`              | GET    | Get all Question         |
| `/questions/:id`          | DELETE | Delete Question By ID    |
| `/questions/:id`          | GET    | Get Question By ID       |
| `/questions/upvote/:id`   | PUT    | Upvote Question By ID    |
| `/questions/downvote/:id` | PUT    | Downvote Question By ID  |
| `/comments`               | POST   | Create comment           |
| `/comments/:id`           | PUT    | Update comment By ID     |
| `/comments`               | GET    | Get all comment          |
| `/comments/:id`           | DELETE | Delete comment By ID     |
| `/comments/:id`           | GET    | Get Comment By ID        |
| `/comments/upvote/:id`    | PUT    | Upvote Commemnt By ID    |
| `/comments/downvote/:id`  | PUT    | Downvote Comment By ID   |

## Usage

With only npm:

```
cd server
npm install
nodemon app.js

cd client
npm install
yarn serve
```

Access from localhost http://localhost:3000 for API/server side and http://localhost:8080 for client side
