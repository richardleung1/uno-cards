class Card {
    constructor(color, type){
        this.color = color
        this.type = type
    }
}

class NumberCard extends Card {
    constructor(color, number){
        super(color, 'number')
        this.number = number
    }
}

class ActionCard extends Card {
    constructor(color, action){
        super(color, 'action')
        this.action = action
    }
}

class WildCard extends Card {
    constructor(action){
        super('wild', 'wild')
        this.action = action
    }
}

class Deck {
    constructor(){
        this.activePlayer = Math.floor(Math.random() * 2)
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
        deck.discard.push(deck.cards.splice(Math.floor(Math.random() * this.cards.length), 1))
        const wildActions = [null, '+4']
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
    draw(deck) {
        let cardDrawn = deck.cards.pop()
        this.cards.push(cardDrawn)
    }

}

const deck = new Deck()
const players = []
let activePlayer

function startGame() {
    deck.fill()
    deck.shuffle()
    players.length = 0
    players.push(new Player('player1'))
    players.push(new Player('player2'))
    for (let i = 0; i < 7; i++) {
        players[0].draw(deck)
        players[1].draw(deck)
    }
    takeTurn(deck.activePlayer)
}

function switchPlayer() {
    if (deck.activePlayer = 0) {
        deck.activePlayer = 1
    } else {
        deck.activePlayer = 0
    }
}

function cardPlayed(topCard) {
    console.log(topCard.type)
    let message
    if (topCard.type === 'action') {
        if (topCard.action === 'skip') {
            message = `${players[playerIndex].name} was skipped.`
            console.log(message)
            switchPlayer()
        } else if (topCard.action === 'reverse') {
            message = `The direction of play was reversed. ${players[playerIndex].name} was skipped.`
            console.log(message)
            switchPlayer()
        } else if (topCard.action === '+1') {
            message = `${players[playerIndex].name} draws one card and forfeits their turn.`
            players[deck.activePlayer].draw(deck)
            console.log(message)
            switchPlayer()
        } else { 
            message = `${players[playerIndex].name} draws two cards and forfeits their turn.`
            for (let i = 0; i < 2; i++) {
                players[deck.activePlayer].draw(deck)
            }
            console.log(message)
            switchPlayer()
        }
    } else if (topCard.type === 'wild') {
        if (topCard.action === '+4') {
            message = `${players[playerIndex].name} draws four cards and forfeits their turn.`
            for (let i = 0; i < 4; i++) {
                players[deck.activePlayer].draw(deck)
            }
            console.log(message)
            switchPlayer()
        }
    }
}

function takeTurn(playerIndex) {
    console.log(`It is ${players[playerIndex].name}'s turn`)
    let topCard = deck.discard[deck.discard.length - 1]
    console.log(topCard)
    cardPlayed(topCard)
}

function playCard(card, topCard) {
    if (card.type === 'number') {
        if (card.color === topCard.color || card.number === topCard.number) {
            deck.discard.push(card)
        } else {
            console.log('You can not play this card.')
        }
    } else if (card.type === 'action') {
        if (card.color === topCard.color || card.action === topCard.action) {
            deck.discard.push(card)
        } else {
            console.log('You can not play this card.')
        }
    } else if (card.type === 'wild') {
        console.log('Choose a color')
    }
}



startGame()