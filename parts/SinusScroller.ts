class SinusScroller {
  protected speed:number = 4;
  protected text:string;
  protected width:number;
  protected height:number;
  protected yPosition:number;
  protected xPosition:number;
  protected charset:Charset;
  protected sinusData:number[] = [];
  protected tmpBuffer:ImageData;
  protected charHeight:number;
  protected charWidth:number;
  protected sinusBumps:number = 2;

  constructor(text:string, width: number, height: number, yPosition:number, charset:Charset) {
    this.text = text;
    this.width = width;
    this.height = height;
    this.yPosition = yPosition;
    this.charset = charset;

    let char:ImageData = this.charset.get("A");
    this.charHeight = char.height;
    this.charWidth = char.width;

    this.reset();
    this.genSinusData();
  }

  protected genSinusData() {
      this.sinusData = [];
      let i:number = 0;
      let x:number = 0;
      let b:number = (this.sinusBumps * Math.PI) / this.width;
      let a:number = 0;
      while (a < (this.sinusBumps * Math.PI)) {
        let y:number = Math.round(Math.sin(a) * ((this.height - this.charHeight) / 2));
        this.sinusData[i] = Math.round(y + this.height / 2 - this.charHeight / 2);
        a+=b;
        x++;
        i++;
      }
      for (i=-1; i>=-this.charWidth*2;i--) {
        this.sinusData[i] = this.sinusData[this.sinusData.length+i];
      }
  }

  protected reset() {
    this.xPosition = this.width;
  }

  animate() {
    this.xPosition-=this.speed;
    this.tmpBuffer = new ImageData(this.width, this.height);
    let x:number = this.xPosition;
    let wasDraw:boolean = false;
    for (let i:number = 0; i<this.text.length; i++) {
      if (x>=-this.charWidth && x<this.width) {
        this.charset.drawTo(this.tmpBuffer, this.text[i], x, this.sinusData[x]);
        wasDraw = true;
      }
      x=x+this.charWidth;
    }
    if (!wasDraw) this.reset(); // we run out of text to render so we reset and restart from beginning

  }

  paint(buffer:ImageData) {
    CopyBuffer(this.tmpBuffer, buffer, 0, Math.round(this.yPosition - (this.height / 2)));
  }
}
