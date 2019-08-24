var SinusScroll = (function () {
    function SinusScroll(w, h, text, charset) {
        this.width = w;
        this.height = h;
        this.charset = charset;
        this.text = text;
        this.yPosition = this.height / 2;
        this.sinusBumps = 2;
        this.actualCharIdx = 0;
        this.generateSinus();
    }
    SinusScroll.prototype.generateSinus = function () {
        this.sinusPositions = [];
        var margin = SinusScroll.MARGIN_TOP_BOTTOM;
        var i = 0;
        var a = 0;
        var x = 0;
        var b = (this.sinusBumps * Math.PI) / this.width;
        while (a < (this.sinusBumps * Math.PI)) {
            var y = Math.round(Math.sin(a) * ((this.height - margin) / 2));
            this.sinusPositions[i] = new Point2D(x, y + this.height / 2);
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
        var o = this.offsetX;
        for (var i = 0; i < this.text.length; i++) {
            var chr = this.text[i];
            if (o > 0 && o < this.width) {
                var pos = this.sinusPositions[o];
                this.charset.drawTo(this.buffer, chr, pos.x - Charset.CHAR_WIDTH / 2, pos.y - Charset.CHAR_HEIGHT / 2);
                wasDraw = true;
            }
            o += Charset.CHAR_WIDTH;
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
