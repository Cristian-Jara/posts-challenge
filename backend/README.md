# README

- Ruby version
  3.3.3

- System dependencies

  - Install Ruby 3.3.3, Rails 7.1.3.4 and Docker.
  - Install the project dependencies using bundle install.

- Configuration

  - To connect to database in PostgreSQL is necessary to run the docker compose with the following command:

    - `docker-compose -f docker-compose.dev.yml up -d`

  - That create a default database. If you want you can use .env.erb configuration file to run this app for testing/development purposes. Only copy and paste that information in your environment configuration file ( .env file ). If you don't modify anything this step is unnecessary.

- How to run the app

  - With the previous steps you just have to run `bin/rails server` and that's it.
