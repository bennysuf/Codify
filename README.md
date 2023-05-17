# DevHub

- Ruby Version: 2.7.4
- NodeJS Version: 18
- React Version: 18.2
- Postgres Version: Latest

## Local Development

1. Install [docker](https://docker.com) on your system

2. Setup your local `.env` file in the root directory
    ```dotenv
    POSTGRES_DB=postgres
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=secret
    # format of this is `$POSTGRES_USER:$POSTGRES_PASSWORD@db:5432/$POSTGRES_DB
    DATABASE_URL=postgres://postgres:secret@db:5432/postgres
    ```

3. Build the docker images with:
    ```bash
    docker-compose build
    ```

4. Migrate and seed the database
    ```bash
    docker-compose run api rails db:migrate
    docker-compose run api rails db:seed
    ```

5. Turn it on
    ```bash
    docker-compose up
    ```

6. Visit [localhost:4000](http://localhost:4000) for the client and [localhost:3000](http://localhost:3000) for the API
