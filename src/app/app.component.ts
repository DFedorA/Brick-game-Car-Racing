import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit
} from '@angular/core';
import {fallingCar} from "./fallingCar";
import {mainCar} from "./mainCar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEl', {static: true})

  canvasEl: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  @ViewChild('canvasBack', {static: true})
  canvasElBack: ElementRef<HTMLCanvasElement>;
  private ctxBack: CanvasRenderingContext2D;

  boxSize: number = 20;
  nCol: number = 9;
  nRow: number = 20;
  score: number = 0;
  speed: number = 0;
  audio = new Audio();
  playMusic: boolean = true;
  hi_score = +localStorage.getItem('hi-score');
  speedRow: number = 0.3;

  ngOnInit(): void {
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
    this.ctxBack = this.canvasElBack.nativeElement.getContext('2d');
  }

  constructor() {

  }

  ngAfterViewInit() {
    this.ctx.canvas.width = this.nCol * this.boxSize;
    this.ctx.canvas.height = this.nRow * this.boxSize;
    this.ctxBack.canvas.width = this.nCol * this.boxSize;
    this.ctxBack.canvas.height = this.nRow * this.boxSize;
    this.drawRoad()

    let fCar = new fallingCar(0, this.boxSize * (-1), this.ctx, true);
    let fCar2 = new fallingCar(this.boxSize * 3, this.boxSize * (-10), this.ctx, false);
    let mCar = new mainCar(0, 0, this.ctx);
    let speedCar = setInterval(() => {
      this.speed++;
      fCar.speedCar = this.speed;
      fCar2.speedCar = this.speed;
      if (this.speedRow > 0.1) {
        this.speedRow = this.speedRow - 0.1;
      }
    }, 10000);

    let gameCar = setInterval(() => {
      if (!mCar.gameOver) {
        fCar.update(this.nCol, this.nRow, this.boxSize, mCar.gameOver);
        fCar2.update(this.nCol, this.nRow, this.boxSize, mCar.gameOver);
        mCar.update(this.nCol, this.nRow, this.boxSize, fCar, fCar2);

        this.speed = fCar.speedCar;
        this.score++;
      } else {

        if (this.score > +localStorage.getItem('hi-score')) {
          localStorage.setItem('hi-score', String(this.score))
          this.hi_score = +localStorage.getItem('hi-score')
        }
        this.speedRow = 0;
        clearInterval(gameCar);
        clearInterval(speedCar);
        alert("Game over");
      }

    }, 150);

    window.addEventListener('keydown', (e) => {
      if (e.code == "KeyA") {
        mCar.isLeft = true;
      } else if (e.code == "KeyD") {
        mCar.isRight = true;
      }
    });

  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  playAndStopMusic() {
    if (this.playMusic) {
      this.audio.src = "../assets/Tetris.mp3";
      this.audio.load();
      this.audio.play();
      this.playMusic = false;
    } else {
      this.playMusic = true;
      this.audio.pause();
    }
  }

  drawRoad() {
    for (let i = 0; i < this.nCol * this.boxSize; i += this.boxSize) {
      for (let j = 0; j < this.nRow * this.boxSize; j += this.boxSize) {
        this.ctxBack.beginPath();
        this.ctxBack.strokeStyle = "#C0C0C0";
        this.ctxBack.lineWidth = 3;
        this.ctxBack.rect(i, j, this.boxSize, this.boxSize);
        this.ctxBack.fillStyle = "#C0C0C0";
        this.ctxBack.fillRect(i + 5, j + 5, this.boxSize / 2, this.boxSize / 2);
        this.ctxBack.stroke();
        this.ctxBack.closePath();
      }
    }
  }
}

