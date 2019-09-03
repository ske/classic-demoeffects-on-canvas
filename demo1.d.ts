declare class Demo1 {
    starfield: StarField;
    hstarfield: HorizontalStarField;
    scroller1: SinusScroller;
    scroller2: Scroller;
    root: HTMLElement;
    canvas: HTMLCanvasElement;
    screen: CanvasRenderingContext2D;
    constructor(root: HTMLElement);
    private initCanvas;
    protected loop(): void;
    start(): Promise<void>;
}
