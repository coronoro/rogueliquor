import HealthBar from "./healthBar";
import {Enemy} from "../entities/enemies/enemy";
import {getCanvasCenter} from "../utils/utils";
import {TextNode} from "../engine/nodes/text";
import {Coordinate} from "../engine/vector";

class BossHealthBar extends HealthBar {
    constructor(y: number, boss: Enemy) {
        super({position: new Coordinate(getCanvasCenter().x - 100, y), width: 200, height: 4}, boss)
        this.addChild(new TextNode({position: new Coordinate(0, -20), text: boss.name, font: '16px Verdana', textAlign: 'center', width: this.width}))
    }
}

export default BossHealthBar;