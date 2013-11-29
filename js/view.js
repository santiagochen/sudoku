/*SudokuView: Every cell of product*/


var SudokuView = Backbone.View.extend({
	tagName:'li',
	className:'sudoku-cell',
	template:_.template($("#sudokucell").html()),
	events:{
		"click":"clickcell",
		"mouseover #thumb":"showTitle",
		"mouseout #thumb":"hideTitle",
		"click #backcellBtn":"backcell",
		"click #sudokupanel>.previmg":"prevready",
		"click #sudokupanel>.nextimg":"nextready"
	},
	initialize:function(){
		this.listenTo(this.model, 'change', this.changeimg);
		this.render();
	},
	render:function(){
		this.$el.html(this.template(this.model.attributes));
		var that = this;
		this.$el.find("#imgswrap>img").attr("src",this.model.attributes.morepic[this.model.attributes.curimgindex]);
		return this;
	},

	changeimg:function(e){
		this.$el.find("#imgswrap>img").attr("src",this.model.attributes.morepic[this.model.attributes.curimgindex]);
	},
	
	prevready:function(){
		var _index = ((this.model.attributes.curimgindex-1)<0)?(this.model.attributes.morepic.length-1):(this.model.attributes.curimgindex-1);
		this.model.set("curimgindex",_index);
	},

	nextready:function(){
		var _index = ((this.model.attributes.curimgindex+1)>=this.model.attributes.morepic.length)?0:(this.model.attributes.curimgindex+1);
		this.model.set("curimgindex",_index);
	},

	clickcell:function(e){
		e.preventDefault();
		var posX = (parseInt(this.model.cid.substr(1,1))%3==0)?3:parseInt(this.model.cid.substr(1,1))%3;
		var posY = (parseInt(this.model.cid.substr(1,1))%3==0)?(parseInt(this.model.cid.substr(1,1)/3)-1):parseInt(this.model.cid.substr(1,1)/3);
		this.$el.find('#sudokupanel').css({
			left:-((posX-1)*(100+10)),
			top:-(posY*(100+10))
		});
		if(this.model.attributes.morepic.length>1){
			this.$el.find('#sudokupanel>.previmg').show();
		 	this.$el.find('#sudokupanel>.nextimg').show();
		}
		this.$el.find('#sudokupanel').show();

	},
	showTitle:function(e){
		e.preventDefault();
		e.stopPropagation();
		this.$el.find('#title').show();
	},
	hideTitle:function(e){
		e.preventDefault();
		e.stopPropagation();
		this.$el.find('#title').hide();
	},
	backcell:function(e){
		e.preventDefault();
		e.stopPropagation();
		this.$el.find('.sudokupanel').hide();
	},
})


/*Sudoku App View: #wrap*/
window.SudokuAppView = Backbone.View.extend({
	el:$("#wrap"),
	events:{

	},
	initialize:function(){
		this.sudokuUl = this.$("#sudoku-ul");
		this.listenTo(sudokuCollection, 'add', this.addone);
		//this.listenTo(sudokuCollection, 'all', this.addone);
	},
	addone:function(e){
		var sudokuView = new SudokuView({model:e});
		this.sudokuUl.append(sudokuView.el);
	},

})





