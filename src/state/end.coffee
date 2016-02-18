module.exports =

class OverState

  name: 'over'

  constructor: ({@next_state}) ->

  init: (@character) ->

  preload: ->
    @load.image 'restart-btn', 'assets/reload-btn.png'
    @load.image 'menu-btn', 'assets/menu-btn.png'

  create: ->
    # add overlay
    @overlay = @add.graphics 0, 0
    @overlay.beginFill '#000', 1
    @overlay.drawRect 0, 0, 800, 600
    @overlay.endFill()
    @overlay.alpha = 0.7

    @add.tween @overlay
    .from alpha: 0
    .start()

    # add text
    text_x = @world.centerX
    text_y = @world.centerY - 25
    @text = @add.text text_x, text_y, '胜负乃兵家常事，大侠重新来过吧！',
      fontSize: '32px'
      fill: '#fff'
    @text.anchor.setTo 0.5, 0.5

    @add.tween @text
    .from alpha: 0
    .start()

    # add button
    restart_btn = @add.button @world.centerX, @world.centerY + 50, 'restart-btn', =>
      @state.start 'play'
    restart_btn.anchor.setTo 1.5, 0

    @add.tween restart_btn
    .from alpha: 0
    .start()
    @add.tween restart_btn.scale
    .from x: 2, y: 2, 1000, Phaser.Easing.Bounce.Out
    .start()

    # add button
    menu_btn = @add.button @world.centerX, @world.centerY + 50, 'menu-btn', =>
      @state.start 'welcome'
    menu_btn.anchor.setTo -0.5, 0

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
