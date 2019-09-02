declare class Star {
    x: number;
    y: number;
    z: number;
    speed: number;
    active: boolean;
    reset(): void;
}
declare class StarField {
    protected viewDistance: number;
    protected maxSpeed: number;
    protected maxDistance: number;
    protected maxStars: number;
    protected stars: Star[];
    protected width: number;
    protected height: number;
    protected yPosition: number;
    protected tmpBuffer: ImageData;
    constructor(width: number, height: number, yPosition?: number);
    protected randomizeStar(s: Star): void;
    protected generateStars(): void;
    protected moveStars(): void;
    protected throwStars(): void;
    animate(): void;
    paint(buffer: CanvasRenderingContext2D): void;
}
