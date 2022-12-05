const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.split('\n')


// parse stacks from input
function createStacks(input) {
	let stacks = [];
	for (let i = 0;i < input.length;i++) {
		// stops when empty or move instructions
		if (input[i].includes('1')) {
			break;
		}

		// parse crates
		let iterCrate = 0;
		for (let x = 1;x < input[i].length;x = x + 4) {
			if (stacks[iterCrate] === undefined) {
				// create new column if not exist
				stacks[iterCrate] = [];
			}
			if (input[i][x] !== ' ') {
				stacks[iterCrate].unshift(input[i][x]);
			}
			iterCrate++;
		}
	}
	return stacks;
}

// parse moves from input
function getMoves(input) {
	let moves = [];
	for (let i = 0;i < input.length;i++) {
		if (input[i].includes('move')) {
			const numRegex = /\d+/g;
			const num = input[i].match(numRegex);
			moves.push(num);
		}
	}
	return moves;
}

function moveCrates(stacks, moves) {
	for (let i = 0;i < moves.length;i++) {
		const moveNum = moves[i][0];
		const moveFrom = moves[i][1] - 1;
		const moveTo = moves[i][2] - 1;

		const moving = stacks[moveFrom].slice(-moveNum);
		stacks[moveTo] = [...stacks[moveTo], ...moving];
		stacks[moveFrom] = stacks[moveFrom].slice(0, -moveNum);
	}
}

function getTop(stacks) {
	let top = '';
	for (let i = 0;i < stacks.length;i++) {
		top += stacks[i].slice(-1);
	}
	return top;
}

stack = createStacks(input);
moves = getMoves(input);
moveCrates(stack, moves);
console.log(getTop(stack));
