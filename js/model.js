var SudokuEvt = {};
_.extend(SudokuEvt, Backbone.Events);

var SudokuMes = {};
SudokuMes.list = {};
SudokuMes.list.defaulicon = "http://placehold.it/50/fff333/333333&text=ICON";
SudokuMes.list.countorder = 0;

SudokuMes.currentview = {};

SudokuMes.listcalled = "idollist_s"; //fanslist_s:获取个人听众列表   idollist_s:获取个人收听的人列表  mutual_list:获取互听好友列表  

var SudokuModel = Backbone.Model.extend({
	initialize:function(){
		
	},
	defaults:{
		title:'',
		detail:'',
		thumb:'',
		curimgindex:0,
	},
	
});


var MutualListModel = Backbone.Model.extend({
	initialize:function(){},
	defaults:{
		fansnum:'',
		head:'', //for 单方面收听好友
		https_head:'', //for 单方面收听好友
		headurl:'',
		https_headurl:'',
		idolnum:'',
		isvip:'',
		name:'',
		nick:'',
		openid:'',
		itsorder:''
	}
});