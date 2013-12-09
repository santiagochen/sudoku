/*
for sudoku
*/

var sudokuModel1 = new SudokuModel({
	title:'日落',
	detail:'sudokuModel1 details',
	//thumb:'assets/p1.jpg',
	thumb:'http://placehold.it/100/ffffff/333333&text=SUNSET',
	morepic:[
		"http://placehold.it/320x320&text=SUNSET-A",
		"http://placehold.it/320x320&text=SUNSET-B",
		"http://placehold.it/320x320&text=SUNSET-C"]
});
var sudokuModel2 = new SudokuModel({
	title:'狗狗',
	detail:'sudokuModel2 details',
	thumb:'http://placehold.it/100/ffffff/333333&text=DOG',
	morepic:[
		"http://placehold.it/320x320&text=DOG-A",
		"http://placehold.it/320x320&text=DOG-B",
		"http://placehold.it/320x320&text=DOG-C"]
});
var sudokuModel3 = new SudokuModel({
	title:'阿拉蕾',
	detail:'sudokuModel3 details',
	thumb:'http://placehold.it/100/ffffff/333333&text=ALALEI',
	morepic:[
		"http://placehold.it/320x320&text=ALALEI-A",
		"http://placehold.it/320x320&text=ALALEI-B",
		"http://placehold.it/320x320&text=ALALEI-C"]
});
var sudokuModel4 = new SudokuModel({
	title:'男孩',
	detail:'sudokuModel4 details',
	thumb:'http://placehold.it/100/ffffff/333333&text=BOY',
	morepic:[
		"http://placehold.it/320x320&text=BOY-A",
		"http://placehold.it/320x320&text=BOY-B",
		"http://placehold.it/320x320&text=BOY-C"]
});
var sudokuModel5 = new SudokuModel({
	title:'卡通女',
	detail:'sudokuModel5 details',
	thumb:'http://placehold.it/100/ffffff/333333&text=GIRL',
	morepic:[
		"http://placehold.it/320x320&text=GIRL-A",
		"http://placehold.it/320x320&text=GIRL-B",
		"http://placehold.it/320x320&text=GIRL-C"]
});
var sudokuModel6 = new SudokuModel({
	title:'花朵',
	detail:'sudokuModel6 details',
	thumb:'http://placehold.it/100/ffffff/333333&text=FLOWER',
	morepic:[
		"http://placehold.it/320x320&text=FLOWER-A",
		"http://placehold.it/320x320&text=FLOWER-B",
		"http://placehold.it/320x320&text=FLOWER-C"]
});
var sudokuModel7 = new SudokuModel({
	title:'光头男',
	detail:'sudokuModel7 details',
	thumb:'http://placehold.it/100/ffffff/333333&text=HAIRLESS',
	morepic:[
		"http://placehold.it/320x320&text=HAIRLESS-A",
		"http://placehold.it/320x320&text=HAIRLESS-B",
		"http://placehold.it/320x320&text=HAIRLESS-C"]
});
var sudokuModel8 = new SudokuModel({
	title:'流水瀑布',
	detail:'sudokuModel8 details',
	thumb:'http://placehold.it/100/ffffff/333333&text=WATERFALL',
	morepic:[
		"http://placehold.it/320x320&text=WATERFALL-A",
		"http://placehold.it/320x320&text=WATERFALL-B",
		"http://placehold.it/320x320&text=WATERFALL-C"]
});
var sudokuModel9 = new SudokuModel({
	title:'男明星',
	detail:'sudokuModel9 details',
	thumb:'http://placehold.it/100/ffffff/333333&text=POPSTAR',
	morepic:[
		"http://placehold.it/320x320&text=POPSTAR-A",
		"http://placehold.it/320x320&text=POPSTAR-B",
		"http://placehold.it/320x320&text=POPSTAR-C"]
});

var sudokuAppView = new SudokuAppView(); 

sudokuCollection.add([sudokuModel1,sudokuModel2,sudokuModel3,sudokuModel4,sudokuModel5,sudokuModel6,sudokuModel7,sudokuModel8,sudokuModel9]);

/*QQ login callback*/
var login = {};
login.loginSuccess = function(){
	SudokuEvt.trigger("loginSuccess",'true');
	document.getElementById("login_frame").style.left = "-9999px";
	document.getElementById("layoutBg").style.left = "-9999px";
}


