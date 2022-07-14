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
      this.cards = []
      this.discard = []
    }
    draw() {
      console.log(this.cards[Math.floor(Math.random() * this.length)])
    }
    fill() {
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
        const wildActions = [null, '+4']
        for (const action of wildActions) {
            this.cards.push(new WildCard(action))
            this.cards.push(new WildCard(action))
        }
        console.log(this.cards)
        console.log(this.cards.length)
    }
}
