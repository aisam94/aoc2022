const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

let elvesBadges = [];

function getPriority(item) {
	if ('abcdefghijklmnopqrstuvwxyz'.includes(item)) return item.charCodeAt(0) - 96;
	if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(item)) return item.charCodeAt(0) - 38;
	return 0;
}

// iterate all of rucksacks by group of three
for (let i = 0;i < input.length;i= i + 3) {
	const firstRucksack = input[i];
	const secondRucksack = input[i + 1];
	const thirdRucksack = input[i + 2];
	let filtered = []

	// compare with two others

	for (let i = 0;i < firstRucksack.length;i++) {
		if (secondRucksack.includes(firstRucksack[i])) {
			filtered.push(firstRucksack[i])
		}
	}

	filtered = filtered.filter(element => thirdRucksack.includes(element));

	elvesBadges.push(filtered[0]);
}

// iterate misplace item to calculate priority sum
function getSumPriority() {
	let sum = 0
	for (let i = 0;i < elvesBadges.length;i++) {
		sum += getPriority(elvesBadges[i]);
	}
	return sum;
}

console.log(getSumPriority());



