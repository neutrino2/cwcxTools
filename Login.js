var count = 3;
var loginName="";
var loginPw = "";
function login(){
	if (loginName==""){
		if(count>0){
			count--;
			setTimeout(login,100);
		}
		return;
	}
	uid = document.getElementById("uid");
	pwd = document.getElementById("pwd");
	uid.value=loginName;
	pwd.value=loginPw;
	form1 = document.getElementById("form1");
	form1.submit();
	setTimeout("window.close();",1000);
}

function main(){
	chrome.extension.sendRequest({source: "Login"},function (response){
		loginName=response.uid;
		loginPw=response.pwd;
	});
	setTimeout(login,100);
}

main();