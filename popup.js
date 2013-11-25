function click(e) {
	var name = document.getElementById("name");
	var pass = document.getElementById("pass");
	var r1 = document.getElementsByName("r1");
	for(var i=0;i<4;i++){
		if (r1[i].checked==true){
			var r = i;
			break;
		}
	}
	chrome.extension.sendRequest({name: name.value,pass: pass.value,no: r});
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById("confirm");
	input.addEventListener('click', click);
});