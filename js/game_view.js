var GameView = function(game) {
  this.game = game
  this.blocks = game.blocks;
  this.gameHtml = $('#game');
  this.nextMove = $('#next-move');
  this.lowBlockHtml = "<div class='low-block-background' id='block-{id}' style='left : {x}px; top : {y}px;'><div class='low-block' style='background-color : {color};'><span id='block-text'>{value}</span></div></div>";
  this.highBlockHtml = "<div class='high-block-background' id='block-{id}' style='left : {x}px; top : {y}px;'><div class='high-block'><span id='block-text'>{value}</span></div></div>";
}

GameView.prototype.drawAtPosition = function() {
  this.gameHtml.html("");
  for(var block_index = 0; block_index < this.blocks.length; block_index++){
    if(this.blocks[block_index].value < 3) {
      var cleanHtml = tokenReplace(this.lowBlockHtml, this.blocks[block_index], '0');
    } else {
      var cleanHtml = tokenReplace(this.highBlockHtml, this.blocks[block_index], '0');
    }
    this.gameHtml.append(cleanHtml);
  }
  this.nextMove.html("<p id='next-text'>Next</p>");
  if(this.game.nextBlock < 3){
    this.nextMove.append("<div class='low-block-background'><div class='low-block' style='background-color :" + String(colorArray[this.game.nextBlock -1]) + ";'><span id='block-text'>"+ String(this.game.nextBlock) +"</span></div></div>");
  } else {
      this.nextMove.append("<div class='high-block-background'><div class='high-block'><span id='block-text'>"+ String(this.game.nextBlock) +"</span></div></div>");
    }
}

GameView.prototype.gameOver = function() {
  var gameOverHtml = "<div id='game-over-background'><div id='game-over'>GAME OVER <br> Score: " + String(game.calculateScore()) + "<br><br>Click to Try Again!</div></div>";
  this.gameHtml.append(gameOverHtml);
  $('#game-over-background').hide();
  $('#game-over-background').fadeIn("slow");
}