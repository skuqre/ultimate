/**
 * Calculate the time with the amount of letters. Excludes spaces and line breaks.
 * @param { String } text 
 * @returns Int
 */
function calcLength(text) {
    return text.trim().replaceAll(" ", "").replaceAll("\n", "").length * 4 / 60;
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function getLinesForParagraphs(ctx, text, maxWidth) {
    let ass = text.split("\n").map(para => getLines(ctx, para, maxWidth))
    let res = []

    for (let i = 0; i < ass.length; i++) {
        for (let j = 0; j < ass[i].length; j++) {
            res.push(ass[i][j]);
        }
    }

    return res;
}

function lerp(a, b, alpha) {
    return a + alpha * (b - a);
}

function mouseOver(id, event) {
    const element = document.getElementById(id);
    const rect = element.getBoundingClientRect();

    return ((event.clientX >= rect.x && event.clientX <= rect.x + rect.width) &&
        (event.clientY >= rect.y && event.clientY <= rect.y + rect.height));
}

const PIXELS_PER_SECOND = 48;

function secondsToPixel(seconds, zoom) {
    return seconds * (PIXELS_PER_SECOND * zoom);
}

function pixelsToSeconds(pixels, zoom) {
    return pixels / (PIXELS_PER_SECOND * zoom);
}

function formatTime(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m + ":";
    var sDisplay = s.toString().padStart(2, "0");
    return hDisplay + mDisplay + sDisplay; 
}
