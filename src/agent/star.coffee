module.exports = class Star

  # - loading -------------------------

  constructor: (@game, @group, @x, @y, scale=1) ->
    @sprite = @group.create @x, @y, 'star', 0
    @sprite.anchor.setTo 0.5, 0.5
    @sprite.scale.setTo scale

    @game.add.tween @sprite
    .to alpha: 0, 500 + Math.random() * 500, 'Linear', yes, Math.random() * 1000, -1, yes

    # physics
    @sprite.body.allowGravity = off
    @sprite.body.gravity.y = 500 * scale
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

  backToPlace: ->
    unless @sprite.allowGravity
      @sprite.x += if @x > @sprite.x then 1 else -1
      @sprite.y += if @y > @sprite.y then 1 else -1

  # - actions -------------------------

  fight: (player) ->
    if player
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
