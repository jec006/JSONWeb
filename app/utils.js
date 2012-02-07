/**
 *  Group of utility functions for javascript
 *
 *  @author jcaldwell
 *  @file utils.js
 **/
 
 var Utils = {
  //add a class to an element
  addClass : function(e, c){
    if(!e.className.match(new RegExp("(\s*|^)"+c+"(\s*|$)"))){
      e.className += e.className == '' ? c : ' '+c;
    }
  },
  //remove a class from an element
  rmClass : function(e, c){
    e.className = e.className.replace(new RegExp("(\s*|^)"+c+"(\s*|$)", 'g'), '');
  },
  //returns the 'real type' of an object instead of just 'Object'
  realType : function(obj){
    if(obj && obj.constructor){
      return obj.constructor.name;
    } else {
      return typeof(obj);
    }
  },
  bind : function(o, f){
  	return function() { return f.apply(o, arguments); };
  },
  IEsafeDate : function(dateStr) {
  	//reformat the date string so IE doesn't choke
  	//from: 2010-04-30T09:30:00Z
  	//to:   04-03-2010 09:30:00 UTC
  	if (navigator.appName == 'Microsoft Internet Explorer') {
	  	var monthday = dateStr.substring(6, 10);
	  	var year = dateStr.substring(0, 4);
	  	var time = dateStr.substring(11, 19);
	  	var timezone = dateStr.substring(19);
	  	if (timezone == 'Z') {
	  		timezone = 'UTC';
	  	}
	  	return monthday + '-' + year + ' ' + time + ' ' + timezone;
  	} else {
  		return dateStr;
  	}
  },
  formatDate : function(dateStr) {
  	date = new Date(u.IEsafeDate(dateStr));
  	var year = date.getFullYear();
  	var month = date.getMonth() + 1;
  	var day = date.getDate();
  	var hour = date.getHours();
  	if (hour == 12) {
  		var ampm = 'PM';
  	} else if (hour >= 12) {
  		hour = hour - 12;
  		var ampm = 'PM';
  	} else if (hour == 0) {
  		hour = 12;
  		var ampm = 'AM';
  	} else {
  		var ampm = 'AM';
  	}
  	var minute = date.getMinutes();
  	if (minute < 10) {
  		minute = '0' + minute;
  	}
  	
  	return month + '/' + day + '/' + year + ', ' + hour + ':' + minute + ' ' + ampm;
  },
  arrayRemove : function(arr, el){
    for(var i = 0; i < arr.length; i++){
      if(arr[i] == el){
        arr.splice(i, 1);
        break;
      }
    }
    return arr;
  },
  createGoogleMapsLink : function(obj){
    //link beginning
    var base = 'http://maps.google.com/maps?q=';
    //ensure we don't get "undefined's"
    var street = obj.street ? obj.street : '';
    var city = obj.city ? ' ' + obj.city : '';
    var state = obj.state ? ' ' + obj.state : '';
    var postal_code = obj.postal_code ? ' ' + obj.postal_code : '';
    var county = obj.county ? ' ' + obj.county : '';
    
    var loc = street + city + state + postal_code + county;
    var loc = loc.replace(/ /g, '+');
    
    //We can change this text / remove it if needed
    var link = u.createElement('a', 'GoogleMaps', {href:base+loc, className:'google-maps-link location', target:'_BLANK'});
    
    return link;
  },
  /**
   *  Does not modify passed array - creates a copy
   *  
   *  Potential point of slow-down
   *  Returns an array with only the elements that func returned true for
   */
  filter : function(array, func){
    var ret = new Array();
    for(var i = 0; i < array.length; i++){
      if(func(array[i])){
        ret.push(array[i]);
      }
    }
    return ret;
  },
  createParamString : function(obj){
    var string = '';
    for(var i in obj){
      string += (string?'&':'') + encodeURI(i) + '=' + encodeURI(obj[i]);
    }
    return string;
  },
  restripe : function(list){
    var l = list.children.length;
    for(var i = 0; i<l; i++){
      if(i%2){
        $(list.children[i]).addClass('odd').removeClass('even');
      } else {
         $(list.children[i]).addClass('even').removeClass('odd');
      }
    }
  },
  getStyle : function(el, css){
    style = window.getComputedStyle(el);
    return style.getPropertyValue(css);
  }
};
 //alias window.u and Utils for shortness
window.u = Utils;