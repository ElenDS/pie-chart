import { sportGames } from './data.js';

const canvas = document.querySelector('canvas');
canvas.width = 400;
canvas.height = 400;

const listM = document.createElement('ul');

function drawPieSlice(
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  color
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

const options = {
  canvas: canvas,
  data: sportGames,
  colors: ['#fe7e45', '#472563', '#14e73e', '#021d7f', '#e3e714'],
};

class Diagram {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = options.canvas.getContext('2d');
    this.colors = options.colors;
  }

  draw() {
    let totValue = Object.values(this.options.data).reduce(
      (sum, value) => sum + value
    );
    let initColor = 0;
    let initAngel = 0;
    Object.entries(this.options.data).forEach(([key, value]) => {
      let sliceAngel = (2 * Math.PI * value) / totValue;
      let listItem = document.createElement('li');
      let mark = document.createElement('span');
      mark.innerHTML = '&#9679;';
      mark.style.color = this.colors[initColor];
      listItem.append(mark, key);
      listM.appendChild(listItem);

      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        initAngel,
        initAngel + sliceAngel,
        this.colors[initColor]
      );

      initAngel += sliceAngel;
      initColor === 4 ? initColor = 0 : initColor++;
    });
  }
}

let myD = new Diagram(options);

myD.draw();

const marks = document.createElement('div');
const container = document.querySelector('.container');
marks.classList.add('marks');
marks.appendChild(listM);
container.appendChild(marks);
