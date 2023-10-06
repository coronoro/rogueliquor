import {Player} from "../entities/player";
import PlayerHealthBar from "../gui/playerHealthBar";
import {getCanvasHeight, getCanvasWidth, wallHeight} from "../utils/utils";
import Room from "./room";
import MuteIcon from "../gui/muteIcon";
import {Coordinate} from "../engine/vector";
import {SpriteNode} from "../engine/nodes/sprite";


class GameRoom extends Room {

    constructor() {
        super();
        this.components.player = [Player.getInstance()]
        this.gui.push(new PlayerHealthBar(new Coordinate(20, getCanvasHeight() - 30)))
        this.gui.push(new MuteIcon({position: new Coordinate(20, 20)}))
        this.backgroundObjects.push(new SpriteNode({width: getCanvasWidth(), height: wallHeight, color: "#555"}))
    }

    init() {
        Player.getInstance().setRoom(this);
        Player.getInstance().position = new Coordinate(getCanvasWidth() / 2, getCanvasHeight() * 0.92)
    }
}

export default GameRoom;