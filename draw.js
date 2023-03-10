var canvas = document.querySelector('#my-canvas');
var context = canvas.getContext('2d');

export function drawPixel(x, y, color="#FFFF00") {
    // Math.round() used to decrease smoothing when numbers have decimal parts.
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    context.fillStyle = color;
    context.fillRect(roundedX, roundedY, 1, 1);
}

export default function bresenham(start, end, color="#FFFF00") {
    /* let [x1, y1] = start
    let [x2, y2] = end */
    let x1 = Math.round(start[0])
    let y1 = Math.round(start[1])
    let x2 = Math.round(end[0])
    let y2 = Math.round(end[1])
    
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;

    let failsafe = 200
    while(failsafe != 0) {
        drawPixel(x1, y1, color);

        if (x1 === x2 && y1 === y2) break;
        var e2 = 2*err;
        if (e2 > -dy) {
            err -= dy;
            x1  += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1  += sy;
        }
        failsafe--
    }
}

export function drawDot(x, y, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(Math.round(x), Math.round(y), 3 , 0, 2 * Math.PI);
    context.fill();
}

export function MidPoint(start, end, color="#FFFF00") {
    // distance in point < 1
    if (Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)) < .1) {
        return
    }
    let middle = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2]
    
    drawPixel(middle[0], middle[1], color)
    MidPoint(start, middle, color)
    MidPoint(middle, end, color)
}