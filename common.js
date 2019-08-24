var Color = (function () {
    function Color(r, g, b, a) {
        if (a === void 0) { a = 255; }
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
var Star = (function () {
    function Star() {
        this.reset();
    }
    Star.prototype.reset = function () {
        this.start = new Point3D(-1, -1, -1);
        this.position = new Point3D(-1, -1, -1);
        this.speed = 0;
        this.active = false;
    };
    return Star;
}());
