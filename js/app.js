/**
 * 公用变量及函数
 */
var Game = function () {
    this.BLOCK_WIDTH = 101;
    this.BLOCK_HEIGTH = 83;
    this.CANVAS_WIDTH = 505;
    this.CANVAS_HEIGTH = 606;
    this.CANVAS_COL = 5;
    this.CANVAS_ROW = 6;

    this.IMAGE_WIDTH = this.BLOCK_WIDTH;
    this.IMAGE_HEIGHT = 171;

    this.MAX_RIGHT = this.CANVAS_WIDTH - this.BLOCK_WIDTH;
    this.MAX_LEFT = 0;
    this.MAX_TOP = 0;
    this.MAX_BOTTOM = this.BLOCK_HEIGTH * (this.CANVAS_ROW - 1);

    this.MAX_SPEED = 300;
    this.MIN_SPEED = 150;
};

/**
 * Game初始化
 */
Game.prototype.init = function () {
    player = new Player();
    allHearts = [new Heart(1), new Heart(2), new Heart(3)];
    allHearts.forEach(function (heart) {
        heart.render();
    });
};

/**
 * 渲染函数
 * 将游戏内需要的元素绘制到canvas中
 */
Game.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * 设置玩家、敌人或收藏物品的随机位置
 * 
 * @param {any} maxCol 最大行数
 * @param {any} minCol 最小行数
 * @param {any} maxRow 最大列数
 * @param {any} minRow 最小列数
 */
Game.prototype.randomPos = function (maxCol, minCol, maxRow, minRow) {
    this.x = (Math.floor(Math.random() * (maxCol - minCol) + minCol) * game.BLOCK_WIDTH);
    this.y = (Math.floor(Math.random() * (maxRow - minRow) + minRow)) * game.BLOCK_HEIGTH - 20;
};

var game = new Game();

// 这是我们的玩家要躲避的敌人 
var Enemy = function () {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.randomRow();
    this.randomSpeed();
    this.x = game.MAX_LEFT;
};

Enemy.prototype = Object.create(Game.prototype);

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x > game.MAX_RIGHT + game.IMAGE_WIDTH) {
        this.x = game.MAX_LEFT - game.IMAGE_WIDTH;
        this.randomRow();
        this.randomSpeed();
    }
    this.x += this.speed * dt;
};

/**
 * 获取Enemy当前位置
 */
Enemy.prototype.getCurrentBlock = function () {
    return Math.floor((this.x + game.IMAGE_WIDTH - 30) / game.BLOCK_WIDTH + 1) +
        '-' +
        (this.y + 20) / game.BLOCK_HEIGTH;
};

/**
 * Enemy随机速度位置函数
 */
Enemy.prototype.randomSpeed = function () {
    this.speed = Math.random() * (game.MAX_SPEED - game.MIN_SPEED) + game.MIN_SPEED;
};

Enemy.prototype.randomRow = function () {
    this.y = (Math.floor(Math.random() * 3 + 1)) * game.BLOCK_HEIGTH - 20;
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.randomPos(6, 1, 6, 4);
    this.col = this.x / game.BLOCK_WIDTH;
    this.hearts = 3;
};

Player.prototype = Object.create(Game.prototype);


/**
 * 更新玩家的位置
 */
Player.prototype.update = function () {
    this.crash();
    if (this.x > game.MAX_RIGHT) {
        this.x = game.MAX_RIGHT;
    } else if (this.x < game.MAX_LEFT) {
        this.x = game.MAX_LEFT;
    } else if (this.y > game.MAX_BOTTOM - 20) {
        this.y = game.MAX_BOTTOM - 20;
    } else if (this.y < game.MAX_TOP) {
        this.win();
    }
};

/**
 * 获取玩家当前所在位置
 */
Player.prototype.getCurrentBlock = function () {
    return Math.floor((this.x) / game.BLOCK_WIDTH + 1) +
        '-' +
        (this.y + 20) / game.BLOCK_HEIGTH;
};

/**
 * 按键移动player实例
 * @param {any} key 按键
 */
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            this.x -= game.BLOCK_WIDTH;
            break;
        case 'up':
            this.y -= game.BLOCK_HEIGTH;
            break;
        case 'right':
            this.x += game.BLOCK_WIDTH;
            break;
        case 'down':
            this.y += game.BLOCK_HEIGTH;
            break;

        default:
            break;
    }
};

/**
 * player与enemy的碰撞函数
 */
Player.prototype.crash = function () {
    var self = this;
    allEnemies.forEach(function (enemy) {
        if (self.getCurrentBlock() === enemy.getCurrentBlock()) {
            self.hearts--;
            if (self.hearts === 0) {
                self.hearts = 3;
                self.lose();
            } else {
                self.randomPos(6, 1, 6, 4);

                allHearts.splice(-1, 1);
                allHearts.forEach(function (heart) {
                    heart.render();
                });
            }
        }
    });
};

/**
 * player获胜函数
 */
Player.prototype.win = function () {
    this.init();
    key = new Key();
};

/**
 * player失败函数
 */
Player.prototype.lose = function () {
    console.log('lose');
};

/**
 * Heart对象，对应Player的heart变量
 * 使用Game对象的render方法绘制到canvas上
 */
var Heart = function (x) {
    this.sprite = 'images/Heart.png';
    this.x = (x - 1) * game.BLOCK_WIDTH;
    this.y = 0;
};

Heart.prototype = Object.create(Game.prototype);

/**
 * Collections收集要素
 */
var Collections = function () {
    this.randomPos(5, 0, 4, 1);
};

Collections.prototype = Object.create(Game.prototype);

/**
 * Collections更新函数
 */
Collections.prototype.update = function () {
    this.collected();
};

/**
 * 如果玩家和收集品在一个区域
 * 就将钥匙放置到右上角
 */
Collections.prototype.collected = function () {
    if (player.getCurrentBlock.call(this) === player.getCurrentBlock()) {
        key.randomPos(5, 4, 1, 0);
    }
};


/**
 * Collections的子类
 * 收集品：钥匙（key）
 */
var Key = function () {
    Collections.call(this);
    this.sprite = 'images/Key.png';
};

Key.prototype = Object.create(Collections.prototype);


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var allHearts = [new Heart(1), new Heart(2), new Heart(3)];
var player = new Player();
var key = new Key();
console.log(key);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// DOM操作