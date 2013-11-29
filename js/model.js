window.SudokuEvt = {};
_.extend(SudokuEvt, Backbone.Events);

window.SudokuModel = Backbone.Model.extend({
	initialize:function(){
		
	},
	defaults:{
		title:'',
		detail:'',
		thumb:'',
		curimgindex:0,
	},
	
})


