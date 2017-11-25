(function(){
  "use strict";
  
  var WIDTH = 40;
  var HEIGHT = 24;
  var DEBUG_MATRIX  = [[1,1,2,3],[3,4,5,6], [2,5,9,1], [4,7,8,9]];
  
  /* Returns a random integer min <= n < max */
  function rand_int(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  /* Creates a random matrix of numbers */
  function create_random_matrix(width, height){
    var out = [];
    for (var y = 0; y < height; y++){
      var row = [];
      for (var x = 0; x < width; x++){
        row.push(rand_int(1,10));
      }
      out.push(row);
    }
    return out;
  }
  
  /* Creates the board given an id of an empty table element and a matrix containing values */
  function create_board(id, matrix, start_pt){
    var board = document.getElementById(id);
    if (!board || board.tagName.toUpperCase() !== "TABLE"){
      throw "Cannot find table element specified by id " + id;
    }
    for (var y = 0; y < matrix.length; y++){
      var row = document.createElement('tr');
      for (var x = 0; x < matrix[y].length; x++){
        var cell = document.createElement('td');
        var content;
        if (y === start_pt[0] && x === start_pt[1]){
          content = document.createTextNode(' ');
          cell.classList.add('current_point');
        }
        else{
          content = document.createTextNode(matrix[y][x]);
          cell.classList.add('number');
          cell.classList.add('number_' + matrix[y][x]);
          cell.id = y + "_" + x;
        }
        cell.appendChild(content);
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
  }
  
  var matrix = create_random_matrix(WIDTH, HEIGHT);
  var start_pt = [rand_int(0,HEIGHT), rand_int(0,WIDTH)];
  create_board('game_table', matrix, start_pt);
  
})();