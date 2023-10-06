import {Player} from "../entities/player";
import {rewardFactory} from "../utils/reward-util";
import {HealthReward} from "../entities/reward";
import {Coordinate} from "../engine/vector";
import {EntityNode} from "../engine/nodes/entity";
import {TextNode} from "../engine/nodes/text";

export default class RewardDisplay extends EntityNode {

    rewardMap = new Map<string, TextNode>()
    player: Player

    constructor(player: Player) {
        super({position: new Coordinate(570, 530)});
        this.player = player
        let i = 0
        rewardFactory().forEach((func) => {
            const reward = func()
            if (reward instanceof HealthReward) {
                return;
            }
            reward.position.x = 40 * i
            reward.position.y = 5
            reward.setScale(1.5, 1.5);
            this.addChild(reward)
            const text = new TextNode({text: `x 0`, font: '12px Verdana', color: "white", position: new Coordinate(10 + (40 * i), 0)})
            this.addChild(text)
            i = i + 1
            this.rewardMap.set(reward.status.name, text)
        })
    }

    updateRewardMap() {
        this.player.rewards.forEach((value, key) => {
            const text = this.rewardMap.get(key)
            if (text)
                text.text = `x ${value.length}`
        })
    }

    update(delta: number) {
        this.updateRewardMap()
        super.update(delta);
    }
}