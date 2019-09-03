declare class Charset {
    static CHAR_WIDTH: number;
    static CHAR_HEIGHT: number;
    protected static CHARS_PER_ROW: number;
    chars: {};
    charlist: string;
    constructor();
    draw(buffer: CanvasRenderingContext2D, character: string, x: number, y: number): void;
    protected extract(imageMap: CanvasRenderingContext2D): void;
    get(char: string): ImageData;
    load(imagefile: string, root: HTMLElement): Promise<void>;
}
