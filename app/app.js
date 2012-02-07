/**
 *  @file - Provides the actual logic that we want to use to create our page
 *  TODO: turn a part of this into a page class
 */


/**
 *	Create an app class to store the information created by the app and make it easier
 *	to pass things around.
 */
var App = function(){
	this.init();
};

/**
 *	Use a real initilization function for nicer stack traces and all.
 */
App.prototype.init = function(){
	this.makeStructure();
};

/**
 *	Create the general structure for the app so that the other pieces can be easily plugged in
 */
App.prototype.makeStructure = function() {
	//create a function to make the structure after the ajax call comes back
	var ref = this;
	var callback = function(xhr) {
		var response = xhr.responseText;
		var json = App.parseJson(response);
		if(json) {
			var renderable = Renderable.create(json);
			//keep a pointer to the structure
			ref.wrapper = renderable.attach(document.body);

			//create pointers for our main elements
			ref.header = document.getElementById('header');
			ref.contentHolder = document.getElementById('content');
			ref.menu = document.getElementById('menu');

			//set the page background
			App.setPageBackground('#426eb8', json.background);
			ref.makeHeader();
		}
	}

	niceAjax('app/json/structure.json', '', callback);
}

App.prototype.makeHeader = function(){
	var ref = this;
	var callback = function(xhr){
		var response = xhr.responseText;
		var json = App.parseJson(response);
		if(json) {
			ref.header.className += ' processed';
			App.append(json, ref.header);
		}
	}

	niceAjax('app/json/header.json', '', callback);
}

/**
 *	Change the page background - first loads the image than sets the background
 *	While the image is loading, the color is set to color
 */
App.setPageBackground = function(color, image){
	//create the background image
	document.body.style.backgroundColor = '#426eb8';

	var ref = this;
	App.loadImage(image, function(){
		document.body.style.backgroundImage = "url('" + image + "')";
		document.body.style.backgroundSize = "cover";
	});
};

/**
 *	Load an image before displaying it
 *	Callback - a function to call when the image is fully loaded
 */
App.loadImage = function(url, callback){
	var image = mCreate.createElement('img');
	image.style.display = 'none';
	document.body.appendChild(image);
	//call the callback when the image is loaded
	image.onload = function(e){
		document.body.removeChild(image);
		image = null;
		if(typeof callback == 'function') {
			callback();
		}
	}
	
	image.src = url;
};

/**
 *	Static helper function to parse the json
 */
App.parseJson = function(str){
	var json = false;
	try {
		json = JSON.parse(str);
	} catch(err) {
		App.prototype.log.call(window.app, err);
	}
	return json;
};

/**
 *	Take a renderable obj and attach it to a parent element, also processing some meta stuff
 *	including animation
 */
App.append = function(json, parent){
	var renderable = Renderable.create(json);
	var el = renderable.attach(parent);

	if(json.animate){
		var item = json.animate.which == 'this' ? el : parent;
		switch (json.animate.method) {
			case 'scrollInRight' : 
				var width = item.offsetWidth;
				item.style.left = -width + 'px';
				item.style.position = 'relative';
				qA.left(item, width, 700);
				break;
		}
	}
};

/**
 *	remove children from the body
 */
App.emptyBody = function(animate){
	var children = document.body.children;
	for(var c in children){
		var child = children[c];
		if(animate){
			var remove = function() { 
				document.body.removeChild(child) 
			};
			qA.fadeOut(child, 500);
		}
	}
	
} 

/**
 *	Simple logging function
 */
App.log = function(err){
	if (typeof window.console != 'undefined' && typeof window.console.log == 'function') {
		if (typeof err == 'string') {
			console.log('JSONWeb App Error', err);
		} else {
			console.log('JSONWeb App Error', err.message);
			console.log(err.stack);
		}
	}
};

// Kick if off
var app = new App();


/**
 *	Define a page, which can create a variety of pages based on what
 *	is defined in the page json
 *	@param name is the name of the page - its expecting /app/json/<name>.json to exist
 */
var Page = function(name) {
	this.init(name);
}

/**
 *	Use a real initilization function so we get a good stack trace
 */
Page.prototype.init = function(name) {
	this.name = name;

	this.getData();
}

/**
 *	Make a json call to get the data for the page
 */
Page.prototype.getData = function(){
	var url = 'app/json/' + name + '.json';

	var callback = u.bind(this, this.renderPage);
	niceAjax(url, '', callback);
}

Page.prototype.renderPage = function(xhr) {
	var response = xhr.responseText;
	var obj = App.parseJson(response);

	if(obj){
		//empty the page as we're assuming that each page load will be a 'new page'
		App.emptyBody();
		App.append(obj, document.body);
	}
}