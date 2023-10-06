import {Character} from "../character";
import {Damageable} from "./damageable";
import {Coordinate} from "../../engine/vector";
import {SpriteNode} from "../../engine/nodes/sprite";
import {EntityNode} from "../../engine/nodes/entity";
import {Params} from "../../engine/nodes/types";

export class Weapon extends Damageable {
    origin: Coordinate = new Coordinate(0, 0)
    spriteOrigin: Coordinate = new Coordinate(0, 0)
    doesWiggle: boolean = false;
    wiggleTime: number = 0;
    wiggleDir: number = 0.8;
    wiggleX: number = 0;

    constructor(config: Params<EntityNode>, sprite: SpriteNode) {
        super(config, sprite);
        this.origin = this.position;
        this.spriteOrigin = sprite.position
    }

    update(delta: number) {
        super.update(delta);
        if (this.doesWiggle) this.wiggle();
        if (this.isAttacking) this.runAttack();
    }

    startWiggle() {
        this.doesWiggle = true;
        this.wiggleTime = 0;
    }

    endWiggle() {
        this.doesWiggle = false;
        this.sprite.position = this.spriteOrigin
    }

    wiggle() {
        if (++this.wiggleTime % 7 == 0) {
            this.sprite.position.y += this.wiggleDir;
            this.sprite.position.x -= this.wiggleX;
            this.wiggleDir *= -1;
        }
    }

    tryToAttack(target?: Character) {
        if (this.canAttack()) this.startAttack(target);
    }

    canAttack(): boolean {
        return !this.isAttacking;
    }

    startAttack(target?: Character) {
        this.endWiggle();
        this.isAttacking = true;
        this.target = target;
    }

    endAttack() {
        this.isAttacking = false;
        this.target = undefined;
    }

    setOwner(owner: Character) {
        this.owner = owner;
    }

    runAttack() {
    }
}

