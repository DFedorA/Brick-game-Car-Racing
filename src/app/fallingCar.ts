export class fallingCar {
  private y: any;
  private x: any;
  private flag: any;
  public speed = 1;

  constructor(x, y, private ctx: CanvasRenderingContext2D, flag) {
    this.x = x;
    this.y = y;
    this.flag = flag;
  }

  draw(nCol, nRow, boxSize) {
    if (this.flag === true) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    this.ctx.beginPath();
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "black";
    this.ctx.rect(this.x, this.y + boxSize, 1 * boxSize, boxSize); // back
    this.ctx.rect(this.x + boxSize * 2, this.y + boxSize, 1 * boxSize, boxSize); // back
    this.ctx.rect(this.x + boxSize, this.y + boxSize * 2, boxSize, 3 * boxSize); //middle
    this.ctx.rect(this.x, this.y + 3 * boxSize, 3 * boxSize, boxSize); // front
    this.ctx.stroke();
    this.ctx.closePath();

    this.fillIntoBox(boxSize, -15, 5);
    this.fillIntoBox(boxSize, 25, 5);
    this.fillIntoBox(boxSize, 5, 25);
    this.fillIntoBox(boxSize, 5, 45);
    this.fillIntoBox(boxSize, -15, 45);
    this.fillIntoBox(boxSize, 25, 45);
    this.fillIntoBox(boxSize, 5, 65);


  }

  fillIntoBox(boxSize, itemX, itemY) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x + boxSize + itemX, this.y + boxSize + itemY, boxSize / 2, boxSize / 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  get speedCar() {
    return this.speed;
  }

  set speedCar(value) {
    this.speed = value;
  }

  update(nCol, nRow, boxSize, gameOver) {
    if (!gameOver) {
      this.y += boxSize * this.speed;
    }
    if (this.y > this.ctx.canvas.height + boxSize) {
      if (Math.random() < 0.33) {
        this.x = 0;
      } else if (Math.random() > 0.66) {
        this.x = 3 * boxSize;
      } else {
        this.x = 6 * boxSize;
      }
      this.y = 0;
    }
    this.draw(nCol, nRow, boxSize);

  }
}
