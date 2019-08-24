class Color {
    r: number;
    g: number;
    b: number;
    a: number;
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

const PutPixel = (buffer: ImageData, p: Point2D, c: Color) => {
  if (p.x < 0 || p.y < 0) return;
  if (p.x > (buffer.width-1) || p.y > (buffer.height-1)) return;
  let offset = (p.x + p.y * buffer.width) * 4;
    buffer.data[offset] = c.r;
    buffer.data[offset+1] = c.g;
    buffer.data[offset+2] = c.b;
    buffer.data[offset+3] = c.a;
};


class Star {
    start: Point3D;
    position: Point3D;
    speed: number;
    active: Boolean;
    constructor() {
        this.reset();
    }
    reset() {
        this.start = new Point3D(-1, -1, -1)
        this.position = new Point3D(-1, -1, -1);

        this.speed = 0;
        this.active = false;
    }
}
