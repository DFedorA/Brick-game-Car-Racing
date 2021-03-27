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

  boxSize: number = 20;
  nCol: number = 9;
  nRow: number = 20;
  score: number = 0;
  speed: number = 0;
  audio = new Audio();
  playMusic: boolean = true;
  hi_score = +localStorage.getItem('hi-score');
  speedRow: number = 0.6;

  ngOnInit(): void {
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
  }

  constructor() {

  }

  ngAfterViewInit() {
    this.ctx.canvas.width = this.nCol * this.boxSize;
    this.ctx.canvas.height = this.nRow * this.boxSize;
    let fCar = new fallingCar(0, 0, this.ctx);
    let mCar = new mainCar(0, 0, this.ctx);
    let speedCar = setInterval(() => {
      this.speed++;
      fCar.speedCar = this.speed;
      this.speedRow = this.speedRow - 0.1
    }, 8000);

    let gameCar = setInterval(() => {
      if (!mCar.gameOver) {
        fCar.update(this.nCol, this.nRow, this.boxSize, mCar.gameOver);
        mCar.update(this.nCol, this.nRow, this.boxSize, fCar);
        this.speed = fCar.speedCar;
        this.score++;
      } else {

        if (this.score > +localStorage.getItem('hi-score')) {
          localStorage.setItem('hi-score', String(this.score))
          this.hi_score = +localStorage.getItem('hi-score')
        }
        this.playMusic = true;
        clearInterval(gameCar);
        clearInterval(speedCar);
        alert("Game over");
      }

    }, 10);

    window.addEventListener('keydown', (e) => {
      if (e.code == "KeyA") {
        mCar.isLeft = true;
      } else if (e.code == "KeyD") {
        mCar.isRight = true;
      }
    });

  }

  playAndStopMusic() {
    if (this.playMusic === true) {
      this.audio.src = "../assets/Tetris.mp3";
      this.audio.load();
      this.audio.play();
      this.playMusic = false;
    } else {
      this.playMusic = true;
      this.audio.pause();
    }

  }

}

