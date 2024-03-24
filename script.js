const laneWidth = 12;
const laneHeight = 3;
const rockType = "🪨"
const paperType = "📜"
const scissorsType = "✂️"

const standardHealth = 100;
const standardDefense = 20;
const standardAttack = 20;
const standardSpeed = 20;
const statDeviation = 0.7777777;

const gameStepLength = 500;

const isValidType = t => t === rockType || t === paperType || t === scissorsType

const getRandomType = () => {
	n = Math.random(3)
	if (n === 0) return rockType
	if (n === 1) return paperType
	if (n === 2) return scissorsType
}

// Approximately a bell curve distribution between min and max.
const gaussianRandom = (min = 0, max = 1) => {
	let result = 0

	for (let i = 0; i < 6; i++)
		result += Math.random();

	result /= 6
	return result * (max - min) + min;
}

const createRandomPlayer = () => {
	const healthDeviation = standardHealth * statDeviation;
	const minHealth = standardHealth - healthDeviation;
	const maxHealth = standardHealth + healthDeviation;

	const defenseDeviation = standardDefense * statDeviation;
	const minDefense = standardDefense - defenseDeviation;
	const maxDefense = standardDefense + defenseDeviation;

	const attackDeviation = standardAttack * statDeviation;
	const minAttack = standardAttack - attackDeviation;
	const maxAttack = standardAttack + attackDeviation;

	const speedDeviation = standardSpeed * statDeviation;
	const minSpeed = standardSpeed - speedDeviation;
	const maxSpeed = standardSpeed + speedDeviation;

	return new Player(
		getRandomType(),
		Math.round(gaussianRandom(minHealth, maxHealth)),
		Math.round(gaussianRandom(minDefense, maxDefense)),
		Math.round(gaussianRandom(minAttack, maxAttack)),
		Math.round(gaussianRandom(minSpeed, maxSpeed))
	)
}

class Player {
	constructor(type, health, defense, attack, speed) {
		if (!isValidType(type)) throw new Error("Invalid type argument in Player constructor.")
		if (health < 1) throw new Error("Health must be positive in Player constructor.")
		if (defense < 1) throw new Error("Defense must be positive in Player constructor.")
		if (attack < 1) throw new Error("Attack must be positive in Player constructor.")
		if (speed < 1) throw new Error("Speed must be positive in Player constructor.")

		self.type = type
		self.health = health
		self.defense = defense
		self.attack = attack
		self.speed = speed
	}
}

class Rock extends Player {
	type = rockType
}

class Paper extends Player {
	type = paperType
}

class Scissors extends Player {
	type = scissorsType
}

class Cell {
	constructor(domElement) {
		this.domElement = domElement
	}

	addPlayer = player => {
		if (!this.domElement) throw new Error("Attempted to add player to Cell while domElement was not set.")
		if (this.player)
			return false;
		this.player = player
		return true;
	}
	removePlayer = () => this.player = undefined
	getPlayer = () => this.player
}

class Lane {
	cells = []

	constructor(type) {
		if (isValidType(type)) {
			this.type = type
			this.domElement = this.createLaneDOMElement()
		}
		else
			throw new Error('Invalid type argument in Lane constructor.')
	}

	getLaneCSSClassFromType = type => {
		if (type === rockType) return 'rock-lane'
		if (type === paperType) return 'paper-lane'
		if (type === scissorsType) return 'scissors-lane'
		throw new Error("Invalid type arument in getLaneCSSClassFromType")
	}

	createLaneDOMElement = () => {
		const laneElement = document.createElement("div")
		laneElement.classList.add(this.getLaneCSSClassFromType(this.type), 'lane')
		for(let i = 0; i < laneWidth; i++) {
			const cellElement = document.createElement("span")
			cellElement.classList.add('lane-cell')
			laneElement.appendChild(cellElement)
			this.cells.append(new Cell(cellElement))
		}
		return laneElement
	}

	gameStep = () => {

	}
}

const createLanes = () => {
	const rockLane = new Lane(rockType)
	const paperLane = new Lane(paperType)
	const scissorsLane = new Lane(scissorsType)

	const playField = document.getElementById('playField')
	playField.appendChild(rockLane.DOMElement)
	playField.appendChild(paperLane.DOMElement)
	playField.appendChild(scissorsLane.DOMElement)
}

createLanes()

const gameStep = () => {

}

window.setInterval(gameStep, gameStepLength)