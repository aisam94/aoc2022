const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

let misplaceItem = [];

function getPriority(item) {
	if ('abcdefghijklmnopqrstuvwxyz'.includes(item)) return item.charCodeAt(0) - 96;
	if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(item)) return item.charCodeAt(0) - 38;
	return 0;
}

// iterate all of rucksacks
for (let i = 0;i < input.length;i++) {
	const currentRucksack = input[i];
	const len = currentRucksack.length;
	const firstHalf = currentRucksack.slice(0, len / 2);
	const secondHalf = currentRucksack.slice(len / 2);
	let currTemp = [];

	for (let x = 0;x < firstHalf.length;x++) {
		for (let y = 0;y < secondHalf.length;y++) {
			if (firstHalf[x] === secondHalf[y] && !currTemp.includes(firstHalf[x])) {
				misplaceItem.push(firstHalf[x]);
				currTemp.push(firstHalf[x]);
			}
		}
	}
}

// iterate misplace item to calculate priority sum
function getSumPriority() {
	let sum = 0
	for (let i = 0;i < misplaceItem.length;i++) {
		sum += getPriority(misplaceItem[i]);
	}
	return sum;
}

console.log(getSumPriority());



