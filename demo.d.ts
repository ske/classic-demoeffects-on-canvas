declare class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a?: number);
}
declare class Point2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
declare class Point3D {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
}
declare const GetPixel: (buffer: ImageData, p: Point2D) => Color;
declare const PutPixel: (buffer: ImageData, p: Point2D, c: Color) => void;
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
declare class HStarfield extends Starfield {
    readonly direction: number;
    protected moveStars(): void;
    protected randomizeStar(star: Star): void;
    protected throwStars(): void;
}
declare class Demo {
    canvas: HTMLCanvasElement;
    root: HTMLElement;
    screen: CanvasRenderingContext2D;
    buffer: ImageData;
    starfield2: Starfield;
    starfield: HStarfield;
    constructor(el: HTMLElement);
    loop(): void;
    start(): void;
}
