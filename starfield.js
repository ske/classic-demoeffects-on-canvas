///<reference path="common.ts"/>
var Starfield = /** @class */ (function () {
    function Starfield(w, h) {
        this.stars = [];
        this.maxStars = 1000;
        this.maxSpeed = 10;
        this.maxZ = 1300;
        this.startZ = 500;
        this.zOverrun = 1500;
        this.width = w;
        this.height = h;
    }
    Starfield.prototype.clearBuffer = function () {
        this.buffer = new ImageData(this.width, this.height);
    };
    Starfield.prototype.animate = function () {
        this.clearBuffer();
        this.generateStars();
        this.moveStars();
        this.throwStars();
    };
    Starfield.prototype.paint = function (screen) {
        screen.putImageData(this.buffer, 0, 0);
    };
    Starfield.prototype.randomizeStar = function (star) {
        var w = Math.round(this.width / 2);
        var h = Math.round(this.height / 2);
        var hw = Math.round(w / 2);
        var hh = Math.round(h / 2);
        // spawn withing half screen area rectangle
        star.start.x = Math.round(Math.random() * w) - 1 - hw;
        star.start.y = Math.round(Math.random() * h) - 1 - hh;
        star.start.z = 0;
        star.position.x = star.start.x;
        star.position.y = star.start.y;
        star.position.z = star.start.z;
        star.speed = Math.round(Math.random() * this.maxSpeed) + 1;
        star.active = true;
    };
    Starfield.prototype.generateStars = function () {
        if (this.stars.length >= this.maxStars) {
            var index = null;
            for (var i = 0; i < this.stars.length; i++) {
                if (!this.stars[i].active) {
                    index = i;
                    break;
                }
            }
            // reuse inactive star
            if (index !== null) {
                this.randomizeStar(this.stars[index]);
            }
        }
        else {
            var star = new Star();
            this.randomizeStar(star);
            this.stars.push(star);
        }
    };
    Starfield.prototype.moveStars = function () {
        var _this = this;
        this.stars.forEach(function (star, i) {
            if (star.active) {
                star.position.z = star.position.z + star.speed;
                if (star.position.z > (_this.maxZ + _this.zOverrun)) {
                    star.reset();
                }
            }
        });
    };
    Starfield.prototype.throwStars = function () {
        var _this = this;
        var cx = Math.round(this.width / 2);
        var cy = Math.round(this.height / 2);
        this.stars.forEach(function (star, i) {
            if (star.active) {
                var z1 = star.start.z + _this.startZ;
                var x1 = star.start.x;
                var y1 = star.start.y;
                var x = star.position.x + (x1 * (star.position.z + _this.startZ) / z1 + cx);
                var y = star.position.y + (y1 * (star.position.z + _this.startZ) / z1 + cy);
                if (x >= 0 && y >= 0 && x < _this.width && y < _this.height) {
                    var c = star.position.z / ((_this.maxZ + _this.startZ) / 300) + 0;
                    if (c > 255)
                        c = 255;
                    var phase = 1;
                    /*
                    if (star.position.z > 1 * this.maxZ / 3) phase--;
                    if (star.position.z > 2 * this.maxZ / 3) phase--;
                     */
                    _this.drawStar(new Point2D(Math.round(x), Math.round(y)), new Color(c, c, c), phase);
                }
                else {
                    star.reset();
                }
            }
        });
    };
    Starfield.prototype.drawStar = function (p, c, phase) {
        if (phase === void 0) { phase = 1; }
        switch (phase) {
            case 0:
                /*
                PutPixel(this.buffer, new Point2D(p.x+1, p.y+1), c);
                PutPixel(this.buffer, new Point2D(p.x-1,p.y+1), c);
                PutPixel(this.buffer, new Point2D(p.x-1,p.y-1), c);
                PutPixel(this.buffer, new Point2D(p.x+1,p.y-1), c);
                 */
                PutPixel(this.buffer, new Point2D(p.x + 2, p.y), c);
                PutPixel(this.buffer, new Point2D(p.x, p.y + 2), c);
                PutPixel(this.buffer, new Point2D(p.x - 2, p.y), c);
                PutPixel(this.buffer, new Point2D(p.x, p.y - 2), c);
            case 1:
                PutPixel(this.buffer, new Point2D(p.x + 1, p.y), c);
                PutPixel(this.buffer, new Point2D(p.x, p.y + 1), c);
                PutPixel(this.buffer, new Point2D(p.x - 1, p.y), c);
                PutPixel(this.buffer, new Point2D(p.x, p.y - 1), c);
            case 2:
                PutPixel(this.buffer, new Point2D(p.x, p.y), c);
        }
    };
    return Starfield;
}());
