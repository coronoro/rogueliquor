import {Player} from "../entities/player";
import HealthBar from "./healthBar";
import {TextNode} from "../engine/nodes/text";
import {Coordinate} from "../engine/vector";

class PlayerHealthBar extends HealthBar {
    text: TextNode

    constructor(position: Coordinate) {
        super({position: position, width: 132, height: 12}, Player.getInstance());
        this.text = new TextNode({width: this.width, text: '', font: '11px Verdana', color: "white", textAlign: "center"})
        this.addChild(this.text)
        // this.update();
    }

    update(delta: number) {
        super.update(delta);
        this.text.text = `${Math.ceil(this.character.health)} / ${this.character.maxHealth}`
    }
}

export default PlayerHealthBar;