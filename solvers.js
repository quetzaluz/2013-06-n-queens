// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)


window.findNRooksSolution = function(n){
  //The solution below is not recursive and will not succeed with certain
  //board sizes. I tried several recursive solutions of my own design before
  //opting for the solution before. I found this solution from the following:
  //http://logicmason.com/2013/a-recursive-algorithm-for-generating-all-n-rooks-solutions-and-a-linear-time-n-queens-solution/
  //I plan to revisit this and come up with a solution with a more iterative structure.
  if (typeof n === 'number') {var board = new Board(makeEmptyMatrix(n));}
  else {return false;}
  var solution = board.rows();
  for (var i = 0; i < n/2; i++) {
    if ((i+1)*2-1 < n) { 
      solution[i][((i+1)*2)-1] = true;
    }
    if (i*2 < n){
      solution[i+Math.floor(n/2)][i*2] = true;
    }
  }
  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  var allSolutions = _.memoize(function(n) {
    if (!n) return [true]; //Written as such to conform to spec test-- [] preferable
    if (n === 1) return [[[true]]]; //One piece solutions true no matter what
    var solutions = [];
    for (var i = 0; i < n; i++) {
      _.each(allSolutions(n-1), function(n){
        //By recursively calling allSolutions with n-1 as above, not infinite
        solutions.push(window.findNRooksSolution(n));
      });
    }
    return solutions;
  });
  solutionCount = allSolutions(n).length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

/*PSUEDO CODE -- this looks like a good structure given the currently
defined methods. From http://www.brian-borowski.com/Software/NQueens/
function tryConfig(i: integer) {
   for j <- 1 to n do {
      if safe then {
         select jth candidate;
         set queen;
         if i < n then
            tryConfig(i+1);
         else
            record solution;
         remove queen;
      }
   }
}
Will try to implement a structure similar to above.*/


window.findNQueensSolution = function(n){
  //debugger;
  var solution;
  if (typeof n === 'number') {
    var i = 0;
    var board = new Board(makeEmptyMatrix(n));
  }
  function tryConfig(i) {
    for (var j = 0; j < n; j++) {
      if (board.hasAnyQueensConflicts() === false) {
        board.get(j)[i] = 1;
        if (i < n) {
          tryConfig(i+1);
        } 
        if (board.hasAnyQueensConflicts() === false) {
          solution = board.rows();
        }
        board.get(j)[i] = 0;
      }
    }
  };
  tryConfig(i);
  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};

var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };
