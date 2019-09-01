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
declare const CopyBuffer: (fromBuffer: ImageData, toBuffer: ImageData, x: number, y: number) => void;
declare const ClearBuffer: (buffer: ImageData, c: Color) => void;
declare const PutPixel: (buffer: ImageData, p: Point2D, c: Color) => void;
