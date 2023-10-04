import {Coordinate, Vector} from "./vector";

export interface GameObject {
    update(delta: number): void;

    addChild(child: GameObject): void;
}

export class GameEntity implements GameObject {
    position: Coordinate = new Coordinate(0, 0)
    scaleX: number = 1
    scaleY: number = 1
    width: number = 0
    height: number = 0

    rotation = 0
    children: GameObject[] = []

    constructor(object: Partial<GameEntityParam>) {
        Object.keys(object).forEach((key ) => {
            // @ts-ignore //TODO make this better
            this[key] = object[key]
        })
    }

    update(delta: number) {
        this.children.forEach((child) => child.update(delta))
        this.draw();
    }

    draw() {

    }

    addChild(child: GameObject) {
        this.children.push(child);
    }
}

type GameEntityParam = {
    [key in keyof GameEntity]: GameEntity[key]
}