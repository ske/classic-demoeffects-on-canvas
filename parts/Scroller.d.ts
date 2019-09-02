declare class Scroller {
    protected speed: number;
    protected text: string;
    protected yPosition: number;
    protected charset: Charset;
    protected width: number;
    protected xPosition: number;
    protected tmpBuffer: ImageData;
    protected charHeight: number;
    protected charWidth: number;
    constructor(text: string, width: number, yPosition: number, charset: Charset);
    protected reset(): void;
    animate(): void;
    paint(buffer: CanvasRenderingContext2D): void;
}
