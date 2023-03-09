export class Vector3 {
    constructor(x, y, z) {
        this.X = x
        this.Y = y
        this.Z = z
    }
}

export class Mesh {
    constructor(name, numberOfPoitns) {
        this.name = name
        this.points = new Array(numberOfPoitns)
    }
}