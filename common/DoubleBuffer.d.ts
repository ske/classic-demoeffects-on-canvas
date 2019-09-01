declare class DoubleBuffer {
    protected buffer1: ImageData;
    protected buffer2: ImageData;
    protected visibleIndex: number;
    protected activeIndex: number;
    protected w: number;
    protected h: number;
    setVisible(idx: number): void;
    setActive(idx: number): void;
    constructor(w: number, h: number);
    SwapBuffers(): void;
    clearBuffer(): void;
    getActive(): ImageData;
    getVisible(): ImageData;
}
