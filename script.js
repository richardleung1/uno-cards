class Card {
    constructor(color, type, text){
        this.color = color
        this.type = type
        this.text = text
    }
}

class NumberCard extends Card {
    constructor(color, number){
        super(color, 'number', number)
    }
}

class ActionCard extends Card {
    constructor(color, action){
        super(color, 'action', action)
    }
}

class WildCard extends Card {
    constructor(action){
        super('wild', 'wild', action)
    }
}

class Deck {
    constructor(){
        this.activePlayer = Math.floor(Math.random() * 2)
        this.players = []
    }
    fill() {
        this.cards = []
        this.discard = []
        const colors = ['green', 'blue', 'red', 'yellow']
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        const actions = ['skip', 'reverse', '+1', '+2']
        for (const color of colors) {
            for (const number of numbers) {
                this.cards.push(new NumberCard(color, number))
            }
            for (const action of actions) {
                this.cards.push(new ActionCard(color, action))
            }
        }
        deck.discard = deck.cards.splice(Math.floor(Math.random() * this.cards.length), 1)
        const wildActions = ["", '+4']
        for (const action of wildActions) {
            this.cards.push(new WildCard(action))
            this.cards.push(new WildCard(action))
        }
    }
    shuffle() {
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
    reshuffle() {
        this.cards = this.discard.splice(0, this.discard.length - 2)
        this.shuffle()
    }
}

class Player {
    constructor(name){
        this.name = name
        this.cards = []
    }
    draw() {
        let cardDrawn = deck.cards.pop()
        this.cards.push(cardDrawn)
    }

}

const deck = new Deck()

function startGame() {
    deck.fill()
    deck.shuffle()
    deck.players.length = 0
    deck.players.push(new Player('player1'))
    deck.players.push(new Player('player2'))
    for (let i = 0; i < 7; i++) {
        deck.players[0].draw()
        deck.players[1].draw()
    }
    cardPlayed()
    takeTurn()
}

function switchPlayer() {
    if (deck.activePlayer === 0) {
        deck.activePlayer = 1
        takeTurn()
    } else {
        deck.activePlayer = 0
        takeTurn()
    }
}

function cardPlayed() {
    let topCard = deck.discard[deck.discard.length - 1]
    let message
    if (topCard.type === 'action') {
        if (topCard.text === 'skip') {
            message = `${deck.players[deck.activePlayer].name} was skipped.`
            console.log(message)
            switchPlayer()
        } else if (topCard.text === 'reverse') {
            message = `The direction of play was reversed. ${deck.players[deck.activePlayer].name} was skipped.`
            console.log(message)
            switchPlayer()
        } else if (topCard.text === '+1') {
            message = `${deck.players[deck.activePlayer].name} draws one card and forfeits their turn.`
            deck.players[deck.activePlayer].draw()
            console.log(message)
            switchPlayer()
        } else { 
            message = `${deck.players[deck.activePlayer].name} draws two cards and forfeits their turn.`
            for (let i = 0; i < 2; i++) {
                deck.players[deck.activePlayer].draw()
            }
            console.log(message)
            switchPlayer()
        }
    } else if (topCard.type === 'wild') {
        if (topCard.text === '+4') {
            message = `${deck.players[deck.activePlayer].name} draws four cards and forfeits their turn.`
            for (let i = 0; i < 4; i++) {
                deck.players[deck.activePlayer].draw()
            }
            console.log(message)
            switchPlayer()
        }
    }
}

function takeTurn() {
    updateDiscard()
    updatePlayer()
}

function playCard(evt) {
    let card = deck.players[deck.activePlayer].cards[evt.target.value]
    let topCard = deck.discard[deck.discard.length - 1]
    if (card.type === 'number') {
        if (card.color === topCard.color || card.text === topCard.text) {
            card = deck.players[deck.activePlayer].cards.splice(evt.target.value, 1)[0]
            deck.discard.push(card)
            switchPlayer()
            cardPlayed()
        } else {
            console.log('You can not play this card.')
        }
    } else if (card.type === 'action') {
        if (card.color === topCard.color || card.text === topCard.text) {
            card = deck.players[deck.activePlayer].cards.splice(evt.target.value, 1)[0]
            deck.discard.push(card)
            switchPlayer()
            cardPlayed()
        } else {
            console.log('You can not play this card.')
        }
    } else if (card.type === 'wild') {
        console.log('Choose a color')
        card = deck.players[deck.activePlayer].cards.splice(evt.target.value, 1)[0]
        deck.discard.push(card)
        switchPlayer()
        cardPlayed()
    }
}

startGame()

function updateDiscard() {
    let discardPile = document.querySelector('#discard')
    let topCard = deck.discard[deck.discard.length - 1]
    discardPile.style.backgroundColor = topCard.color
    discardPile.textContent = topCard.text
}

function updatePlayer() {
    let playerName = document.querySelector('#player-name')
    let name = deck.players[deck.activePlayer].name
    playerName.textContent = name
    let hand = document.querySelector('#player-hand')
    let cards = deck.players[deck.activePlayer].cards
    hand.innerHTML = ""
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const li = document.createElement('li')
        li.textContent = card.text
        if (card.color === 'wild') {
            li.classList.add('wild')
        } else {
            li.style.backgroundColor = card.color
        }
        li.classList.add('card')
        li.value = i
        li.addEventListener('click', playCard)
        hand.appendChild(li)
    }
}

let draw = document.querySelector('#draw')
draw.addEventListener('click', function() {
    deck.players[deck.activePlayer].draw()
    updatePlayer()
})