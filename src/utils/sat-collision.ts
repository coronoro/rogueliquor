import {Vector} from "../engine/vector";
import {EntityNode} from "../engine/nodes/entity";

class CollRect {
    x: number;
    y: number;
    obj: EntityNode;
    width: number;
    height: number;

    vertices!: Vector[]
    edges: Vector[] = []

    constructor(obj: EntityNode) {
        this.obj = obj;
        this.x = obj.world.x;
        this.y = obj.world.y;
        this.width = obj.width * Math.abs(obj.world.scaleX);
        this.height = obj.height * Math.abs(obj.world.scaleY);

        this.initVertices();
        this.initEdges();
    }

    initVertices() {
        const topLeft = new Vector(
            this.x - this.obj.anchor.x * this.width,
            this.y - this.obj.anchor.y * this.height,
        )
        const topRight = new Vector(topLeft.x + this.width, topLeft.y);
        const bottomLeft = new Vector(topLeft.x, topLeft.y + this.height);
        const bottomRight = new Vector(topLeft.x + this.width, topLeft.y + this.height);

        this.vertices = [
            this.rotatedCoordFromPivot(topRight),
            this.rotatedCoordFromPivot(bottomRight),
            this.rotatedCoordFromPivot(bottomLeft),
            this.rotatedCoordFromPivot(topLeft),
        ]
    }

    rotatedCoordFromPivot(coord: Vector) {
        const vec = new Vector(coord.x - this.x, coord.y - this.y)
        const distance = new Vector(this.x, this.y).distance(coord);
        const originalAngle = Math.atan2(vec.y, vec.x);

        // return coord;
        return new Vector(
            this.x + distance * Math.cos(originalAngle + this.obj.world.rotation),
            this.y + distance * Math.sin(originalAngle + this.obj.world.rotation)
        )
    }

    initEdges() {
        let i = 0;
        while (i < this.vertices.length) {
            const a = this.vertices[i]
            const b = this.vertices[(i + 1) % this.vertices.length]

            this.edges.push(new Vector(a.x - b.x, a.y - b.y))
            i++;
        }
    }
}

function sat(rect1: CollRect, rect2: CollRect) {
    let perpendicularLine = null;
    let dot = 0;
    const perpendicularStack = [];
    let amin = null;
    let amax = null;
    let bmin = null;
    let bmax = null;

    //Work out all perpendicular vectors on each edge for polygonA
    for (var i = 0; i < rect1.edges.length; i++) {
        perpendicularLine = new Vector(-rect1.edges[i].y, rect1.edges[i].x);
        perpendicularStack.push(perpendicularLine);
    }

    //Work out all perpendicular vectors on each edge for polygonB
    for (var i = 0; i < rect2.edges.length; i++) {
        perpendicularLine = new Vector(-rect2.edges[i].y, rect2.edges[i].x);
        perpendicularStack.push(perpendicularLine);
    }

    //Loop through each perpendicular vector for both polygons
    for (var i = 0; i < perpendicularStack.length; i++) {
        //These dot products will return different values each time
        amin = null;
        amax = null;
        bmin = null;
        bmax = null;

        /*Work out all of the dot products for all of the vertices in PolygonA against the perpendicular vector
        that is currently being looped through*/
        for (var j = 0; j < rect1.vertices.length; j++) {
            dot = rect1.vertices[j].x * perpendicularStack[i].x + rect1.vertices[j].y * perpendicularStack[i].y;
            //Then find the dot products with the highest and lowest values from polygonA.
            if (amax === null || dot > amax) amax = dot;
            if (amin === null || dot < amin) amin = dot;
        }

        /*Work out all of the dot products for all of the vertices in PolygonB against the perpendicular vector
        that is currently being looped through*/
        for (var j = 0; j < rect2.vertices.length; j++) {
            dot = rect2.vertices[j].x * perpendicularStack[i].x + rect2.vertices[j].y * perpendicularStack[i].y;
            //Then find the dot products with the highest and lowest values from polygonB.
            if (bmax === null || dot > bmax) bmax = dot;
            if (bmin === null || dot < bmin) bmin = dot;
        }

        //If there is no gap between the dot products projection then we will continue onto evaluating the next perpendicular edge.
        if ((amin! < bmax! && amin! > bmin!) ||
            (bmin! < amax! && bmin! > amin!)) {
            continue;
        }
        //Otherwise, we know that there is no collision for definite.
        else {
            return false;
        }
    }

    /*If we have gotten this far. Where we have looped through all of the perpendicular edges and not a single one of there projections had
    a gap in them. Then we know that the 2 polygons are colliding for definite then.*/
    return true;
}

function collidesWithRotation(obj1: EntityNode, obj2: EntityNode): boolean {
    return sat(new CollRect(obj1), new CollRect(obj2));
}


export {collidesWithRotation, CollRect}



