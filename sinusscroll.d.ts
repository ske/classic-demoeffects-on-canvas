declare class SinusScroll {
    protected static readonly SPEED: number;
    protected static readonly CHR_HORIZ_PADDING: number;
    protected static readonly MARGIN_TOP_BOTTOM: number;
    protected charset: Charset;
    protected buffer: ImageData;
    protected width: number;
    protected height: number;
    protected text: string;
    protected offsetX: number;
    protected sinusBumps: number;
    protected actualCharIdx: number;
    protected sinusPositions: Point2D[];
    constructor(w: number, h: number, text: string, charset: Charset);
    protected generateSinus(): void;
    clearBuffer(): void;
    animate(): void;
    paint(screen: CanvasRenderingContext2D): void;
}
