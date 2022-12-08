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

function getTreeScore(posX, posY) {
	const treeHeight = input[posY][posX];
	let score_left, score_right, score_top, score_bot;
	score_left = score_right = score_top = score_bot = 0;

	// check left
	for (let x = posX - 1;x >= 0;x--) {
		score_left++;
		if (input[posY][x] >= treeHeight) break;
	}
	// check right
	for (let x = posX + 1;x < width;x++) {
		score_right++;
		if (input[posY][x] >= treeHeight) break;
	}
	// check top
	for (let y = posY - 1;y >= 0;y--) {
		score_top++;
		if (input[y][posX] >= treeHeight) break;
	}
	// check bottom
	for (let y = posY + 1;y < width;y++) {
		score_bot++;
		if (input[y][posX] >= treeHeight) break;
	}

	return score_left * score_right * score_top * score_bot;
}

function getHighestTreesScore() {
	let score = 0;
	for (let y = 0;y < input.length;y++) {
		for (let x = 0;x < input[y].length;x++) {
			if (y === topEdge || y === botEdge || x === leftEdge || x === rightEdge) {
				continue;
			}
			let tempScore = getTreeScore(x,y);
			if (tempScore > score) {
				score = tempScore;
			}
		}
	}
	return score;
}

console.log(getHighestTreesScore());