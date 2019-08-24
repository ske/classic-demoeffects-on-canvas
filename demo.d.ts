/// <reference path="starfield.d.ts" />
/// <reference path="hstarfield.d.ts" />
/// <reference path="sinusscroll.d.ts" />
/// <reference path="charset.d.ts" />
declare class Demo {
    canvas: HTMLCanvasElement;
    root: HTMLElement;
    screen: CanvasRenderingContext2D;
    starfield: Starfield;
    hstarfield: HStarfield;
    sinus: SinusScroll;
    doLoop: boolean;
    startFn: Function;
    firstInit: boolean;
    constructor(el: HTMLElement);
    protected init(): void;
    protected restart(): void;
    protected loop_starfield(): void;
    protected loop_hstarfield(): void;
    protected loop_sinusscroll(): void;
    start_starfield(): void;
    start_hstarfield(): void;
    start_sinusscroll(text: string): void;
}
