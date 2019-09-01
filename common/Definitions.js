"use strict";
var Color = (function () {
    function Color(r, g, b, a) {
        if (a === void 0) { a = 255; }
        this.a = 255;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Color;
}());
var Point2D = (function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2D;
}());
var Point3D = (function () {
    function Point3D(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Point3D;
}());
var GetPixel = function (buffer, p) {
    var c = new Color(0, 0, 0);
    var offset = (p.x + p.y * buffer.width) * 4;
    c.r = buffer.data[offset];
    c.g = buffer.data[offset + 1];
    c.b = buffer.data[offset + 2];
    c.a = buffer.data[offset + 3];
    return c;
};
var CopyBuffer = function (fromBuffer, toBuffer, x, y) {
    var tr = y;
    var so = 0;
    var c = fromBuffer.width * 4;
    for (var r = 0; r < fromBuffer.height; r++) {
        var to = tr * toBuffer.width * 4 + x * 4;
        var toMin = tr * toBuffer.width * 4;
        var toMax = (tr + 1) * toBuffer.width * 4;
        for (var i = 0; i < c; i++) {
            if (to >= toMin && to < toMax) {
                toBuffer.data[to] = fromBuffer.data[so];
            }
            so++;
            to++;
        }
        tr++;
    }
};
var ClearBuffer = function (buffer, c) {
    for (var i = 0; i < buffer.width; i++) {
        for (var j = 0; j < buffer.height; j++) {
            PutPixel(buffer, new Point2D(i, j), c);
        }
    }
};
var PutPixel = function (buffer, p, c) {
    if (p.x < 0 || p.y < 0)
        return;
    if (p.x > (buffer.width - 1) || p.y > (buffer.height - 1))
        return;
    var offset = (p.x + p.y * buffer.width) * 4;
    buffer.data[offset] = c.r;
    buffer.data[offset + 1] = c.g;
    buffer.data[offset + 2] = c.b;
    buffer.data[offset + 3] = c.a;
};
//# sourceMappingURL=Definitions.js.map