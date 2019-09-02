"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Demo1 = (function () {
    function Demo1(root) {
        this.starfield = null;
        this.scroller1 = null;
        this.scroller2 = null;
        this.canvas = null;
        this.screen = null;
        this.root = root;
        this.initCanvas();
    }
    Demo1.prototype.initCanvas = function () {
        var el = document.createElement("canvas");
        el.setAttribute("width", this.root.offsetWidth.toString());
        el.setAttribute("height", this.root.offsetHeight.toString());
        this.canvas = this.root.appendChild(el);
        this.screen = this.canvas.getContext("2d");
    };
    Demo1.prototype.loop = function () {
        var _this = this;
        this.starfield.animate();
        this.scroller1.animate();
        this.scroller2.animate();
        this.screen.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.starfield.paint(this.screen);
        this.scroller1.paint(this.screen);
        this.scroller2.paint(this.screen);
        requestAnimationFrame(function () { _this.loop(); });
    };
    Demo1.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var charset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        charset = new Charset();
                        return [4, charset.load("charsets/charset_2_v1.png", this.root)];
                    case 1:
                        _a.sent();
                        this.starfield = new StarField(this.canvas.width, this.canvas.height);
                        this.scroller1 = new SinusScroller("Hello World! This is sinus scroll. Written in TypeScript for modern browsers. Have fun!", this.canvas.width, 200, (this.canvas.height / 2), charset);
                        this.scroller2 = new Scroller("Hello World! This is normal scroll.", this.canvas.width, this.canvas.height - 50, charset);
                        this.loop();
                        return [2];
                }
            });
        });
    };
    return Demo1;
}());
//# sourceMappingURL=demo1.js.map