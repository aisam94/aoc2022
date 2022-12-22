// let { monkeys } = require('./input2.js');
let { monkeys } = require('./input.js');

let mod_all = 1;
for(let i = 0; i < monkeys.length; i++){
	mod_all *= monkeys[i].test;
}

function processMonkey(monkey) {
	const items = monkey.items;
	const itemLength = items.length;

	for (let i = 0;i < itemLength;i++) {
		let item = items[0];

		// monkey inspect item
		monkey.inspectedNum++;
		if (monkey.operation === 'add') {
			if (monkey.operationNum === 'old') {
				item += item;
			} else {

				item += monkey.operationNum;
			}
		}
		if (monkey.operation === 'multiply') {
			if (monkey.operationNum === 'old') {
				item *= item;
			} else {
				item *= monkey.operationNum;
			}
		}

		// use modulo to lower worry level
		item = item % mod_all;

		//test item
		if (item % monkey.test === 0) {
			monkey.items.splice(0, 1);
			monkeys[monkey.true].items.push(item);
		} else {
			monkey.items.splice(0, 1);
			monkeys[monkey.false].items.push(item);
		}
	}
}

function iterateMonkeys() {
	for (let i = 0;i < monkeys.length;i++) {
		processMonkey(monkeys[i]);
	}
}

function runRounds(roundNum) {
	for (let i = 0;i < roundNum;i++) {
		iterateMonkeys();
	}
}

function getMonkeyBusiness() {
	let monkeysInspectedTimes = [];
	for (let i = 0;i < monkeys.length;i++) {
		monkeysInspectedTimes.push(monkeys[i].inspectedNum);
	}
	monkeysInspectedTimes.sort((a, b) => {
		return b - a;
	})
	return monkeysInspectedTimes[0] * monkeysInspectedTimes[1];
}

runRounds(10_000);

console.log(getMonkeyBusiness());