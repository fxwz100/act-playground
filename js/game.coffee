character =
  player: null
  weapon: null
  platforms: null
  stars: null

context =
  # components
  playerStatus:
    textify: (player) -> "HP: #{player.props.hp}\nMP: #{player.state.mp}"
    init: (game, player) ->
      @sprite = game.add.text 16, 16, @textify(player),
        fontSize: '24px'
        fill: '#000'
    update: (player) ->
      @sprite.text = @textify player
  # utilities
  cursors: null
  # state
  state: 'play'


class Player

  # - loading --------------------------

  constructor: (@game) ->
    @sprite = @game.add.sprite 32, @game.world.height - 150, 'dude', 0

    # physics
    @game.physics.arcade.enable @sprite
    @sprite.body.bounce.y = 0.2
    @sprite.body.gravity.y = 800
    @sprite.body.collideWorldBounds = on

    # animations
    @sprite.animations.add 'left', [0, 1, 2, 3], 10, on
    @sprite.animations.add 'right', [5, 6, 7, 8], 10, on
    @sprite.animations.add 'common-attack-left', [0, 1, 2, 3], 10, on
    @sprite.animations.add 'common-attack-right', [5, 6, 7, 8], 10, on

    @sprite.agent = @

    @reset()

    # weapons
    @weapon = @game.add.sprite 32, 400, 'diamond'

    @game.physics.arcade.enable @weapon
    @weapon.body.bounce.y = 0.2
    @weapon.anchor.setTo 0.5, 1
    @weapon.agent = @

    @weapon.animations.add 'left', [3, 4, 5, 4, 3], 10, off
    @weapon.animations.add 'right', [0, 1, 2, 1, 0], 10, off
    @weapon.frame = 0

    @weaponTween = @game.add.tween @weapon
    .yoyo on

  # - states ---------------------------

  reset: ->
    # properties and states
    @props =
      hp: 10
      mp: 20
      sp: 10
      ht: 500
      at: 10

    @state =
      sp: -1
      mp: @props.mp

    @sprite.x = 32
    @sprite.y = @game.world.height - 150
    @sprite.angle = 0
    @sprite.anchor.setTo 0.5, 1

  update: ->
    @state.sp = (@state.sp + 1) % @props.sp

    if @state.mp < @props.mp
      @state.mp = (@state.mp + 1) % (@props.mp + 1)

    @weapon.x = @sprite.x
    @weapon.y = @sprite.y

  # - actions --------------------------

  walkLeft: ->
    @sprite.animations.play 'left'
    @sprite.body.velocity.x = -150
    @weapon.frame = 3
    @weapon.anchor.x = 1

  walkRight: ->
    @sprite.animations.play 'right'
    @sprite.body.velocity.x = 150
    @weapon.frame = 0
    @weapon.anchor.x = 0

  jump: ->
    if @sprite.body.touching.down
      @sprite.body.velocity.y = - @props.ht

  still: ->
    @sprite.animations.stop()

    if @sprite.deltaX > 0
      @sprite.frame = 5
    else if @sprite.deltaX < 0
      @sprite.frame = 0

  stop: ->
    @sprite.body.velocity.x = 0

  chop: ->
    if @state.mp >= @props.mp
      if @weapon.frame < 3
        @weapon.play 'right'
      else
        @weapon.play 'left'
      @state.mp = 0

  cutoff: ->
    if @state.mp - 10 > 0
      @sprite.animations.play 'chop-left'

      @state.mp -= 10

  fight: (enemy) ->
    if enemy? and enemy.sprite?
      if enemy.sprite.x > @sprite.x
        @sprite.animations.play 'common-attack-right'
      else
        @sprite.animations.play 'common-attack-left'

      if @state.sp % @props.sp is 0
        enemy.props.hp -= @props.at

        msg_x = (@sprite.x + enemy.sprite.x) / 2
        msg_y = @sprite.y - 10
        msg = @game.add.text msg_x, msg_y, - @props.at,
          fontSize: '12px'
          fill: '#fc0'
        @game.add.tween(msg).to y: msg.y-100, alpha: 0, 1000, 'Linear', on
        .onComplete.add msg.kill, msg

  kill: (cb) ->
    @stop()
    @still()

    @sprite.anchor.setTo 0.5, 1

    if @sprite.frame > 4
      @game.add.tween @sprite
      .to angle: -90, 200, Phaser.Easing.Bounce.Out, on
    else
      @game.add.tween @sprite
      .to angle: 90, 200, Phaser.Easing.Bounce.Out, on

    if cb
      setTimeout cb, 500


class Enemy

  # - loading -------------------------

  constructor: (@game, @group, x, y) ->
    @sprite = @group.create x, y, 'star', 0
    @sprite.anchor.setTo 0.5, 0.5

    # physics
    @sprite.body.gravity.y = 300
    @sprite.body.bounce.y = 0.7 + Math.random() * 0.2

    # animations
    @sprite.animations.add 'fight', [1, 2], 5, on

    @sprite.agent = @

    # properties and states
    @props =
      hp: 100
      sp: 5

    @state =
      sp: -1

  # - states --------------------------

  update: ->
    @state.sp = (@state.sp + 1) % @props.sp

  # - actions -------------------------

  fight: (player) ->
    if player?
      @sprite.animations.play 'fight'
      setTimeout =>
        if @props.hp > 0
          # update animations
          @sprite.animations.stop()
          @sprite.frame = 0
        else
          @kill()
      , 300

      if @state.sp % @props.sp is 0
        player.props.hp -= 1

        # show the sparks
        spark_x = @sprite.x + (player.sprite.x - @sprite.x) * 0.5 + Math.random() * 10
        spark_y = @sprite.y + Math.random() * 10
        spark = @game.add.sprite spark_x, spark_y, 'star', 0
        spark.animations.add 'spark', [1, 2], 10, on
        spark.animations.play 'spark'
        spark.scale.setTo 0.5, 0.5
        @game.add.tween spark
        .to alpha: 0, 1000, 'Linear', on
        .onComplete.add spark.kill, spark

        # show the attacking message
        msg_x = (@sprite.x + player.sprite.x) / 2
        msg_y = @sprite.y - 10
        msg = @game.add.text msg_x, msg_y, '-1',
          fontSize: '12px'
          fill: '#f00'
        @game.add.tween msg
        .to y: msg.y-100, alpha: 0, 1000, 'Linear', on
        .onComplete.add msg.kill, msg

  kill: ->
    @sprite.kill()


class PlayState

  preload: ->
    @load.image 'sky', 'assets/sky.png'
    @load.image 'ground', 'assets/platform.png'
    @load.spritesheet 'star', 'assets/stars.png', 24, 22
    @load.spritesheet 'dude', 'assets/dude.png', 32, 48
    @load.spritesheet 'diamond', 'assets/weapon.png', 64, 64

  create: ->
    @physics.startSystem Phaser.Physics.ARCADE

    @character = {}

    # create the characters

    @add.sprite 0, 0, 'sky'

    platforms = @character.platforms = @add.group()
    platforms.enableBody = on

    ground = platforms.create 0, @world.height - 64, 'ground'
    ground.scale.setTo 2, 2
    ground.body.immovable = on

    ledge = platforms.create 400, 400, 'ground'
    ledge.body.immovable = on

    ledge = platforms.create -150, 250, 'ground'
    ledge.body.immovable = on

    # create the characters

    player = new Player @
    @character.player = player.sprite
    @character.weapon = player.weapon

    stars = @character.stars = @add.group()
    stars.enableBody = on

    for i in [0..12]
      star = new Enemy @, stars, i * 70, 0

    # create the utilties and context

    context.playerStatus.init @, player

    @cursors = @input.keyboard.createCursorKeys()

  update: ->
    {player, weapon, stars, platforms} = @character

    @physics.arcade.collide player, platforms
    @physics.arcade.collide stars, platforms

    fighting = @physics.arcade.overlap player, stars, (player, star) ->
      star.agent.fight player.agent
      player.agent.fight star.agent
    , null, @

    @physics.arcade.overlap weapon, stars, (weapon, star) ->
      if weapon.animations.currentAnim.isPlaying
        star.kill()
    , null, @

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

    player.agent.update()
    for star in stars.children
      star.agent.update()

    if player.agent.props.hp < 0
      player.agent.kill =>
        @state.start 'over', no, no, @character

class WelcomeState

  preload: ->
    @load.spritesheet 'start-btn', 'assets/start-btn.png', 215, 72
    @load.spritesheet 'about-btn', 'assets/about-btn.png', 215, 72
    @load.image 'about-board', 'assets/about-board.png'
    @load.image 'sky', 'assets/sky.png'

  create: ->
    @add.sprite 0, 0, 'sky'

    # add text
    text_x = @world.centerX
    text_y = @world.centerY - 50
    text = @add.text text_x, text_y, '第九行动',
      fontSize: '50px'
      fill: '#fff'
    text.anchor.setTo 0.5, 0.5

    @add.tween text
    .from alpha: 0, fontSize: '30px', 1000, Phaser.Easing.Bounce.Out
    .start()

    # add button
    start_btn = @add.button @world.centerX, @world.centerY + 25, 'start-btn', ->
      @state.start 'play'
    , @, 1, 0
    start_btn.scale.setTo 0.7
    start_btn.anchor.setTo 0.5, 0.5

    @add.tween start_btn
    .from alpha: 0
    .start()

    @add.tween start_btn
    .to alpha: 1, 1000, 'Linear', on, 2000, -1, on

    # add button
    about_btn = @add.button @world.centerX, @world.centerY + 100, 'about-btn', ->
      @add.tween about_board
      .to y: @world.centerY, 1000, Phaser.Easing.Bounce.Out
      .start()
    , @, 1, 0
    about_btn.scale.setTo 0.7
    about_btn.anchor.setTo 0.5, 0.5

    @add.tween about_btn
    .from alpha: 0
    .start()

    about_board = @add.button @world.centerX, -1000, 'about-board', ->
      @add.tween about_board
      .to y: -1000
      .start()
    , @
    about_board.anchor.setTo 0.5, 0.5


class OverState

  init: (@character) ->
    console.log @character

  preload: ->
    @load.spritesheet 'restart-btn', 'assets/reload-btn.png', 215, 72

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
    , @, 1, 0
    restart_btn.anchor.setTo 0.5, 0.5

    @add.tween restart_btn
    .from alpha: 0
    .start()
    @add.tween restart_btn.scale
    .from x: 2, y: 2, 1000, Phaser.Easing.Bounce.Out
    .start()

  update: ->
    if @character
      {player, weapon, stars, platforms} = @character

      @physics.arcade.collide player, platforms
      @physics.arcade.collide stars, platforms


game = new Phaser.Game 800, 600, Phaser.AUTO, 'action'
game.state.add 'welcome', new WelcomeState, on
game.state.add 'play', new PlayState
game.state.add 'over', new OverState
