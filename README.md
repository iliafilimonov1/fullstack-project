# Fullstack project

## Install

### Backend

- Install pnpm globally
  - From [website](https://pnpm.io/installation#using-npm)
  ```bash
  npm install -g pnpm
  ```
- Install Node.js
  - Recomended version - 14.8 LTS
  - From [website](https://nodejs.org/en/)
  - From [nvm](https://github.com/nvm-sh/nvm) (recomended)
- Install dependencies
  ```bash
  cd backend
  pnpm install
  ```
- Run server
  ```bash
  pnpm run start
  ```

### Frontend

- Install pnpm globally
  - From [website](https://pnpm.io/installation#using-npm)
  ```bash
  npm install -g pnpm
  ```
- Install Node.js
  - Recomended version - 14.8 LTS
  - From [website](https://nodejs.org/en/)
  - From [nvm](https://github.com/nvm-sh/nvm) (recomended)
- Install dependencies
  ```bash
  cd frontend
  pnpm install
  ```
- Run server
  ```bash
  pnpm run dev
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