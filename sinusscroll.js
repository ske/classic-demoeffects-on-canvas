var SinusScroll = (function () {
    function SinusScroll(w, h, text, charset) {
        this.width = w;
        this.height = h;
        this.charset = charset;
        this.text = text;
        this.sinusBumps = 4;
        this.actualCharIdx = 0;
        this.generateSinus();
    }
    SinusScroll.prototype.generateSinus = function () {
        this.sinusPositions = [];
        var i = 0;
        var x = 0;
        var b = (this.sinusBumps * Math.PI) / this.width;
        var a = 0;
        while (a < (this.sinusBumps * Math.PI)) {
            var y = Math.round(Math.sin(a) * ((this.height - SinusScroll.MARGIN_TOP_BOTTOM) / 2));
            this.sinusPositions[i] = new Point2D(x, Math.round(y + this.height / 2));
            a += b;
            x++;
            i++;
        }
        this.offsetX = this.sinusPositions.length - 1;
    };
    SinusScroll.prototype.clearBuffer = function () {
        this.buffer = new ImageData(this.width, this.height);
    };
    SinusScroll.prototype.animate = function () {
        this.clearBuffer();
        var wasDraw = false;
        var offset = this.offsetX;
        var hcw = Math.round(Charset.CHAR_WIDTH / 2);
        var hch = Math.round(Charset.CHAR_HEIGHT / 2);
        for (var i = 0; i < this.text.length; i++) {
            var chr = this.text[i];
            if (offset < 0) {
                offset += Charset.CHAR_WIDTH;
                continue;
            }
            var pos = this.sinusPositions[offset];
            this.charset.drawTo(this.buffer, chr, pos.x - hcw, pos.y - hch);
            wasDraw = true;
            offset += Charset.CHAR_WIDTH;
            if (offset > this.width)
                break;
        }
        this.offsetX -= SinusScroll.SPEED;
        if (!wasDraw) {
            this.offsetX = this.sinusPositions.length - 1;
        }
    };
    SinusScroll.prototype.paint = function (screen) {
        screen.putImageData(this.buffer, 0, 0);
    };
    SinusScroll.SPEED = 2;
    SinusScroll.CHR_HORIZ_PADDING = 2;
    SinusScroll.MARGIN_TOP_BOTTOM = 40;
    return SinusScroll;
}());
//# sourceMappingURL=sinusscroll.js.map