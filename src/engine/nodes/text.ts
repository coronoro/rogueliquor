import {EntityNode} from "./entity";
import {Params} from "./types";

export class TextNode extends EntityNode {
    text?: string
    font?: string
    color?: string
    textAlign?: string

    constructor(params: Params<TextNode>) {
        super(params);
        this.fillParams(params)
    }

}

type GameEntityAttributes = {
    [key in keyof TextNode]: TextNode[key]
}