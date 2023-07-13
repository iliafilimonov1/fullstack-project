# Fullstack project

## Install

### Backend

- Install Node.js
  - Recomended version - 14.8 LTS
  - From [website](https://nodejs.org/en/)
  - From [nvm](https://github.com/nvm-sh/nvm) (recomended)
- Install dependencies
  ```bash
  cd backend
  npm install
  ```
- Run server
  ```bash
  npm run start
  ```

### Frontend

- Install Node.js
  - Recomended version - 14.8 LTS
  - From [website](https://nodejs.org/en/)
  - From [nvm](https://github.com/nvm-sh/nvm) (recomended)
- Install dependencies
  ```bash
  cd frontend
  npm install
  ```
- Run server
  ```bash
  npm run dev
  ```

  ## Run in Docker

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

Docker commands are in `Makefile`

```sh
# Run docker-compose
make up
# Rebuild docker-compose
make rebuild
# Down docker-compose
make down
```