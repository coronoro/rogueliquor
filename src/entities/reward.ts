import {centeredAnchor, getSpriteById} from "../utils/sprite";
import {PenColor} from "../utils/colorize";
import {StatusAttributes} from "./status-attributes";
import {Entity} from "./entity";
import {MAX_HEALTH_REWARD, RewardStatus} from "../utils/reward-util";
import {Character} from "./character";
import {Weapon} from "./weapons/weapon";
import {SpriteNode} from "../engine/nodes/sprite";
import {EntityNode} from "../engine/nodes/entity";

export type StatusReward = Partial<StatusAttributes>;


class Reward extends EntityNode {
    sprite: SpriteNode;
    oldGod: boolean;
    text?: string;
    status: RewardStatus

    constructor(status: RewardStatus, iconId?: number, text?: string, oldGod: boolean = false) {
        super({anchor: centeredAnchor})
        this.status = status
        this.sprite = getSpriteById(iconId!, PenColor.None);
        this.text = text;
        this.oldGod = oldGod;

        this.addChild(this.sprite);
    }

    getText() {
        return `A Gift from the ${this.oldGod ? "old" : "new"} God.\n\n${this.text}`
    }
}

class MaxHealthReward extends Reward {

}

class HealthReward extends Reward {
    constructor() {
        super({}, 10)
        this.text = "Heal 50 life points"
    }

    apply(character: Character) {
        character.health += 50;
    }
}

class WeaponReward extends Reward {
    weapon: Weapon;

    constructor(weapon: Weapon) {
        super(undefined, 0);
        this.setScale(1.5, 1.5)
        this.removeChild(this.sprite);
        this.sprite = weapon.sprite;
        this.weapon = weapon;
        this.addChild(this.sprite)
    }

    getText() {
        return `You received a new Weapon.`
    }
}

export {Reward, HealthReward, WeaponReward, MaxHealthReward}