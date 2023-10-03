import {Character} from "../../character";
import {Spell} from "./spell";
import Game from "../../../game";
import SpawnSpell from "./spawnSpell";
import {GameEntity} from "../../../engine/game-object";
import {Coordinate} from "../../../engine/vector";

class SpellCaster extends GameEntity {
    private owner: Character;
    private spellFactories: any[];

    constructor(position: Coordinate, owner: Character, spellFactories: any[]) {
        super({position: position});
        this.owner = owner
        this.spellFactories = spellFactories;
    }

    cast(): Spell {
        let spell = undefined;
        while (spell === undefined) {
            const s = this.spellFactories[randInt(0, this.spellFactories.length - 1)](this).start();
            if (this.owner.room.enemies.length > 4 && s instanceof SpawnSpell) {
                continue;
            }
            spell = s;
        }
        Game.getInstance().currentRoom.addSpell(spell);
        return spell;
    }
}

export default SpellCaster