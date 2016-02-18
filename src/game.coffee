StarPlayState = require './state/starplay'
WelcomeState = require './state/welcome'
OverState = require './state/over'

game = new Phaser.Game 800, 600, Phaser.AUTO, 'action'
game.state.add 'welcome', new WelcomeState, on
game.state.add 'play', new StarPlayState
game.state.add 'over', new OverState
