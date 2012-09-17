/*hippo - v1.0 - 2012-09-17
* http://hippojs.com
* Copyright (c) 2012 Cody Lindley; Licensed MIT */

(function(){

/**
* core.js
*
* @module core.js
*/

var global = this;

/**
`hippo('li')`  
`hippo('li','ul')`  
`hippo('<div></div>')`  
@class hippo
@constructor
@param selector|HTML {String|String}
  A string containing a selector expression or a string containing HTML
@param [context='<html>'] {String}
  A string containing a selector expression
@return {Object} hippo() object e.g. `{0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}`
**/
var hippo = function(configParam,context){
	return new createHippoObject(configParam,context);
};

var createHippoObject = function(configParam,context){

	//if no configParam return html element
	if(!configParam){
		this.length = 1;
		this[0] = document.documentElement;
		return this;
	}

	//if HTML string
	if(configParam.charAt(0) === "<" && configParam.charAt( configParam.length - 1 ) === ">" && configParam.length >= 3){
		var divElm = document.createElement('div');
		var docFrag = document.createDocumentFragment();
		docFrag.appendChild(divElm);
		docFrag.querySelector('div').innerHTML = configParam;
		this.length = 1;
		this[0] = docFrag.querySelector('div').firstChild;
		return this;
	}

	//Assume selector string and use context if its passed
	var nodes = (document.querySelectorAll(context)[0] || document).querySelectorAll(configParam);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.length = nodes.length;
	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

//deal with browser v.s. node
if(typeof exports !== 'undefined'){//export for use on server i.e. node
	exports.hippo = hippo;
}else{//else assume browser
	global.hippo = hippo;
	if(!('$' in global)){
		global.$ = hippo;
	}
}

//setup prototype
hippo.fn = createHippoObject.prototype = {
    constructor:hippo
};

/**
utilities.js

@module helpers.js
**/

/**
hippo. e.g. hippo.version

@class hippo.
@static
**/

/**
Returns the version of hippo

@property version
@for hippo.
@static
@type String
@return {string}
**/
hippo.version = '1.0';

/**
loop over an object or array

@method each
@static
@for hippo.
@param Object|Array {Object|Array}
	An Array or Object to iterate over
@param callback {Function}
	A callback Function
@return returns the Object or Array passed in
**/
hippo.each = function(object, callback){
	var name,
	i = 0,
	length = object.length,
	isObj = length === undefined;

	if (isObj){
		for (name in object){
			if (callback.call(object[name], name, object[name]) === false){
				break;
			}
		}
	}else{
		for (; i < length;){
			if (callback.call(object[i], i, object[i++]) === false ){
				break;
			}
		}
	}

	return object;
};

/**
return JavaScript datatype as string e.g. 'string'|'number'|'null'|'undefined'|'object'|'array'

@method type
@static
@for hippo.
@param value {}
  Any JavaScript value
@return 'string'|'number'|'null'|'undefined'|'object'|'array'
**/

hippo.type = function(value){
	if(value === null) { return 'null'; }

	if(value === undefined) { return 'undefined'; }

	var ret = Object.prototype.toString.call(value).match(/^\[object\s+(.*?)\]$/)[1];

	ret = ret? ret.toLowerCase() : '';

	if(ret == 'number' && isNaN(value)) {
		return 'NaN';
	}

	return ret;
};

/**
looping over a hippo() object

@module miscellaneous.js
**/

/**
loop over each element
 
 @method each
 @for hippo
 @param callback {Function}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.each = function(callback){
    return hippo.each(this, callback);
};

/**
total elements in the hippo object
 
 @method total
 @for hippo
 @returns {Number}
 **/
hippo.fn.total = function(){
	return this.length;
};

/**
convert hippo object of DOM elements into JavaScript array of elements
 
 @method toArray
 @for hippo
 @returns {Array}
 **/
hippo.fn.toArray = function(){
	return Array.prototype.slice.call(this);
};

/**
get a DOM node from the hippo object at a specific index (zero based).
 
 @method get
 @for hippo
 @param callback {Number}
 @returns {Node}
 **/
hippo.fn.get = function(number){
	return number === null ? this[0] : this[number];
};

/**
contains methods for operating on the class="" attribute

@module class.js
**/

/**
 Adds class attribute value

 @method addClass
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.addClass = function(classString){
	this.each(function(){
		this.classList.add(classString);
	});
	return this;
};

/**
 removes class attribute value

 @method removeClass
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.removeClass = function(classString){
	this.each(function(){
		this.classList.remove(classString);
	});
	return this;
};

/**
 toggle class attribute value

 @method toggleClass
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.toggleClass = function(classString){
	this.each(function(){
		this.classList.toggle(classString);
	});
	return this;
};

/**
 is class attribute value already defined

 @method hasClass
 @for hippo
 @param class {String}
 @chainable
 @returns {Boolean}
 **/
hippo.fn.hasClass = function(classString){
	return this[0].classList.contains(classString);
};

//outro.js
}.call(this)); //call anynoumous function, set this value, for function to global scope