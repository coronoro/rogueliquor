import {Character} from "../entities/character";
import {SpriteNode} from "../engine/nodes/sprite";
import {EntityNode} from "../engine/nodes/entity";
import {Params} from "../engine/nodes/types";

class HealthBar extends EntityNode {
    bar: SpriteNode
    character: Character

    constructor(config: Params<EntityNode>, character: Character) {
        super(config)
        this.character = character
        this.bar = new SpriteNode({width: this.width, height: this.height, color: "#aa0000"});
        this.addChild(new SpriteNode({width: this.width, height: this.height, color: "#000000"}));
        this.addChild(this.bar);
    }

    update(delta: number) {
        super.update(delta);
        this.bar.width = this.width * (this.character.health / this.character.maxHealth)
    }
}

export default HealthBar;