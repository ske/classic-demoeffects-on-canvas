"use strict";
var Charset = (function () {
    function Charset() {
        this.chars = {};
        this.charlist = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~#@!.,0123456789-';
    }
    Charset.prototype.draw = function (buffer, character, x, y) {
        var char = this.chars[character];
        if (char === undefined)
            return;
        buffer.drawImage(char, x, y);
    };
    Charset.prototype.extract = function (imageMap) {
        var column = 0;
        var row = 0;
        for (var i = 0; i < this.charlist.length; i++) {
            var char = this.charlist[i];
            var c = document.createElement("canvas");
            c.width = Charset.CHAR_WIDTH;
            c.height = Charset.CHAR_HEIGHT;
            var id = imageMap.getImageData(column, row, Charset.CHAR_WIDTH, Charset.CHAR_HEIGHT);
            var ctx = c.getContext("2d");
            ctx.putImageData(id, 0, 0);
            this.chars[char] = c;
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
            img.onerror = function () {
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
                _this.extract(scr);
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
//# sourceMappingURL=Charset.js.map