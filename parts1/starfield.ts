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
class Starfield {
    stars: Star[] = [];
    readonly maxStars: number = 500;
    readonly maxSpeed: number = 10;
    readonly maxZ: number = 1300;
    readonly startZ: number = 500;
    readonly zOverrun: number = 1500;
    readonly width: number;
    readonly height: number;

    buffer: ImageData;

    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
    }

    clearBuffer() {
        this.buffer = new ImageData(this.width, this.height);
    }

    animate() {
        this.clearBuffer();
        this.generateStars();
        this.moveStars();
        this.throwStars()
    }

    paint(screen:CanvasRenderingContext2D) {
        screen.putImageData(this.buffer, 0, 0);
    }

    protected randomizeStar(star: Star) {
        let w = Math.round(this.width / 2);
        let h = Math.round(this.height / 2);
        let hw = Math.round(w / 2);
        let hh = Math.round(h / 2);

        // spawn withing half screen area rectangle
        star.start.x=Math.round(Math.random() * w) - 1 - hw;
        star.start.y=Math.round(Math.random() * h) - 1 - hh;
        star.start.z=0;
        star.position.x=star.start.x;
        star.position.y=star.start.y;
        star.position.z=star.start.z;
        star.speed=Math.round(Math.random() * this.maxSpeed) + 1;
        star.active=true;
    }

    protected generateStars() {
        if (this.stars.length >= this.maxStars) {
            for (let i=0; i<this.stars.length; i++) {
                if (!this.stars[i].active) {
                    this.randomizeStar(this.stars[i]);
                }
            }
        } else {
            while (this.stars.length < this.maxStars) {
                let star = new Star();
                this.randomizeStar(star);
                this.stars.push(star);
            }
        }
    }

    protected moveStars() {
        this.stars.forEach((star:Star, i) => {
            if (star.active) {
                star.position.z = star.position.z + star.speed;
                if (star.position.z > (this.maxZ+this.zOverrun)) {
                    star.reset();
                }
            }
        })
    }
    protected throwStars() {
        let cx = Math.round(this.width / 2);
        let cy = Math.round(this.height / 2);

        this.stars.forEach((star:Star, i) => {
            if (star.active) {
                let z1 = star.start.z + this.startZ;
                let x1 = star.start.x;
                let y1 = star.start.y;

                let x = Math.round(star.position.x + (x1 * (star.position.z + this.startZ) / z1 + cx));
                let y = Math.round(star.position.y + (y1 * (star.position.z + this.startZ) / z1 + cy));

                if (x>=0 && y>=0 && x<this.width && y<this.height) {
                    let c = star.position.z / ((this.maxZ + this.startZ) / 300) + 0;
                    if (c>255) c=255;
                    let phase = 1;
                    /*
                    if (star.position.z > 1 * this.maxZ / 3) phase--;
                    if (star.position.z > 2 * this.maxZ / 3) phase--;
                     */
                    this.drawStar(new Point2D(x, y), new Color(c,c,c), phase);
                } else {
                    star.reset();
                }
            }
        })
    }

    protected drawStar(p:Point2D, c:Color, phase:number = 1) {
        switch (phase) {
            case 0:
                /*
                PutPixel(this.buffer, new Point2D(p.x+1, p.y+1), c);
                PutPixel(this.buffer, new Point2D(p.x-1,p.y+1), c);
                PutPixel(this.buffer, new Point2D(p.x-1,p.y-1), c);
                PutPixel(this.buffer, new Point2D(p.x+1,p.y-1), c);
                 */

                PutPixel(this.buffer, new Point2D(p.x+2, p.y), c);
                PutPixel(this.buffer, new Point2D(p.x,p.y+2), c);
                PutPixel(this.buffer, new Point2D(p.x-2,p.y), c);
                PutPixel(this.buffer, new Point2D(p.x,p.y-2), c);
            case 1:
                PutPixel(this.buffer, new Point2D(p.x+1, p.y), c);
                PutPixel(this.buffer, new Point2D(p.x,p.y+1), c);
                PutPixel(this.buffer, new Point2D(p.x-1,p.y), c);
                PutPixel(this.buffer, new Point2D(p.x,p.y-1), c);
            case 2:
                PutPixel(this.buffer, new Point2D(p.x,p.y), c);
        }


    }
}