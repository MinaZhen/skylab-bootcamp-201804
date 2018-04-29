'use strict'

let RockPaperScissors = (function() {
    class RockPaperScissors {
        constructor(player1, player2) {
            this._player1 = player1
            this._player2 = player2
            this._history = []
            this._symbols = ['rock', 'paper', 'scissors']
            this._status = RockPaperScissors.CONTINUE
            this._countPlayer1 = 0
            this._countPlayer2 = 0
            this._whoWinArray = []
        }
    
        static get CONTINUE() { return 0 }
        static get GAMEOVER() { return 1 }
    
        play(hand1, hand2) {
            if (this._status === 1) throw Error ('GAME OVER!')
            if ((typeof hand1 !== 'string' || typeof hand2 !== 'string') || (this._symbols.indexOf(hand1 = hand1.trim().toLowerCase()) === -1) || (this._symbols.indexOf(hand2 = hand2.trim().toLowerCase()) === -1)) throw Error('invalid hands')
        
            const playerHands = { player1: hand1, player2: hand2 }
            this._history.push(playerHands)
            operHand(this, hand1, hand2)
            this._check();
        }
    
        state() {
            return this._history
        }
    
        status() {
             return this._status
        }
    
        winner() {
            return this._winner
        }
    
        _check() {
            if ((this._countPlayer1 === 2 || this._countPlayer2 === 2) || (this._whoWinArray[0] === 0 && this._whoWinArray[1] === 0 && this._whoWinArray[2] !== 0))
                this._status = 1
            if (this._status === 1) {
                if (this._countPlayer1 > this._countPlayer2) {
                    this._winner = this._player1
                } else {
                    this._winner = this._player2
                }
            }
        }
    }
    
    function operHand(inst, hand1, hand2) {    
        if ((hand1 === "paper" && hand2 === "rock") || (hand1 === "rock" && hand2 === "scissors") || (hand1 === "scissors" && hand2 === "paper")) {
            inst._countPlayer1 += 1
            inst._whoWinArray.push(1)
        } else if (hand1 ===  hand2) {
            inst._whoWinArray.push(0)
        } else {
            inst._countPlayer2 += 1
            inst._whoWinArray.push(2)
        }
    }
    return RockPaperScissors;
})();


  




