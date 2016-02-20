StarEscapeState = require './state/star/escape'
WelcomeState = require './state/start'
EndState = require './state/end'
TempState = require './state/temp'
Narrator = require './state/narrator'

game = new Phaser.Game 800, 600, Phaser.AUTO, 'action'

game.state.add 'adapt',
  create: ->
    @scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    @scale.pageAlignHorizontally = on
    @scale.pageAlignVertically = on
    @scale.setScreenSize = on
    # @scale.aspectRatio = 4/3
    @state.start 'menu'
, on

game.state.add 'menu', new WelcomeState(next_state: 'init')

game.state.add 'init', new Narrator
  scripts:[
    {description: text: '我是一个平凡的人。'}
    {description: text: '可能平凡得不能再平凡了。'}
    {description: text: '但是我有一个梦想。'}
    {description: text: '梦想以后，'}
    {description: text: '我能做出很多很多游戏。'}
    {description: text: '直到有一天，她出现了。'}
    {
      description: text: '像公主一样。'
      image:
        name: 'girl'
        url: 'assets/girl.jpg'
    }
    {description: text: '她教会我很多别的事情。'}
    {description: text: '我们很开心。'}
    {description: text: '我开始喜欢游戏以外的世界。'}
    {description: text: '但有一天，'}
    {description: text: '她告诉我：\n  医生说她要到另一个世界去了。'}
    {description: text: '『这怎么行！』'}
    {description: text: '我想阻止她。'}
    {
      image: name: ''
      description: text: '但我除了游戏以外，'
    }
    {description: text: '一无是处。'}
    {description: text: '我独自地回到家，'}
    {description: text: '沉浸在我的游戏中……'}
    {description: text: '当我醒来时……'}
    {
      image:
        name: 'welcome-bg'
        url: 'assets/welcome-bg.png'
    }
    {
      description:
        text: '我到了哪里？！'
        y: 450
    }
  ]
  next_state: 'star-init'

game.state.add 'star-init', new StarEscapeState
  over_state: 'star-1'
  pass_state: 'star-2'

game.state.add 'star-1', new Narrator
  scripts:[
    {description: text: '纳尼？！什么鬼'}
    {description: text: '我被星星砸死了？'}
    {description: text: '可是我还有一个梦想啊。'}
  ]
  next_state: 'temp'

game.state.add 'star-2', new Narrator
  scripts:[
    {
      description:
        text: '不能碰到星星？'
    }
    {description: text: '但下一步是什么呢？'}
    {
      description:
        text: '这是什么意思？'
        y: 450
      image:
        name: 'welcome-bg'
        url: 'assets/welcome-bg.png'
    }
  ]
  next_state: 'end'

game.state.add 'temp', new TempState
  description: '我还要去救她……'
  menu_state: 'menu'

game.state.add 'end', new EndState
  description: '后续更新请持续关注github吧 :)'
  menu_state: 'menu'
