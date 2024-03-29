"use strict";
var Star = (function () {
    function Star() {
        this.x = -1;
        this.y = -1;
        this.z = -1;
        this.speed = -1;
        this.active = false;
    }
    Star.prototype.reset = function () {
        this.x = -1;
        this.y = -1;
        this.z = -1;
        this.speed = -1;
        this.active = false;
    };
    return Star;
}());
var StarField = (function () {
    function StarField(width, height, yPosition) {
        if (yPosition === void 0) { yPosition = 0; }
        this.viewDistance = 100;
        this.maxSpeed = 10;
        this.maxDistance = 350;
        this.minDistance = 0;
        this.maxStars = 250;
        this.stars = [];
        this.width = width;
        this.height = height;
        this.yPosition = yPosition;
        this.tmpBuffer = document.createElement("canvas");
        this.tmpBuffer.width = width;
        this.tmpBuffer.height = height;
        this.generateStars();
    }
    StarField.prototype.randomizeStar = function (s) {
        s.speed = Math.round(Math.random() * this.maxSpeed) + 1;
        s.x = Math.round(Math.random() * this.width * 2 - this.width);
        s.y = Math.round(Math.random() * this.height * 2 - this.height);
        s.z = this.maxDistance;
    };
    StarField.prototype.generateStars = function () {
        for (var i = 0; i < this.maxStars; i++) {
            var s = new Star();
            this.randomizeStar(s);
            s.active = true;
            this.stars.push(s);
        }
    };
    StarField.prototype.moveStars = function () {
        var _this = this;
        this.stars.forEach(function (star) {
            if (star.active) {
                star.z -= star.speed;
                if (star.z < _this.minDistance) {
                    star.active = false;
                }
            }
            else {
                _this.randomizeStar(star);
                star.active = true;
            }
        });
    };
    StarField.prototype.throwStars = function () {
        var _this = this;
        var ctx = this.tmpBuffer.getContext("2d");
        ctx.clearRect(0, 0, this.tmpBuffer.width, this.tmpBuffer.height);
        var imgData = ctx.getImageData(0, 0, this.tmpBuffer.width, this.tmpBuffer.height);
        this.stars.forEach(function (star) {
            if (star.active) {
                var x = Math.round(star.x * _this.viewDistance / (star.z + _this.viewDistance) + _this.width / 2);
                var y = Math.round(star.y * _this.viewDistance / (star.z + _this.viewDistance) + _this.height / 2);
                var c = 255 - Math.round((256 / _this.maxDistance) * star.z);
                var color = new Color(c, c, c);
                PutPixel(imgData, new Point2D(x, y), color);
                PutPixel(imgData, new Point2D(x + 1, y), color);
                PutPixel(imgData, new Point2D(x, y + 1), color);
                PutPixel(imgData, new Point2D(x - 1, y), color);
                PutPixel(imgData, new Point2D(x, y - 1), color);
            }
        });
        ctx.putImageData(imgData, 0, 0);
    };
    StarField.prototype.animate = function () {
        this.moveStars();
        this.throwStars();
    };
    StarField.prototype.paint = function (buffer) {
        buffer.drawImage(this.tmpBuffer, 0, this.yPosition);
    };
    return StarField;
}());
//# sourceMappingURL=StarField.js.map