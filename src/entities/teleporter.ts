import Room from "../rooms/room";
import {centeredAnchor} from "../utils/sprite";
import {wallHeight} from "../utils/utils";
import {Player} from "./player";
import BattleRoom from "../rooms/battleRoom";
import Game from "../game";
import {Coordinate} from "../engine/vector";
import {SpriteNode} from "../engine/nodes/sprite";
import {EntityNode} from "../engine/nodes/entity";

class Teleporter extends EntityNode {

    toRoom: Room

    constructor(x: number, toRoom: Room) {
        super({position: new Coordinate(x, wallHeight), anchor: centeredAnchor, width: 80, height: 4});
        this.toRoom = toRoom
        this.addChild(new SpriteNode({width: 80, height: 4, color: "white", anchor: centeredAnchor}));

        if (toRoom instanceof BattleRoom && toRoom.reward) {
            const go = new EntityNode({position: new Coordinate(0, -24), scaleX: 3, scaleY: 3, opacity: 0.7, anchor: centeredAnchor})
            go.addChild(toRoom.reward)
            this.addChild(go);
        }
    }

    update(delta: number) {
        super.update(delta);
        if (collides(this, Player.getInstance())) {
            Game.getInstance().goToRoom(this.toRoom)
        }
    }
}

export default Teleporter;