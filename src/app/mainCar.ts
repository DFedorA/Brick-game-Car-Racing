export class mainCar {
  private y: any;
  private x: any;
  isLeft: boolean = false;
  isRight: boolean = false;
  gameOverBool: boolean  = false;

  constructor(x, y, private ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;

  }
  draw(nCol, nRow, boxSize) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "black";
    this.ctx.rect(this.x, this.y + 17 * boxSize, 3 * boxSize, boxSize); // front
    this.ctx.rect(this.x + boxSize, this.y + 16 * boxSize, boxSize, 3 * boxSize); //middle
    this.ctx.rect(this.x, this.y + 19 * boxSize, 1 * boxSize, boxSize); // back
    this.ctx.rect(this.x + 2 * boxSize, this.y + 19 * boxSize, 1 * boxSize, boxSize); // back
    this.ctx.stroke();
    this.ctx.closePath();


    this.fillIntoBox(boxSize, -15, 5);
    this.fillIntoBox(boxSize, 25, 5);
    this.fillIntoBox(boxSize, 5, 5);
    this.fillIntoBox(boxSize, 5, 25);
    this.fillIntoBox(boxSize, -15, 45);
    this.fillIntoBox(boxSize, 25, 45);
    this.fillIntoBox(boxSize, 5, -15);
  }

  fillIntoBox(boxSize, itemX, itemY) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x + boxSize + itemX, this.y + 17 * boxSize + itemY, boxSize / 2, boxSize / 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  get gameOver() {
    return this.gameOverBool;
  }


  update(nCol, nRow, boxSize, fCar) {
    if (this.isLeft && this.x > 0 && !this.gameOverBool) {
      this.x -= 3 * boxSize;
      this.isLeft = false;
    }
    if (this.isRight && this.x + 3 * boxSize < this.ctx.canvas.width && !this.gameOverBool) {
      this.x += 3 * boxSize;
      this.isRight = false;
    }
    if (this.x == fCar.x && fCar.y >= 11 * boxSize && fCar.y <= 380) {

      this.gameOverBool = true;
    }
    this.draw(nCol, nRow, boxSize);

  }
}
