import {Timer} from "../../timer";
import {centeredAnchor} from "../../../utils/sprite";

import {SpellParticle} from "./particles/spellParticle";
import SpellCaster from "./spellCaster";
import {Character} from "../../character";
import {ParticleType} from "./particles/particleTypes";
import {Coordinate} from "../../../engine/vector";
import {EntityNode} from "../../../engine/nodes/entity";

export class Spell extends EntityNode {
    spellCaster: SpellCaster
    owner: Character
    targets: Character[]
    isCasting: boolean = true;
    removeFlag: boolean = false;
    lifeTime: number = 50;
    castTime: number = 80;
    followsCaster: boolean = true;
    castTimer: Timer;
    particleType: ParticleType;

    constructor(spellCaster: SpellCaster, particleType: ParticleType) {
        super({anchor: centeredAnchor, scaleX: 8, scaleY: 8})
        this.spellCaster = spellCaster;
        this.particleType = particleType;
        this.doFollowSpellCaster();

        this.owner = spellCaster.owner;
        this.targets = this.owner.targets();

        this.castTimer = new Timer(0, () => {
            this.isCasting = false;
            this.getSpellParticles().forEach(c => c.activate(this.findTarget()));
        })
    }

    start() {
        this.castTimer.start(this.calculatedCastingTime())
        return this;
    }

    doFollowSpellCaster() {
        this.position = new Coordinate(this.spellCaster.world.x, this.spellCaster.world.y)
    }

    findTarget(): Character {
        return this.owner.targets()[0] ?? null;
    }

    calculatedCastingTime = () => this.castTime;

    getCastTimeout = () => Math.floor(this.calculatedCastingTime() * (5 / 4));

    getSpellParticles = (): SpellParticle[] => this.children.filter(c => c instanceof SpellParticle).map(c => c as SpellParticle);

    castingUpdate() {
        if (this.followsCaster) this.doFollowSpellCaster();
    }

    update(delta: number) {
        super.update(delta);
        this.castTimer.update();

        this.removeFlag = this.remove();
        if (this.removeFlag) this.onRemove()
        this.children = this.children.filter(c => !(c as SpellParticle).removeFlag)

        if (this.isCasting) this.castingUpdate();
        else this.lifeTime--;
    }

    onRemove = () => {
    }

    remove = () => !this.owner?.isAlive() || (!this.isCasting && (this.lifeTime <= 0 || this.getSpellParticles().length == 0));
}