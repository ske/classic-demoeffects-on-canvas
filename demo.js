var Demo = (function () {
    function Demo(el) {
        var _this = this;
        this.doLoop = false;
        this.startFn = null;
        this.firstInit = false;
        this.root = el;
        window.onresize = function (evt) {
            if (_this.startFn != null) {
                _this.restart();
            }
        };
    }
    Demo.prototype.init = function () {
        this.firstInit = true;
        var w = this.root.offsetWidth;
        var h = this.root.offsetHeight;
        var c = document.createElement('canvas');
        c.id = 'screen';
        this.canvas = this.root.appendChild(c);
        this.canvas.setAttribute('width', w.toString());
        this.canvas.setAttribute('height', h.toString());
        this.screen = this.canvas.getContext('2d');
    };
    Demo.prototype.restart = function () {
        var _this = this;
        this.doLoop = false;
        setTimeout(function () {
            _this.root.removeChild(_this.canvas);
            _this.canvas = null;
            _this.screen = null;
            _this.init();
            _this.doLoop = true;
            _this.startFn();
        }, Demo.REFRESH_MS * 2);
    };
    Demo.prototype.loop_starfield = function () {
        var _this = this;
        if (this.starfield != null) {
            this.starfield.animate();
            this.starfield.paint(this.screen);
            if (this.doLoop) {
                setTimeout(function () { _this.loop_starfield(); }, Demo.REFRESH_MS);
            }
        }
    };
    Demo.prototype.loop_hstarfield = function () {
        var _this = this;
        if (this.hstarfield != null) {
            this.hstarfield.animate();
            this.hstarfield.paint(this.screen);
            if (this.doLoop) {
                setTimeout(function () { _this.loop_hstarfield(); }, Demo.REFRESH_MS);
            }
        }
    };
    Demo.prototype.loop_sinusscroll = function () {
        var _this = this;
        if (this.sinus != null) {
            this.sinus.animate();
            this.sinus.paint(this.screen);
            if (this.doLoop) {
                setTimeout(function () { _this.loop_sinusscroll(); }, Demo.REFRESH_MS);
            }
        }
    };
    Demo.prototype.start_starfield = function () {
        if (!this.firstInit)
            this.init();
        this.doLoop = true;
        this.startFn = this.start_starfield;
        this.starfield = new Starfield(this.canvas.width, this.canvas.height);
        this.loop_starfield();
    };
    Demo.prototype.start_hstarfield = function () {
        if (!this.firstInit)
            this.init();
        this.doLoop = true;
        this.startFn = this.start_hstarfield;
        this.hstarfield = new HStarfield(this.canvas.width, this.canvas.height);
        this.loop_hstarfield();
    };
    Demo.prototype.start_sinusscroll = function (charset, text) {
        var _this = this;
        if (!this.firstInit)
            this.init();
        this.charset = charset;
        this.doLoop = true;
        this.startFn = function () { _this.start_sinusscroll(charset, text); };
        this.sinus = new SinusScroll(this.canvas.width, this.canvas.height, text, charset);
        this.loop_sinusscroll();
    };
    Demo.REFRESH_MS = 5;
    return Demo;
}());
//# sourceMappingURL=demo.js.map