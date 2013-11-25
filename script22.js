
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
//var delay

var oDiv;
function showtime(){
	var now = new Date();
	var server = new Date(now.getTime() + timeDiff);
	var s = server.toTimeString();

//	btn.value = s.substr(0,8);
	oDiv.innerText = s.substr(0,8);
//	now.setHours(8);
//	now.setMinutes(0);
//	now.setSeconds(0);
//	if (server - now >= 0 && server - now < 15000){
//		btn.onclick();
//	}
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
			var now = new Date();
			timeDiff = serverDate - now;
			setInterval(showtime,500);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function main(){
	btn = document.getElementById('Repeater1_ctl00_ImageButton1');
	if (btn == null)
	{setTimeout(main,10);return;}
	
	var staDate = new Date();
var doc = window.document;
oDiv = doc.createElement("div");
var oText = doc.createTextNode("");

container = document.getElementById('form1');
nbg = document.getElementById('deptID');

oDiv.appendChild(oText);
container.insertBefore(oDiv,nbg);
//container.appendChild(oDiv);
oDiv.style.id = "Time";
oDiv.style.width = "200px";
oDiv.style.height = "30px";
oDiv.style.fontSize = "30px";

//oDiv.style.backgroundColor = "#eee";
	
	myshow();
}

main();
