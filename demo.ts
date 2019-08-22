///<reference path="starfield.ts"/>
///<reference path="hstarfield.ts"/>

class Demo {
  canvas:HTMLCanvasElement;
  root:HTMLElement;
  screen:CanvasRenderingContext2D;
  starfield: Starfield;
  hstarfield: HStarfield;

  doLoop:boolean = false;
  startFn:Function = null;
  firstInit:boolean = false;

  constructor(el: HTMLElement) {
    this.root = el;
    window.onresize = (evt: UIEvent) => {
      this.restart();
    }
  }

  protected init() {
    this.firstInit = true;
    let w = this.root.offsetWidth;
    let h = this.root.offsetHeight;

    // Create new canvas
    let c = document.createElement('canvas');
    c.id = 'screen';
    this.canvas = this.root.appendChild(c) as HTMLCanvasElement;
    this.canvas.setAttribute('width', w.toString());
    this.canvas.setAttribute('height', h.toString());
    this.screen = this.canvas.getContext('2d');
  }

  protected restart() {
    this.doLoop = false;
    setTimeout(() => {
      // Destroy existing canvas if any
      this.root.removeChild(this.canvas);
      this.canvas = null;
      this.screen = null;

      this.init();

      // Start animation on new canvas
      this.doLoop = true;
      this.startFn();

    }, 10);
  }

  protected loop_starfield() {
    if (this.starfield != null) {
      this.starfield.animate();
      this.starfield.paint(this.screen);
      if (this.doLoop) {
        setTimeout(() => { this.loop_starfield() } , 5);
      }
    }
  }

  protected loop_hstarfield() {
    if (this.hstarfield != null) {
      this.hstarfield.animate();
      this.hstarfield.paint(this.screen);
      if (this.doLoop) {
        setTimeout(() => { this.loop_hstarfield() } , 5);
      }
    }
  }

  start_starfield() {
    if (!this.firstInit) this.init();
    this.doLoop = true;
    this.startFn = this.start_starfield;

    this.starfield = new Starfield(this.canvas.width, this.canvas.height);
    this.loop_starfield();
  }

  start_hstarfield() {
    if (!this.firstInit) this.init();
    this.doLoop = true;
    this.startFn = this.start_hstarfield;

    this.hstarfield = new HStarfield(this.canvas.width, this.canvas.height);
    this.loop_hstarfield();
  }

}