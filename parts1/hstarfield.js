"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HStarfield = (function (_super) {
    __extends(HStarfield, _super);
    function HStarfield(w, h, preInitPositions, direction) {
        if (preInitPositions === void 0) { preInitPositions = false; }
        if (direction === void 0) { direction = -1; }
        var _this = _super.call(this, w, h) || this;
        _this.direction = -1;
        _this.direction = direction;
        if (preInitPositions) {
            _this.pregenerateStars();
        }
        return _this;
    }
    HStarfield.prototype.pregenerateStars = function () {
        var w = Math.round(this.width / 2);
        var h = Math.round(this.height / 2);
        var hw = Math.round(w / 2);
        var hh = Math.round(h / 2);
        while (this.stars.length < this.maxStars / 5) {
            var star = new Star();
            star.start.x = Math.round(Math.random() * w) - hw;
            star.start.y = Math.round(Math.random() * h) - hh;
            star.start.z = Math.round(Math.random() * this.maxZ);
            star.position.x = star.start.x;
            star.position.y = star.start.y;
            star.position.z = star.start.z;
            star.speed = Math.round(Math.random() * this.maxSpeed) + 1;
            star.active = true;
            this.stars.push(star);
        }
    };
    HStarfield.prototype.moveStars = function () {
        var _this = this;
        var w = this.width / 2;
        var hw = w / 2;
        this.stars.forEach(function (star, i) {
            if (star.active) {
                star.position.x = star.position.x + _this.direction * star.speed;
                if (star.position.x < -(w + hw) || star.position.x >= (w + hw)) {
                    star.reset();
                }
            }
        });
    };
    HStarfield.prototype.randomizeStar = function (star) {
        var w = Math.round(this.width / 2);
        var h = Math.round(this.height / 2);
        var hw = Math.round(w / 2);
        var hh = Math.round(h / 2);
        if (this.direction > 0) {
            star.start.x = Math.round(-hw - Math.random() * w);
        }
        else {
            star.start.x = Math.round(hw - 1 + Math.random() * h);
        }
        star.start.y = Math.round(Math.random() * h) - hh;
        star.start.z = Math.round(Math.random() * this.maxZ);
        star.position.x = star.start.x;
        star.position.y = star.start.y;
        star.position.z = star.start.z;
        star.speed = Math.round(Math.random() * this.maxSpeed) + 1;
        star.active = true;
    };
    HStarfield.prototype.throwStars = function () {
        var _this = this;
        var cx = Math.round(this.width / 2);
        var cy = Math.round(this.height / 2);
        this.stars.forEach(function (star, i) {
            if (star.active) {
                var z1 = star.start.z + _this.startZ;
                var x1 = star.start.x;
                var y1 = star.start.y;
                var x = x1 * (star.position.z + _this.startZ) / z1 + cx;
                var y = y1 * (star.position.z + _this.startZ) / z1 + cy;
                if (x >= 0 && y >= 0 && x < _this.width && y < _this.height) {
                    var c = star.position.z / ((_this.maxZ + _this.startZ) / 128) + 50;
                    if (c > 255)
                        c = 255;
                    _this.drawStar(new Point2D(Math.round(x + star.position.x), Math.round(y + star.position.y)), new Color(c, c, c));
                }
                else {
                    star.reset();
                }
            }
        });
    };
    return HStarfield;
}(Starfield));
//# sourceMappingURL=hstarfield.js.map