const laneWidth = 7;
const laneHeight = 3;
const rockType = "🪨"
const paperType = "📜"
const scissorsType = "✂️"

const getLaneCSSClassFromType = type => {
	if (type === rockType) return 'rock-lane'
	if (type === paperType) return 'paper-lane'
	if (type === scissorsType) return 'scissors-lane'
	throw new Error("Invalid type arument in getCSSFromType")
}

class Player {
	type = ""
	health = 10
	defense = 2
	attack = 2
	speed = 2
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

class Lane {
	constructor(type) {
		if (type === rockType || type === paperType || type === scissorsType)
			this.type = type
		else
			throw new Error('Invalid type argument in Lane constructor.')
	}

	createLaneDOMElement = () => {
		const laneElement = document.createElement("div")
		laneElement.classList.add(getLaneCSSClassFromType(this.type), 'lane')
		for(let i = 0; i < laneWidth; i++) {
			const cellElement = document.createElement("span")
			cellElement.classList.add('lane-cell')
			laneElement.appendChild(cellElement)
		}
		return laneElement
	}
}

const newLane = new Lane(rockType)
const playField = document.getElementById('playField')
playField.appendChild(newLane.createLaneDOMElement())
