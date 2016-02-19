Player = require '../agent/player'
Star  = require '../agent/star'

context =
  # components
  playerStatus:
    textify: (player) -> "HP: #{player.props.hp}\nMP: #{player.state.mp}"
    init: (game, player) ->
      @sprite = game.add.text 16, 16, @textify(player),
        fontSize: '24px'
        fill: '#fff'
    update: (player) ->
      @sprite.text = @textify player
  # utilities
  cursors: null
  # state
  state: 'play'


module.exports = class StarPlayState

  name: 'starplay'

  constructor: ({@over_state, @pass_state}) ->

  preload: ->
    @load.image 'game-background', 'assets/game-bg.png'
    @load.image 'ground', 'assets/ground.png'
    @load.spritesheet 'star', 'assets/stars.png', 24, 22
    @load.spritesheet 'dude', 'assets/dude.png', 32, 48
    @load.spritesheet 'diamond', 'assets/weapon.png', 64, 64
    @load.image 'road-light', 'assets/road-light.png'

  create: ->
    @physics.startSystem Phaser.Physics.ARCADE

    @character = {}

    # create the background

    @add.sprite 0, 0, 'game-background'

    platforms = @character.platforms = @add.group()
    platforms.enableBody = yes

    ground = platforms.create 0, @world.height - 64, 'ground'
    ground.scale.setTo 2, 2
    ground.body.immovable = yes

    roadlights = @character.roadlights = @add.group()
    roadlights.enableBody = yes

    for i in [0..2]
      roadlight_x = 100 + i * 300
      roadlight_y = @world.height - 64
      roadlight = roadlights.create roadlight_x, roadlight_y, 'road-light'
      roadlight.anchor.setTo 0.5, 1
      roadlight.body.immovable = yes
      roadlight.bounds

    # create the characters

    player = new Player @
    @character.player = player.sprite

    stars = @character.stars = @add.group()
    stars.enableBody = on

    for i in [0..24]
      star_x = Math.random() * 20 + (i / 2) * 70
      star_y = 10 + Math.random() * 50
      star_scale = 0.5 + 0.5 * Math.random()
      star = new Star @, stars, star_x, star_y, star_scale

    # create the utilties and context

    context.playerStatus.init @, player

    @cursors = @input.keyboard.createCursorKeys()

    # create the overlay for end animation.
    @overlay = @make.graphics 0, 0
    @overlay.beginFill '#000', 1
    @overlay.drawRect 0, 0, 800, 600
    @overlay.endFill()
    @overlay.alpha = 0.7

    @gameover = no

  update: ->
    {player, stars, platforms, roadlights} = @character

    @physics.arcade.collide player, platforms
    @physics.arcade.collide stars, platforms

    @physics.arcade.overlap stars, stars, (star1, star2) ->
      if star1 isnt star2
        star1.kill()
        star2.kill()

    unless @gameover
      fighting = @physics.arcade.overlap player, stars, (player, star) ->
        star.agent.fight player.agent
        player.agent.fight star.agent
      , null, @

      lighted = @game.physics.arcade.overlap player, roadlights

      for star in stars.children
        unless star.body.allowGravity = not lighted
          star.body.velocity = x: 0, y: 0

      context.playerStatus.update player.agent

      player.agent.stop()

      # detect left/right moving.
      switch
        when @cursors.left.isDown
          player.agent.walkLeft()
        when @cursors.right.isDown
          player.agent.walkRight()
        when not fighting
          player.agent.still()

      if @cursors.up.isDown
        player.agent.chop()

      if @cursors.down.isDown
        player.agent.cutoff()

      # track jumping
      if @input.keyboard.isDown Phaser.KeyCode.SPACEBAR
        player.agent.jump()

      player.agent.update @character
      for star in stars.children
        star.agent.update @character

      if player.agent.props.hp < 0
        @world.addChild @overlay

        @add.tween @overlay
        .from alpha: 0, 1000
        .start()

        player.agent.kill =>
          @state.start @over_state, yes, no, @character

        @gameover = yes

      else if player.x > @world.width
        @world.addChild @overlay

        @add.tween @overlay
        .from alpha: 0, 1000
        .start()
        .onComplete.add =>
          @state.start @pass_state, yes, no, @character

        @gameover = yes
