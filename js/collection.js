
var SudokuCollection = Backbone.Collection.extend({model:SudokuModel});
var sudokuCollection = new SudokuCollection();

var MutualListCollection = Backbone.Collection.extend({model:MutualListModel});
var mutualListCollection = new MutualListCollection();