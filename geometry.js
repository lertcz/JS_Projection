import bresenham, { MidPoint } from "./draw.js";

export class Point {
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

export function connectPoints(i, j, points) {
    // ! in bresenham problem with decimal numbers
    bresenham(points[i], points[j], "#FFFF00")
}

export function rotateX(angle) {
    return [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ]
}

export function rotateY(angle) {
    return [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ]
}

export function rotateZ(angle) {
    return [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [1, 0, 0]
    ]
}