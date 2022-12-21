const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

let cycle = 0;
let X = 1;
let signalStrengths = [];

function isCheckNeeded(cycle) {
	if (cycle === 20 || (cycle - 20) % 40 === 0) {
		return true;
	}
	return false;
}

function evalSignal() {
	// signalStrength = cycle * X;
	return cycle * X;
}

function cycleOperation() {
	cycle++;
	if (isCheckNeeded(cycle)) signalStrengths.push(evalSignal());
}

// iterate instructions
for (let i = 0;i < input.length;i++) {
	const currentInstruction = input[i].split(' ');
	let instruction = currentInstruction[0];
	if (instruction === 'addx') {
		const num = parseInt(currentInstruction[1]);
		cycleOperation();
		cycleOperation();
		X += num;
		continue;
	}
	cycleOperation();
}

let sum = 0;
for (const value of signalStrengths) sum += value;

console.log(sum);
