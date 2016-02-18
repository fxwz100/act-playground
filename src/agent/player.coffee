module.exports = class Player

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

  # - actions --------------------------

  walkLeft: ->
    @sprite.animations.play 'left'
    @sprite.body.velocity.x = -150

  walkRight: ->
    @sprite.animations.play 'right'
    @sprite.body.velocity.x = 150

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

  cutoff: ->
    if @state.mp - 10 > 0
      @sprite.animations.play 'chop-left'

      @state.mp -= 10

  fight: (Star) ->
    if Star? and Star.sprite?
      if Star.sprite.x > @sprite.x
        @sprite.animations.play 'common-attack-right'
      else
        @sprite.animations.play 'common-attack-left'

      if @state.sp % @props.sp is 0
        Star.props.hp -= @props.at

        msg_x = (@sprite.x + Star.sprite.x) / 2
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
