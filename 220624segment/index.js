import { IndexedTree } from './indexedtree.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const res = document.querySelector('#res');
const rects = [];
const infoRects = [];
const tree = new IndexedTree(canvas.height, infoRects);
let draw = {
    pos: [-1, -1, -1, -1],
    color: '#000000',
};
function drawing(draw) {
    ctx.save();
    ctx.fillStyle = draw.color;
    const x = Math.min(draw.pos[0], draw.pos[2]);
    const y = Math.min(draw.pos[1], draw.pos[3]);
    const w = Math.abs(draw.pos[0] - draw.pos[2]);
    const h = Math.abs(draw.pos[1] - draw.pos[3]);
    ctx.fillRect(x, y, w, h);
    ctx.restore();
}
function changePos(draw) {
    const sx = Math.min(draw.pos[0], draw.pos[2]);
    const sy = Math.min(draw.pos[1], draw.pos[3]);
    const ex = Math.max(draw.pos[0], draw.pos[2]);
    const ey = Math.max(draw.pos[1], draw.pos[3]);
    const pos = [sx, sy, ex, ey];
    return {
        pos, color: draw.color
    };
}
const isDrawStart = () => draw.pos.every(v => v === -1);
canvas.addEventListener('mousemove', e => {
    if (e.buttons % 2 === 1) {
        if (isDrawStart()) {
            draw.pos = [e.offsetX, e.offsetY, e.offsetX, e.offsetY];
            draw.color = `#${Math.floor(Math.random() * 256 ** 3).toString(16).padStart(6, '0')}`;
        }
        else {
            draw.pos = [...draw.pos.slice(0, 2), e.offsetX, e.offsetY];
        }
    }
    else {
        if (isDrawStart())
            return;
        const rect = changePos(draw);
        // console.log(`너비 : ${(rect.pos[2] - rect.pos[0]) * (rect.pos[3] - rect.pos[1])}, x1 : ${rect.pos[0]}, x2 : ${rect.pos[2]}, y1 : ${rect.pos[1]}, y2 : ${rect.pos[3]}`);
        rects.push(rect);
        infoRects.push(rect);
        infoRects.sort((a, b) => a.pos[0] - b.pos[0]);
        draw = {
            pos: [-1, -1, -1, -1],
            color: '#000000'
        };
        res.innerHTML = `총 너비 : ${tree.update()}`;
    }
});
const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rects.forEach(drawing);
    if (!isDrawStart())
        drawing(draw);
    requestAnimationFrame(loop);
};
loop();
