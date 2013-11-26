
function recongnize(){
	var feature = [0,8,2,2,2,2,2,8,3,2,2,2,2,2,2,2,2,2,2,3
	,0,0,1,1,1,12,0,0,1,2,2,2,1,1,1,1,1,1,1,1
	,0,2,3,3,3,3,5,4,4,2,2,1,1,1,1,1,1,1,1,7
	,0,3,2,3,3,4,6,3,3,2,2,1,2,3,1,1,1,2,3,3
	,2,2,2,3,2,2,12,1,1,2,2,2,2,2,2,2,8,1,1,1
	,0,4,5,3,3,3,3,5,6,1,1,1,5,2,1,1,1,2,2,3
	,0,8,3,3,3,3,3,5,3,2,2,1,4,3,2,2,2,2,2,3
	,0,1,1,4,5,3,3,1,7,1,1,1,1,1,1,1,1,1,1,1
	,0,5,4,3,3,3,4,5,3,2,2,2,2,3,2,2,2,2,2,3
	,0,5,3,3,3,3,3,8,3,2,2,2,2,2,3,4,1,2,2,3];
	rangeWidth = [6,15,24,33];
	var canvas = document.createElement('canvas');
	canvas.style.display = "none";
	var ctx = canvas.getContext("2d");
	canvas.width = ima.width;
	canvas.height = ima.height;
	document.body.appendChild(canvas);
	ctx.drawImage(ima, 0, 0);
	result = "";
	for (var i = 0; i < 4; i++) {
	
		var f = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var pixels = ctx.getImageData(rangeWidth[i],6,8,12).data;
		for (var j = 0,length = pixels.length; j < length; j += 4) {
			var b = (+(pixels[j + 2] > 1));
			y = Math.floor(j/4/8);
			x = (j/4) % 8;
			f[x] += b;
			f[y + 8] += b;
		}
		var dist = [0,0,0,0,0,0,0,0,0,0];
		for (var j = 0; j < 10; j ++) {
			var tmp = 0;
			for (var k = 0; k < 20; k ++) {
				tmp += (f[k]-feature[j*20+k])*(f[k]-feature[j*20+k]);
			}
			dist[j]=tmp;
		}
		
		var m;
		var tmp = 65535;
		for (var j = 0; j < 10; j ++) {
			if (tmp > dist[j]){
				m = j;tmp = dist[j];
			}
		}
		result += m;
	}
	vericode = document.getElementById('Txt_Yzm');
	vericode.value = result;
};

ima=document.getElementById("yzm");
recongnize();

var timeDiff
var sendTime,t2
var temp = new Date();
temp.setHours(8);
temp.setMinutes(0);
temp.setSeconds(00);
temp.setMilliseconds(00);
var time8_00 = temp.getTime();

var oDiv;
var btn;
var bclicked = false
var clickcount = 20;
var timeouthandle=null;
function fastclick(){
	btn.click();
	clickcount--;
	if(i>0)setTimeout(fastclick,400);
}

function showtime(){
	if(timeDiff==0){
		return;
	}
	var now = Date.now();
	var server = now + timeDiff;
	var timestr = new Date(server).toTimeString();
	oDiv.innerText = timestr.substr(0,8);

	if (server - time8_00 >= 0 && server - time8_00 < 2000){
		if(bclicked == false){	
			//fastclick();
			btn.click();
			bclicked = true;
		}else{
			
		}
	}
	server=server%1000;
	timeouthandle=setTimeout(showtime,1015-server);
}
function myshow() {
            
	var xmlhttp = false;
	if (window.XMLHttpRequest) {
	   
		xmlhttp = new XMLHttpRequest();
	}
	else {
		try {
			xmlhttp = new ActiveXObject("MSXML2.XMLHTTP");
			
		} catch (e1) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e2) {
				xmlhttp = false;
			}
		}
	}
	
	var url = "http://cwcx.hfut.edu.cn/baobiao/Queue/QueueController.aspx" + "?vid=" + new Date();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		
			var serverDate=new Date(xmlhttp.getResponseHeader('Date'));
			timeDiff = serverDate.getTime() - sendTime;
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	sendTime=Date.now();
}

function main(){
	var tdiv = document.getElementById("Time");
	if (tdiv){
		return;
	}
	// var list = document.getElementsByName("DropDownList1");
	// if(list.length>0){
		// document.getElementById("PrintButton").click();
		// chrome.extension.sendRequest({source: "QueueSystem",info:"finish"});
		// return;
	// }
	chrome.extension.sendRequest({source: "QueueSystem"},function (response){
		var type=response.type;
		//console.debug(type);
		btn = document.getElementById('Repeater1_ctl0'+type+'_ImageButton1');
	});
	
	var staDate = new Date();
	

	var doc = window.document;
	oDiv = doc.createElement("div");
	oDiv.id = "Time";
	oDiv.style.width = "200px";
	oDiv.style.height = "30px";
	oDiv.style.fontSize = "30px";
	var oText = doc.createTextNode("");

	container = document.getElementById('form1');
	nbg = document.getElementById('deptID');

	oDiv.appendChild(oText);
	container.insertBefore(oDiv,nbg);
	//container.appendChild(oDiv);
	//oDiv.style.backgroundColor = "#eee";
	
	myshow();
	if(timeouthandle==null)showtime();
}

main();
