// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var stopGet = true;

function winListener(window){
  if(window.type=="popup"){
	//setTimeout(function (){chrome.windows.remove(window.id);},500);
  }
}
var decircle=true;
function tabListener(tabId, changeInfo, tab){//
  if(tab.url.indexOf("http://cwcx.hfut.edu.cn") != 0)
	return;
//  if(changeInfo.hasOwnProperty('status') && changeInfo['status'] == "loading"){
//	if(tab.url.indexOf("http://cwcx.hfut.edu.cn/baobiao/Queue/QueueSystem.aspx") == 0){
//	 if(changeInfo.hasOwnProperty('url') == true){
//		decircle = true;
//	 }
//  }
//	return;
  //}
  if(changeInfo.hasOwnProperty('status') && changeInfo['status'] == "complete"){
	  if(tab.url=="http://cwcx.hfut.edu.cn/baobiao/Queue/QueueController.aspx"){
		chrome.tabs.executeScript(tab.id, {file: "script1.js",allFrames:false});
	  }
	  if(tab.url.indexOf("http://cwcx.hfut.edu.cn/baobiao/Queue/QueueSystem.aspx") == 0){
		 //chrome.tabs.executeScript(tab.id, {file: "script21.js",allFrames:false});
		 //if(decircle == true){
		 chrome.tabs.executeScript(tab.id, {file: "script22.js",allFrames:false});
		 //decircle = false;
		 //}
	   }
	  if(tab.url.indexOf("http://cwcx.hfut.edu.cn/baobiao/Queue/Message.aspx") == 0){
//		chrome.tabs.onUpdated.removeListener(tabListener);
//		chrome.windows.onCreated.removeListener(winListener);
	  }
  }
}
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
  
    console.debug(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	console.debug(request.name);
	console.debug(request.pass);
	console.debug(request.no);
    
  });
 console.log('Starting Extension');
/* chrome.browserAction.onClicked.addListener(function(tab) {
	if(!chrome.tabs.onUpdated.hasListener(tabListener))
	{chrome.tabs.onUpdated.addListener(tabListener)}
	// if(!chrome.windows.onCreated.hasListener(winListener))
	// {chrome.windows.onCreated.addListener(winListener)}
	// if(tab.url.indexOf("http://cwcx.hfut.edu.cn/baobiao/Queue/")==0)
	// {chrome.tabs.remove(tab.id);}
	chrome.tabs.create({"url":"http://cwcx.hfut.edu.cn/baobiao/Queue/QueueController.aspx"});
  }); */


