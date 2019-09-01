"use strict";
var Scroller = (function () {
    function Scroller(text, width, yPosition, charset) {
        this.speed = 4;
        this.text = text;
        this.yPosition = yPosition;
        this.charset = charset;
        this.width = width;
        var char = this.charset.get("A");
        this.charHeight = char.height;
        this.charWidth = char.width;
        this.reset();
    }
    Scroller.prototype.reset = function () {
        this.xPosition = this.width;
    };
    Scroller.prototype.animate = function () {
        this.xPosition -= this.speed;
        this.tmpBuffer = new ImageData(this.width, this.charHeight);
        var x = this.xPosition;
        var wasDraw = false;
        for (var i = 0; i < this.text.length; i++) {
            if (x >= -this.charWidth && x < this.width) {
                this.charset.drawTo(this.tmpBuffer, this.text[i], x, 0);
                wasDraw = true;
            }
            x = x + this.charWidth;
        }
        if (!wasDraw)
            this.reset();
    };
    Scroller.prototype.paint = function (buffer) {
        CopyBuffer(this.tmpBuffer, buffer, 0, this.yPosition);
    };
    return Scroller;
}());
//# sourceMappingURL=Scroller.js.map