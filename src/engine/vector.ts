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

    add<T extends Tuple>(other: Tuple) {
        return new Tuple(this.x + other.x, this.y + other.y) as T
    }
}

export class Coordinate extends Tuple {

    /**
     * returns the Vector that lies between two points
     * @param coordinate
     */
    getDisplacementVector(coordinate: Coordinate) {
        return new Vector(this.x - coordinate.x, this.y - coordinate.y)
    }
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

    rotate(radiant: number) {
        return new Vector(Math.cos(radiant) * this.x - Math.sin(radiant) * this.y,
            Math.sin(radiant) * this.x + Math.cos(radiant) * this.y)
    }

    toCoordinate(): Coordinate {
        return new Coordinate(this.x, this.y)
    }
}


