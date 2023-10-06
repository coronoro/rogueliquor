import {EntityNode} from "./entity";
import {Spritesheet} from "../spritesheet";
import {TextNode} from "./text";
import {Params} from "./types";

export class SpriteNode extends EntityNode {
    color?: string
    animations?: Spritesheet

    constructor(params: Params<SpriteNode>) {
        super();
        this.fillParams(params)
    }
}


type GameEntityAttributes = {
    [key in keyof SpriteNode]: SpriteNode[key]
}
export type TextParams = Partial<GameEntityAttributes>