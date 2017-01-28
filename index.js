class SketchBook {
  constructor() {
    this.ctx = {};
    this.ctx.strokeStyle = null;
    this.lastX = null;
    this.lastY = null;
    this.isDrawing = false;
    this.draw = this.draw.bind(this);
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

    // drawing event listeners
    document.addEventListener('mouseout', () => this.isDrawing = false, true);
    document.addEventListener('mousedown', () => this.isDrawing = true, true);
    document.addEventListener('mouseup', () => this.isDrawing = false, true);
    document.addEventListener('mousemove', this.draw, true);
    return this.ctx;
  }

  draw(e) {
    if (!this.isDrawing) {
      [this.lastX, this.lastY] = [e.x, e.y];
      return;
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
