import {SmallDagger} from "../entities/weapons/daggers";
import Interactable from "../entities/interactable";
import {getCanvasCenter, getCanvasHeight, getCanvasWidth} from "../utils/utils";
import Teleporter from "../entities/teleporter";
import BattleRoom from "./battleRoom";
import {getRewards} from "../utils/reward-util";
import GameRoom from "./gameRoom";
import CatharPerfect from "../entities/npcs/catharPerfect";
import RewardDisplay from "../gui/reward-display";
import {Coordinate} from "../engine/vector";
import {TextNode} from "../engine/nodes/text";

class StartRoom extends GameRoom {
    constructor() {
        super();
        this.addInteractable(new Interactable(getCanvasCenter(), new SmallDagger()))
        this.backgroundObjects.push(new Teleporter(getCanvasWidth() / 2, new BattleRoom(getRewards(-1, 1)[0])));
        this.backgroundObjects.push(new TextNode({position: new Coordinate(12, 72), text: "Move: WASD\n\nAttack: Leftclick\n\nDash: Space\n\nInteract: e\n\nMute: m", font: '15px Arial', color: "white"}))
        this.interactables.push(new Interactable(new Coordinate(getCanvasWidth() / 2.5, getCanvasHeight() / 4), new CatharPerfect({position: new Coordinate(0, 0)}, this)))

        this.gui.push(new RewardDisplay(this.components.player[0]))

    }
}


export default StartRoom;