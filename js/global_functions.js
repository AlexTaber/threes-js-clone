tokenReplace =  function(tokenString, objValues) {
  var missingReplacement = arguments.length > 2 ? arguments[2] : null;
    return tokenString.replace(/\{([^\}]*)\}/g, function(token, match, number, txt) {
    return objValues[match] || missingReplacement || token;
  });
}

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.equalsArray = function(array) {
  return this.join() === array.join();
}


var colorArray = ["#f28d8d","#4298f9","#d08cf6","#7f93f6","#fbbd2c","#53c1b9","#b0ff01","##f66217"]