function click(e) {
	var name = document.getElementById("name");
	var pass = document.getElementById("pass");
	var r1 = document.getElementsByName("r1");
	var delay_s = document.getElementById("delay");
	var r = 0;
	for(var i=0;i<4;i++){
		if (r1[i].checked==true){
			r = i;
			break;
		}
	}
	chrome.extension.sendRequest({source: "popup",uid: name.value,pwd: pass.value,no: r ,delay:Number(delay_s.value)});
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById("confirm");
	input.addEventListener('click', click);
});