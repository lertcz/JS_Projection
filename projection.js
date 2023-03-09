import { Vector3, Mesh } from "./geometry.js"
import { multiply, delay } from "./functions.js";

var canvas = document.querySelector('#my-canvas');
var context = canvas.getContext('2d');

window.addEventListener('load', function () {
    clearCanvas()
    initCube()
    display()
})

function clearCanvas() {
    context.fillStyle = "#000"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

let scale = 100
let angle = 0
let circle_pos = [canvas.width/2, canvas.height/2]
let projection_matrix = [
    [1, 0, 0],
    [0, 1, 0]
]

let cube = new Mesh("Cube", 8)
function initCube() {
    cube.points[0] = new Vector3(-1, -1, 1)
    cube.points[1] = new Vector3(1, -1, 1)
    cube.points[2] = new Vector3(1, 1, 1)
    cube.points[3] = new Vector3(-1, 1, 1)
    cube.points[4] = new Vector3(-1, -1, -1)
    cube.points[5] = new Vector3(1, -1, -1)
    cube.points[6] = new Vector3(1, 1, -1)
    cube.points[7] = new Vector3(-1, 1, -1)
}

async function display() {
    while (true) {
        clearCanvas()

        let rotation_z = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [1, 0, 0]
        ]
        let rotation_y = [
            [Math.cos(angle), 0, Math.sin(angle)],
            [0, 1, 0],
            [-Math.sin(angle), 0, Math.cos(angle)]
        ]
        let rotation_x = [
            [1, 0, 0],
            [0, Math.cos(angle), -Math.sin(angle)],
            [0, Math.sin(angle), Math.cos(angle)]
        ]
    
        angle += 0.01

        context.fillStyle = "#FFFF00";
        cube.points.forEach((point) => {
            let rotated2d = multiply(rotation_x, [[point.X], [point.Y], [point.Z]])
            rotated2d = multiply(rotation_z, rotated2d)
            //rotated2d = multiply(rotation_y, rotated2d)
            let projected2d = multiply(projection_matrix, rotated2d)
    
            let x = (projected2d[0][0] * scale) + circle_pos[0]
            let y = (projected2d[1][0] * scale) + circle_pos[1]
    
            context.beginPath();
            context.arc(x, y, 3 , 0, 2 * Math.PI);
            context.fill();
        })
        await delay(17)
    }
}