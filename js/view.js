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
		"click #sudokupanel>.nextimg":"nextready",
		"click #newweibo":"onNewWeibo",
		"click #newmes":"onNewMes",
	},
	initialize:function(){
		var that = this;
		this.listenTo(this.model, 'change', this.changeimg);
		SudokuEvt.on("loginSuccess",this.onLoginSuccess,this);
		
		this.render();
	},

	render:function(){
		this.$el.html(this.template(this.model.attributes));
		var that = this;
		this.$el.find("#imgswrap>img").attr("src",this.model.attributes.morepic[this.model.attributes.curimgindex]);
		return this;
	},

	onNewMes:function() {
		SudokuEvt.trigger("mespanleshow");
		if(mutualListCollection.length==0){
			this.getList(1);
		}
		SudokuMes.selcallback = "mes";
		//this.$el.find('#newmespanel').show("fast");
	},

	onNewWeibo:function(){
		SudokuEvt.trigger("weibopanelshow");
	},

	getList:function(page){
		//get user Info
		ApiCall.libCall({
			type : "GET",
			//url : 'weibo_read/friends/mutual_list', 
			url: 'weibo_read/friends/'+SudokuMes.listcalled, 
			data : {
				name: SudokuMes.weiboaccount,
				reqnum:30,
				startindex:30*(page-1),
			}, 
			dataType : 'json', 
			error : function(error) {
				console.log(error);
			},
			success : function(data) {
				//console.log(data);
				if(data.data.data){

					/*Real live snippet*/
					SudokuMes.list.totalnum = data.data.data.totalnum;

					SudokuMes.list[page]= data.data.data;
					//create mutualListModel
					_.each(SudokuMes.list[page]['info'],function(list,order){
						
						//adjust headurl and https_headurl
						if(list.headurl){list.headurl=list.headurl+"/50";}
						else{list.headurl=SudokuMes.list.defaulicon;}	
						if(list.https_headurl){list.https_headurl=list.https_headurl+"/50";}
						else{list.https_headurl=SudokuMes.list.defaulicon;}
						//for 单方面收听好友的返回
						//adjust headurl and https_headurl
						if(list.head){list.head=list.head+"/50";}
						else{list.head=SudokuMes.list.defaulicon;}	
						if(list.https_head){list.https_head=list.https_head+"/50";}
						else{list.https_head=SudokuMes.list.defaulicon;}

						mutualListCollection.add(list);
						mutualListCollection.at(order).set("atpage",page);

						mutualListCollection.at(SudokuMes.list.countorder).set("itsorder",SudokuMes.list.countorder);
						SudokuMes.list.countorder++;

					});
					
					SudokuMes.list.curpage = page;
					SudokuMes.list.maxpage = page;
					SudokuMes.list.atpage = page;
					SudokuEvt.trigger("turntopage",(SudokuMes.list.atpage));

				}
				
			}
		});
	},

	getUserIcon:function(){
		var that = this;
		//get user Info
		ApiCall.libCall({
			type : "GET",
			url : 'weibo_read/user/info/baseinfo', 
			data : {}, 
			dataType : 'json', 
			error : function(error) {
				//console.log(error)
			},
			success : function(data) {
				
				if(data.data.data.head){SudokuMes.usericon = (data.data.data.head)+"/50";}
				else{SudokuMes.usericon = SudokuMes.list.defaulicon;}
				that.$el.find('#myicon').attr("src",SudokuMes.usericon);

			}
		});
	},

	onLoginSuccess:function(){
		
		if(this.$el.find('#sudokupanel').css("display")!=="none"){
			this.$el.find('#loginBtn').hide();
			this.$el.find('#snspart').show();
			this.getUserIcon();
			//get weiboaccount:
			ApiCall.libCall({
				type : "GET",
				url : 'weibo_read/user/info/name', 
				data : {}, 
				dataType : 'json', 
				error : function(error) {
					//console.log(error)
				},
				success : function(data) {
					//console.log(data.data.data.name);
					if(data.data.data.name){
						SudokuMes.weiboaccount = data.data.data.name;
					}
				}
			});
		}
	},

	changeimg:function(e){
		this.$el.find("#imgswrap>img").attr("src",this.model.attributes.morepic[this.model.attributes.curimgindex]);
		//SudokuMes.currentview.img = this.model.attributes.morepic[this.model.attributes.curimgindex];
		SudokuMes.currentview = this.model.attributes;
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
		SudokuMes.currentview = this.model.attributes;
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
		this.$el.find('#sudokupanel').show("fast");
		
		if(SudokuMes.weiboaccount){
			this.$el.find('#loginBtn').hide();
			this.$el.find('#snspart').show();
			//this.getUserIcon();
			if(SudokuMes.usericon){
				this.$el.find('#myicon').attr("src",SudokuMes.usericon);
			}
			else{
				this.getUserIcon();
			}
			
			
		}
		else{
			this.$el.find('#snspart').hide();
			this.$el.find('#loginBtn').show().bind("click",this.userLogin);
		}
	
	},

	userLogin:function(){
		document.getElementById("layoutBg").style.display = "block";
		document.getElementById("layoutBg").style.position = "fixed";
		document.getElementById("layoutBg").style.zIndex = 9998;
		document.getElementById("layoutBg").style.left = '0px';
		document.getElementById("layoutBg").style.top = '0px';
		document.getElementById("layoutBg").style.height = document.body.clientHeight + "px";
		document.getElementById("layoutBg").style.width = document.body.clientWidth + "px";
		
		document.getElementById("login_frame").src = "http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=636014201&target=self&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm";
		document.getElementById("login_frame").style.position = "fixed";
		document.getElementById("login_frame").style.left ="30%";
		document.getElementById("login_frame").style.top = "0px";
		document.getElementById("login_frame").style.zIndex = 9999;
		
		setTimeout(function(){
			window.frames["login_frame"].document.getElementById("close").onclick=function(){
				document.getElementById("login_frame").style.left = "-9999px";
				document.getElementById("layoutBg").style.left = "-9999px";
			};
		},1000);
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
		this.$el.find('.sudokupanel').hide("fast");
	},
});

/*MutualListView is used for showing MutualList of Tencent Weibo*/
var MutualListView = Backbone.View.extend({
	tagName:'li',
	className:'mutualListcell',
	templateMutual:_.template('<img src="<%=https_headurl%>"/>'),
	templateSingle:_.template('<img src="<%=https_head%>"/>'), //for 单方面收听的好友
	events:{
		"click img":"selectperson"
	},
	initialize:function(){
		this.render();
		this.listenTo(this.model,"change",this.updateMutualView);
	},
	updateMutualView:function(e){
		this.render();
	},
	selectperson:function(e){
		if(SudokuMes.selcallback == "weibo"){
			SudokuEvt.trigger("weiboselcallback",this);
		}
		else if(SudokuMes.selcallback = "mes"){
			SudokuEvt.trigger("messelcallback",this);
		}
	},
	render:function(){
		if(SudokuMes.listcalled == "mutual_list"){
			this.$el.html(this.templateMutual(this.model.attributes));
		}
		else{
			this.$el.html(this.templateSingle(this.model.attributes));
		}
		
		return this;
	}
});


/*Sudoku App View: #wrap*/
var SudokuAppView = Backbone.View.extend({
	el:$("#wrap"),
	events:{
		"click #stopListBtn":"stopListHandler",
		"click #stopMesBtn":"stopMesHandler",
		"click #stopWeiboBtn":"stopWeiboHandler",
		"click #weibosubmit":"onSubmitWeibo",
		"click #messubmit":"onSubmitMes",
		"click #atfriend":"onAtFriend",
		"click #prevlist":"onPrevList",
		"click #nextlist":"onNextList",
	},
	
	initialize:function(){
		this.sudokuUl = this.$("#sudoku-ul");
		this.newmespanel = this.$("#newmespanel");
		this.fillweibopanelpanel = this.$("#fillweibopanel");
		this.listenTo(sudokuCollection, 'add', this.addone);
		this.listenTo(mutualListCollection, 'add', this.onaddlist);
		SudokuEvt.on("loginstatus",this.loginHandler,this);
		SudokuEvt.on("mespanleshow", this.onMesPanelShow,this);
		SudokuEvt.on("weibopanelshow", this.onWeiboPanelShow,this);
		SudokuEvt.on("turntopage",this.onTurntoPage);
		SudokuEvt.on("weiboselcallback",this.onWeiboSelCallBack);
		SudokuEvt.on("messelcallback",this.onMesSelCallBack);


		ApiCall.libCall({
			type : "GET",
			url : 'weibo_read/user/info/name', 
			data : {}, 
			dataType : 'json', 
			error : function(error) {
				//console.log(error)
			},
			success : function(data) {
				//console.log(data.data.data.name);
				if(data.data.data.name){
					SudokuMes.weiboaccount = data.data.data.name;
				}
			}
		});
	},
	stopListHandler:function(e){
		e.preventDefault();
		e.stopPropagation();
		this.newmespanel.hide("fast");
	},
	stopMesHandler:function(e){
		e.preventDefault();
		e.stopPropagation();
		$("#fillmespanel").hide("fast");
	},
	stopWeiboHandler:function(e){
		e.preventDefault();
		e.stopPropagation();
		this.fillweibopanelpanel.hide("fast");
	},
	onWeiboSelCallBack:function(data){
		
		$("#newmespanel").hide("fast");
		$("#weibocontent").val($("#weibocontent").val()+"@"+data.model.attributes.name+" ");
	},
	onMesSelCallBack:function(data){
		//$("#newmespanel").hide("fast");

		$("#fillmespanel").show("fast");
		SudokuMes.currentfriend = data.model;
		//console.log(data.model.attributes.nick);
		$("#towhom").html("to: "+data.model.attributes.nick);
		$("#fillmespanel").find("#mescontent").val(SudokuMes.currentview.title+"\r"+SudokuMes.currentview.detail);
	},
	onaddlist:function(data){
		var mutualListView = new MutualListView({model:data});
		this.newmespanel.find("#newmes-ul").append(mutualListView.el);
	},
	onMesPanelShow:function(){
		this.newmespanel.show("fast");
	},
	onWeiboPanelShow:function(){
		this.fillweibopanelpanel.show("fast");
		this.fillweibopanelpanel.find("#weibocontent").val(SudokuMes.currentview.title+"\r"+SudokuMes.currentview.detail);
	},
	addone:function(e){
		var sudokuView = new SudokuView({model:e});
		this.sudokuUl.append(sudokuView.el);
	},

	onPrevList:function(e){
		e.preventDefault();
		e.stopPropagation();
		//then directly move down to next page to see more
		this.newmespanel.find("#newmes-ul").animate({top:"+=278px"});
		//trigger events for pagination
		//SudokuEvt.trigger("turntopage",(SudokuMes.list.curpage-1));
		SudokuMes.list.atpage--;
		SudokuEvt.trigger("turntopage",(SudokuMes.list.atpage));
		
	},
	onNextList:function(e){
		e.preventDefault();
		e.stopPropagation();
		if(SudokuMes.list[SudokuMes.list.curpage].hasnext==0){
			//need callTencent again
			this.getList(SudokuMes.list.curpage+1);
			//SudokuEvt.trigger("turntopage",(SudokuMes.list.curpage+1));
		}
		else{
			//trigger events for pagination
			//SudokuEvt.trigger("turntopage",(SudokuMes.list.curpage+1));
			SudokuMes.list.atpage++;
			SudokuEvt.trigger("turntopage",(SudokuMes.list.atpage));
			
		}
		//then directly move down to next page to see more
		this.newmespanel.find("#newmes-ul").animate({top:"-=278px"});
		
	},
	onTurntoPage:function(e){
		if(e==1){ 
			if(SudokuMes.list[SudokuMes.list.curpage].hasnext==0){$('#nextlist').show();}
			else if(e<SudokuMes.list.maxpage){$('#nextlist').show();}
			else{$('#nextlist').hide();}
			$('#prevlist').hide();
		}
		else{
			if(e<SudokuMes.list.maxpage){$('#nextlist').show();}
			else{
				if(SudokuMes.list[SudokuMes.list.curpage].hasnext==0){$('#nextlist').show();}
				else{$('#nextlist').hide();}
			}
			$('#prevlist').show();
		}
	},
	//getList starts
	getList:function(page){
		//get user Info
		ApiCall.libCall({
			type : "GET",
			url: 'weibo_read/friends/'+SudokuMes.listcalled, 
			data : {
				name: SudokuMes.weiboaccount,
				reqnum:30,
				startindex:30*(page-1)
			}, 
			dataType : 'json', 
			error : function(error) {
				//console.log(error)
			},
			success : function(data) {
				//console.log(data);
				if(data.data.data){
					/*Real live snippet*/
					SudokuMes.list.totalnum = data.data.data.totalnum;

					SudokuMes.list[page]= data.data.data;
					//create mutualListModel
					_.each(SudokuMes.list[page]['info'],function(list,order){
						
						//adjust headurl and https_headurl
						if(list.headurl){list.headurl=list.headurl+"/50";}
						else{list.headurl=SudokuMes.list.defaulicon;}	
						if(list.https_headurl){list.https_headurl=list.https_headurl+"/50";}
						else{list.https_headurl=SudokuMes.list.defaulicon;}
						//for 单方面收听好友的返回
						//adjust headurl and https_headurl
						if(list.head){list.head=list.head+"/50";}
						else{list.head=SudokuMes.list.defaulicon;}	
						if(list.https_head){list.https_head=list.https_head+"/50";}
						else{list.https_head=SudokuMes.list.defaulicon;}

						mutualListCollection.add(list);
						mutualListCollection.at(order).set("atpage",page);

						mutualListCollection.at(SudokuMes.list.countorder).set("itsorder",SudokuMes.list.countorder);
						SudokuMes.list.countorder++;

					});
					
					SudokuMes.list.curpage = page;
					SudokuMes.list.maxpage = page;
					SudokuMes.list.atpage = page;
					SudokuEvt.trigger("turntopage",(SudokuMes.list.atpage));

				}
				
			}
		});
	},
	//getList ends

	onSubmitMes:function(e){
		e.preventDefault();
		$("#loading").css({width:"32px",height:"32px"});
		$("#mescontent").hide();
		$("#towhom").hide();
		//$("#attachimg").hide();
		$("#messubmit").hide();
		$("#stopMesBtn").hide();

		//var usedapi = ($("#cbimg")[0].checked==true)?"weibo_write/private/add_pic":"weibo_write/private/add";
		var usedapi ="weibo_write/private/add";
		//var usedapidata = ($("#cbimg")[0].checked==true)?{content: $("#mescontent").val(),pic:SudokuMes.currentview.morepic[SudokuMes.currentview.curimgindex],name: SudokuMes.currentfriend.attributes.name,}:{content: $("#mescontent").val(),name: SudokuMes.currentfriend.attributes.name};
		var usedapidata = {content: $("#mescontent").val(),name: SudokuMes.currentfriend.attributes.name};
		ApiCall.libCall({
			type : "GET",
			url: usedapi, 
			data : usedapidata, 
			dataType : 'json', 
			error : function(error) {
				$("#sendok").html("发布失败");	
				$("#sendok").show();
				$("#stopMesBtn").show();
			},
			success : function(data) {
				$("#loading").css({width:"0px",height:"0px"});
				$("#sendok").show();
				$("#stopMesBtn").show();
				setTimeout(function(){
					$("#fillmespanel").fadeOut("fast");
					$("#sendok").hide();	
					$("#mescontent").show();
					$("#towhom").show();
					//$("#attachimg").show();
					$("#messubmit").show();
				},1000)
			}
		});
	},

	onSubmitWeibo:function(e){
		e.preventDefault();
		$("#loading").css({width:"32px",height:"32px"});
		$("#weibocontent").hide();
		$("#atfriend").hide();
		$("#weibosubmit").hide();
		$("#stopWeiboBtn").hide();

		ApiCall.libCall({
			type : "GET",
			url: 'weibo_write/t/add', 
			data : {
				content: $("#weibocontent").val(),
				pic_url: SudokuMes.currentview.morepic[SudokuMes.currentview.curimgindex],
				syncflag: 1, //0为同步空间， 1为不同步空间
			}, 
			dataType : 'json', 
			error : function(error) {
				$("#submitok").html("发布失败");	
				$("#submitok").show();
				$("#stopWeiboBtn").show();
			},
			success : function(data) {
				$("#loading").css({width:"0px",height:"0px"});
				$("#submitok").show();
				$("#stopWeiboBtn").show();
				setTimeout(function(){
					$("#fillweibopanel").fadeOut("fast");
					$("#submitok").hide();	
					$("#weibocontent").show();
					$("#atfriend").show();
					$("#weibosubmit").show();
				},1000)
			}
		});
	},


	onAtFriend:function(e){
		e.preventDefault();
		e.stopPropagation();
		SudokuEvt.trigger("mespanleshow");
		if(mutualListCollection.length==0){
			this.getList(1);
		}
		SudokuMes.selcallback = "weibo";
	},
});





