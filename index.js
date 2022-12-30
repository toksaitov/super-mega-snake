import http from 'http';
import express from 'express';
import { Server as SocketIO } from 'socket.io';
import dotenv from 'dotenv';

import Field from './public/models/Field.js';
import Apple from './public/models/Apple.js';
import Snakes from './public/models/Snakes.js';

dotenv.config();

const port = process.env.PORT || 8080;
const tick = process.env.TICK || 33.3;

const field = new Field();
const snakes = new Snakes(field);
let apple = new Apple(field, snakes.snakeList);

const expressServer = express();
const httpServer = http.createServer(expressServer);
const ioServer = new SocketIO(httpServer);

expressServer.use(express.static('public'));

ioServer.on('connection', socket => {
  console.log(`A new player with id '${socket.id}' has connected.`);

  socket.on('spawn', () => {
    console.log(`A new player with id '${socket.id}' has issued a spawn command.`);

    const snake = snakes.spawnSnake(socket.id);
    if (!snake) {
      console.log(`Can't spawn a snake for the player with id '${socket.id}'. The room is full.`);

      socket.disconnect();
      return;
    }

    socket.on('command', key => {
      switch (key) {
        case 'w': snake.turnUp();    break;
        case 'a': snake.turnLeft();  break;
        case 's': snake.turnDown();  break;
        case 'd': snake.turnRight(); break;
        default: console.log(`An unknown command '${key}' was received.`);
      }
      console.log(`The player with id '${socket.id}' has issued a '${key}' command.`);
    });

    socket.on('disconnect', reason => {
      console.log(`The player with id '${socket.id}' has diconnected.\nReason ${reason}.`);

      snake.dead = true;
    });
  });
});

httpServer.listen(port, () => {
  console.log(`The super-mega-snake server is listening on port ${port}.`);

  setInterval(() => {
    snakes.move(apple, () => {
      apple = new Apple(field, snakes.snakeList);
    });

    ioServer.emit('update', [field.serialize(), apple.serialize(), snakes.serialize()]);
  }, tick);
});
