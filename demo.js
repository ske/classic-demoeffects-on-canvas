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
        }, 10);
    };
    Demo.prototype.loop_starfield = function () {
        var _this = this;
        if (this.starfield != null) {
            this.starfield.animate();
            this.starfield.paint(this.screen);
            if (this.doLoop) {
                setTimeout(function () {
                    _this.loop_starfield();
                }, 5);
            }
        }
    };
    Demo.prototype.loop_hstarfield = function () {
        var _this = this;
        if (this.hstarfield != null) {
            this.hstarfield.animate();
            this.hstarfield.paint(this.screen);
            if (this.doLoop) {
                setTimeout(function () {
                    _this.loop_hstarfield();
                }, 5);
            }
        }
    };
    Demo.prototype.loop_sinusscroll = function () {
        var _this = this;
        if (this.sinus != null) {
            this.sinus.animate();
            this.sinus.paint(this.screen);
            if (this.doLoop) {
                setTimeout(function () {
                    _this.loop_sinusscroll();
                }, 5);
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
    Demo.prototype.start_sinusscroll = function (text) {
        var _this = this;
        if (!this.firstInit)
            this.init();
        var charset = new Charset();
        charset.load("charset_2_v1.png", this.root)
            .then(function () {
            _this.doLoop = true;
            _this.startFn = _this.start_sinusscroll;
            _this.sinus = new SinusScroll(_this.canvas.width, _this.canvas.height, text, charset);
            _this.loop_sinusscroll();
        });
    };
    return Demo;
}());
