import {centeredAnchor} from "../utils/sprite";
import Room from "../rooms/room";
import {getCanvasHeight, getCanvasWidth, wallHeight} from "../utils/utils";
import {Coordinate, Vector} from "../engine/vector";
import {EntityNode} from "../engine/nodes/entity";

export class Entity extends EntityNode {
    // movingTo: Vector = Vector(this.x, this.y);
    movingTo: Vector = new Vector(0, 0);
    speed: number = 2;
    removeFlag: boolean = false;
    lookingDirection: number = 1;
    moving: boolean = false;
    anchor = centeredAnchor;

    inbound: boolean = false;

    room?: Room

    setRoom(room: Room) {
        this.room = room
    }

    update(delta: number) {
        super.update(delta);
        this.updateLookingDirection();
        this.updateMoving();
    }

    updateMoving() {
        if (this.inbound) {
            const xDelta = this.width * Math.abs(this.scaleX) / 2
            const yDelta = this.height * Math.abs(this.scaleY) / 2
            this.movingTo.x = Math.min(Math.max(xDelta, this.movingTo.x), getCanvasWidth() - xDelta)
            this.movingTo.y = Math.min(Math.max(yDelta + wallHeight, this.movingTo.y), getCanvasHeight() - yDelta)
        }

        const distance = Math.min(this.movingTo.distance(this.position), this.currentSpeed());
        this.moving = distance != 0 && this.canMove();
        if (!this.moving) return;

        if (distance < this.currentSpeed()) {
            this.position = this.movingTo.toCoordinate()
        } else {
            const direction = this.movingTo.normalize();
            this.position = this.position.add(direction.multiply(distance))
        }
    }

    // setPos = (x: number, y: number) => {
    //     this.position = new Coordinate(x, y)
    //     this.movingTo = Vector(x, y);
    // }

    canMove() {
        return true;
    }

    updateLookingDirection() {
        if (this.getLookingDirection() == 0 || this.getLookingDirection() == this.lookingDirection) return;
        this.lookingDirection *= -1;
        this.scaleX *= -1;
    }

    distanceTo = (other: Entity): number => this.position.distance(other.position);

    moveTo(position: Coordinate, distance: number = 0) {
        const direction = position.normalize();
        distance = distance == 0 ? this.currentSpeed() : distance;
        this.movingTo = this.position.add(direction.multiply(distance))
    }

    getLookingDirection(): number {
        return Math.sign(this.movingTo.x - this.position.x);
    }

    currentSpeed = () => this.speed;
}