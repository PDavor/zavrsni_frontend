# Kviz Frontend

This is the frontend part of the application for my bachelor's degree final project.

The purpose of this app is to create resources for students to study and later then check their knowledge with quizzes.

## Dependencies

For the making of this app were used following dependencies:
- React as frontend library
- Axios for making API requests to the backend
- React router dom for navigating SPA pages
- React markdown for content input

## Main features

- Authentification and authorization (4 roles: guest, student, teacher, admin)
- Admin can create courses and give a student teacher role
- Teacher can add resources for the course and create quizzes for his course
- Student can read course material and attend the quiz
- Guest can only read course materials

## To run locally

Clone this repository with `git clone https://github.com/PDavor/zavrsni_frontend`

Navigate in the project folder and install dependencies with `npm install`

Now you can start the project with `npm start`

## Backend code
Backend code for this application can be found here: https://github.com/PDavor/zavrsni_server
The backend was created with Express and MongoDB.

## Application preview

The application is hosted on Heroku and can be found here: https://dashboard.heroku.com/apps/shrouded-reaches-30788
