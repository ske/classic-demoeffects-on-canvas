declare class Star {
    start: Point3D;
    position: Point3D;
    speed: number;
    active: Boolean;
    constructor();
    reset(): void;
}
declare class Starfield {
    stars: Star[];
    readonly maxStars: number;
    readonly maxSpeed: number;
    readonly maxZ: number;
    readonly startZ: number;
    readonly zOverrun: number;
    readonly width: number;
    readonly height: number;
    buffer: ImageData;
    constructor(w: number, h: number);
    clearBuffer(): void;
    animate(): void;
    paint(screen: CanvasRenderingContext2D): void;
    protected randomizeStar(star: Star): void;
    protected generateStars(): void;
    protected moveStars(): void;
    protected throwStars(): void;
    protected drawStar(p: Point2D, c: Color, phase?: number): void;
}
