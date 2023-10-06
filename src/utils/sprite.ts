import {colorizeImage, PenColor} from "./colorize";
import {img} from "./utils";
import {SpriteNode} from "../engine/nodes/sprite";
import {Coordinate} from "../engine/vector";

function getSpriteById(id: number, color: PenColor = PenColor.Green, additional: object = {}, image = img): SpriteNode {
    return new SpriteNode({
        anchor: centeredAnchor,
        ...additional,
        animations: SpriteSheet({
            frameHeight: 8,
            frameWidth: 8,
            image: colorizeImage(image, color),
            animations: {
                i: {
                    frames: id
                }
            }
        }).animations
    });
}

const centeredAnchor = new Coordinate(0.5, 0.5)

export {getSpriteById, centeredAnchor};
