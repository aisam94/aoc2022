const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

const width = input[0].length;
const topEdge = 0;
const botEdge = input.length - 1;
const leftEdge = 0;
const rightEdge = width - 1;

function isTreeVisible(posX, posY) {
	const treeHeight = input[posY][posX];
	let visible_left, visible_right, visible_top, visible_bot;
	visible_left = visible_right = visible_top = visible_bot = true;

	// check left
	for (let x = 0;x < posX;x++) {
		if (input[posY][x] >= treeHeight) {
			visible_left = false;
			break;
		}
	}
	// check right
	for (let x = posX + 1;x < width;x++) {
		if (input[posY][x] >= treeHeight) {
			visible_right = false;
			break;
		}
	}
	// check top
	for (let y = 0;y < posY;y++) {
		if (input[y][posX] >= treeHeight) {
			visible_top = false;
			break;
		}
	}
	// check bottom
	for (let y = posY + 1;y < width;y++) {
		if (input[y][posX] >= treeHeight) {
			visible_bot = false;
			break;
		}
	}
	return visible_left || visible_right || visible_top || visible_bot;
}

function getVisibleTreesNum() {
	let visibleTreesNum = 0;
	for (let y = 0;y < input.length;y++) {
		for (let x = 0;x < input[y].length;x++) {
			if (y === topEdge || y === botEdge || x === leftEdge || x === rightEdge) {
				visibleTreesNum++;
				continue;
			}
			if (isTreeVisible(x, y)) {
				visibleTreesNum++;
			}
		}
	}
	return visibleTreesNum;
}

console.log(getVisibleTreesNum());