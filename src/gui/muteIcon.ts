import {getSpriteById} from "../utils/sprite";
import Game from "../game";
import {SpriteNode} from "../engine/nodes/sprite";
import {EntityNode} from "../engine/nodes/entity";
import {Params} from "../engine/nodes/types";

class MuteIcon extends EntityNode {
    sprite: SpriteNode;

    constructor(config: Params<EntityNode>) {
        super(config);
        this.setScale(3, 3);
        this.sprite = getSpriteById(5)
        this.addChild(this.sprite)
    }

    update() {
        if (Game.getInstance().mute) {
            this.sprite.opacity = 0.4;
        } else {
            this.sprite.opacity = 1;
        }
    }
}

export default MuteIcon