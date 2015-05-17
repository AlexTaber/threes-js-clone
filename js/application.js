$(document).ready(function() {
  newGame();
});

function movement(event) {
  event.preventDefault();
  //left
  if( event.which == 37 ) {
    if(game.moveLeft()) {
      $(document).off('keydown');
      game.findFreeCellLeft();
      setTimeout(move, 200);
    }
  }
  //right
  if( event.which == 39 ) {
    if(game.moveRight()) {
      $(document).off('keydown');
      game.findFreeCellRight()
      setTimeout(move, 200);
    }
  }
  //up
  if( event.which == 38 ) {
    if(game.moveUp()) {
      $(document).off('keydown');
      game.findFreeCellUp()
      setTimeout(move, 200);
    }
  }
  //down
  if( event.which == 40 ) {
    if(game.moveDown()) {
      $(document).off('keydown');
      game.findFreeCellDown()
      setTimeout(move, 200);
    }
  }
}

function move(){
  var myFunc = game.view.drawAtPosition.bind(game.view);
  myFunc();
  if(game.gameOver()) {
    var myFunc = game.view.gameOver.bind(game.view);
    myFunc();
    $('#game-over-background').click(function(){
      //document.location.reload();
      delete(game);
      newGame();
    })
  } else {
    $(document).keydown(movement);
  }
}

function newGame() {
  game = new Game();
  game.blocks = game.generateBlocks();
  game.view = new GameView(game);
  game.view.drawAtPosition();
  $(document).keydown(movement);
}