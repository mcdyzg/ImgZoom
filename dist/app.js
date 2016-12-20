/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ImgZoom = __webpack_require__(1);


	var App = React.createClass({displayName: "App",

	    imgZoom:function(src){
	        this.refs.imgZoom.show(src);
	    },

	    render:function(){
	        return (
	            React.createElement("div", {style: {}, className: "ani"}, 
	            React.createElement("img", {className: "img", "data-toggle": "imgZoom", src: "src/img/b3.jpg"}), 
	            React.createElement("img", {className: "img", "data-toggle": "imgZoom", src: "src/img/b5.jpg"}), 
	            React.createElement("div", {className: "divimg", style: {width:90,height:100}, "data-toggle": "imgZoom"}, "asdfasdf"), 
	            React.createElement(ImgZoom, {ref: "imgZoom"})
	            )
	            )
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('AppContainer'));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var addEvent = __webpack_require__(3);
	var removeEvent = __webpack_require__(4);
	var insertKeyframesRule =__webpack_require__(5);
	// var transitionEvents = require('domkit/transitionEvents.js');
	var appendVendorPrefix = __webpack_require__(6);
	var Style = __webpack_require__(2);



	var imgZoom = React.createClass({displayName: "imgZoom",
					getDefaultProps:function(){
							return {

							};
					},

					getInitialState:function(){
						return {
							show:false
						}
					},

					componentDidMount:function(){
						var t = this;
						addEvent(document,'click',this.listenEvent)
					},

					componentWillUnmount:function(){
						var t = this;
						removeEvent(document,'click',this.listenEvent)
					},

					listenEvent:function(e){
							if(!e.target.attributes['data-toggle']) 
								return
							if(e.target.attributes['data-toggle'].nodeValue==='imgZoom'){
								if(e.target.nodeName==='DIV') {
									var src = this.getStyle(e.target,'background-image').slice(5,-2);
									this.show(src);
								} else
								if(e.target.nodeName==='IMG') {
									this.show(e.target.src);
								} else {
									return
								}
							}
					},

					show:function(src){
						this.setState({
							show:true
						});
						this.loadImg(src);
					},

					close:function(){
						this.setState({
							show:false
						});
					},

					setStyle:function(ele,style){
						for (var i in style) {
							ele.style[i]=style[i]
						}
					},

					getStyle:function(obj, attr){
						 if(obj.currentStyle)
						 {
							return obj.currentStyle[attr];
						 }
						 else
						 {
							return getComputedStyle(obj, false)[attr];
						 }
					},

					loadImg:function(src){
						var t = this;
						var docuWH = document.documentElement.clientWidth/document.documentElement.clientHeight;
						var imgWH;
						var image = new Image();
						var adjustPosition;
						image.className = 'images';
						image.onload=function(){
							image.onclick=t.close;
							imgWH = image.width/image.height;
							if(image.width <= document.documentElement.clientWidth &&image.height<=document.documentElement.clientHeight) {
							}else 
							if(image.width <= document.documentElement.clientWidth&&image.height>document.documentElement.clientHeight) {
								image.height = document.documentElement.clientHeight;
							}else
							if(image.width > document.documentElement.clientWidth&&image.height <= document.documentElement.clientHeight){
								image.width = document.documentElement.clientWidth;
							}else
							if(image.width > document.documentElement.clientWidth && image.height > document.documentElement.clientHeight){
								imgWH>docuWH?image.width = document.documentElement.clientWidth:image.height = document.documentElement.clientHeight;
							}
							adjustPosition = {
								'margin-left':'-'+image.width/2+'px',
								'margin-top':'-'+image.height/2+'px'
							}
							t.setStyle(image,Style.image);
							t.setStyle(image,adjustPosition);
							t.refs.imgZoom.getDOMNode().appendChild(image);
						};
						image.src = src;
					},

					hideBackdropAnimation:insertKeyframesRule({
							'0%': {
									opacity: 0.9
							},
							'100%': {
									opacity: 0
							}
					}),

					showBackdropAnimation:insertKeyframesRule({
							'0%': {
									opacity: 0
							},
							'100%': {
									opacity: 0.9
							}
					}),

					getBackdropStyle:function(show){
						var t = this;
						return appendVendorPrefix({
							position: "fixed",
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
							zIndex: 1040,
							backgroundColor: "#373A47",
							animationDuration: '0.4s',
							animationFillMode: 'forwards',
							animationName: show ? t.showBackdropAnimation : t.hideBackdropAnimation,
							animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
						})
					},

					render:function(){
						var t = this;
						// if(t.state.show) {
						// 	var node = this.refs.backdrop.getDOMNode();
						// 	var endListener = function(e){
						// 		transitionEvents.removeEndEventListener(node, endListener);
						// 		if(t.state.show){
						// 			return;
						// 		}
						// 		t.setState({
						// 			show:false
						// 		})
						// 	}.bind(this)
						// 	transitionEvents.addEndEventListener(node, endListener);
						// }
						if(!t.state.show)
							return null
						var backdrop = React.createElement("div", {ref: "backdrop", onClick: t.close, style: t.getBackdropStyle(t.state.show)})
						return (
							React.createElement("div", {ref: "imgZoom"}, 
								backdrop
							)
							)
					}
			});

	module.exports = imgZoom;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		'image':{
			'position':'fixed',
			'left':'50%',
			'top':'50%',
			'z-index':'1041'
		}
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(elem, type, eventHandle) {
	  if (elem == null || typeof elem === 'undefined') {
	    return;
	  }
	  if (elem.addEventListener) {
	    elem.addEventListener(type, eventHandle, false);
	  } else if (elem.attachEvent) {
	    elem.attachEvent('on' + type, eventHandle);
	  } else {
	    elem['on' + type] = eventHandle;
	  }
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(elem, type, eventHandle) {
	  if (elem == null || typeof elem === 'undefined') {
	    return;
	  }
	  if (elem.removeEventListenerListener) {
	    elem.removeEventListenerListener(type, eventHandle, false);
	  } else if (elem.detachEvent) {
	    elem.detachEvent('on' + type, eventHandle);
	  } else {
	    elem['on' + type] = null;
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var insertRule = __webpack_require__(7);
	var vendorPrefix = __webpack_require__(8)();
	var index = 0;

	module.exports = function(keyframes) {
	  // random name
	  var name = 'anim_' + (++index) + (+new Date);
	  var css = "@" + vendorPrefix + "keyframes " + name + " {";

	  for (var key in keyframes) {
	    css += key + " {";

	    for (var property in keyframes[key]) {
	      var part = ":" + keyframes[key][property] + ";";
	      // We do vendor prefix for every property
	      css += vendorPrefix + property + part;
	      css += property + part;
	    }

	    css += "}";
	  }

	  css += "}";

	  insertRule(css);

	  return name
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getVendorPropertyName = __webpack_require__(9);

	module.exports = function(target, sources) {
	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  var prefixed = {};
	  for (var key in to) {
	    prefixed[getVendorPropertyName(key)] = to[key]
	  }

	  return prefixed
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var extraSheet;

	module.exports = function(css) {

	  if (!extraSheet) {
	    // First time, create an extra stylesheet for adding rules
	    extraSheet = document.createElement('style');
	    document.getElementsByTagName('head')[0].appendChild(extraSheet);
	    // Keep reference to actual StyleSheet object (`styleSheet` for IE < 9)
	    extraSheet = extraSheet.sheet || extraSheet.styleSheet;
	  }

	  var index = (extraSheet.cssRules || extraSheet.rules).length;
	  extraSheet.insertRule(css, index);

	  return extraSheet;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cssVendorPrefix;

	module.exports = function() {

	  if (cssVendorPrefix) return cssVendorPrefix;

	  var styles = window.getComputedStyle(document.documentElement, '');
	  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];

	  return cssVendorPrefix = '-' + pre + '-';
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var builtinStyle = __webpack_require__(10);
	var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	var domVendorPrefix;

	// Helper function to get the proper vendor property name. (transition => WebkitTransition)
	module.exports = function(prop, isSupportTest) {

	  var vendorProp;
	  if (prop in builtinStyle) return prop;

	  var UpperProp = prop.charAt(0).toUpperCase() + prop.substr(1);

	  if (domVendorPrefix) {

	    vendorProp = domVendorPrefix + UpperProp;
	    if (vendorProp in builtinStyle) {
	      return vendorProp;
	    }
	  } else {

	    for (var i = 0; i < prefixes.length; ++i) {
	      vendorProp = prefixes[i] + UpperProp;
	      if (vendorProp in builtinStyle) {
	        domVendorPrefix = prefixes[i];
	        return vendorProp;
	      }
	    }
	  }

	  // if support test, not fallback to origin prop name
	  if (!isSupportTest) {
	    return prop;
	  }

	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = document.createElement('div').style;


/***/ }
/******/ ])