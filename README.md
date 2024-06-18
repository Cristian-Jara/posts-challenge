# posts-challenge

This repository contains the code for the posts-challenge. The challenge is to create a web application that allows users to create, read, update, and delete posts.

## Author

The posts-challenge is created and maintained by Cristian Jara.

## Configuration

You can find details of configuration on each environment, but in a nutshell, the application requires the following setup:

- Backend:

  1. Install Ruby 3.3.3, Rails 7.1.3.4 and Docker.
  2. Install the project dependencies using `bundle install`.
  3. _(Optional)_ Configure the database data in the `.env` file, by default take the same values of `.env.erb` file. So if you don't modify anything this step is unnecessary.
  4. Run `docker-compose -f docker-compose.dev.yml up -d` to run the PostgreSQL database in docker.
  5. Run the application using `bin/rails server`.

- Frontend:

  1. Install Node.js and npm.
  2. Install the project dependencies using `npm install`.
  3. _(Optional)_ Configure the backend host in the `.env` file, by default it's take http://127.0.0.1:3000.
  4. Run the application using `npm run dev`.

Feel free to reach out if you have any further questions.
