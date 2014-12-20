/**
@Author : MinKyoungHwan
@description : Check User Agent
*/

var docMode = document.documentMode;
var ua = navigator.userAgent.toLowerCase();
var getVersion = {
	isIE8 : function(){
		if(docMode < 9){return true;}
		else{return false;}
	},
	isIE9 : function(){
		if(docMode < 10){return true;}
		else{return false;}
	},
	isFF : function(){
		if(ua.indexOf("firefox") != -1){return true;}
		else{return false;}
	}
}