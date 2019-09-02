class Star {
  public x:number = -1;
  public y:number = -1;
  public z:number = -1;
  public speed:number = -1;
  public active:boolean = false;

  reset() {
    this.x = -1;
    this.y = -1;
    this.z = -1;
    this.speed = -1;
    this.active = false;
  }
}

class StarField {
  protected viewDistance:number = 100;
  protected maxSpeed:number = 10;
  protected maxDistance:number = 350;
  protected minDistance:number = 0;
  protected maxStars:number = 250;

  protected stars:Star[] = [];
  protected width:number;
  protected height:number;
  protected yPosition:number;
  protected tmpBuffer:HTMLCanvasElement;

  constructor(width:number, height: number, yPosition:number = 0) {
    this.width = width;
    this.height = height;
    this.yPosition = yPosition;

    this.tmpBuffer = document.createElement("canvas");
    this.tmpBuffer.width = width;
    this.tmpBuffer.height = height;

    this.generateStars();
  }

  protected randomizeStar(s:Star) {
    s.speed = Math.round(Math.random() * this.maxSpeed) + 1;
    s.x = Math.round(Math.random() * this.width * 2- this.width ) ;
    s.y = Math.round(Math.random() * this.height * 2 - this.height );
    s.z = this.maxDistance;
  }

  protected generateStars() {
    for (let i:number=0; i<this.maxStars; i++) {
      let s:Star = new Star();
      this.randomizeStar(s);
      s.active = true;
      this.stars.push(s);
    }
  }

  protected moveStars() {
    this.stars.forEach((star:Star) => {
      if (star.active) {
        star.z-=star.speed;
        if (star.z < this.minDistance) {
          star.active = false;
        }
      } else {
        this.randomizeStar(star);
        star.active = true;
      }
    });
  }

  protected throwStars() {
    let ctx = this.tmpBuffer.getContext("2d");
    ctx.fillRect(0,0,this.tmpBuffer.width,this.tmpBuffer.height);
    let imgData:ImageData = ctx.getImageData(0,0,this.tmpBuffer.width, this.tmpBuffer.height);
    this.stars.forEach((star:Star) => {
      if (star.active) {
        let x:number = Math.round(star.x * this.viewDistance / (star.z + this.viewDistance) + this.width / 2);
        let y:number = Math.round(star.y * this.viewDistance / (star.z + this.viewDistance) + this.height / 2);
        let c:number = 255 - Math.round((256 / this.maxDistance) * star.z);
        let color:Color = new Color(c,c,c);

        PutPixel(imgData, new Point2D(x,y), color);

        PutPixel(imgData, new Point2D(x+1,y), color);
        PutPixel(imgData, new Point2D(x,y+1), color);
        PutPixel(imgData, new Point2D(x-1,y), color);
        PutPixel(imgData, new Point2D(x,y-1), color);
      }
    });
    ctx.putImageData(imgData, 0, 0);
  }

  animate() {
    this.moveStars();
    this.throwStars();
  }

  paint(buffer:CanvasRenderingContext2D) {
    buffer.drawImage(this.tmpBuffer, 0, this.yPosition);
  }
}