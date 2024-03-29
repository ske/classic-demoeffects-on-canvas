"use strict";
var SinusScroller = (function () {
    function SinusScroller(text, width, height, yPosition, charset) {
        this.speed = 4;
        this.sinusData = [];
        this.sinusBumps = 2;
        this.text = text;
        this.width = width;
        this.height = height;
        this.yPosition = yPosition;
        this.charset = charset;
        var char = this.charset.get("A");
        this.charHeight = char.height;
        this.charWidth = char.width;
        this.tmpBuffer = document.createElement("canvas");
        this.tmpBuffer.width = width;
        this.tmpBuffer.height = height;
        this.reset();
        this.genSinusData();
    }
    SinusScroller.prototype.genSinusData = function () {
        this.sinusData = [];
        var i = 0;
        var x = 0;
        var b = (this.sinusBumps * Math.PI) / this.width;
        var a = 0;
        while (a < (this.sinusBumps * Math.PI)) {
            var y = Math.round(Math.sin(a) * ((this.height - this.charHeight) / 2));
            this.sinusData[i] = Math.round(y + this.height / 2 - this.charHeight / 2);
            a += b;
            x++;
            i++;
        }
        for (i = -1; i >= -this.charWidth * 2; i--) {
            this.sinusData[i] = this.sinusData[this.sinusData.length + i];
        }
    };
    SinusScroller.prototype.reset = function () {
        this.xPosition = this.width;
    };
    SinusScroller.prototype.animate = function () {
        var ctx = this.tmpBuffer.getContext("2d");
        ctx.clearRect(0, 0, this.tmpBuffer.width, this.tmpBuffer.height);
        this.xPosition -= this.speed;
        var x = this.xPosition;
        var wasDraw = false;
        for (var i = 0; i < this.text.length; i++) {
            if (x >= -this.charWidth && x < this.width) {
                this.charset.draw(ctx, this.text[i], x, this.sinusData[x]);
                wasDraw = true;
            }
            x = x + this.charWidth;
        }
        if (!wasDraw)
            this.reset();
    };
    SinusScroller.prototype.paint = function (buffer) {
        buffer.drawImage(this.tmpBuffer, 0, Math.round(this.yPosition - (this.height / 2)));
    };
    return SinusScroller;
}());
//# sourceMappingURL=SinusScroller.js.map