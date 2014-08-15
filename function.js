var Browser = {
	/*@cc_on
	isIE : true,
	@*/
	isFF : window.navigator.appName.indexOf("Netscape") != -1 ? true : false
};

var isFF = window.navigator.appName.indexOf("Netscape") != -1 ? true : false;

function $(obj){
	return document.getElementById(obj);
}

function HttpRequest()
{
	this.async = true;
	this.cache = false;
	this.xmlhttp  =null;
}

HttpRequest.prototype = {
	getAjax : function()
	{
		if(window.XMLHttpRequest)
		{
			try{
				this.xmlhttp = new XMLHttpRequest();
			}catch(e){this.xmlhttp = null;}
		}
		if(Browser.isIE&&window.ActiveXObject)
		{
			var Version = [
				"Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0",
				"Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP.2.6","Msxml2.XMLHTTP",
				"Microsoft.XMLHTTP.1.0","Microsoft.XMLHTTP.1","Microsoft.XMLHTTP"
			];
			for(var i = 0;i < Version.length;i++)
			{
				try{
					this.xmlhttp = new ActiveXObject(Version[i]);
					break;
				}catch(e){this.xmlhttp = null;}
			}
		}
	},
	send:function(object,url,callback)
	{
		this.getAjax();
		if(!this.xmlhttp) return;
		this.xmlhttp.open(object ? "post" : "get",url,this.async ? true : false);
		this.xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		if(!this.cache)
		{
			this.xmlhttp.setRequestHeader("No-Cache","1");
			this.xmlhttp.setRequestHeader("Pragma","no-cache");
			this.xmlhttp.setRequestHeader("Cache-Control","no-cache");
			this.xmlhttp.setRequestHeader("Expire","0");
			this.xmlhttp.setRequestHeader("Last-Modified","Wed, 1 Jan 1997 00:00:00 GMT");
			this.xmlhttp.setRequestHeader("If-Modified-Since","-1");
		}
		if(this.async)
		{
			var current = this;
			this.callback = callback;
			this.xmlhttp.onreadystatechange = function(){current.stateChange();}
		}
		else
		{
			if(typeof(callback) == "function")
			{
				callback(this.xmlhttp);
			}
			else if(callback != "")
			{
				eval(callback);
			}
		}
		this.xmlhttp.send(object);
	},
	stateChange : function()
	{
		if(this.xmlhttp.readyState == 4)
		{
			if(this.xmlhttp.status == 200 || this.xmlhttp.status == 0)
			{
				if(this.callback != null)
				{
					if(typeof(this.callback) == "function")
					{
						this.callback(this.xmlhttp);
					}
					else if(this.callback != "")
					{
						eval(this.callback);
					}
				}
			}
		}
	}
}

function ShowFlash()
{
	if(arguments.length<7){
		alert("\FLASH��������������ȷ��\n\n������ʽ��\n\n�����,�߶�,���ָ߶�,���ֶ��뷽ʽ,ͼƬ��ַ,ͼƬ����,\n\n��������,[FLASH������ɫ,[������SWF���Ŀ¼,[ͼƬͣ��ʱ��]]]��\n\n���ֶ��뷽ʽ��\n\n\'center\' \'left\' \'right\'\n\nͼƬ������ʽ:\n\naa.gif|bb.jpg|cc.gif\n\nͼƬ���Ӻͱ���������ͼƬ��ַ��ʽһ����")
		return;
	}
	var focus_width= arguments[0];//���
	var focus_height=arguments[1]; //�߶�
	var text_height=arguments[2]; //����߶�
	var text_align= arguments[3]; //�������ֶ��뷽ʽ(left��center��right)
	var swf_height = focus_height+text_height 	//���֮�������ż��,�������ֻ����ģ��ʧ�������
	var pics= arguments[4];//'images/img1.gif|images/img2.gif'//ͼƬ��ַ
	var links=arguments[5];//�����ͼƬ�����ӵ�ַ
	var texts=arguments[6]//'ˮ��|ˮ��2'//��������

	if(arguments.length>7){
		var textbgcolor=arguments[7];//'E8F6FC';//���ֱ�����ɫ
	}else{
		var textbgcolor='';
	}
	if(arguments.length>8){
		var path=arguments[8];
		if(path!="" | path!=undefined){
			if(path.charAt(path.length)!="/"){
				path+="/";
			}
		}else{
			var path="";
		}
	}else{
		var path="";
	}
	if(arguments.length>9){
		var interval_time=arguments[9]; //ͼƬͣ��ʱ�䣬��λΪ�룬Ϊ0��ֹͣ�Զ��л�
	}else{
		var interval_time=5 //ͼƬͣ��ʱ�䣬��λΪ�룬Ϊ0��ֹͣ�Զ��л�
	}
	var FlashStr='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+ focus_width +'" height="'+ swf_height +'">';
	FlashStr+='<param name="movie" value="'+path+'pixviewer.swf"><param name="quality" value="high"><param name="bgcolor" value="#ffffff">';
	FlashStr+='<param name="menu" value="false"><param name=wmode value="opaque">';
	FlashStr+='<param name="FlashVars" value="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'&text_align='+text_align+'&interval_time='+interval_time+'&textbgcolor='+textbgcolor+'">';
	FlashStr+='<embed src="'+path+'pixviewer.swf" wmode="opaque" FlashVars="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'&text_align='+text_align+'&interval_time='+interval_time+'" menu="false" bgcolor="#ffffff" quality="high" width="'+ focus_width +'" height="'+ swf_height +'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	FlashStr+='</object>';
	document.write("<center>" + FlashStr + "</center>");
}

function $setPageIndex(arr)
{
	if(arr.id==null || arr.page==null || arr.id==null){
		return;
	}
	var currentPage=arr.page;//info[0];  	//��ǰҳ��
	var pageCount=arr.maxpage;//info[1]; 		//ҳ��
	var LinkStr=(arr.linkstr!="" && arr.linkstr!=null)?arr.linkstr:GetLinks();
	function GetLinks(){ //ȡ����
		var LinkStr = location.href;
		if(LinkStr.indexOf('?') != -1){
			LinkStr = LinkStr.substr(LinkStr.indexOf('?')+1);
			var LinkArr = LinkStr.split("&");
			for(var i=0;i<LinkArr.length;i++){
				if(LinkArr[i].substring(0,LinkArr[i].indexOf("\="))=="page"){
					LinkArr.splice(i,1);  //ɾ��һ������
				}
			}
			LinkStr = "?" + LinkArr.join("&");
		}else{
			LinkStr = "?1=1"
		}
		return LinkStr;
	}
	var MoveNum = arr.movenum;
	var container = arr.id;
	//var Msg=info[2]; 			//��ʾ��Ϣ
	var pageIndex=""; 			//�������ɵķ�ҳ����
	var pageIndexback="";		//������һҳ��ҳ����
	var pageIndexnext="";		//������һҳ��ҳ����
	var _PageIndexback = "<a href=\"{{link}}\">[��һҳ]<\/a>&nbsp;";
	var _PageIndex = "<a href=\"{{link}}\" target=\"_balnk\" style=\"color:#123456;\">[{{number}}]<\/a>&nbsp;";
	var _PageIndexnext = "<a href=\"{{link}}\">[��һҳ]<\/a>&nbsp;";
	var _Pre10Str = "";
	var _Next10Str = "";
	var _Pre10_ = (arr._pre10==true)?true:false;
	var _Pre10 = "<a href=\"{{link}}\">[ǰʮҳ]<\/a>&nbsp;";
	var _Next10_ = (arr._next10==true)?true:false;
	var _Next10 = "<a href=\"{{link}}\">[��ʮҳ]<\/a>&nbsp;";
	if(arr.pre10!="" && arr.pre10!=null){
		_Pre10_ = true;
		_Pre10 = arr.pre10;
	}
	if(arr.next10!="" && arr.next10!=null){
		_Next10_ = true;
		_Next10 = arr.next10;
	}	
	var _TopPageStr = "";
	var _EndPageStr = "";
	var _TopPage = "";
	var _Top = false;
	if(arr.top!="" && arr.top!=null){
		_TopPage = arr.top
		_Top = true;
	}else{
		_TopPage = "<a href=\"{{link}}\">[��һҳ]<\/a>&nbsp;";
		_Top = (arr._top==true)?true:false;
	}
	var _EndPage = "";
	var _End = false;
	if(arr.end!="" && arr.end!=null){
		_EndPage = arr.end;
		_End = true;
	}else{
		_EndPage = "<a href=\"{{link}}\">[��ĩҳ]<\/a>";
		_End = (arr._end==true)?true:false;
	}
	var _PageStr = "";
	if(arr.pre!="" && arr.pre!=undefined){ _PageIndexback = arr.pre}
	if(arr.str!="" && arr.str!=undefined){ _PageIndex = arr.str}
	if(arr.next!="" && arr.next!=undefined){ _PageIndexnext = arr.next} 
	if(arr.pagehtml!="" && arr.pagehtml!=null){ _PageStr = arr.pagehtml}
	if(_PageStr == ""){
		var _PageStr = _PageIndex;   //��ǰҳ��HTML���룬���û�н������ã���������ҳ����ͬ�Ĵ���
	}
	if(MoveNum=="" || MoveNum == null){ //ƫ�����Ƿ��д��Σ�û����Ĭ����9������ʾ19����ҳ����
		MoveNum = 9;
	}	
	var	i=currentPage-MoveNum;  //ȡ�ô���ҳ��ʼ��ʾ
	if(i<=0){i=1}  //  ���ȡ�õĿ�ʼλ��С��1�������Ϊ��1��ʼ
	MaxPage=parseInt(currentPage)+MoveNum;  //ȡ��Ҫ��ʾ�����һҳ
	if(MaxPage>pageCount)					//������һҳ��λ�ã�������ҳ����
	{
		MaxPage=pageCount;					//�������ҳ��Ϊ��ҳ��
	}
	var reg = /<a href=\"\{\{link\}\}\".*?>/ig; //���������������ǰҳ������
	var NextReg = /\{\{link\}\}/ig;
	var _Number = /\{\{number\}\}/ig;
	while(i<=MaxPage)
	{
		if(i==currentPage)
		{
			pageIndex+=_PageStr.replace(reg,"").replace(_Number,i).replace('<\/a>','');
			if((i-1)<=0)
			{
				pageIndexback=_PageIndexback.replace(reg,'').replace('<\/a>','');
			}
			else
			{
				pageIndexback=_PageIndexback.replace(NextReg,LinkStr + "&page=" +eval(i-1));
			}
			if((i+1)>pageCount)
			{
				pageIndexnext = _PageIndexnext.replace(reg,'').replace('<\/a>','');
			}
			else
			{
				pageIndexnext = _PageIndexnext.replace(NextReg,LinkStr + "&page=" + eval(i+1));
			}
		}
		else
		{
			pageIndex+= _PageIndex.replace(NextReg,LinkStr+"&page="+i).replace(_Number,i);
		}
		i++;
	}
	if(_Top){
		if(parseInt(currentPage) == 1 ){
			_TopPageStr = _TopPage.replace(reg,'').replace(_Number,'1');
		}else{
			_TopPageStr = _TopPage.replace(NextReg,LinkStr + "&page=1").replace(_Number,'1');
		}
	}
	if(_End){
		if(currentPage == pageCount){
			_EndPageStr = _EndPage.replace(reg,'').replace(_Number,pageCount);
		}else{
			_EndPageStr = _EndPage.replace(NextReg,LinkStr + "&page=" + pageCount).replace(_Number,pageCount);
		}
	}
	if(_Pre10_){
		var Pre10num = eval(parseInt(currentPage)-10)<1?1:eval(parseInt(currentPage)-10);
		if((parseInt(currentPage)-10)<=0){
			_Pre10Str = _Pre10.replace(reg,'').replace(_Number,Pre10num).replace('<\/a>','');
		}else{
			_Pre10Str = _Pre10.replace(NextReg,LinkStr + "&page=" + Pre10num).replace(_Number,Pre10num);
		}
	}
	if(_Next10_){
		var Next10num = eval(parseInt(currentPage) + 10)>pageCount?pageCount:eval(parseInt(currentPage) + 10);
		if((parseInt(currentPage)+10)>pageCount){
			_Next10Str = _Next10.replace(reg,'').replace(_Number,Next10num).replace('<\/a>','');
		}else{
			_Next10Str = _Next10.replace(NextReg,LinkStr + "&page=" + Next10num).replace(_Number,Next10num);
		}
	}
	$(container).innerHTML=_TopPageStr + _Pre10Str + pageIndexback + pageIndex + pageIndexnext + _Next10Str + _EndPageStr;
}

var CheckForm = {
	//�ʻ� ��ͷ��������ĸ
	Account: /^([a-z])+[a-z0-9-_]*([a-z0-9])+$/i,
	Require : /.+/,
	Domain : /^[A-Za-z0-9\-]+$/,
	Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	Phone : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
	Mobile : /^(\+86)?((13)|(15))\d{9}$/,
	//�绰���ֻ�����
	TelMob:/(^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$)|(^(\+86)?((13)|(15))\d{9}$)/,
	Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	//���֤'
	IdCard : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
	Currency : /^\d+(\.\d+)?$/,
	//����
	Number : /^\d+$/,
	Zip : /^\d{6}$/,
	QQ : /^[1-9]\d{4,8}$/,
	Integer : /^[-\+]?\d+$/,
	Double : /^[-\+]?\d+(\.\d+)?$/,
	English : /^[A-Za-z]+$/,
	ASCII : /^[\x10-\x80]+$/,
	Chinese : /^[\u0391-\uFFE5]+$/,
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	//'
	IsSafe : function(str){return !this.UnSafe.test(str);},
	SafeString : "this.IsSafe(value)",
	Limit : "this.limit(value, getAttribute('min'), getAttribute('max'))",
	Date : "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
	Repeat : "value == form.elements[getAttribute('to')].value",
	Range : "parseInt(getAttribute('min')) <= parseInt(value) && parseInt(value) <= parseInt(getAttribute('max'))",
	Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
	Custom : "this.Exec(value, getAttribute('regexp'))",
	Group : "this.MustChecked(form.elements[getAttribute('name')], getAttribute('min'), getAttribute('max'))",
	Select:"options[selectedIndex].value != ''",
	ErrorItem : [document.forms[0]],
	ErrorMessage : ["����ԭ�����ύʧ�ܣ�\t\t\t\t"],
	Check : function(theForm, mode)
	{
		var obj = theForm || event.srcElement;
		var count = obj.elements.length;
		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		this.ErrorItem[0] = obj;
		for(var i=0;i<count;i++)
		{
			with(obj.elements[i])
			{
				var _dataType = getAttribute("dataType");
				this.ClearState(obj.elements[i]);
				
				if(_dataType != "Repeat" && _dataType != "Range" && !this.limit(value,getAttribute('min'), getAttribute('max')))
				{
					this.AddError(i, getAttribute("msg"));
				}
				else
				{
					switch(_dataType){
						case null:break;
						case "Date" :
						case "Repeat" :
						case "Range" :
						case "Compare" :
						case "Custom" :
						case "Group" : 
						case "SafeString" :
						case "Select" :
						if(!eval(this[_dataType]))
						{

							this.AddError(i, getAttribute("msg"))
						}
						break;
						default :
						if(value.length > 0 && !this[_dataType].test(value))
						{
							this.AddError(i, getAttribute("msg"))
						}
						break;
					}
				}
			}
		}
		if(this.ErrorMessage.length > 1)
		{
			mode = mode || 1;
			var errCount = this.ErrorItem.length;
			switch(mode)
			{
				case 1 :
					alert(this.ErrorMessage.join("\n"));
					if(this.ErrorItem[1].type!="hidden"){
						this.ErrorItem[1].focus();
					}
					break;
				case 2 :
					for(var i=1;i<errCount;i++)
					{
						this.ErrorItem[i].style.color = "red"
					}
				case 3 :
					for(var i=1;i<errCount;i++)
					{
						try
						{
							var span = document.createElement("SPAN");
							span.id = "__ErrorMessagePanel";
							span.style.color = "red";
							this.ErrorItem[i].parentNode.appendChild(span);
							span.innerHTML = this.ErrorMessage[i].replace(/\d+:/,"*")
						}
						catch(e)
						{
							alert(e.description)
						}
					}
					this.ErrorItem[1].focus();
					break;
				default :
					alert(this.ErrorMessage.join("\n"));
					break;
			}
			return false
		}
		return true
	},
	limit : function(str,min, max)
	{
		var len= str.replace(/[^\x00-\xff]/g,"**").length;
		min = min || 0;
		max = max || Number.MAX_VALUE;
		return min <= len && len <= max
	},
	ClearState : function(elem)
	{
		with(elem){
			if(style.color == "red")
			{
				style.color = ""
			}
			var lastNode = parentNode.childNodes[parentNode.childNodes.length-1];
			if(lastNode.id == "__ErrorMessagePanel")
			{
				parentNode.removeChild(lastNode)
			}
		}
	},
	AddError : function(index, str)
	{
		this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
		this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str
	},
	Exec : function(op, reg){
		if(typeof(reg) == "string")
		{
			reg = new RegExp(reg)
		}
		return reg.test(op)
	},
	compare : function(op1,operator,op2)
	{
		switch (operator)
		{
			case "NotEqual":
				return (op1 != op2);
			case "GreaterThan":
				return (op1 > op2);
			case "GreaterThanEqual":
				return (op1 >= op2);
			case "LessThan":
				return (op1 < op2);
			case "LessThanEqual":
				return (op1 <= op2);
			default:
				return (op1 == op2); 
		}
	},
	MustChecked : function(groups, min, max)
	{
		var hasChecked = 0;
		min = min || 1;
		max = max || groups.length;
		for(var i=groups.length-1;i>=0;i--)
		{
			if(groups[i].checked)
			{
				hasChecked++
			}
		}
		return min <= hasChecked && hasChecked <= max
	},
	IsDate : function(op, formatString)
	{
		formatString = formatString || "ymd";
		var m, year, month, day;
		switch(formatString)
		{
			case "ymd" :
				m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
				if(m == null)
				{
					return false
				}
				day = m[6];
				month = m[5];
				year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
				break;
			case "dmy" :
				m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
				if(m == null )
				{
					return false
				}
				day = m[1];
				month = m[3]--;
				year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
				break;
			default :
			break;
		}
		if(!parseInt(month))
		{
			return false
		}
		month -= 1;
		var date = new Date(year, month, day);
		return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate());
		function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
	}
}

function GetSelect(SltObj,SetObj,Page,Default){
	if(SltObj=="" || SltObj==null || SltObj==undefined || SetObj=="" || SetObj==null || SetObj==undefined){
		alert("GetSelect�����������ݴ���");
		return;
	}
	var DefStr = true;
	if(Default) DefStr = false;
	var SetObj=SetObj.split(",");
	var LeiID = $(SltObj).options[$(SltObj).selectedIndex].value;
	if(LeiID!=""){
		var Str="LeiID=" + $(SltObj).options[$(SltObj).selectedIndex].value;
		var request = new HttpRequest();
		if(Page!="" && Page!=undefined && Page!=null){
			var Url=Page;
		}else{
			alert("û��ָ��ȡ�����б�ֵ��ҳ���ַ��");
			return;
		}
		var me=this;
		request.send(Str,Url,
					 function(r){
						 var callValue = r.responseXML;
						 if(callValue.selectSingleNode("root/error")!=null){
								if(callValue.selectSingleNode("root/error").text=="NoRecordSet"){
									$(SetObj[0]).length=0;
									if(DefStr){
										$(SetObj[0]).options[$(SetObj[0]).length] = new Option("��ѡ��","");	 
									}
							 	}
						 }else{
						 	 var node = callValue.getElementsByTagName("option");
							 $(SetObj[0]).length=0;
							 if(DefStr){
								 $(SetObj[0]).options[$(SetObj[0]).length] = new Option("��ѡ��","");
							 }
							 for(i=0;i<node.length;i++){
								 $(SetObj[0]).options[$(SetObj[0]).length] = new Option(node[i].text,node[i].getAttribute("value"));
							 }
						 }
						 var AgenGetObj=SetObj.join(",");
						 if(AgenGetObj.indexOf(",")!=-1){
						 	AgenGetObj = AgenGetObj.substr(AgenGetObj.indexOf(",")+1)
						 	if(AgenGetObj!=""){
							 	me.GetSelect(SetObj[0],AgenGetObj,Url)
						 	}
						 }
					 }
					 )
	}else{
		for(var seti=0;seti<SetObj.length;seti++){
			$(SetObj[seti]).length=0;
			if(DefStr){
				$(SetObj[seti]).options[$(SetObj[seti]).length] = new Option("--��ѡ��--","");	 
			}
		}
	}
}

function SetSelect(obj,_value){
	if(obj=="" || obj==null || _value=="" || _value==null){
	   return;
	}
	if(typeof obj != "object"){
		try{
			obj = $(obj);
		}catch(e){}
	}
	if(typeof obj != "object"){
		alert(typeof obj);
		return;
	}
	var _length=obj.length;
	for(var _l=0;_l<_length;_l++){
		if(obj.options[_l].value == _value){
			obj.options[_l].selected = true;
		}
	}
}

function ReloadImg(SetObj,ObjName,ShwObj,Img,Msg,Css,Width){
	var Width=parseInt(Width)?parseInt(Width):100;
	$(ShwObj).innerHTML = "&nbsp;";
	var html = "<input type=\"hidden\" name=\""+ObjName+"\" id=\""+ObjName+"\" \/><input type=\"file\" onChange=\"ShowImg(this,'"+ShwObj+"','"+Width+"')\" name=u"+ObjName+" style=\"" + Css + "\""
	if(Msg!="" && Msg!=null){
		html += "msg=\"" + Msg + "\" min='1'"
	}
	html += " id="+ObjName+">&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" value=\"ȡ���ϴ�\"\ onclick=\"cance('"+SetObj+"','"+ObjName+"','"+ShwObj+"','"+Img+"','"+Msg+"','"+Css+"','"+Width+"')\"/>";
	$(SetObj).innerHTML  = html;
}

function cance(SetObj,ObjName,ShwObj,Img,Msg,Css,Width){
	var Width=parseInt(Width)?parseInt(Width):100;
	$(ShwObj).style.filter = "";
	$(ShwObj).style.width = "";
	$(ShwObj).style.height = "";
	$(ShwObj).innerHTML = "<input type=\"hidden\" name=\"" + ObjName + "\" value=\""+Img+"\" id=\"" + ObjName + "\" \/><img src=\""+((Img.substr(1,1)=="\/")?Img:"..\/"+Img)+"\" width=\""+Width+"\" \/>";
	$(SetObj).innerHTML = "&nbsp;<input type=\"button\" value=\"�����ϴ�ͼƬ\" onClick=\"ReloadImg('"+SetObj+"','"+ObjName+"','"+ShwObj+"','"+Img+"','"+Msg+"','"+Css+"','"+Width+"')\" \/>";
}

function ShowImg(SltObj,ShwObj,Width,Height){
  	if(SltObj=="" || SltObj==null || SltObj==undefined){
		window.status = 'JS����ShowImg�������ݴ���';
		return;
	}
	if(Browser.isIE){
		Width = Width?Width:100;
		Height = Height?Height:100;
		$(ShwObj).style.width = Width + 'px'
		$(ShwObj).style.height = Height + 'px';
		switch(SltObj.value.substr(SltObj.value.lastIndexOf(".")+1)){
			case "jpg":
			case "bmp":
			case "gif":
				$(ShwObj).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
				$(ShwObj).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=SltObj.value;
				break;
			/*case "wmv":
				var player = document.createElement("<embed></embed>");
				player.setAttribute("type","application/x-mplayer2");
				player.setAttribute("showcontrols","1");
				player.setAttribute("src",SltObj.value);
				player.setAttribute("autostart","1");
				player.setAttribute("width",Width);
				player.setAttribute("height",Height);
				player.setAttribute("id","MediaPlayer1");
				$(ShwObj).appendChild(player)
				alert($(ShwObj).innerHTML)
				/*		<embed src="http://cyc90.cycnet.com/othermis/feidian/songs/060702703.mp3?/.mp3" align="baseline" border="0" width="350" height="68"
			type="application/x-mplayer2"
			pluginspage=""
			name="MediaPlayer1" showcontrols="1" showpositioncontrols="0"
			showaudiocontrols="1" showtracker="1" showdisplay="0"
			showstatusbar="1"
			autosize="0"
			showgotobar="0" showcaptioning="0" autostart="1" autorewind="0"
			animationatstart="0" transparentatstart="0" allowscan="1"
			enablecontextmenu="1" clicktoplay="0" 
			defaultframe="datawindow" invokeurls="0">
		</embed>
				$(ShwObj).innerHTML='<embed src="' + SltObj.value +'" align="baseline" border="0" width="350" height="68"			type="application/x-mplayer2"			pluginspage=""			name="MediaPlayer1" showcontrols="1" showpositioncontrols="0"			showaudiocontrols="1" showtracker="1" showdisplay="0"			showstatusbar="1"			autosize="0"			showgotobar="0" showcaptioning="0" autostart="1" autorewind="0"			animationatstart="0" transparentatstart="0" allowscan="1"			enablecontextmenu="1" clicktoplay="0" 			defaultframe="datawindow" invokeurls="0">';
				//SltObj.value
				break;
			case "asf":
			case "avi":
				*/
			default:
				$(ShwObj).innerHTML = SltObj.value;
		}
	}else if(Browser.isFF){
		$(ShwObj).innerHTML = "�Բ���<br>��ǰ�����<br>��֧�ּ�ʱԤ������ͼƬ��";
	}
}

function RepParam(str,RepStr){
	var a=[];
	var items = str.replace(/&amp;/gi,"__amp;").split('&');
	var RepItems = RepStr?RepStr.split('&'):"";
	for(var i=0;i<items.length;i++){
		var item=items[i].replace(/__amp;/gi,"&amp;").split("=");
		var a_i = a.length;
		a[a_i]=item[0] + "=" + item[1];
		for(var j=0;j<RepItems.length;j++){
			var RepItem = RepItems[j].split('=');
			if(item[0]!=""){
				if(RepItem[0] == item[0]){
					if(RepItem[1]!="" && RepItem[1]!=null){
						a[a_i] = item[0] + "=" + RepItem[1];
					}else{
						a.pop();
					}
					RepItems.splice(j,1);
				}
			}
		}
	}
	for(var k=0;k<RepItems.length;k++){
		var RepItem = RepItems[k].split('=');
		if(RepItem[1]!="" && RepItem[1]!=null){
			a[a.length] = RepItems[k];	
		}
	}
	return (a.length==0)?str:a.join("&");
}

function GetTitle(id,dlei,xlei){
	if(id==null && dlei==null && xlei==null){
		return;
	}
	var str = "id=" + id + "&dlei=" + dlei + "&xlei=" + xlei;
	var request = new HttpRequest();
	request.send('',"getpage.asp?"+str,
		function(r){
			var callValue = r.responseXML;
			if(callValue.getElementsByTagName("error").length!=0){
				alert(callValue.getElementsByTagName("error")[0].childNodes[0].nodeValue);
			}else{
				$("content").innerHTML = callValue.getElementsByTagName("ok")[0].childNodes[0].nodeValue;
			}
		}
	)
}

function GetVTitle(id,dlei,xlei){
	if(id==null && dlei==null && xlei==null){
		return;
	}
	var str = "id=" + id + "&dlei=" + dlei + "&xlei=" + xlei;
	var request = new HttpRequest();
	request.send('',"getVpage.asp?"+str,
		function(r){
			var callValue = r.responseXML;
			if(callValue.getElementsByTagName("error").length!=0){
				alert(callValue.getElementsByTagName("error")[0].childNodes[0].nodeValue);
			}else{
				$("content").innerHTML = callValue.getElementsByTagName("ok")[0].childNodes[0].nodeValue;
			}
		}
	)	
}


