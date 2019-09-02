class Demo1 {

  starfield:StarField = null;
  scroller1:SinusScroller = null;
  scroller2:Scroller = null;

  root:HTMLElement;
  canvas:HTMLCanvasElement = null;
  screen:CanvasRenderingContext2D = null;

  constructor(root:HTMLElement) {
    this.root = root;
    this.initCanvas();
  }

  private initCanvas() {
    let el:HTMLElement = document.createElement("canvas");
    el.setAttribute("width", this.root.offsetWidth.toString());
    el.setAttribute("height", this.root.offsetHeight.toString());
    this.canvas = this.root.appendChild(el) as HTMLCanvasElement;
    this.screen = this.canvas.getContext("2d");
    // this.screen.globalAlpha = 1;
    // this.screen.globalCompositeOperation = 'xor';
  }

  protected loop() {
    this.starfield.animate();
    this.scroller1.animate();
    this.scroller2.animate();

    this.starfield.paint(this.screen);
    this.scroller1.paint(this.screen);
    this.scroller2.paint(this.screen);

    requestAnimationFrame(() => {this.loop();});
  }

  async start() {

    let charset:Charset = new Charset();
    await charset.load("charsets/charset_2_v1.png", this.root);

    this.starfield = new StarField(this.canvas.width, this.canvas.height);

    this.scroller1 = new SinusScroller("Hello World! This is sinus scroll. Written in TypeScript for modern browsers. Have fun!",
      this.canvas.width, 200, (this.canvas.height / 2),
      charset);

    this.scroller2 = new Scroller("Hello World! This is normal scroll.",
      this.canvas.width, this.canvas.height - 50,
      charset
    );

    this.loop();
  }

}