module.exports = class Roadlight

  constructor: (@game, @group, x, y, lighted=no) ->
    @sprite = @group.create x, y, 'roadlight'
    @sprite.anchor.setTo 0.5, 1
    @sprite.body.immovable = yes
    @sprite.agent = @

    # light
    @light = @game.add.sprite x, y - 120, 'roadlight-light'
    @light.anchor.setTo 0.5, 0
    @light.alpha = if lighted then 1 else 0
    @light.agent = @

  toggle: ->
    if @light.alpha in [0, 1]
      console.log @light.alpha
      @game.add.tween @light
      .to alpha: (if @light.alpha < 1 then 1 else 0)
      .start()

  forceLighted: (lighted) ->
    if (lighted and @light.alpha < 1) or (not lighted and @light.alpha > 0)
      @game.add.tween @light
      .to alpha: (if lighted then 1 else 0)
      .start()
