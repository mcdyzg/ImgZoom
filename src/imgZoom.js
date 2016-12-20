var React = require('react')
var ReactDOM = require('react-dom')
var addEvent = require('domkit/addEventListener.js');
var removeEvent = require('domkit/removeEventListener.js');
var insertKeyframesRule =require('domkit/insertKeyframesRule');
// var transitionEvents = require('domkit/transitionEvents.js');
var appendVendorPrefix = require('domkit/appendVendorPrefix.js');
var Style = require('./imgZoomStyle.js');



var imgZoom = React.createClass({
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
						t.refs.imgZoom.appendChild(image);
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
					var backdrop = <div ref='backdrop' onClick={t.close} style={t.getBackdropStyle(t.state.show)}/>
					return (
						<div ref='imgZoom'>
							{backdrop}
						</div>
						)
				}
		});

module.exports = imgZoom;