class Demo1 {
  hstarfield:HStarfield = null;
  starfield:Starfield = null;

  // scroller1:SinusScroll = null;
  // scroller2:SinusScroll = null;

  scroller1:SinusScroller = null;
  scroller2:Scroller = null;

  root:HTMLElement;
  canvas:HTMLCanvasElement = null;
  screen:CanvasRenderingContext2D = null;
  dblbuff:DoubleBuffer = null;

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
    this.dblbuff = new DoubleBuffer(this.canvas.width, this.canvas.height);
  }

  protected loop() {
    this.dblbuff.clearBuffer();

    this.scroller1.animate();
    this.scroller2.animate();

    this.scroller1.paint(this.dblbuff.getActive());
    this.scroller2.paint(this.dblbuff.getActive());

    this.dblbuff.SwapBuffers();
    this.screen.putImageData(this.dblbuff.getVisible(), 0, 0);
    requestAnimationFrame(() => {this.loop();});
    // setTimeout(() => { this.loop(); }, 10);
  }

  async start() {
    let charset:Charset = new Charset();
    await charset.load("charsets/charset_2_v1.png", this.root);

    this.scroller1 = new SinusScroller("Hello World! This is sinus scroll. Written in TypeScript for modern browsers. Have fun!",
      this.canvas.width, 200, (this.canvas.height / 2),
      charset);

    this.scroller2 = new Scroller("Hello World! This is normal scroll.",
      this.canvas.width, this.canvas.height - 50,
      charset
    );

    this.dblbuff.setActive(0);
    this.dblbuff.setVisible(1);

    this.loop();
  }

}