///<reference path="starfield.ts"/>
///<reference path="hstarfield.ts"/>
///<reference path="sinusscroll.ts"/>
///<reference path="charset.ts"/>

class Demo {
  static readonly REFRESH_MS:number = 5;

  charset:Charset;

  canvas: HTMLCanvasElement;
  root: HTMLElement;
  screen: CanvasRenderingContext2D;
  starfield: Starfield;
  hstarfield: HStarfield;
  sinus: SinusScroll;

  doLoop: boolean = false;
  startFn: Function = null;
  firstInit: boolean = false;

  constructor(el: HTMLElement) {
    this.root = el;
    window.onresize = (evt: UIEvent) => {
      if (this.startFn!=null) {
        this.restart();
      }
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

    }, Demo.REFRESH_MS * 2);
  }

  protected loop_starfield() {
    if (this.starfield != null) {
      this.starfield.animate();
      this.starfield.paint(this.screen);
      if (this.doLoop) {
        setTimeout(() => { this.loop_starfield() }, Demo.REFRESH_MS);
      }
    }
  }

  protected loop_hstarfield() {
    if (this.hstarfield != null) {
      this.hstarfield.animate();
      this.hstarfield.paint(this.screen);
      if (this.doLoop) {
        setTimeout(() => { this.loop_hstarfield() }, Demo.REFRESH_MS);
      }
    }
  }

  protected loop_sinusscroll() {
    if (this.sinus != null) {

      this.sinus.animate();
      this.sinus.paint(this.screen);

      if (this.doLoop) {
        setTimeout(() => { this.loop_sinusscroll() }, Demo.REFRESH_MS);
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

  start_sinusscroll(charset:Charset, text:string) {
    if (!this.firstInit) this.init();

    this.charset = charset;

    this.doLoop = true;
    this.startFn = () => { this.start_sinusscroll(charset, text) };
    this.sinus = new SinusScroll(this.canvas.width, this.canvas.height, text, charset);
    this.loop_sinusscroll();
  }

}