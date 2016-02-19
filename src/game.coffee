StarPlayState = require './state/starplay'
WelcomeState = require './state/start'
OverState = require './state/end'
Narrator = require './state/narrator'

game = new Phaser.Game 800, 600, Phaser.AUTO, 'action'

game.state.add 'adapt',
  create: ->
    @scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    @scale.pageAlignHorizontally = on
    @scale.pageAlignVertically = on
    @scale.setScreenSize = on
    @scale.aspectRatio = 4/3
    @state.start 'start'
, on

game.state.add 'start', new WelcomeState(next_state: 'init')
game.state.add 'init', new Narrator
  scripts:[
    {description: text: '我是一个平凡的人。'}
    {description: text: '可能平凡得不能再平凡了。'}
    {description: text: '但是我有一个梦想。'}
    {description: text: '梦想有一天，'}
    {description: text: '我能做出一个游戏。'}
    {description: text: '我从未动摇。'}
    {description: text: '直到有一天，'}
    {description: text: '她出现了。'}
    {
      image:
        name: 'girl'
        url: 'assets/girl.jpg'
    }
    {description: text: '她告诉我：'}
    {description: text: '「你该找工作了，\n否则我将离你而去！」'}
    {
      image: name: ''
      description: text: '但我除了游戏以外，'
    }
    {description: text: '一无是处。'}
    {description: text: '我放弃了。'}
    {description: text: '所有人离我而去。'}
    {description: text: '我孤独地回到家，'}
    {description: text: '沉浸在我的游戏中……'}
    {description: text: '当我醒来时……'}
    {
      image:
        name: 'welcome-bg'
        url: 'assets/welcome-bg.png'
    }
    {
      description:
        text: '这是什么？！'
        y: 450
    }
  ]
  next_state: 'star'
game.state.add 'star', new StarPlayState(next_state: 'star-end')
game.state.add 'star-end', new Narrator
  scripts:[
    {
      description:
        text: '纳尼？！什么鬼'
        y: 450
      image:
        name: 'welcome-bg'
        url: 'assets/welcome-bg.png'
    }
    {description: text: '我被星星砸死了？'}
    {description: text: '可是我还有一个梦想。'}
    {description: text: '啊喂！'}
    {description: text: '我还要做出一个游戏啊！'}
  ]
  next_state: 'end'
game.state.add 'end', new OverState(next_state: 'start')
