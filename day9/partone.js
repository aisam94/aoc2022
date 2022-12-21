const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')

let tailPos = [0, 0];
let headPos = [0, 0];
let visitedTailPosition = [];

function moveHead(position, direction) {
	if (direction === 'R') position[0]++;
	if (direction === 'L') position[0]--;
	if (direction === 'U') position[1]--;
	if (direction === 'D') position[1]++;
}

function isTailNearHead(tailPosition, headPosition) {
	const tailx = tailPosition[0]
	const taily = tailPosition[1]
	const headx = headPosition[0]
	const heady = headPosition[1]

	if (Math.abs(heady - taily) >= 2 || Math.abs(headx - tailx) >= 2) {
		return false
	}
	return true;
}

function moveTail(tailPosition, headPosition) {
	if (isTailNearHead(tailPosition, headPosition)) return;

	let headx = headPosition[0]
	let heady = headPosition[1]
	let tailx = tailPosition[0]
	let taily = tailPosition[1]

	if (heady === taily && headx - tailx === 2) tailPosition[0]++; //move right
	else if (heady === taily && headx - tailx === -2) tailPosition[0]--; //move left
	else if (headx === tailx && heady - taily === 2) tailPosition[1]++; //move down
	else if (headx === tailx && heady - taily === -2) tailPosition[1]--; //move up
	//move topright
	else if (headx - tailx === 1 && heady - taily === -2 ||
		headx - tailx === 2 && heady - taily === -1) {
		tailPosition[0]++;
		tailPosition[1]--;
	}
	//move topleft
	else if (headx - tailx === -1 && heady - taily === -2 ||
		headx - tailx === -2 && heady - taily === -1) {
		tailPosition[0]--;
		tailPosition[1]--;
	}
	//move botleft
	else if (headx - tailx === -2 && heady - taily === 1 ||
		headx - tailx === -1 && heady - taily === 2) {
		tailPosition[0]--;
		tailPosition[1]++;
	}
	//move botright
	else if (headx - tailx === 2 && heady - taily === 1 ||
		headx - tailx === 1 && heady - taily === 2) {
		tailPosition[0]++;
		tailPosition[1]++;
	}
}

function isArrIncludesArr(arr1, arr2) {
	if (arr1 === []) return false;
	for (let i = 0;i < arr1.length;i++) {
		if (arr1[i].every((val, index) => val === arr2[index])) {
			return true;
		}
	}
	return false;
}

// iterate input
for (let i = 0;i < input.length;i++) {
	const direction = input[i][0];
	const stepsToBeTaken = Number.parseInt(input[i].slice(2));

	for (let y = 0;y < stepsToBeTaken;y++) {
		moveHead(headPos, direction);
		moveTail(tailPos, headPos); // why does this impact visitedTailPosition??

		//register tail move
		if (!isArrIncludesArr(visitedTailPosition, tailPos)) {
			visitedTailPosition.push([tailPos[0], tailPos[1]]);
			// visitedTailPosition.push(tailPos);// this does not work apparently
		}
	}
}

console.log(visitedTailPosition.length);