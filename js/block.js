var Block = function(x,y,value) {
  this.x = x * 100;
  this.y = y * 125;
  this.value = value;
  this.game = game;
  this.id = game.idNumber
  game.idNumber++
  this.color = colorArray[this.value-1]
}

Block.prototype.moveUp = function() {
  var potentialBlock = game.existsAtPoint((this.x/100), (this.y/125)-1);
  if(potentialBlock == undefined){
    this.y -= 125;
    $('#block-' + String(this.id)).animate({top: "-=125"},200)
    return true;
  }
  else if(this.canCombine(potentialBlock, this)){
    if([potentialBlock.value, this.value].sort().equalsArray([1,2])){
      $('#block-' + String(this.id)).animate({top: "-=125"},200)
      this.combineOneTwo(potentialBlock, this)
    }
    else {
      $('#block-' + String(this.id)).animate({top: "-=125"},200)
      this.combine(potentialBlock, this);
    }
    return true;
  } else {
    return false;
  }
}

Block.prototype.moveDown = function() {
  var potentialBlock = game.existsAtPoint((this.x/100), (this.y/125)+1);
  if(potentialBlock == undefined){
    this.y += 125;
    $('#block-' + String(this.id)).animate({top: "+=125"},200)
    return true;
  } else if(this.canCombine(potentialBlock, this)){
    if([potentialBlock.value, this.value].sort().equalsArray([1,2])){
      $('#block-' + String(this.id)).animate({top: "+=125"},200)
      this.combineOneTwo(potentialBlock, this)
    }
    else {
      $('#block-' + String(this.id)).animate({top: "+=125"},200)
      this.combine(potentialBlock, this);
    }
    return true;
  } else {
    return false;
  }
}

Block.prototype.moveLeft = function() {
  var potentialBlock = game.existsAtPoint((this.x/100) - 1, (this.y/125))
  if(potentialBlock == undefined){
    this.x -= 100;
    $('#block-' + String(this.id)).animate({left: "-=100"}, 200)
    return true;
  } else if(this.canCombine(potentialBlock, this)){
    if([potentialBlock.value, this.value].sort().equalsArray([1,2])){
      $('#block-' + String(this.id)).animate({left: "-=100"}, 200)
      this.combineOneTwo(potentialBlock, this)
    }
    else {
      $('#block-' + String(this.id)).animate({left: "-=100"}, 200)
      this.combine(potentialBlock, this);
    }
    return true;
  } else {
    return false;
  }
}

Block.prototype.moveRight = function() {
  var potentialBlock = game.existsAtPoint((this.x/100) + 1, (this.y/125))
  if(potentialBlock == undefined){
    this.x += 100;
    $('#block-' + String(this.id)).animate({left: "+=100"}, 200)
    return true;
  } else if(this.canCombine(potentialBlock, this)){
    if([potentialBlock.value, this.value].sort().equalsArray([1,2])){
      $('#block-' + String(this.id)).animate({left: "+=100"}, 200)
      this.combineOneTwo(potentialBlock, this);
    }
    else {
      $('#block-' + String(this.id)).animate({left: "+=100"}, 200)
      this.combine(potentialBlock, this);
    }
    return true;
  } else {
    return false;
  }
}

Block.prototype.canMoveUp = function() {
  if(this.y == 0) return false;
  var potentialBlock = game.existsAtPoint((this.x/100), (this.y/125) - 1)
  if(potentialBlock == undefined){
    return true;
  } else if(this.canCombine(potentialBlock, this)) {
    return true;
  } else {
    return false;
  }
}

Block.prototype.canMoveDown = function() {
  if(this.y == 375) return false;
  var potentialBlock = game.existsAtPoint((this.x/100), (this.y/125) + 1)
  if(potentialBlock == undefined){
    return true;
  } else if(this.canCombine(potentialBlock, this)) {
    return true;
  } else {
    return false;
  }
}

Block.prototype.canMoveLeft = function() {
  if(this.x == 0) return false;
  var potentialBlock = game.existsAtPoint((this.x/100) - 1, (this.y/125))
  if(potentialBlock == undefined){
    return true;
  } else if(this.canCombine(potentialBlock, this)) {
    return true;
  } else {
    return false;
  }
}

Block.prototype.canMoveRight = function() {
  if(this.x == 300) return false;
  var potentialBlock = game.existsAtPoint((this.x/100) + 1, (this.y/125))
  if(potentialBlock == undefined){
    return true;
  } else if(this.canCombine(potentialBlock, this)) {
    return true;
  } else {
    return false;
  }
}

Block.prototype.combine = function(blockA, blockB) {
  blockA.value *= 2;
  blockA.color = colorArray[blockA.value-1]
  removeA(game.blocks, blockB);
  delete(blockB);
}

Block.prototype.canCombine = function(blockA, blockB) {
  sortedArray = [blockA.value, blockB.value].sort()
  if (blockA.value == blockB.value && sortedArray.equalsArray([1,1]) == false && sortedArray.equalsArray([2,2]) == false) {
    return true;
  }
  else if([blockA.value, blockB.value].sort().equalsArray([1,2])) {
    return true;
  }
  else {
    return false;
  }
}

Block.prototype.combineOneTwo = function(blockA, blockB) {
  blockA.value = 3;
  blockA.color = colorArray[blockA.value-1]
  removeA(game.blocks, blockB);
  delete(blockB);
}
