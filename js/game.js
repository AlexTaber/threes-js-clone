var Game = function(boardString) {
  this.idNumber = 0
  //this.boardString = boardString || "1111636336362222";
  this.boardString = boardString || "00000100002000000";
  this.CYCLE = [1,1,1,1,2,2,2,2,3,3,3,3]
  this.curCycle = [1,1,1,1,2,2,2,2,3,3,3,3]
  this.nextBlock = this.findValue()
}

Game.prototype.generateBlocks = function() {
  var blocksArray = []
  for(var ind = 0; ind < this.boardString.length; ind++){
    if(this.boardString[ind] != 0){
      var x = ind % 4;
      var y = Math.floor(ind / 4);
      var value = value = parseInt(this.boardString[ind]);
      newBlock = new Block(x, y, value, this);
      blocksArray.push(newBlock);
    }
  }
  return blocksArray
}

Game.prototype.spawnBlock = function(x,y) {
  var value = this.findValue()
  newBlock = new Block(x,y,this.nextBlock,this);
  this.nextBlock = value;
  this.blocks.push(newBlock)
  return newBlock;
}

Game.prototype.findValue = function() {
  var index = getRandomInt(0,this.curCycle.length - 1);
  var value = this.curCycle[index];
  this.curCycle.splice(index, 1);
  if (this.curCycle.length == 0) this.curCycle = this.CYCLE.slice(0);
  return value;
}

Game.prototype.toString = function() {
  stringArray = [];
  for(var x = 0; x < 4; x++){
    for(var y = 0; y < 4; y++){
      myBlock = this.existsAtPoint(x,y);
      if (myBlock == undefined) stringArray.push("0");
      else stringArray.push(String(myBlock.value));
    }
  }
  return stringArray.join();
}

Game.prototype.existsAtPoint = function(x,y) {
  x *= 100;
  y *= 125;
  myBlock = this.blocks.filter(function(block) {
    return (block.x == x && block.y == y);
  })
  if(myBlock.length == 1) return myBlock[0];
  else return undefined;
}

Game.prototype.findFreeCellUp = function() {
  var indexArray = shuffleArray([0,1,2,3])
  for(var i = 0; i < 4; i++){
    if(this.existsAtPoint(indexArray[i],3) == undefined){
     this.spawnBlock(indexArray[i],3);
     return true;
    }
  }
  return false;
}

Game.prototype.findFreeCellDown = function() {
  var indexArray = shuffleArray([0,1,2,3])
  for(var i = 0; i < 4; i++){
    if(this.existsAtPoint(indexArray[i],0) == undefined){
     this.spawnBlock(indexArray[i],0);
     return true;
    }
  }
  return false;
}

Game.prototype.findFreeCellLeft = function() {
  var indexArray = shuffleArray([0,1,2,3])
  for(var i = 0; i < 4; i++){
    if(this.existsAtPoint(3,indexArray[i]) == undefined){
     this.spawnBlock(3,indexArray[i]);
     return true;
    }
  }
  return false;
}

Game.prototype.findFreeCellRight = function() {
  var indexArray = shuffleArray([0,1,2,3])
  for(var i = 0; i < 4; i++){
    if(this.existsAtPoint(0,indexArray[i]) == undefined){
     this.spawnBlock(0,indexArray[i]);
     return true;
    }
  }
  return false;
}

Game.prototype.moveUp = function() {
  var moved = false;
  for(var x = 0; x < 4; x++){
    for(var y = 1; y < 4; y++){
      myBlock = this.existsAtPoint(x,y);
      if(myBlock != undefined){
        if(myBlock.moveUp()) moved = true;
      }
    }
  }
  return moved;
}

Game.prototype.moveDown = function() {
  var moved = false;
  for(var x = 0; x < 4; x++){
    for(var y = 2; y >= 0; y--){
      myBlock = this.existsAtPoint(x,y);
      if(myBlock != undefined){
        if(myBlock.moveDown()) moved = true;
      }
    }
  }
  return moved;
}

Game.prototype.moveLeft = function() {
  var moved = false;
  for(var y = 0; y < 4; y++){
    for(var x = 1; x < 4; x++){
      myBlock = this.existsAtPoint(x,y);
      if(myBlock != undefined){
        if(myBlock.moveLeft()) moved = true;
      }
    }
  }
  return moved;
}

Game.prototype.moveRight = function() {
  var moved = false;
  for(var y = 0; y < 4; y++){
    for(var x = 2; x >= 0; x--){
      myBlock = this.existsAtPoint(x,y);
      if(myBlock != undefined) {
        if(myBlock.moveRight()) moved = true;
      }
    }
  }
  return moved;
}

Game.prototype.calculateScore = function() {
  var score = 0;
  for(var i = 0; i < 16; i++) {
    myBlock = this.blocks[i];
    if(myBlock.value >= 3){
      num = (Math.log(myBlock.value/3) / Math.log(2)) + 1;
      score += Math.pow(3, num);
    }
  }
  return score;
}

Game.prototype.gameOver = function() {
  if(this.blocks.length == 16) {
    for(var x = 0; x < 4; x++){
      for(var y = 0; y < 4; y++){
        var myBlock = this.existsAtPoint(x,y);
        if(myBlock.canMoveUp()) return false;
        else if(myBlock.canMoveDown()) return false;
        else if(myBlock.canMoveLeft()) return false;
        else if(myBlock.canMoveRight()) return false;
      }
    }
    return true;
  } else {
    return false;
  }
}