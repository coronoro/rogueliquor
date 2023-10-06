import {Coordinate} from "../vector";
import {GameObject} from "./game-object";
import {Params} from "./types";


export class EntityNode implements GameObject {
    position: Coordinate = new Coordinate(0, 0)
    scaleX: number = 1
    scaleY: number = 1
    width: number = 0
    height: number = 0

    rotation = 0
    anchor: Coordinate = new Coordinate(0.5, 0.5)
    opacity: number = 1

    children: GameObject[] = []

    constructor(object?: Params<EntityNode>) {
        this.fillParams(object)
    }

    protected fillParams(params: any) {
        if (params) {
            Object.keys(params).forEach((key) => {
                // @ts-ignore //TODO make this better
                this[key] = object[key]
            })
        }
    }

    update(delta: number) {
        this.children.forEach((child) => child.update(delta))
        this.draw();
    }

    draw() {

    }

    addChild(...child: GameObject[]) {
        this.children.concat(child);
    }
}

