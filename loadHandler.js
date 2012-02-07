/* *
 *  Javascript file to create a class to register functions to run when the document is 'Ready' 
 *  
 *  To add a function to be run on DOM Ready simply call 
 *  dR.add(<your function>)
 *
 *  If the DOM Ready event has already occurred the function will be run immediately
 *  otherwise the function will be added to a queue a functions and will be run in order
 *  when the DOM Ready event is fired
 * 
 *  @requires - utils.js
 */

function DocReady(func){
	this.init();
	if(func) this.add(func);
}

DocReady.prototype.init = function(){
	this.ran = false;
	var runFunc = bind(this, this.readyFunctions);

	if(document.addEventListener){ //Moz or Opera
		document.addEventListener('DOMContentLoaded', runFunc);
		window.addEventListener('load', runFunc); //just in case
	} else if(document.all && !window.opera && document.readyState) { //IE
		var src = (window.location.protocol == 'https:') ? '://0' : 'javascript:void(0)';
		document.write("<script id='DOMReady' defer=true src='" + src + "'><\/script>");  
		document.getElementById("DOMReady").onreadystatechange=function(){
		    if (this.readyState=="complete"){ runFunc(); }
		};
	} else if(document.readyState && (navigator.userAgent.indexOf('AppleWebKit/') > -1)){ //safari
		this.timer = setInterval(function() {
			if (document.readyState == 'loaded' || document.readyState == 'complete') { runFunc(); }
		}, 50);
	} else { //older browsers
		var fn = window.onload;
		window.onload = function() {
			runFunc();
			if (fn) fn();
		};
	}
};

DocReady.prototype.add = function(func){
	if(typeof(func) != 'function'){ return false; }
	if(this.ran){ return func(); }
	var fn;
	if(typeof(this.readyFunctions) == 'function')
		fn = bind(this, this.readyFunctions);
	else
		fn = function(){};	
	this.readyFunctions=function(){
		if(!this.ran){
			if(this.timer){ clearInterval(this.timer); }
			fn();	func();
		}
	}
};

//register an instance on the window for easy use
window.dR = new DocReady();