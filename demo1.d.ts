declare class Demo1 {
    hstarfield: HStarfield;
    starfield: Starfield;
    scroller1: SinusScroller;
    scroller2: Scroller;
    root: HTMLElement;
    canvas: HTMLCanvasElement;
    screen: CanvasRenderingContext2D;
    dblbuff: DoubleBuffer;
    constructor(root: HTMLElement);
    private initCanvas;
    protected loop(): void;
    start(): Promise<void>;
}
