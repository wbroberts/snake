export class Apple {
  public static addApple(array: Array<any>): number[] {
    const col: number = Math.floor(Math.random() * 20);
    const row: number = Math.floor(Math.random() * 20);
    const apple = [col, row];

    if (array[apple[0]][apple[1]] === 1) {
      console.log('apple hit snake');
      return this.addApple(array);
    } else if ((col || row) >= 20) {
      return this.addApple(array);
    }

    array[apple[0]][apple[1]] = 2;
    return apple;
  }
}
