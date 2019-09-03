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
var HorizontalStarField = (function (_super) {
    __extends(HorizontalStarField, _super);
    function HorizontalStarField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.direction = 1;
        return _this;
    }
    HorizontalStarField.prototype.randomizeStar = function (s) {
        s.speed = Math.round(Math.random() * this.maxSpeed) + 1;
        s.x = Math.round(Math.random() * this.width * 2 - this.width);
        s.y = Math.round(Math.random() * this.height * 2 - this.height);
        s.z = Math.round(Math.random() * this.maxDistance);
    };
    HorizontalStarField.prototype.moveStars = function () {
        var _this = this;
        this.stars.forEach(function (star) {
            if (star.active) {
                if (_this.direction < 0) {
                    star.x -= star.speed;
                    if (star.x < -_this.width) {
                        star.active = false;
                    }
                }
                else {
                    star.x += star.speed;
                    if (star.x > _this.width) {
                        star.active = false;
                    }
                }
            }
            else {
                _this.randomizeStar(star);
                star.active = true;
            }
        });
    };
    return HorizontalStarField;
}(StarField));
//# sourceMappingURL=HorizontalStarField.js.map