/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Narrator, OverState, StarPlayState, WelcomeState, game;

	StarPlayState = __webpack_require__(1);

	WelcomeState = __webpack_require__(7);

	OverState = __webpack_require__(8);

	Narrator = __webpack_require__(6);

	game = new Phaser.Game(800, 600, Phaser.AUTO, 'action');

	game.state.add('adapt', {
	  create: function() {
	    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;
	    this.scale.setScreenSize = true;
	    this.scale.aspectRatio = 4 / 3;
	    return this.state.start('start');
	  }
	}, true);

	game.state.add('start', new WelcomeState({
	  next_state: 'init'
	}));

	game.state.add('init', new Narrator({
	  scripts: [
	    {
	      description: {
	        text: '我是一个平凡的人。'
	      }
	    }, {
	      description: {
	        text: '可能平凡得不能再平凡了。'
	      }
	    }, {
	      description: {
	        text: '但是我有一个梦想。'
	      }
	    }, {
	      description: {
	        text: '梦想有一天，'
	      }
	    }, {
	      description: {
	        text: '我能做出一个游戏。'
	      }
	    }, {
	      description: {
	        text: '我从未动摇。'
	      }
	    }, {
	      description: {
	        text: '直到有一天，'
	      }
	    }, {
	      description: {
	        text: '她出现了。'
	      }
	    }, {
	      image: {
	        name: 'girl',
	        url: 'assets/girl.jpg'
	      }
	    }, {
	      description: {
	        text: '她告诉我：'
	      }
	    }, {
	      description: {
	        text: '「你该找工作了，\n否则我将离你而去！」'
	      }
	    }, {
	      image: {
	        name: ''
	      },
	      description: {
	        text: '但我除了游戏以外，'
	      }
	    }, {
	      description: {
	        text: '一无是处。'
	      }
	    }, {
	      description: {
	        text: '我放弃了。'
	      }
	    }, {
	      description: {
	        text: '所有人离我而去。'
	      }
	    }, {
	      description: {
	        text: '我孤独地回到家，'
	      }
	    }, {
	      description: {
	        text: '沉浸在我的游戏中……'
	      }
	    }, {
	      description: {
	        text: '当我醒来时……'
	      }
	    }, {
	      image: {
	        name: 'welcome-bg',
	        url: 'assets/welcome-bg.png'
	      }
	    }, {
	      description: {
	        text: '这是什么？！',
	        y: 450
	      }
	    }
	  ],
	  next_state: 'star'
	}));

	game.state.add('star', new StarPlayState({
	  over_state: 'star-1',
	  pass_state: 'star-1'
	}));

	game.state.add('star-1', new Narrator({
	  scripts: [
	    {
	      description: {
	        text: '纳尼？！什么鬼',
	        y: 450
	      },
	      image: {
	        name: 'welcome-bg',
	        url: 'assets/welcome-bg.png'
	      }
	    }, {
	      description: {
	        text: '我被星星砸死了？'
	      }
	    }, {
	      description: {
	        text: '可是我还有一个梦想。'
	      }
	    }, {
	      description: {
	        text: '啊喂！'
	      }
	    }, {
	      description: {
	        text: '我还要做出一个游戏啊！'
	      }
	    }
	  ],
	  next_state: 'end'
	}));

	game.state.add('end', new OverState({
	  next_state: 'start'
	}));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Player, Star, StarPlayState, context;

	Player = __webpack_require__(2);

	Star = __webpack_require__(3);

	context = {
	  playerStatus: {
	    textify: function(player) {
	      return "HP: " + player.props.hp + "\nMP: " + player.state.mp;
	    },
	    init: function(game, player) {
	      return this.sprite = game.add.text(16, 16, this.textify(player), {
	        fontSize: '24px',
	        fill: '#fff'
	      });
	    },
	    update: function(player) {
	      return this.sprite.text = this.textify(player);
	    }
	  },
	  cursors: null,
	  state: 'play'
	};

	module.exports = StarPlayState = (function() {
	  StarPlayState.prototype.name = 'starplay';

	  function StarPlayState(arg) {
	    this.over_state = arg.over_state, this.pass_state = arg.pass_state;
	  }

	  StarPlayState.prototype.preload = function() {
	    this.load.image('game-background', 'assets/game-bg.png');
	    this.load.image('ground', 'assets/ground.png');
	    this.load.spritesheet('star', 'assets/stars.png', 24, 22);
	    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	    this.load.spritesheet('diamond', 'assets/weapon.png', 64, 64);
	    return this.load.image('road-light', 'assets/road-light.png');
	  };

	  StarPlayState.prototype.create = function() {
	    var ground, i, j, k, platforms, player, roadlight, roadlight_x, roadlight_y, roadlights, star, star_scale, star_x, star_y, stars;
	    this.physics.startSystem(Phaser.Physics.ARCADE);
	    this.character = {};
	    this.add.sprite(0, 0, 'game-background');
	    platforms = this.character.platforms = this.add.group();
	    platforms.enableBody = true;
	    ground = platforms.create(0, this.world.height - 64, 'ground');
	    ground.scale.setTo(2, 2);
	    ground.body.immovable = true;
	    roadlights = this.character.roadlights = this.add.group();
	    roadlights.enableBody = true;
	    for (i = j = 0; j <= 2; i = ++j) {
	      roadlight_x = 100 + i * 300;
	      roadlight_y = this.world.height - 64;
	      roadlight = roadlights.create(roadlight_x, roadlight_y, 'road-light');
	      roadlight.anchor.setTo(0.5, 1);
	      roadlight.body.immovable = true;
	      roadlight.bounds;
	    }
	    player = new Player(this);
	    this.character.player = player.sprite;
	    stars = this.character.stars = this.add.group();
	    stars.enableBody = true;
	    for (i = k = 0; k <= 24; i = ++k) {
	      star_x = Math.random() * 20 + (i / 2) * 70;
	      star_y = 10 + Math.random() * 50;
	      star_scale = 0.5 + 0.5 * Math.random();
	      star = new Star(this, stars, star_x, star_y, star_scale);
	    }
	    context.playerStatus.init(this, player);
	    this.cursors = this.input.keyboard.createCursorKeys();
	    this.overlay = this.make.graphics(0, 0);
	    this.overlay.beginFill('#000', 1);
	    this.overlay.drawRect(0, 0, 800, 600);
	    this.overlay.endFill();
	    this.overlay.alpha = 0.7;
	    return this.gameover = false;
	  };

	  StarPlayState.prototype.update = function() {
	    var fighting, j, k, len, len1, lighted, platforms, player, ref, ref1, ref2, roadlights, star, stars;
	    ref = this.character, player = ref.player, stars = ref.stars, platforms = ref.platforms, roadlights = ref.roadlights;
	    this.physics.arcade.collide(player, platforms);
	    this.physics.arcade.collide(stars, platforms);
	    this.physics.arcade.overlap(stars, stars, function(star1, star2) {
	      if (star1 !== star2) {
	        star1.kill();
	        return star2.kill();
	      }
	    });
	    if (!this.gameover) {
	      fighting = this.physics.arcade.overlap(player, stars, function(player, star) {
	        star.agent.fight(player.agent);
	        return player.agent.fight(star.agent);
	      }, null, this);
	      lighted = this.game.physics.arcade.overlap(player, roadlights);
	      ref1 = stars.children;
	      for (j = 0, len = ref1.length; j < len; j++) {
	        star = ref1[j];
	        if (!(star.body.allowGravity = !lighted)) {
	          star.body.velocity = {
	            x: 0,
	            y: 0
	          };
	        }
	      }
	      context.playerStatus.update(player.agent);
	      player.agent.stop();
	      switch (false) {
	        case !this.cursors.left.isDown:
	          player.agent.walkLeft();
	          break;
	        case !this.cursors.right.isDown:
	          player.agent.walkRight();
	          break;
	        case !!fighting:
	          player.agent.still();
	      }
	      if (this.cursors.up.isDown) {
	        player.agent.chop();
	      }
	      if (this.cursors.down.isDown) {
	        player.agent.cutoff();
	      }
	      if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
	        player.agent.jump();
	      }
	      player.agent.update(this.character);
	      ref2 = stars.children;
	      for (k = 0, len1 = ref2.length; k < len1; k++) {
	        star = ref2[k];
	        star.agent.update(this.character);
	      }
	      if (player.agent.props.hp < 0) {
	        this.world.addChild(this.overlay);
	        this.add.tween(this.overlay).from({
	          alpha: 0
	        }, 1000).start();
	        player.agent.kill((function(_this) {
	          return function() {
	            return _this.state.start(_this.over_state, true, false, _this.character);
	          };
	        })(this));
	        return this.gameover = true;
	      } else if (player.x > this.world.width) {
	        this.state.start(this.pass_state, true, false, this.character);
	        return this.gameover = true;
	      }
	    }
	  };

	  return StarPlayState;

	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Player;

	module.exports = Player = (function() {
	  function Player(game) {
	    this.game = game;
	    this.sprite = this.game.add.sprite(32, this.game.world.height - 150, 'dude', 0);
	    this.game.physics.arcade.enable(this.sprite);
	    this.sprite.body.bounce.y = 0.2;
	    this.sprite.body.gravity.y = 800;
	    this.sprite.body.collideWorldBounds = true;
	    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	    this.sprite.animations.add('common-attack-left', [0, 1, 2, 3], 10, true);
	    this.sprite.animations.add('common-attack-right', [5, 6, 7, 8], 10, true);
	    this.sprite.agent = this;
	    this.reset();
	  }

	  Player.prototype.reset = function() {
	    this.props = {
	      hp: 10,
	      mp: 20,
	      sp: 10,
	      ht: 400,
	      at: 10
	    };
	    this.state = {
	      sp: -1,
	      mp: this.props.mp
	    };
	    this.sprite.x = 32;
	    this.sprite.y = this.game.world.height - 150;
	    this.sprite.angle = 0;
	    return this.sprite.anchor.setTo(0.5, 1);
	  };

	  Player.prototype.update = function() {
	    this.state.sp = (this.state.sp + 1) % this.props.sp;
	    if (this.state.mp < this.props.mp) {
	      return this.state.mp = (this.state.mp + 1) % (this.props.mp + 1);
	    }
	  };

	  Player.prototype.walkLeft = function() {
	    this.sprite.animations.play('left');
	    return this.sprite.body.velocity.x = -150;
	  };

	  Player.prototype.walkRight = function() {
	    this.sprite.animations.play('right');
	    return this.sprite.body.velocity.x = 150;
	  };

	  Player.prototype.jump = function() {
	    if (this.sprite.body.touching.down) {
	      return this.sprite.body.velocity.y = -this.props.ht;
	    }
	  };

	  Player.prototype.still = function() {
	    this.sprite.animations.stop();
	    if (this.sprite.deltaX > 0) {
	      return this.sprite.frame = 5;
	    } else if (this.sprite.deltaX < 0) {
	      return this.sprite.frame = 0;
	    }
	  };

	  Player.prototype.stop = function() {
	    return this.sprite.body.velocity.x = 0;
	  };

	  Player.prototype.chop = function() {};

	  Player.prototype.cutoff = function() {
	    if (this.state.mp - 10 > 0) {
	      this.sprite.animations.play('chop-left');
	      return this.state.mp -= 10;
	    }
	  };

	  Player.prototype.fight = function(Star) {
	    var msg, msg_x, msg_y;
	    if ((Star != null) && (Star.sprite != null)) {
	      if (Star.sprite.x > this.sprite.x) {
	        this.sprite.animations.play('common-attack-right');
	      } else {
	        this.sprite.animations.play('common-attack-left');
	      }
	      if (this.state.sp % this.props.sp === 0) {
	        Star.props.hp -= this.props.at;
	        msg_x = (this.sprite.x + Star.sprite.x) / 2;
	        msg_y = this.sprite.y - 10;
	        msg = this.game.add.text(msg_x, msg_y, -this.props.at, {
	          fontSize: '12px',
	          fill: '#fc0'
	        });
	        return this.game.add.tween(msg).to({
	          y: msg.y - 100,
	          alpha: 0
	        }, 1000, 'Linear', true).onComplete.add(msg.kill, msg);
	      }
	    }
	  };

	  Player.prototype.kill = function(cb) {
	    this.stop();
	    this.still();
	    this.sprite.anchor.setTo(0.5, 1);
	    if (this.sprite.frame > 4) {
	      this.game.add.tween(this.sprite).to({
	        angle: -90
	      }, 200, Phaser.Easing.Bounce.Out, true);
	    } else {
	      this.game.add.tween(this.sprite).to({
	        angle: 90
	      }, 200, Phaser.Easing.Bounce.Out, true);
	    }
	    if (cb) {
	      return setTimeout(cb, 1000);
	    }
	  };

	  return Player;

	})();


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Star;

	module.exports = Star = (function() {
	  function Star(game, group, x, y, scale) {
	    this.game = game;
	    this.group = group;
	    if (scale == null) {
	      scale = 1;
	    }
	    this.sprite = this.group.create(x, y, 'star', 0);
	    this.sprite.anchor.setTo(0.5, 0.5);
	    this.sprite.scale.setTo(scale);
	    this.game.add.tween(this.sprite).to({
	      alpha: 0
	    }, 500 + Math.random() * 500, 'Linear', true, Math.random() * 1000, -1, true);
	    this.sprite.body.allowGravity = false;
	    this.sprite.body.gravity.y = 300 * scale;
	    this.sprite.body.bounce.y = 0.7 + Math.random() * 0.2;
	    this.sprite.animations.add('fight', [1, 2], 5, true);
	    this.sprite.agent = this;
	    this.props = {
	      hp: 100,
	      sp: 5
	    };
	    this.state = {
	      sp: -1
	    };
	  }

	  Star.prototype.update = function() {
	    return this.state.sp = (this.state.sp + 1) % this.props.sp;
	  };

	  Star.prototype.fight = function(player) {
	    var msg, msg_x, msg_y, spark, spark_x, spark_y;
	    if (player) {
	      this.sprite.animations.play('fight');
	      setTimeout((function(_this) {
	        return function() {
	          if (_this.props.hp > 0) {
	            _this.sprite.animations.stop();
	            return _this.sprite.frame = 0;
	          } else {
	            return _this.kill();
	          }
	        };
	      })(this), 300);
	      if (this.state.sp % this.props.sp === 0) {
	        player.props.hp -= 1;
	        spark_x = this.sprite.x + (player.sprite.x - this.sprite.x) * 0.5 + Math.random() * 10;
	        spark_y = this.sprite.y + Math.random() * 10;
	        spark = this.game.add.sprite(spark_x, spark_y, 'star', 0);
	        spark.animations.add('spark', [1, 2], 10, true);
	        spark.animations.play('spark');
	        spark.scale.setTo(0.5, 0.5);
	        this.game.add.tween(spark).to({
	          alpha: 0
	        }, 1000, 'Linear', true).onComplete.add(spark.kill, spark);
	        msg_x = (this.sprite.x + player.sprite.x) / 2;
	        msg_y = this.sprite.y - 10;
	        msg = this.game.add.text(msg_x, msg_y, '-1', {
	          fontSize: '12px',
	          fill: '#f00'
	        });
	        return this.game.add.tween(msg).to({
	          y: msg.y - 100,
	          alpha: 0
	        }, 1000, 'Linear', true).onComplete.add(msg.kill, msg);
	      }
	    }
	  };

	  Star.prototype.kill = function() {
	    return this.sprite.kill();
	  };

	  return Star;

	})();


/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	var NarratorState;

	module.exports = NarratorState = (function() {
	  NarratorState.prototype.name = 'narrator';

	  function NarratorState(arg) {
	    this.scripts = arg.scripts, this.next_state = arg.next_state;
	  }

	  NarratorState.prototype.next_scene = function() {
	    this.add.tween(this.screen).to({
	      alpha: 0
	    }, 500).start().onComplete.add((function(_this) {
	      return function() {
	        return _this.state.start(_this.next_state);
	      };
	    })(this));
	    return this.add.tween(this.text).to({
	      alpha: 0
	    }, 500).start();
	  };

	  NarratorState.prototype.preload = function() {
	    var i, len, ref, results, script;
	    ref = this.scripts;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      script = ref[i];
	      if (script.image) {
	        results.push(this.load.image(script.image.name, script.image.url));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };

	  NarratorState.prototype.create = function() {
	    var current_script, ref, ref1, ref2, ref3, screen_in, skip_btn, skip_text, skip_texture, text_in, text_x, text_y;
	    this.index = 0;
	    if (this.scripts.length > 0) {
	      current_script = this.scripts[this.index];
	      this.screen = this.add.button(0, 0, (ref = current_script.image) != null ? ref.name : void 0, function() {
	        var script;
	        if (!this.text_fade.isRunning) {
	          this.index += 1;
	          if (this.index < this.scripts.length) {
	            script = this.scripts[this.index];
	            if (script.image) {
	              this.screen_fade.start();
	            }
	            return this.text_fade.start();
	          } else {
	            return this.next_scene();
	          }
	        }
	      }, this);
	      this.screen.alpha = 0;
	      this.screen.hitArea = new PIXI.Rectangle(0, 0, 800, 600);
	      screen_in = this.add.tween(this.screen).to({
	        alpha: 1
	      }, 500).start();
	      this.screen_fade = this.add.tween(this.screen).to({
	        alpha: 0
	      }, 500).chain(screen_in);
	      this.screen_fade.onComplete.add(function() {
	        if (this.index < this.scripts.length) {
	          return this.screen.loadTexture(this.scripts[this.index].image.name);
	        }
	      }, this);
	      text_x = ((ref1 = current_script.description) != null ? ref1.x : void 0) || this.world.centerX;
	      text_y = ((ref2 = current_script.description) != null ? ref2.y : void 0) || this.world.centerY;
	      this.text = this.add.text(text_x, text_y, (ref3 = current_script.description) != null ? ref3.text : void 0, {
	        fontSize: '36pt',
	        fill: '#fff'
	      });
	      this.text.anchor.setTo(0.5, 0.5);
	      this.text.alpha = 0;
	      text_in = this.add.tween(this.text).to({
	        alpha: 1
	      }, 500).start();
	      this.text_fade = this.add.tween(this.text).to({
	        alpha: 0
	      }, 500).chain(text_in);
	      this.text_fade.onComplete.add(function() {
	        var script;
	        script = this.scripts[this.index];
	        if (script.description) {
	          this.text.text = script.description.text;
	          this.text.x = script.description.x || this.text.x;
	          return this.text.y = script.description.y || this.text.y;
	        } else {
	          return this.text.text = '';
	        }
	      }, this);
	      skip_text = this.make.text(0, 0, 'Skip >', {
	        fontSize: '16pt',
	        fill: '#fff'
	      });
	      skip_texture = this.add.renderTexture(skip_text.width, skip_text.height);
	      skip_texture.render(skip_text);
	      skip_btn = this.add.button(this.world.width, this.world.height, null, (function(_this) {
	        return function() {
	          return _this.next_scene();
	        };
	      })(this));
	      skip_btn.anchor.setTo(1.5, 1.5);
	      skip_btn.loadTexture(skip_texture);
	      return this.add.tween(skip_btn).to({
	        alpha: 0
	      }, 1000, 'Linear', true, 0, -1, true);
	    } else {
	      return this.state.start(this.next_state);
	    }
	  };

	  return NarratorState;

	})();


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var StarPlayState, WelcomeState;

	StarPlayState = __webpack_require__(1);

	module.exports = WelcomeState = (function() {
	  WelcomeState.prototype.name = 'welcome';

	  function WelcomeState(arg) {
	    this.next_state = arg.next_state;
	  }

	  WelcomeState.prototype.preload = function() {
	    this.load.spritesheet('start-btn', 'assets/start-btn.png', 120, 35);
	    this.load.spritesheet('about-btn', 'assets/about-btn.png', 120, 35);
	    this.load.image('about-board', 'assets/about-board.png');
	    return this.load.image('welcome-background', 'assets/welcome-bg.png');
	  };

	  WelcomeState.prototype.create = function() {
	    var about_board, about_btn, bg, start_btn;
	    bg = this.add.sprite(0, 0, 'welcome-background');
	    this.add.tween(bg).from({
	      alpha: 0
	    }).start();
	    start_btn = this.add.button(this.world.centerX, this.world.centerY + 100, 'start-btn', function() {
	      return this.state.start(this.next_state);
	    }, this, 1, 0);
	    start_btn.anchor.setTo(0.5, 0.5);
	    start_btn.alpha = 0;
	    this.add.tween(start_btn).to({
	      alpha: 1
	    }).start();
	    about_btn = this.add.button(this.world.centerX, this.world.centerY + 160, 'about-btn', function() {
	      return this.add.tween(about_board).to({
	        y: this.world.centerY
	      }, 1000, Phaser.Easing.Bounce.Out).start();
	    }, this, 1, 0);
	    about_btn.anchor.setTo(0.5, 0.5);
	    this.add.tween(about_btn).from({
	      alpha: 0
	    }).start();
	    about_board = this.add.button(this.world.centerX, -1000, 'about-board', function() {
	      return this.add.tween(about_board).to({
	        y: -1000
	      }).start();
	    }, this);
	    return about_board.anchor.setTo(0.5, 0.5);
	  };

	  return WelcomeState;

	})();


/***/ },
/* 8 */
/***/ function(module, exports) {

	var OverState;

	module.exports = OverState = (function() {
	  OverState.prototype.name = 'over';

	  function OverState(arg) {
	    this.next_state = arg.next_state;
	  }

	  OverState.prototype.init = function(character) {
	    this.character = character;
	  };

	  OverState.prototype.preload = function() {
	    this.load.spritesheet('restart-btn', 'assets/restart-btn.png', 120, 35);
	    return this.load.spritesheet('menu-btn', 'assets/menu-btn.png', 120, 35);
	  };

	  OverState.prototype.create = function() {
	    var menu_btn, restart_btn, text_x, text_y;
	    this.overlay = this.add.graphics(0, 0);
	    this.overlay.beginFill('#000', 1);
	    this.overlay.drawRect(0, 0, 800, 600);
	    this.overlay.endFill();
	    this.overlay.alpha = 0.7;
	    this.add.tween(this.overlay).from({
	      alpha: 0
	    }).start();
	    text_x = this.world.centerX;
	    text_y = this.world.centerY;
	    this.text = this.add.text(text_x, text_y, '有事忙故事没编下去，\n   关注 github 的更新吧 😂', {
	      fontSize: '32px',
	      fill: '#fff'
	    });
	    this.text.anchor.setTo(0.5, 0.5);
	    this.add.tween(this.text).from({
	      alpha: 0
	    }).start();
	    restart_btn = this.add.button(this.world.centerX, this.world.centerY + 100, 'restart-btn', (function(_this) {
	      return function() {
	        return _this.state.start('init');
	      };
	    })(this), this, 1, 0);
	    restart_btn.anchor.setTo(0.5, 0.5);
	    this.add.tween(restart_btn).from({
	      alpha: 0
	    }).start();
	    this.add.tween(restart_btn.scale).from({
	      x: 2,
	      y: 2
	    }, 1000, Phaser.Easing.Bounce.Out).start();
	    menu_btn = this.add.button(this.world.centerX, this.world.centerY + 160, 'menu-btn', (function(_this) {
	      return function() {
	        return _this.state.start('start');
	      };
	    })(this), this, 1, 0);
	    menu_btn.anchor.setTo(0.5, 0.5);
	    this.add.tween(menu_btn).from({
	      alpha: 0
	    }).start();
	    return this.add.tween(menu_btn.scale).from({
	      x: 2,
	      y: 2
	    }, 1000, Phaser.Easing.Bounce.Out).start();
	  };

	  OverState.prototype.update = function() {
	    var platforms, player, ref, roadlights, stars, weapon;
	    if (this.character) {
	      ref = this.character, player = ref.player, weapon = ref.weapon, stars = ref.stars, platforms = ref.platforms, roadlights = ref.roadlights;
	      this.physics.arcade.collide(player, platforms);
	      this.physics.arcade.collide(stars, platforms);
	      return this.physics.arcade.collide(stars, roadlights);
	    }
	  };

	  return OverState;

	})();


/***/ }
/******/ ]);
