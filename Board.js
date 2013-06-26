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
      return false; // fixme
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
