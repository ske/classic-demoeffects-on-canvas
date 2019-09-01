///<reference path="common.ts"/>
///<reference path="starfield.ts"/>
class HStarfield extends Starfield {
    readonly direction:number = -1; // use -1 for opposite direction

    constructor(w: number, h: number, preInitPositions:boolean = false, direction:number = -1) {
        super(w, h);
        this.direction = direction;
        if (preInitPositions) {
            this.pregenerateStars();
        }
    }

    protected pregenerateStars() {
        let w = Math.round(this.width / 2);
        let h = Math.round(this.height / 2);
        let hw = Math.round(w / 2);
        let hh = Math.round(h / 2);

        while (this.stars.length < this.maxStars / 5) {
            let star:Star = new Star();

            star.start.x=Math.round(Math.random() * w) - hw;
            star.start.y=Math.round(Math.random() * h) - hh;
            star.start.z=Math.round(Math.random() * this.maxZ);

            star.position.x=star.start.x;
            star.position.y=star.start.y;
            star.position.z=star.start.z;
            star.speed=Math.round(Math.random() * this.maxSpeed) + 1;
            star.active=true;

            this.stars.push(star);
        }
    }

    protected moveStars() {
        let w  = this.width / 2;
        let hw = w / 2;
        this.stars.forEach((star:Star, i) => {
            if (star.active) {
                star.position.x = star.position.x + this.direction * star.speed;
                if (star.position.x < -(w+hw) || star.position.x >= (w+hw)) {
                    star.reset();
                }
            }
        });
    }

    protected randomizeStar(star: Star) {
        let w = Math.round(this.width / 2);
        let h = Math.round(this.height / 2);
        let hw = Math.round(w / 2);
        let hh = Math.round(h / 2);

        if (this.direction > 0) {
            star.start.x=Math.round(-hw - Math.random() * w);
        } else {
            star.start.x=Math.round(hw-1 + Math.random() * h);
        }

        star.start.y=Math.round(Math.random() * h) - hh;
        star.start.z=Math.round(Math.random() * this.maxZ);

        star.position.x=star.start.x;
        star.position.y=star.start.y;
        star.position.z=star.start.z;
        star.speed=Math.round(Math.random() * this.maxSpeed) + 1;
        star.active=true;
    }

    protected throwStars() {
        let cx = Math.round(this.width / 2);
        let cy = Math.round(this.height / 2);

        this.stars.forEach((star:Star, i) => {
            if (star.active) {
                let z1 = star.start.z + this.startZ;
                let x1 = star.start.x;
                let y1 = star.start.y;

                let x = x1 * (star.position.z + this.startZ) / z1 + cx;
                let y = y1 * (star.position.z + this.startZ) / z1 + cy;

                if (x>=0 && y>=0 && x<this.width && y<this.height) {
                    let c = star.position.z / ((this.maxZ + this.startZ) / 128) + 50;
                    if (c>255) c=255;
                    this.drawStar(new Point2D(Math.round(x + star.position.x), Math.round(y + star.position.y)), new Color(c,c,c));
                } else {
                    star.reset();
                }
            }
        })
    }

}
