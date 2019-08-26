class SinusScroll {
  protected static readonly SPEED:number = 2;
  protected static readonly CHR_HORIZ_PADDING:number = 2;
  protected static readonly MARGIN_TOP_BOTTOM:number = 40;

  protected charset:Charset;
  protected buffer: ImageData;
  protected width: number;
  protected height: number;
  protected text:string;

  protected offsetX:number;
  protected sinusBumps:number;
  protected actualCharIdx:number;
  protected sinusPositions: Point2D[];

  constructor(w: number, h: number, text:string, charset:Charset) {
    this.width = w;
    this.height = h;
    this.charset = charset;
    this.text = text;

    this.sinusBumps = 4;
    this.actualCharIdx = 0;
    this.generateSinus();
  }

  /**
   * Generate the sinus curve positions into the sinusPositions array
   */
  protected generateSinus() {
    this.sinusPositions = [];
    let i:number = 0;
    let x:number = 0;
    let b:number = (this.sinusBumps * Math.PI) / this.width;
    let a:number = 0;
    while (a < (this.sinusBumps * Math.PI)) {
      let y:number = Math.round(Math.sin(a) * ((this.height - SinusScroll.MARGIN_TOP_BOTTOM) / 2));
      this.sinusPositions[i] = new Point2D(x, Math.round(y + this.height / 2));
      a+=b;
      x++;
      i++;
    }
    this.offsetX = this.sinusPositions.length - 1;
  }

  clearBuffer() {
    this.buffer = new ImageData(this.width, this.height);
  }

  animate() {
    this.clearBuffer();
    let wasDraw:boolean = false;
    let offset:number = this.offsetX;
    let hcw = Math.round(Charset.CHAR_WIDTH / 2);
    let hch = Math.round(Charset.CHAR_HEIGHT / 2);

    for (let i=0; i<this.text.length; i++) {
      let chr:string = this.text[i];
      if (offset < 0) {
        offset+=Charset.CHAR_WIDTH;
        continue;
      }

      let pos:Point2D = this.sinusPositions[offset];
      this.charset.drawTo(this.buffer, chr, pos.x - hcw, pos.y - hch);
      wasDraw = true;

      offset+=Charset.CHAR_WIDTH;
      if (offset>this.width) break;
    }

    this.offsetX-=SinusScroll.SPEED;

    if (!wasDraw) {
      // start from the beginning if no chars was drawn
      this.offsetX = this.sinusPositions.length - 1;
    }
  }

  paint(screen: CanvasRenderingContext2D) {
    screen.putImageData(this.buffer, 0, 0);
  }
}