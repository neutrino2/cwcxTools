function click(e) {
	var name = document.getElementById("name");
	var pass = document.getElementById("pass");
	var r1 = document.getElementsByName("r1");
	var r = 0;
	for(var i=0;i<4;i++){
		if (r1[i].checked==true){
			r = i;
			break;
		}
	}
	chrome.extension.sendRequest({source: "popup",uid: name.value,pwd: pass.value,no: r});
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById("confirm");
	input.addEventListener('click', click);
});