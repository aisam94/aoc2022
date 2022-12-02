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

function getMyShape(letter) {
	if (letter === 'X') return 'rock';
	if (letter === 'Y') return 'paper';
	if (letter === 'Z') return 'scissors';
}

function getOpponentShape(letter) {
	if (letter === 'A') return 'rock';
	if (letter === 'B') return 'paper';
	if (letter === 'C') return 'scissors';
}

function getMyScores(shape) {
	if (shape === 'X') return 1;
	if (shape === 'Y') return 2;
	if (shape === 'Z') return 3;
}

function getResultScore(myShape, opponentShape) {
	if (myShape === opponentShape) return resultScores.draw;

	if (myShape === 'rock' && opponentShape === 'scissors' || myShape === 'paper' && opponentShape === 'rock' || myShape === 'scissors' && opponentShape === 'paper') return resultScores.win;

	if (myShape === 'rock' && opponentShape === 'paper' || myShape === 'paper' && opponentShape === 'scissors' || myShape === 'scissors' && opponentShape === 'rock') return resultScores.lose;
}

for (let i = 0;i < input.length;i++) {
	const current = input[i];
	const opponentShape = current[0];
	const myShape = current[2];
	myScore += getMyScores(myShape) + getResultScore(getMyShape(myShape), getOpponentShape(opponentShape));
}

console.log(myScore);