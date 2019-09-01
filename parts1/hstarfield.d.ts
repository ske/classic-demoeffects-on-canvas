/// <reference path="starfield.d.ts" />
declare class HStarfield extends Starfield {
    readonly direction: number;
    constructor(w: number, h: number, preInitPositions?: boolean, direction?: number);
    protected pregenerateStars(): void;
    protected moveStars(): void;
    protected randomizeStar(star: Star): void;
    protected throwStars(): void;
}
