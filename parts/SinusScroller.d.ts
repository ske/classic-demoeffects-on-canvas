declare class SinusScroller {
    protected speed: number;
    protected text: string;
    protected width: number;
    protected height: number;
    protected yPosition: number;
    protected xPosition: number;
    protected charset: Charset;
    protected sinusData: number[];
    protected charHeight: number;
    protected charWidth: number;
    protected sinusBumps: number;
    protected tmpBuffer: HTMLCanvasElement;
    constructor(text: string, width: number, height: number, yPosition: number, charset: Charset);
    protected genSinusData(): void;
    protected reset(): void;
    animate(): void;
    paint(buffer: CanvasRenderingContext2D): void;
}
