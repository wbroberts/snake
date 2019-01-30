import { GameState } from './game/game-state/game-state';
import { Controller } from './controller/controller';
import { Canvas, Grid, Snake, Apple } from './game';
import { Storage } from './storage';
import { blue, green, purple, addThemes, Theme } from './themes';

const storage = new Storage('__snake_game');
const c = new Canvas(blue.dark);

const ctx = c.canvas.getContext('2d');
const controller = new Controller();
const state = new GameState(storage);
const cols = 20;
const maxTimeStep = 4;
const startingTimeStep = 30;
const grid = new Grid(cols, ctx);
const snake = new Snake(grid.size);

let gameTime = 0;
let fps = startingTimeStep;
let timeStep = 1000 / fps;
let apple: number[];
let score: HTMLElement;
let menu: HTMLElement;
let startBtn: HTMLElement;
let settings: HTMLElement;
let highScore: HTMLElement;
let loop;

const draw = () => {
  c.render(ctx);
  grid.render(ctx);
};

const updateTimeStep = fps => {
  if (timeStep >= maxTimeStep) {
    timeStep = 1000 / fps;
  }
};

const updateHighScore = (score: number) => {
  highScore.innerText = score.toString();
};

const gameOver = () => {
  state.gameOver();
  cancelAnimationFrame(loop);
  menu.className = 'menu slide-in';
  updateHighScore(state.highScore);
};

const startGame = () => {
  grid.reset();
  snake.reset();
  state.reset(score);
  apple = null;
  state.startGame();
  menu.className = 'menu slide-out';
  fps = startingTimeStep;
  updateTimeStep(fps);
  gameTime = 0;
  gameLoop();
};

const gameLoop = () => {
  if (!state.isPlaying) {
    return;
  }

  // Update game if enough time has ellapsed
  if (gameTime >= timeStep) {
    snake.move();

    // Make the tail's index the background color
    grid.map[snake.tail[0]][snake.tail[1]] = 0;

    // If any of these fail, GAME OVER!
    try {
      // Check if snake hits itself
      if (
        grid.map[snake.head[0]][snake.head[1]] === 1 ||
        snake.head[1] < 0 ||
        snake.head[1] >= 20
      ) {
        throw Error();
      }

      // Check if snake eats apple
      if (grid.map[snake.head[0]][snake.head[1]] === 2) {
        state.addPoints(score);
        snake.eat();
        apple = null;
        updateTimeStep((fps += 4));
      }

      // Check if snake hits itself
      if (grid.map[snake.head[0]][snake.head[1]] === 1) {
        throw Error();
      }

      // Draw the snake
      for (let i = 0; i < snake.body.length; i++) {
        const col = snake.body[i][0];
        const row = snake.body[i][1];

        grid.map[col][row] = 1;
      }
    } catch (e) {
      gameOver();
    }

    // Add a new apple if it's gone
    if (!apple) {
      apple = Apple.addApple(grid.map);
    }

    gameTime = 0;
  }

  gameTime++;
  snake.setDir(controller);
  draw();
  requestAnimationFrame(gameLoop);
};

const getTheme = () => {
  storage.getItem('theme').then(theme => {
    if (theme) {
      setTheme(theme);
    } else {
      setTheme(green);
    }
  });
};

const resizeCanvas = () => {
  const h = window.innerHeight * 0.85;
  const innerW = window.innerWidth;

  if (h >= innerW) {
    c.canvas.height = innerW * 0.9;
  } else {
    c.canvas.height = window.innerHeight * 0.85;
  }

  c.canvas.width = c.canvas.height;
  ctx.canvas.height = c.canvas.height;
  ctx.canvas.width = c.canvas.width;
  grid.updateWidth(c.canvas);
  c.render(ctx);
};

const setTheme = ({ ...args }) => {
  const { dark, light } = args;

  storage.remove('theme').then(() => storage.setItem('theme', args));

  grid.colors = args;
  c.background = dark;
  document.body.style.background = light;
  menu.style.background = light;
  score.style.color = dark;
  startBtn.style.background = dark;

  c.render(ctx);
};

const storageReady = () => {
  if (storage.isReady) {
    menu.className = 'menu slide-in';
    storage.getItem('snakeHighScore').then(score => {
      updateHighScore(score);
    });
  } else {
    setTimeout(() => storageReady(), 300);
  }
};

window.onload = () => {
  storage.setup();
  resizeCanvas();

  document.body.appendChild(c.canvas);

  score = document.querySelector('.score');
  score.innerHTML = state.score.toString();

  menu = document.querySelector('.menu');
  storageReady();

  highScore = document.querySelector('span');

  settings = document.querySelector('.settings');
  addThemes(settings, setTheme, blue, green, purple);

  startBtn = document.querySelector('button');
  startBtn.addEventListener('click', () => startGame());

  window.addEventListener('resize', resizeCanvas);

  getTheme();
  c.render(ctx);

  loop = gameLoop;
};
