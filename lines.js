export default function drawPixel(x, y, color) {
    // Math.round() used to decrease smoothing when numbers have decimal parts.
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    context.fillStyle = color || '#000';
    context.fillRect(roundedX, roundedY, 1, 1);
}

export function bresenham(start, end) {
    let [x1, y1] = start
    let [x2, y2] = end
    
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;

    while(true) {
        drawPixel(x1, y1, "#FFFF00");

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
    }
}

export function MidPoint(start, end) {
    // distance in point < 1
    if (Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)) < .1) {
        return
    }
    let middle = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2]
    
    drawPixel(middle[0], middle[1], "#FFFF00")
    MidPoint(start, middle)
    MidPoint(middle, end)
}