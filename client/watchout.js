(function() {

/**
 * Initial set up!
 */
var gameboardWidth = 1080;
var gameboardHeight = 540;
var gameboard = d3.select('.container').append('svg')
                  .attr('class', 'gameboard')
                  .attr('width', gameboardWidth)
                  .attr('height', gameboardHeight);
var numEnemies = 16;
var monsters = [
  'img/monster1.png',
  'img/monster2.png',
  'img/monster3.png',
  'img/monster4.png'
]


/**
 * Scoreboard
 */
var Scoreboard = function() {
  this.highScore = 0;
  this.currentScore = 0;
  this.collisions = 0;
};

Scoreboard.prototype.updateHighScore = function() {
  d3.select('.high').select('span').text(this.highScore);
};

Scoreboard.prototype.updateCurrentScore = function() {
  d3.select('.current').select('span').text(this.currentScore);
};

Scoreboard.prototype.updateCollisions = function() {
  this.collisions++;
  d3.select('.collisions').select('span').text(this.collisions);
};


/**
 * Player
 */
var Player = function() {
  this.width = 48;
  this.height = 48;
  this.x = gameboardWidth/2 - this.width/2;
  this.y = gameboardHeight/2 - this.height/2;
  this.p = gameboard.append('image')
                    .attr('x', this.x)
                    .attr('y', this.y)
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .attr('xlink:href', 'img/cupcake.png');

  this.listenForDrag();
};

Player.prototype.listenForDrag = function() {
  var scope = this;
  var drag = d3.behavior.drag();
  
  this.p.call(drag);
  drag.on('drag', function() {
    scope.renderPosition(d3.event.x, d3.event.y);
  });
};

Player.prototype.renderPosition = function(x, y) {
  if (x - this.width/2 > 0 && x + this.width/2 < gameboardWidth) {
    this.p.attr('x', x - this.width/2);
  }

  if (y - this.height/2 > 0 && y + this.height/2 < gameboardHeight) {
    this.p.attr('y', y - this.height/2);
  }
};


/**
 * Enemy
 */
var Enemy = function(img) {
  this.width = 48;
  this.height = 48;
  this.x = this.getRandomPosition().x;
  this.y = this.getRandomPosition().y;
  this.e = gameboard.append('image')
                    .attr('x', this.x)
                    .attr('y', this.y)
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .attr('xlink:href', img);

  this.moveEnemiesRandomly();
};

Enemy.prototype.getRandomPosition = function() {
  return {
    x: Math.floor(Math.random()*gameboardWidth) - this.width/2,
    y: Math.floor(Math.random()*gameboardHeight) - this.height/2
  }
};

Enemy.prototype.moveEnemiesRandomly = function() {
  setInterval(function() {
    this.e.transition().duration(1000)
                       .attr('x', this.getRandomPosition().x)
                       .attr('y', this.getRandomPosition().y);
  }.bind(this), 1000);
};


/**
 * Set up enemies
 */
var enemies = [];
for (var i = 0; i < numEnemies; i++) {
 enemies.push(new Enemy(monsters[i % 4]));
}


/**
 * Initialise a new player and a new scoreboard
 */
var player = new Player();
var scoreboard = new Scoreboard();


/**
 * Sets the interval to check for collisions and update scores.
 */
setInterval(function() {
 var playerX = player.p.attr('x');
 var playerY = player.p.attr('y');
 var collision = false;

 for (var i = 0; i < enemies.length; i++) {
   var enemy = enemies[i];
   var enemyX = enemy.e.attr('x');
   var enemyY = enemy.e.attr('y');
   var distance = Math.sqrt(Math.pow((enemyX - playerX), 2) + Math.pow((enemyY - playerY), 2));

   if (distance < (player.width/2 + enemy.width/2)) {
     collision = true;
   }
 }

 if (collision === true) {
   if (scoreboard.currentScore > 1) {
     scoreboard.updateCollisions();
   }

   scoreboard.currentScore = 0;
   scoreboard.updateCurrentScore();
 } else {
   scoreboard.currentScore += 1;
   scoreboard.updateCurrentScore();

   if (scoreboard.currentScore > scoreboard.highScore) {
     scoreboard.highScore = scoreboard.currentScore;
     scoreboard.updateHighScore();
   }
 }
}, 50);

})();