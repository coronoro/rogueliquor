export interface GameObject {
    update(delta: number): void;

    addChild(child: GameObject): void;
}