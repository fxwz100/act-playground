module.exports = class WelcomeState

  name: 'welcome'

  constructor: ({@next_state}) ->

  preload: ->
    @load.spritesheet 'start-btn', 'assets/start-btn.png', 120, 35
    @load.spritesheet 'about-btn', 'assets/about-btn.png', 120, 35
    @load.image 'about-board', 'assets/about-board.png'
    @load.image 'welcome-background', 'assets/welcome-bg.png'

  create: ->
    bg = @add.sprite 0, 0, 'welcome-background'
    @add.tween bg
    .from alpha: 0
    .start()

    # add button
    start_btn = @add.button @world.centerX, @world.centerY + 100, 'start-btn', ->
      @state.start @next_state
    , @, 1, 0
    start_btn.anchor.setTo 0.5, 0.5
    start_btn.alpha = 0

    @add.tween start_btn
    .to alpha: 1
    .start()

    # add button
    about_btn = @add.button @world.centerX, @world.centerY + 160, 'about-btn', ->
      @add.tween about_board
      .to y: @world.centerY, 1000, Phaser.Easing.Bounce.Out
      .start()
    , @, 1, 0
    about_btn.anchor.setTo 0.5, 0.5

    @add.tween about_btn
    .from alpha: 0
    .start()

    about_board = @add.button @world.centerX, -1000, 'about-board', ->
      @add.tween about_board
      .to y: -1000, 1000, Phaser.Easing.Bounce.Out
      .start()
    , @
    about_board.anchor.setTo 0.5, 0.5
