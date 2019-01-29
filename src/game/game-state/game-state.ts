import { Storage } from '../../storage';

export class GameState {
  highScore: number;
  oldHighScore: number;
  isPlaying: boolean = true;
  score: number = 0;

  private actualScore: number = 0;
  private points: number = 20;
  private storageKey: string = 'snakeHighScore';

  constructor(public storage: Storage) {
    this.getStoredScore();
  }

  addPoints(el: Element) {
    this.actualScore += this.points;
    this.incrementScore(el);
  }

  gameOver() {
    this.isPlaying = false;
    this.updateHighScore(this.actualScore);
  }

  incrementScore(el: Element): void {
    const interval = setInterval(() => {
      if (this.score < this.actualScore) {
        this.score++;
        this.updateScore(el);
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  reset(el: Element) {
    this.actualScore = 0;
    this.score = 0;
    this.updateScore(el);
  }

  startGame() {
    this.isPlaying = true;
  }

  private getStoredScore() {
    if (this.storage.isReady) {
      this.storage.getItem(this.storageKey).then(score => {
        this.highScore = score;
      });
    } else {
      setTimeout(() => this.getStoredScore(), 500);
    }
  }

  private isHigher(num: number): boolean {
    return num > this.highScore;
  }

  private updateHighScore(num: number): void {
    if (this.isHigher(num)) {
      this.oldHighScore = this.highScore;
      this.highScore = num;
      this.updateStorage(num);
    }
  }

  private updateScore(el: Element): void {
    el.innerHTML = this.score.toString();
  }

  private updateStorage(num: number): void {
    this.storage
      .remove(this.storageKey)
      .then(() => this.storage.setItem(this.storageKey, num));
  }
}
