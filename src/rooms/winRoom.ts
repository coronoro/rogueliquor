import GameRoom from "./gameRoom";
import CatharPerfect from "../entities/npcs/catharPerfect";
import {getCanvasCenter, getCanvasHeight, getCanvasWidth} from "../utils/utils";
import Interactable from "../entities/interactable";
import {Timer} from "../entities/timer";
import {centeredAnchor} from "../utils/sprite";
import {Coordinate, Tuple} from "../engine/vector";
import {SpriteNode} from "../engine/nodes/sprite";
import {TextNode} from "../engine/nodes/text";

class WinRoom extends GameRoom {
    constructor() {
        super();
        this.interactables.push(
            new Interactable(
                new Coordinate(getCanvasWidth() / 2, getCanvasHeight() / 2),
                new CatharPerfect({position: new Coordinate(0, 0)}, this)
            )
        )
    }

    startEnd() {
        const s = new SpriteNode({width: getCanvasWidth(), height: getCanvasHeight(), color: "white", opacity: 0})
        this.gui.push(s);
        let timer = new Timer(280, () => {
            this.gui.push(
                new TextNode({position: getCanvasCenter(), text: "Cathar", font: "58px Verdana", textAlign: "center", anchor: centeredAnchor})
            )
            timer2.start();
        }).start();

        const timer2 = new Timer(120, () => {
            this.gui.push(
                new TextNode({position: new Coordinate(getCanvasWidth() / 2, getCanvasHeight() / 1.6), text: "Thanks for Playing", font: "23px Verdana", textAlign: "center", anchor: centeredAnchor})
            )
        })

        this.update = () => {
            timer.update();
            timer2.update();
            s.opacity += 0.005;
        }
    }
}

export default WinRoom;