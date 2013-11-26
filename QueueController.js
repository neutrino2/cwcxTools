
//function stopshow() {
//  var a=setTimeout(" ",1);
//  clearTimeout(a-1);
//  alert('clear '+(a-1));
//}
//stopshow();

var timeDiff
var sendTime
var temp = new Date();
temp.setHours(7);
temp.setMinutes(57);
temp.setSeconds(5);
temp.setMilliseconds(0);
var time7_57 = temp.getTime();
var refreshed = false
function showtime(){
	if(timeDiff==0){
		return;
	}
	var now = Date.now();
	var server = now + timeDiff;
	var timestr = new Date(server).toTimeString();
	btn.value = timestr.substr(0,8);
	//console.debug(btn.value);
	if (server - time7_57 >= 0 && server - time7_57 < 180000){
		if(refreshed){
			btn.click();
		}else{window.location.reload();}
	}
	server=server%1000;
	setTimeout(showtime,1015-server);
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
			var serverTime = serverDate.getTime();
			timeDiff = serverTime - sendTime;
			if(serverTime > time7_57)refreshed = true;
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	sendTime=Date.now();
}

function main(){
	btn = document.getElementById('AM1');
	if (btn == null)
	{setTimeout(main,10);return;}
	btn.value='Running';

	myshow();
	showtime();
}

if(document.getElementById('Label_User').innerHTML=="用户：/"){
	chrome.extension.sendRequest({source: "QueueController",err:"logout"});
}
else{
	main();
}
