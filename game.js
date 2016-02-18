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

	var OverState, StarPlayState, WelcomeState, game;

	StarPlayState = __webpack_require__(1);

	WelcomeState = __webpack_require__(4);

	OverState = __webpack_require__(5);

	game = new Phaser.Game(800, 600, Phaser.AUTO, 'action');

	game.state.add('welcome', new WelcomeState, true);

	game.state.add('play', new StarPlayState);

	game.state.add('over', new OverState);


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
	  function StarPlayState() {}

	  StarPlayState.prototype.preload = function() {
	    this.load.image('game-background', 'assets/game-bg.png');
	    this.load.image('ground', 'assets/ground.png');
	    this.load.spritesheet('star', 'assets/stars.png', 24, 22);
	    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	    this.load.spritesheet('diamond', 'assets/weapon.png', 64, 64);
	    return this.load.image('road-light', 'assets/road-light.png');
	  };

	  StarPlayState.prototype.create = function() {
	    var ground, i, j, k, platforms, player, roadlight, roadlights, star, star_scale, star_x, star_y, stars;
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
	      roadlight = roadlights.create(100 + i * 300, this.world.height - 64, 'road-light');
	      roadlight.anchor.setTo(0.5, 1);
	      roadlight.body.immovable = true;
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
	    return this.cursors = this.input.keyboard.createCursorKeys();
	  };

	  StarPlayState.prototype.update = function() {
	    var fighting, j, k, len, len1, lighted, platforms, player, ref, ref1, ref2, roadlights, star, stars;
	    ref = this.character, player = ref.player, stars = ref.stars, platforms = ref.platforms, roadlights = ref.roadlights;
	    this.physics.arcade.collide(player, platforms);
	    this.physics.arcade.collide(stars, platforms);
	    this.physics.arcade.collide(stars, roadlights);
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
	      player.agent.kill((function(_this) {
	        return function() {
	          return _this.state.start('over', false, false, _this.character);
	        };
	      })(this));
	    }
	    return stars.enableBody = player.x > 30;
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
	      ht: 500,
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
	      return setTimeout(cb, 500);
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
/* 4 */
/***/ function(module, exports) {

	var WelcomeState;

	module.exports = WelcomeState = (function() {
	  function WelcomeState() {}

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
	      return this.state.start('play');
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
/* 5 */
/***/ function(module, exports) {

	var OverState;

	module.exports = OverState = (function() {
	  function OverState() {}

	  OverState.prototype.init = function(character) {
	    this.character = character;
	  };

	  OverState.prototype.preload = function() {
	    this.load.image('restart-btn', 'assets/reload-btn.png');
	    return this.load.image('menu-btn', 'assets/menu-btn.png');
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
	    text_y = this.world.centerY - 25;
	    this.text = this.add.text(text_x, text_y, '胜负乃兵家常事，大侠重新来过吧！', {
	      fontSize: '32px',
	      fill: '#fff'
	    });
	    this.text.anchor.setTo(0.5, 0.5);
	    this.add.tween(this.text).from({
	      alpha: 0
	    }).start();
	    restart_btn = this.add.button(this.world.centerX, this.world.centerY + 50, 'restart-btn', (function(_this) {
	      return function() {
	        return _this.state.start('play');
	      };
	    })(this));
	    restart_btn.anchor.setTo(1.5, 0);
	    this.add.tween(restart_btn).from({
	      alpha: 0
	    }).start();
	    this.add.tween(restart_btn.scale).from({
	      x: 2,
	      y: 2
	    }, 1000, Phaser.Easing.Bounce.Out).start();
	    menu_btn = this.add.button(this.world.centerX, this.world.centerY + 50, 'menu-btn', (function(_this) {
	      return function() {
	        return _this.state.start('welcome');
	      };
	    })(this));
	    menu_btn.anchor.setTo(-0.5, 0);
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
