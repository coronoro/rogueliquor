import {getCanvasHeight, getCanvasWidth} from "../utils/utils";
import {Timer} from "./timer";
import Game from "../game";
import {Coordinate} from "../engine/vector";
import {TextNode} from "../engine/nodes/text";
import {EntityNode} from "../engine/nodes/entity";
import {SpriteNode} from "../engine/nodes/sprite";

class ChatBox extends EntityNode {
    currentTextId: number = 0;
    text: TextNode
    texts: string[] = []
    canContinue: boolean = false;

    keyPressTimer: Timer = new Timer(25, () => {
        this.canContinue = true;
    })
        .start()

    constructor(texts: string[]) {
        super({position: new Coordinate(getCanvasWidth() / 2 - 200, getCanvasHeight() - 120)})
        this.text = new TextNode({
            position: new Coordinate(10, 10),
            width: 380,
            text: texts[this.currentTextId],
            color: "white",
            font: '18px Verdana'
        })
        this.addChild(
            new SpriteNode({width: 400, height: 80, color: "white"}),
            new SpriteNode({position: new Coordinate(2, 2), width: 396, height: 76, color: "black"}),
            this.text
        )
    }

    update() {
        this.keyPressTimer.update();
        if (this.canContinue && keyPressed(["e"])) {
            if (this.currentTextId < this.texts.length - 1) {
                this.canContinue = false;
                this.keyPressTimer.start();
                this.text.text = this.texts[++this.currentTextId];
            } else {
                Game.getInstance().endChat();
            }
        }
    }
}

export default ChatBox;