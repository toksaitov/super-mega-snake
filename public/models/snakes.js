import Snake from "./snake.js";

export default class Snakes {
    constructor(field) {
        this._snakes = {};

        const width = field.width;
        const height = field.height;
        this._spawnPoints = [
            { 'x': 0,         'y': 0,          'dx':  1, 'dy': 0, 'name': 'Snake 1', 'color': 'red'    },
            { 'x': width - 1, 'y': 0,          'dx': -1, 'dy': 0, 'name': 'Snake 2', 'color': 'green'  },
            { 'x': width - 1, 'y': height - 1, 'dx': -1, 'dy': 0, 'name': 'Snake 3', 'color': 'blue'   },
            { 'x': 0,         'y': height - 1, 'dx':  1, 'dy': 0, 'name': 'Snake 4', 'color': 'yellow' }
        ];

        this._field = field;
    }

    get snakeList() {
        return Object.values(this._snakes);
    }

    spawnSnake(id) {
        const spawnPoint = this._spawnPoints.shift();
        if (!spawnPoint)  {
            return null;
        }

        return this._snakes[id] = new Snake(spawnPoint, () => {
            this._spawnPoints.unshift(spawnPoint);
        });
    }

    move(apple, onHaveEatenApple) {
        for (const snake of this.snakeList) {
            snake.move(this._field, apple, this.snakeList, onHaveEatenApple);
        }
    }

    serialize() {
        const serializedSnakes = {};
        for (const [id, snake] of Object.entries(this._snakes)) {
            serializedSnakes[id] = snake.serialize();
        }

        return serializedSnakes;
    }
}
