declare class Charset {
    static CHAR_WIDTH: number;
    static CHAR_HEIGHT: number;
    protected static CHARS_PER_ROW: number;
    chars: {};
    charlist: string;
    constructor();
    drawTo(buffer: ImageData, character: string, x: number, y: number): void;
    extractChars(imageMap: CanvasRenderingContext2D): Promise<void>;
    get(char: string): ImageData;
    load(imagefile: string, root: HTMLElement): Promise<void>;
}
