var Charset = (function () {
    function Charset() {
        this.chars = {};
        this.charlist = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~#@!.,0123456789-';
    }
    Charset.prototype.drawTo = function (buffer, character, x, y) {
        var char = this.chars[character];
        if (char === undefined)
            return;
        for (var ox = 0; ox < char.width; ox++) {
            for (var oy = 0; oy < char.height; oy++) {
                var c = GetPixel(char, new Point2D(ox, oy));
                PutPixel(buffer, new Point2D(x + ox, y + oy), c);
            }
        }
    };
    Charset.prototype.extractChars = function (imageMap) {
        var column = 0;
        var row = 0;
        for (var i = 0; i < this.charlist.length; i++) {
            var char = this.charlist[i];
            this.chars[char] = imageMap.getImageData(column, row, Charset.CHAR_WIDTH, Charset.CHAR_HEIGHT);
            column += Charset.CHAR_WIDTH;
            if (column > (Charset.CHARS_PER_ROW - 1) * Charset.CHAR_WIDTH) {
                column = 0;
                row += Charset.CHAR_HEIGHT;
            }
        }
    };
    Charset.prototype.get = function (char) {
        if (this.chars[char] !== undefined) {
            return this.chars[char];
        }
        return null;
    };
    Charset.prototype.load = function (imagefile, root) {
        var _this = this;
        var img = new Image();
        return new Promise(function (resolve, reject) {
            img.onerror = function (e) {
                reject();
            };
            img.onload = function (e) {
                var tmpCanvas = document.createElement("canvas");
                tmpCanvas.style.display = 'none';
                tmpCanvas.setAttribute("width", img.width.toString());
                tmpCanvas.setAttribute("height", img.height.toString());
                var el = root.appendChild(tmpCanvas);
                var scr = el.getContext("2d");
                scr.drawImage(img, 0, 0);
                _this.extractChars(scr);
                root.removeChild(el);
                resolve();
            };
            img.src = imagefile;
        });
    };
    Charset.CHAR_WIDTH = 16;
    Charset.CHAR_HEIGHT = 16;
    Charset.CHARS_PER_ROW = 27;
    return Charset;
}());
//# sourceMappingURL=charset.js.map