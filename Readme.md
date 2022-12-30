super-mega-snake
================

super-mega-snake is a multiplayer clone of the snake game.

## Requirements

* Any browser with Canvas and WebSockets support
* Node.js (>= 18) with npm or yarn

## Manual Deployment

Create an `.env` file with the following parameter.

```
PORT=80   # specify the server port
TICK=33.3 # specify the server update interval in milliseconds
```

Download libraries with `npm install` and start the server with `npm start`.

## Deployment through Docker

1. Install Docker and Docker Compose.
2. Create an `.env` file as described in 'Manual Deployment'.
3. Start the backend container with `docker-compose up`.
4. For development environments to be able to modify files while the container is running, start the system with `docker-compose -f docker-compose.yml -f docker-compose.development.yml up`. Ensure to run `npm install` locally before starting the development containers. Ensure that the installed modules are compatible with the current Docker platform.

## Credits

Dmitrii Toksaitov <dmitrii@toksaitov.com>
