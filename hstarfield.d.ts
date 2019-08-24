/// <reference path="common.d.ts" />
/// <reference path="starfield.d.ts" />
declare class HStarfield extends Starfield {
    readonly direction: number;
    protected moveStars(): void;
    protected randomizeStar(star: Star): void;
    protected throwStars(): void;
}
