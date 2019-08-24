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
  protected yPosition:number;
  protected sinusBumps:number;
  protected actualCharIdx:number;
  protected sinusPositions: Point2D[];

  constructor(w: number, h: number, text:string, charset:Charset) {
    this.width = w;
    this.height = h;
    this.charset = charset;
    this.text = text;

    this.yPosition = this.height / 2;
    this.sinusBumps = 2;
    this.actualCharIdx = 0;
    this.generateSinus();
  }

  /**
   * Generate the sinus curve positions into the sinusPositions array
   */
  protected generateSinus() {
    this.sinusPositions = [];
    let margin:number = SinusScroll.MARGIN_TOP_BOTTOM;
    let i:number = 0;
    let a:number = 0;
    let x:number = 0;
    let b:number = (this.sinusBumps * Math.PI) / this.width;
    while (a < (this.sinusBumps * Math.PI)) {
      let y:number = Math.round(Math.sin(a) * ((this.height - margin) / 2));
      this.sinusPositions[i] = new Point2D(x, y + this.height / 2);
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
    let o:number = this.offsetX;

    for (let i=0; i<this.text.length; i++) {
      let chr:string = this.text[i];
      if (o > 0 && o < this.width) {
        let pos:Point2D = this.sinusPositions[o];
        this.charset.drawTo(this.buffer, chr, pos.x - Charset.CHAR_WIDTH / 2, pos.y - Charset.CHAR_HEIGHT / 2);
        wasDraw = true;
      }
      o+=Charset.CHAR_WIDTH;
    }
    this.offsetX-=SinusScroll.SPEED;
    if (!wasDraw) {
      this.offsetX = this.sinusPositions.length - 1;
    }
  }

  paint(screen: CanvasRenderingContext2D) {
    screen.putImageData(this.buffer, 0, 0);
  }
}