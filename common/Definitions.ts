class Color {
  r: number;
  g: number;
  b: number;
  a: number = 255;
  constructor (r:number, g: number, b:number, a:number = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

class Point2D {
  x:number;
  y:number;
  constructor(x:number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Point3D {
  x:number;
  y:number;
  z:number;
  constructor(x:number, y: number, z:number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const GetPixel = (buffer: ImageData, p: Point2D ): Color => {
  let c = new Color(0,0,0);
  let offset = (p.x + p.y * buffer.width) * 4;
  c.r = buffer.data[offset];
  c.g = buffer.data[offset+1];
  c.b = buffer.data[offset+2];
  c.a = buffer.data[offset+3];

  return c;
};

const ClearBuffer = (buffer:ImageData, c:Color) => {
  for (let i:number = 0; i<buffer.data.length; i+=4) {
    buffer.data[i] = c.r;
    buffer.data[i+1] = c.g;
    buffer.data[i+2] = c.b;
    buffer.data[i+3] = c.a;
  }
};

const CopyBuffer = (fromBuffer:ImageData, toBuffer:ImageData, x:number, y:number) => {
  let tr = y;
  let so:number = 0;
  let c:number = fromBuffer.width * 4;
  for (let r:number=0; r<fromBuffer.height; r++) {
    let to:number = tr * toBuffer.width * 4 + x * 4;
    let toMin:number = tr * toBuffer.width * 4;
    let toMax:number = (tr + 1) * toBuffer.width * 4;
    for (let i:number = 0; i<c; i++) {
      if (to >= toMin && to < toMax) {
        toBuffer.data[to] = fromBuffer.data[so];
      }
      so++;
      to++;
    }
    tr++;
  }
};

const PutPixel = (buffer: ImageData, p: Point2D, c: Color) => {
  if (p.x < 0 || p.y < 0) return;
  if (p.x > (buffer.width-1) || p.y > (buffer.height-1)) return;
  let offset = (p.x + p.y * buffer.width) * 4;
  buffer.data[offset] = c.r;
  buffer.data[offset+1] = c.g;
  buffer.data[offset+2] = c.b;
  buffer.data[offset+3] = c.a;
};

class IDFactory {
  private static _instance:IDFactory | null = null;
  private screen:CanvasRenderingContext2D;
  private constructor() {}
  static instance():IDFactory {
    if (this._instance==null) {
      this._instance = new IDFactory();
    }
    return this._instance;
  }
  get(width:number, height:number):ImageData {
    return this.screen.createImageData(width, height);
  }
  setCanvas(screen:CanvasRenderingContext2D) {
    this.screen = screen;
  }
}
