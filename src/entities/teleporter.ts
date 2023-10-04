import Room from "../rooms/room";
import {Reward} from "./reward";
import {centeredAnchor} from "../utils/sprite";
import {wallHeight} from "../utils/utils";
import {Player} from "./player";
import BattleRoom from "../rooms/battleRoom";
import Game from "../game";
import {GameEntity} from "../engine/game-object";
import {Coordinate} from "../engine/vector";

class Teleporter extends GameEntity{

    toRoom: Room

    constructor(x: number, toRoom: Room) {
        super({position: new Coordinate(x, wallHeight), anchor: centeredAnchor, width: 80, height: 4});
        this.toRoom = toRoom
        this.addChild(Sprite({width: 80, height: 4, color: "white", anchor: centeredAnchor}));

        if(toRoom instanceof BattleRoom && toRoom.reward){
            const go = GameObject({y: -24, scaleX: 3, scaleY: 3, opacity: 0.7, anchor: centeredAnchor})
            go.addChild(toRoom.reward)
            this.addChild(go);
        }
    }

    update(){
        super.update();
        if(collides(this, Player.getInstance())){
            Game.getInstance().goToRoom(this.toRoom)
        }
    }
}

export default Teleporter;