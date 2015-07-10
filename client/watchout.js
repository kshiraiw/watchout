(function() {

/**
 * Initial set up!
 */
var gameboardWidth = 780;
var gameboardHeight = 480;
var gameboard = d3.select('.container').append('svg').attr('class', 'gameboard').attr('width', gameboardWidth).attr('height', gameboardHeight);





/**
 * Scoreboard
 */
var Scoreboard = function() {

};





/**
 * Player
 */
var Player = function() {
  // Set up player inits
  this.x = gameboardWidth/2;
  this.y = gameboardHeight/2;
  this.r = 12;
  this.col = 'rgb(255, 40, 100)';

  // create and append player
  this.p = gameboard.append('circle').attr('cx', this.x).attr('cy', this.y).attr('r', this.r).attr('fill', this.col);

  // Listen for drag
  this.listenForDrag();
};

Player.prototype.listenForDrag = function() {
  var scope = this;
  var drag = d3.behavior.drag();
  
  this.p.call(drag);

  drag.on('drag', function() {
    scope.renderPosition(d3.event.x, d3.event.y);
  });
}

Player.prototype.renderPosition = function(x, y) {
  if (x - this.r > 0 && x + this.r < gameboardWidth) {
    this.p.attr('cx', x);
  }

  if (y - this.r > 0 && y + this.r < gameboardHeight) {
    this.p.attr('cy', y);
  }
}

Player.prototype.getPosition = function() {
  return {
    x: this.x,
    y: this.y
  }
};





// ENEMY
// =====
// 
// - depending on number of enemies set in options, we create that amount (as svgs)
// - we can then push them to an array
// - each has an id, x, and y property
// - enemies can move randomly 
// - check for collisions on player

/**
 * Enemy
 */
var Enemy = function() {

};





/**
 * Initialise the game!
 */
var init = function() {
  var player = new Player();
};

init();

})();