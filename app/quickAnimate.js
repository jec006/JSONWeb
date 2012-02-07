/**
 *  @file quickAnimate.js - a quick animate library for doing simple animations
 *  @author jcaldwell
 *
 *  Assumes that the element given has the proper styles needed to do the animation desired.
 */

var qA = {
  moveTween : [.02,.06,.12,.20,.20,.20,.12,.06,.02],
  getStyle : function(el, css){
    style = window.getComputedStyle(el);
    return style.getPropertyValue(css);
  },
  left : function(el, amount, speed){
    var count = 0;
    var speed = speed / qA.moveTween.length;
    
    var orig = parseInt(el.style.left) || 0;
    var intv = setInterval( function(){
      var l = qA.moveTween[count] * amount;
      var left = parseInt(el.style.left) || 0;
      el.style.left = (left+l) + 'px';
      count++;
      if(count >= qA.moveTween.length ){
        clearInterval(intv);
        el.style.left = (orig + amount) + 'px'; //fix any rounding errors
      }
    }, speed);
  },
  down : function(el, amount, speed){
    var count = 0;
    var speed = speed / qA.moveTween.length;

    var orig = parseInt(el.style.top) || 0;
    var intv = setInterval( function(){
      var l = qA.moveTween[count] * amount;
      var top = parseInt(el.style.top) || 0;
      el.style.top = (top+l) + 'px';
      count++;
      if(count >= qA.moveTween.length ){
        clearInterval(intv);
        el.style.top = (orig + amount) + 'px'; //fix any rounding errors
      }
    }, speed);
  },
  crossFade : function(startEl, endEl, speed){
    //TODO
  },
  fadeOut : function(el, speed){
    var count = 0;
    var speed = speed / qA.moveTween.length;
    //This probably won't work in older versions of IE
    var orig = qA.getStyle(el, 'opacity') || 1;
    var intv = setInterval( function(){
      var l = qA.moveTween[count];
      var opacity = qA.getStyle(el, 'opacity') || 1;
      el.style.opacity = opacity - l;
      count++;
      if(count >= qA.moveTween.length ){
        clearInterval(intv);
        el.style.opacity = 0; //fix any rounding errors
      }
    }, speed);
  },
  fadeIn : function(el, speed){
    var count = 0;
    var speed = speed / qA.moveTween.length;
    //This probably won't work in older versions of IE
    var orig = qA.getStyle(el, 'opacity') || 0;
    var intv = setInterval( function(){
      var l = qA.moveTween[count];
      var opacity = qA.getStyle(el, 'opacity') || 0;
      el.style.opacity = opacity + l;
      count++;
      if(count >= qA.moveTween.length ){
        clearInterval(intv);
        el.style.opacity = 1; //fix any rounding errors
      }
    }, speed);
  }
};