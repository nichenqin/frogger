var Game = function () {
    this.BLOCK_WIDTH = 101;
    this.BLOCK_HEIGTH = 83;
    this.CANVAS_WIDTH = 505;
    this.CANVAS_HEIGTH = 606;
    this.CANVAS_COL = 5;
    this.CANVAS_ROW = 6;
    this.IMAGE_WIDTH = 101;
    this.IMAGE_HEIGTH = 171;
};

Game.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var game = new Game();

console.log(game);

// 这是我们的玩家要躲避的敌人 
var Enemy = function () {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.random();
};

Enemy.prototype = Object.create(Game.prototype);

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.x = game.BLOCK_WIDTH * 2;
    this.y = game.BLOCK_HEIGTH * 4;
    this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Game.prototype);

Player.prototype.update = function () {
    if (this.x > game.CANVAS_WIDTH - game.BLOCK_WIDTH) {
        this.x = game.CANVAS_WIDTH - game.BLOCK_WIDTH;
    } else if (this.x <= 0) {
        this.x = 0;
    } else if (this.y > game.BLOCK_HEIGTH * (game.CANVAS_ROW - 1)) {
        this.y = game.BLOCK_HEIGTH * (game.CANVAS_ROW - 1);
    } else if (this.y <= game.BLOCK_HEIGTH) {
        this.y = game.BLOCK_HEIGTH;
    }
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
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
var player = new Player();

console.log(player);

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
    console.log(player.x, player.y);
});