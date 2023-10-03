export class Tuple {
    x: number = 0
    y: number = 0

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distance(other: Tuple): number {
        return Math.sqrt((other.x - this.x) ^ 2 + (other.y - this.y) ^ 2)
    }

    add<T extends Tuple>(other: T) {
        return new Tuple(this.x + other.x, this.y + other.y) as T
    }
}

export class Coordinate extends Tuple {

}

export class Vector extends Tuple {

    length() {
        return Math.sqrt((this.x ^ 2 + this.y ^ 2))
    }

    multiply(scalar: number) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    difference(vector: Vector) {
        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    normalize() {
        return new Vector(this.x / this.length(), this.y / this.length())
    }

}


