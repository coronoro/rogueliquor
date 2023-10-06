import BattleRoom from "../rooms/battleRoom";
import {spawningPattern} from "../entities/enemies/spawning-pattern";
import {Coordinate} from "../engine/vector";
import {EntityNode} from "../engine/nodes/entity";
import {TextNode} from "../engine/nodes/text";

export default class StageDisplay extends EntityNode {
    text: TextNode
    room: BattleRoom

    constructor(room: BattleRoom) {
        super({position: new Coordinate(650, 20)});
        this.room = room
        this.text = new TextNode({text: `Stage ${room.level}`, font: '17px Verdana', color: "black"})
        this.addChild(this.text)
    }

    update(delta: number) {
        super.update(delta);
        this.text.text = `Stage ${this.room.level}/${spawningPattern.length}`
    }
}
