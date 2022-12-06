const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim();

let firstSequencePointer = 0;
let sequence = [];
let ans = 0;
const distinctCharNum = 14;

// iterate every char in input
for (let i = 0;i < input.length;i++) {
	const currChar = input[i];
	let sameCharIndex = -1;

	if (sequence.includes(currChar)) {
		sameCharIndex = input.indexOf(currChar, firstSequencePointer);
	}

	if (sameCharIndex !== -1) {
		firstSequencePointer = sameCharIndex + 1;
		sequence = [];
		sequence.push(...input.slice(firstSequencePointer, i));
	}
	sequence.push(currChar);
	if (sequence.length >= distinctCharNum) {
		ans = i + 1;
		break;
	}
}

console.log(ans);