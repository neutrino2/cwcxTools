
//function stopshow() {
//  var a=setTimeout(" ",1);
//  clearTimeout(a-1);
//  alert('clear '+(a-1));
//}
//stopshow();

var timeDiff
//var delay
function showtime(){
	var now = new Date();
	var server = new Date(now.getTime() + timeDiff);
	var s = server.toTimeString();
	btn.value = s.substr(0,8);
	
	now.setHours(7);
	now.setMinutes(58);
	now.setSeconds(0);
	if (server - now >= 0 && server - now < 110000){
		btn.onclick();
	}
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
	
	var url = document.location + "?vid=" + new Date();
   
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		
			var serverDate=new Date(xmlhttp.getResponseHeader('Date'));
			var now = new Date();
			timeDiff = serverDate - now;
			setInterval(showtime,1000);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function main(){
	btn = document.getElementById('AM1');
	if (btn == null)
	{setTimeout(main,10);return;}
	btn.value='Running';
	//btn.disabled='disabled';
	myshow();
}

//if(document.getElementById('Label_User').innerHTML=="用户：/"){
//	window.open('http://cwcx.hfut.edu.cn/');
//}
//else{
//	d = parseFloat(prompt("8:00:00 AM 后延时 (s)",'0'));
//	if(!isNaN(d))
//		delay = d*1000;
	main();
//}
