const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')

const knots = [
	[0, 0], // head
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0], // tail
];
let visitedTailPosition = [];

function moveHead(position, direction) {
	if (direction === 'R') position[0]++;
	if (direction === 'L') position[0]--;
	if (direction === 'U') position[1]--;
	if (direction === 'D') position[1]++;
}

function isKnotNearOtherKnot(knotPosition, otherKnotPosition) {
	const tailx = knotPosition[0]
	const taily = knotPosition[1]
	const headx = otherKnotPosition[0]
	const heady = otherKnotPosition[1]

	if (Math.abs(heady - taily) >= 2 || Math.abs(headx - tailx) >= 2) {
		return false
	}
	return true;
}

function moveKnot(tailPosition, headPosition) {
	if (isKnotNearOtherKnot(tailPosition, headPosition)) return;

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
		headx - tailx === 2 && heady - taily === -1 ||
		headx - tailx === 2 && heady - taily === -2
	) {
		tailPosition[0]++;
		tailPosition[1]--;
	}
	//move topleft
	else if (headx - tailx === -1 && heady - taily === -2 ||
		headx - tailx === -2 && heady - taily === -1 ||
		headx - tailx === -2 && heady - taily === -2
	) {
		tailPosition[0]--;
		tailPosition[1]--;
	}
	//move botleft
	else if (headx - tailx === -2 && heady - taily === 1 ||
		headx - tailx === -1 && heady - taily === 2 ||
		headx - tailx === -2 && heady - taily === 2
	) {
		tailPosition[0]--;
		tailPosition[1]++;
	}
	//move botright
	else if (headx - tailx === 2 && heady - taily === 1 ||
		headx - tailx === 1 && heady - taily === 2 ||
		headx - tailx === 2 && heady - taily === 2
	) {
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

function moveKnots() {
	for (let currentKnot = 1;currentKnot < knots.length;currentKnot++) {
		moveKnot(knots[currentKnot], knots[currentKnot - 1]);
	}
}

// iterate input
for (let i = 0;i < input.length;i++) {
	const direction = input[i][0];
	const stepsToBeTaken = Number.parseInt(input[i].slice(2));

	// iterate steps need to be taken for each movement
	for (let y = 0;y < stepsToBeTaken;y++) {
		moveHead(knots[0], direction);
		moveKnots();

		//register tail move
		if (!isArrIncludesArr(visitedTailPosition, knots[9])) {
			visitedTailPosition.push([knots[9][0], knots[9][1]]);
			// visitedTailPosition.push(knots[9]);// this does not work apparently
		}
	}
}

console.log(visitedTailPosition.length);