
class SketchBook {
  constructor() {
    this.ctx = {};
    this.ctx.strokeStyle = null;
    this.lastX = null;
    this.lastY = null;
    this.isDrawing = false;
    this.draw = this.draw.bind(this);
    this.eraser = document.querySelector('.eraser');
    this.isErasing = false;
  }

  init() {
    const canvas = document.querySelector('canvas');

    // resize canvass
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // create canvas context
    this.ctx = canvas.getContext('2d');

    // line styles
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    // this.ctx.globalCompositeOperation="destination-out";

    // drawing event listeners
    document.addEventListener('mouseout', () => this.isDrawing = false, true);
    document.addEventListener('mousedown', () => this.isDrawing = true, true);
    document.addEventListener('mouseup', () => this.isDrawing = false, true);
    document.addEventListener('mousemove', this.draw, true);

    this.eraser.addEventListener('click', () => {
      this.isErasing = !this.isErasing
      if (this.isErasing) {
        this.eraser.style['background-color'] = 'red'
      } else {
        this.eraser.style['background-color'] = 'white';
      }
    }, true);

  }

  draw(e) {
    if (this.isErasing) {
      this.ctx.globalCompositeOperation="destination-out";
      this.ctx.lineWidth = 6;
    }
    if (!this.isDrawing) {
      [this.lastX, this.lastY] = [e.x, e.y];
      return;
    }
    if (this.isDrawing && !this.isErasing) {
      this.ctx.globalCompositeOperation="source-over";
      this.ctx.lineWidth = 2;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(e.x, e.y);
    [this.lastX, this.lastY] = [e.x, e.y];
    this.ctx.stroke();
  }
}

const sketchbook = new SketchBook();
sketchbook.init();
