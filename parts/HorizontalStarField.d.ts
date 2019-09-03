declare class HorizontalStarField extends StarField {
    protected direction: number;
    protected randomizeStar(s: Star): void;
    protected moveStars(): void;
}
