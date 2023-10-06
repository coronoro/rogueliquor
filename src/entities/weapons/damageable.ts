import {Entity} from "../entity";
import {Character} from "../character";
import {collidesWithRotation} from "../../utils/sat-collision";
import {SpriteNode} from "../../engine/nodes/sprite";
import {EntityNode} from "../../engine/nodes/entity";
import {Params} from "../../engine/nodes/types";

export class Damageable extends Entity {
    isAttacking: boolean = false;
    standardDamage: number = 0;
    sprite: SpriteNode;
    owner!: Character;
    destroyOnCollision: boolean = false;
    target?: Character;

    constructor(config: Params<EntityNode>, sprite: SpriteNode) {
        super(config)
        this.sprite = sprite;
        this.addChild(this.sprite);
    }

    update(delta: number) {
        super.update(delta);
        this.checkForHit();
    }

    damage = () => this.standardDamage * this.owner.strength;

    checkForHit() {
        if (!this.isAttacking) return;
        this.owner.targets().forEach(target => {
            if (target.dashing) return;
            if (collidesWithRotation(this, target)) {
                target.takeDamage(this.damage())
                this.removeFlag = this.destroyOnCollision;
            }
        });
    }
}