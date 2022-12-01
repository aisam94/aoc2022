const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((num) => parseInt(num, 10));

const elves = [[]];
let iter = 0;

for (let i = 0;i < input.length;i++) {
	if (!Number.isInteger(input[i])) {
		elves.push([]);
		iter++;
		continue;
	}
	elves[iter].push(input[i])
}

const elvesCalories = [];
let ans = 0;

for (let i = 0;i < elves.length;i++) {
	let sum = 0;
	for (let y = 0;y < elves[i].length;y++) {
		sum += elves[i][y];
	}
	elvesCalories.push(sum);
	if (sum > ans) ans = sum;
}

elvesCalories.sort(function (a, b) {
	return b - a;
})

console.log(elvesCalories[0] + elvesCalories[1] + elvesCalories[2]);