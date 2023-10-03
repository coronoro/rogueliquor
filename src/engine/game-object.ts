import {Vector} from "./vector";

interface GameObject {
    update(delta: number): void;
}

export class GameEntity implements GameObject {
    position: Vector = new Vector(0, 0)
    scaleX: number = 1
    scaleY: number = 1
    width: number = 0
    height: number = 0

    update(delta: number) {
        this.draw();
    }

    draw() {

    }
}