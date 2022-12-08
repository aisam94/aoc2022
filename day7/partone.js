const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

function getFileSize(string) {
	numRegex = /\d*/g;
	return Number.parseInt(string.match(numRegex));
}

let lineNum = 0;
let totalDirSum = 0;
const fileSizeLimit = 1e5;

function parseArray(array) {
	if (lineNum >= input.length) return array;
	const currentLine = input[lineNum];

	if (input[lineNum] === '$ cd ..') {
		// finish traversing directory
		return array;
	}
	else if (currentLine.slice(0, 4) === '$ cd') {
		// create and add new dir
		lineNum++;
		array.push(parseArray([]));
	}
	else if (currentLine !== '$ ls' && currentLine.slice(0, 3) !== 'dir') {
		// add files
		array.push(getFileSize(currentLine));
	}
	lineNum++;
	array = parseArray(array);
	return array;
}

function parseInput() {
	let arr = [];
	arr = parseArray(arr);
	return arr;
}

function calculateDir(index, inputArr, sum) {
	if (index >= inputArr.length) {
		return sum;
	}
	if (Array.isArray(inputArr[index])) {
		let dirSum = calculateDir(0, inputArr[index], 0);
		if (dirSum < fileSizeLimit) totalDirSum += dirSum;
		sum += dirSum;
	} else {
		sum += inputArr[index];
	}
	sum = calculateDir(++index, inputArr, sum)
	return sum;
}

let a = parseInput();
let totalAllFile = calculateDir(0, a, 0);
console.log(totalDirSum);