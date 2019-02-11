import { GameState } from './game/game-state/game-state';
import { Controller } from './controller/controller';
import { Canvas, Grid, Snake, Apple } from './game';
import { Storage } from './storage';
import { blue, green, purple, addThemes, Theme } from './themes';
import { hideTouchButtons, showTouchButtons, touchControls } from './dom';

const storage = new Storage('__snake_game');
const c = new Canvas(blue.dark);
const ctx = c.ctx;

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
  c.render();
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

const setTheme = ({ ...args }) => {
  const { dark, light } = args;

  storage.remove('theme').then(() => storage.setItem('theme', args));

  grid.colors = args;
  c.background = dark;
  document.body.style.background = light;
  menu.style.background = light;
  score.style.color = dark;
  startBtn.style.background = dark;

  c.render();
};

const readyStorage = () => {
  if (storage.isReady) {
    menu.className = 'menu slide-in';
    storage.getItem('snakeHighScore').then(score => {
      updateHighScore(score);
    });
  } else {
    setTimeout(() => readyStorage(), 300);
  }
};

window.onload = () => {
  storage.setup();
  c.resize();
  grid.updateWidth(c.canvas);

  if (window.innerWidth > 600) hideTouchButtons();

  document.body.appendChild(c.canvas);

  score = document.querySelector('.score');
  score.innerHTML = state.score.toString();

  menu = document.querySelector('.menu');
  readyStorage();

  highScore = document.querySelector('span');

  settings = document.querySelector('.settings');
  addThemes(settings, setTheme, blue, green, purple);

  startBtn = document.querySelector('button');
  startBtn.addEventListener('click', () => startGame());

  window.addEventListener('resize', () => {
    c.resize();
    grid.updateWidth(c.canvas);

    window.innerWidth <= 600 ? showTouchButtons() : hideTouchButtons();
  });

  touchControls(controller, 'up');
  touchControls(controller, 'down');
  touchControls(controller, 'right');
  touchControls(controller, 'left');

  getTheme();
  c.render();

  loop = gameLoop;
};
