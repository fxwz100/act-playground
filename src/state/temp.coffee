# Temporary end state.
module.exports = class TempState

  constructor: ({@description, @menu_state}) ->

  init: (@character) ->

  preload: ->
    @load.spritesheet 'restart-btn', 'assets/restart-btn.png', 120, 35
    @load.spritesheet 'menu-btn', 'assets/menu-btn.png', 120, 35
    @load.image 'girl', 'assets/girl.jpg'

  create: ->
    @overlay = @add.sprite 0, 0, 'girl'
    @overlay.alpha = 0.3

    @add.tween @overlay
    .from alpha: 0
    .start()

    # add text
    text_x = @world.centerX
    text_y = @world.centerY
    @text = @add.text text_x, text_y, @description,
      fontSize: '36pt'
      fill: '#fff'
    @text.anchor.setTo 0.5, 0.5

    @add.tween @text
    .from alpha: 0
    .start()

    # add button
    restart_btn = @add.button @world.centerX, @world.centerY + 100, 'restart-btn', =>
      @state.start @state.lastPlayed
    , @, 1, 0
    restart_btn.anchor.setTo 0.5, 0.5

    @add.tween restart_btn
    .from alpha: 0
    .start()
    @add.tween restart_btn.scale
    .from x: 2, y: 2, 1000, Phaser.Easing.Bounce.Out
    .start()

    # add button
    menu_btn = @add.button @world.centerX, @world.centerY + 160, 'menu-btn', =>
      @state.start @menu_state
    , @, 1, 0
    menu_btn.anchor.setTo 0.5, 0.5

    @add.tween menu_btn
    .from alpha: 0
    .start()
    @add.tween menu_btn.scale
    .from x: 2, y: 2, 1000, Phaser.Easing.Bounce.Out
    .start()

  update: ->
    if @character
      {player, weapon, stars, platforms, roadlights} = @character

      @physics.arcade.collide player, platforms
      @physics.arcade.collide stars, platforms
      @physics.arcade.collide stars, roadlights
