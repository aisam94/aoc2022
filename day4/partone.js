const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

let ans = 0; // assignment pairs that fully contain others

// iterate each pairs
for (let i = 0;i < input.length;i++) {
	const currentPair = input[i];
	let currentGroup = [];
	currentGroup = currentPair.split(',');
	currentGroup = currentGroup.map(e => (e.split('-')).map(x => parseInt(x)));

	const firstSection = currentGroup[0];
	const secondSection = currentGroup[1];

	// check if one section contains the other
	if ((firstSection[0] <= secondSection[0] && firstSection[1] >= secondSection[1]) || (firstSection[0] >= secondSection[0] && firstSection[1] <= secondSection[1])) {
		ans += 1;
	}
}

console.log(ans);