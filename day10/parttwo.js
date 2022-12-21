const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

let cycle = 0;
let X = 1;
let spritePos = X; // initial sprite position
const litPixel = '#';
const darkPixel = '.';
let crt = '';

function isOverlapPixels(cycle, currentSpritePos) {
	let newCycle = cycle;
	if (newCycle > 40) {
		newCycle %= 40;
	}

	if (currentSpritePos <= newCycle && currentSpritePos + 2 >= newCycle) {
		return true;
	}
	return false;
}

function cycleOperation() {
	cycle++;
	if (isOverlapPixels(cycle, spritePos)) {
		crt = crt.concat(litPixel);
	} else {
		crt = crt.concat(darkPixel);
	}
}

// iterate instructions
for (let i = 0;i < input.length;i++) {
	const currentInstruction = input[i].split(' ');
	let instruction = currentInstruction[0];
	if (instruction === 'addx') {
		const num = parseInt(currentInstruction[1], 10);
		cycleOperation();
		cycleOperation();
		X += num;
		spritePos = X;
		continue;
	}
	cycleOperation();
}

for (let i = 0;i < crt.length;i++) {
	process.stdout.write(crt[i]);
	if ((i+1) % 40 === 0) {
		process.stdout.write('\n');
	}
}