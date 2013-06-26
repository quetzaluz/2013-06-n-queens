(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      var presentInRow = 0;
      for (var i =0; i < this.rows()[0].length; i++) {
        if (this.get(rowIndex)[i] === 1) {
          presentInRow += 1;
        }
      }
      if (presentInRow > 1) {return true;}
      else {return false;}
    },

    hasAnyRowConflicts: function(){
      var rowsWithConflict = 0;
      var rows = this.get('n');
      for (var i = 0; i < rows; i++) {
        if (this.hasRowConflictAt(i)) {rowsWithConflict +=1}
      }
      return !!rowsWithConflict;
    },

    hasColConflictAt: function(colIndex){
      var presentInCol = 0;
      var rows = this.get('n');
      for (var i =0; i<rows; i++) {
        if (this.get(i)[colIndex] === 1) {
          presentInCol += 1;
        }
      }
      if (presentInCol > 1) {return true;}
      else {return false;}
    },

    hasAnyColConflicts: function(){
      var colsWithConflict = 0;
      var rows = this.get('n');
      for (var i = 0; i < rows; i++) {
        if (this.hasColConflictAt(i)) {colsWithConflict +=1}
      }
      return !!colsWithConflict;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
    //charted out results from _getFirstRowColumnIndexForMajorDiagonalOn
    //to figure out how major diagonal indices are      0  1  2  3
    //generated. My results ended up looking like     ------------
    //This. Then decided that the best way to seek  0|  0  1  2  3
    //conflicts it to iterate over every value on   1| -1  0  1  2
    //the board to see if it has this major index.  2| -2 -1  0  1
    //The operation time for this is n^2 -- bad.    3| -3 -2 -1  0
    //
    // For now I am just trying to get this to work, but this can easily
    // be refactored such that the col and row index are both increased
    // by one, thus checking only diagonal values.

      var presentInMajorD = 0;
      majorIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(0, majorDiagonalColumnIndexAtFirstRow);
      var l = this.get('n');
      for (var i = 0; i < l; i++) {
        for (var j = 0; j < l; j++) {
          if (this._getFirstRowColumnIndexForMajorDiagonalOn(i, j) === majorIndex) {
            if (this.get(i)[j] === 1) {
              presentInMajorD += 1;
            }
          }
        }
      }
      if (presentInMajorD > 1) {return true;}
      else {return false;}
    },

    hasAnyMajorDiagonalConflicts: function(){
      return false; // fixme
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      return false; // fixme
    },

    hasAnyMinorDiagonalConflicts: function(){
      return false; // fixme
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
