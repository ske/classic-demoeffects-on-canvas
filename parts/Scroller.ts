class Scroller {
  protected speed:number = 4;
  protected text:string;
  protected yPosition:number;
  protected charset:Charset;
  protected width:number;
  protected xPosition:number;
  protected tmpBuffer:ImageData;
  protected charHeight:number;
  protected charWidth:number;

  constructor(text:string, width:number, yPosition:number, charset:Charset) {
    this.text = text;
    this.yPosition = yPosition;
    this.charset = charset;
    this.width = width;
    let char:ImageData = this.charset.get("A");
    this.charHeight = char.height;
    this.charWidth = char.width;

    this.reset();
  }

  protected reset() {
    this.xPosition = this.width;
  }

  animate() {
    this.xPosition-=this.speed;
    this.tmpBuffer = new ImageData(this.width, this.charHeight);
    ClearBuffer(this.tmpBuffer, new Color(255,255,255,64));
    let x:number = this.xPosition;
    let wasDraw:boolean = false;
    for (let i:number = 0; i<this.text.length; i++) {
      if (x>=-this.charWidth && x<this.width) {
        this.charset.drawTo(this.tmpBuffer, this.text[i], x, 0);
        wasDraw = true;
      }
      x=x+this.charWidth;
    }
    if (!wasDraw) this.reset(); // we run out of text to render so we reset and restart from beginning
  }

  paint(buffer:CanvasRenderingContext2D) {
    let c:HTMLCanvasElement = document.createElement("canvas");
    c.width = this.tmpBuffer.width;
    c.height = this.tmpBuffer.height;
    c.getContext("2d").putImageData(this.tmpBuffer, 0, 0);
    buffer.drawImage(c, 0, this.yPosition);
  }
}
