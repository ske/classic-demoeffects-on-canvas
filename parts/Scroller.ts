class Scroller {
  protected speed:number = 4;
  protected text:string;
  protected yPosition:number;
  protected charset:Charset;
  protected width:number;
  protected xPosition:number;
  protected tmpBuffer:HTMLCanvasElement;
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

    this.tmpBuffer = document.createElement("canvas");
    this.tmpBuffer.width = width;
    this.tmpBuffer.height = this.charHeight;

    this.reset();
  }

  protected reset() {
    this.xPosition = this.width;
  }

  animate() {
    let ctx = this.tmpBuffer.getContext("2d");
    ctx.clearRect(0,0,this.tmpBuffer.width, this.tmpBuffer.height);
    // ctx.fillStyle = "rgba(255,255,255,0.1)";
    // ctx.fillRect(0,0,this.tmpBuffer.width,this.tmpBuffer.height);
    let imgData:ImageData = ctx.getImageData(0,0,this.tmpBuffer.width,this.tmpBuffer.height);

    this.xPosition-=this.speed;
    let x:number = this.xPosition;
    let wasDraw:boolean = false;
    for (let i:number = 0; i<this.text.length; i++) {
      if (x>=-this.charWidth && x<this.width) {
        this.charset.drawTo(imgData, this.text[i], x, 0);
        wasDraw = true;
      }
      x=x+this.charWidth;
    }
    if (!wasDraw) this.reset(); // we run out of text to render so we reset and restart from beginning

    ctx.putImageData(imgData, 0, 0);
  }

  paint(buffer:CanvasRenderingContext2D) {
    buffer.drawImage(this.tmpBuffer, 0, this.yPosition);
  }
}
