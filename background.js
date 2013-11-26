// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var loginName="";
var loginPw = "";
var no=0;
var decircle=true;
function tabListener(tabId, changeInfo, tab){//
  if(tab.url.indexOf("http://cwcx.hfut.edu.cn") != 0)
	return;

  if(changeInfo.hasOwnProperty('status')){
	if(changeInfo['status'] != "complete")
		return;
  }else{return;}
	//console.debug(tab.url+" "+tab.id+" "+changeInfo['status']);
  	if(tab.url=="http://cwcx.hfut.edu.cn/login_gr.aspx"){
		chrome.tabs.remove(tab.id);
		chrome.tabs.onUpdated.removeListener(tabListener);
		return;
	}else if(tab.url=="http://cwcx.hfut.edu.cn/gr_index.aspx"){
		//console.debug("login 成功 tab"+tab.id);
		setTimeout(function(){
			chrome.tabs.create({"url":"http://cwcx.hfut.edu.cn/baobiao/Queue/QueueController.aspx"});
			chrome.tabs.remove(tab.id);}
			,500);
		return;
	}
	if(tab.url=="http://cwcx.hfut.edu.cn/"){
		chrome.tabs.executeScript(tab.id, {file: "Login.js",allFrames:false});
	}else if(tab.url=="http://cwcx.hfut.edu.cn/baobiao/Queue/QueueController.aspx"){
		chrome.tabs.executeScript(tab.id, {file: "QueueController.js",allFrames:false});
	}else if(tab.url.indexOf("http://cwcx.hfut.edu.cn/baobiao/Queue/QueueSystem.aspx") == 0){
		chrome.tabs.executeScript(tab.id, {file: "QueueSystem.js",allFrames:false});
	}else if(tab.url.indexOf("http://cwcx.hfut.edu.cn/baobiao/Queue/Message.aspx") == 0){	
		chrome.tabs.remove(tab.id);
	}

}
//console.debug("background start");
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    //console.debug("from a content script:" + request.source );

    if(request.source=="popup"){
		loginName=request.uid;
		loginPw=request.pwd;
		no = request.no;
		
		switch(no){
			case 0:str = "综合报销";break;
			case 1:str = "开票";break;
			case 2:str = "基建报销";break;
			case 3:str = "借款薪酬";break;
		}		
		bconfirm = confirm("即将开始自动化取号流程确认后不要再使用浏览器\r\n账户："+loginName+
		"  密码："+loginPw+
		"  取号类型："+str);
		if(bconfirm){
			chrome.tabs.create({"url":"http://cwcx.hfut.edu.cn/"});
			addlisten();
		}
	}else if(request.source=="Login"){
		sendResponse({uid:loginName,pwd:loginPw});
	}else if(request.source=="QueueController"){
		if(request.err=="logout"){
			chrome.tabs.remove(sender.tab.id);
		}
		chrome.tabs.create({"url":"http://cwcx.hfut.edu.cn/"});
	}else if(request.source=="QueueSystem"){
		if(request.info == "finish"){chrome.tabs.onUpdated.removeListener(tabListener);}
		else{sendResponse({type:no});}
	}
  });
 
function addlisten(tab) {
	if(!chrome.tabs.onUpdated.hasListener(tabListener))
	{chrome.tabs.onUpdated.addListener(tabListener)}
  }


