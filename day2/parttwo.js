const path = require('path')
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

const resultScores = {
	lose: 0,
	draw: 3,
	win: 6
}

let myScore = 0;

function getMyShape(resultLetter, opponentLetter) {
	opponentShape = getOpponentShape(opponentLetter);
	if (resultLetter === 'Y') return opponentShape;
	if (resultLetter === 'X' && opponentShape === 'paper' || resultLetter === 'Z' && opponentShape === 'scissors') return 'rock';

	if (resultLetter === 'X' && opponentShape ===
		'scissors' || resultLetter === 'Z' && opponentShape === 'rock') return 'paper';

	if (resultLetter === 'X' && opponentShape === 'rock' || resultLetter === 'Z' && opponentShape === 'paper') return 'scissors';

}

function getOpponentShape(letter) {
	if (letter === 'A') return 'rock';
	if (letter === 'B') return 'paper';
	if (letter === 'C') return 'scissors';
}

function getMyScores(shape) {
	if (shape === 'rock') return 1;
	if (shape === 'paper') return 2;
	if (shape === 'scissors') return 3;
}

function getResultScore(shape) {
	if (shape === 'X') return resultScores.lose;
	if (shape === 'Y') return resultScores.draw;
	if (shape === 'Z') return resultScores.win;
}

for (let i = 0;i < input.length;i++) {
	const current = input[i];
	const opponentLetter = current[0];
	const resultLetter = current[2];

	myScore += getMyScores(getMyShape(resultLetter, opponentLetter)) + getResultScore(resultLetter);
}

console.log(myScore);