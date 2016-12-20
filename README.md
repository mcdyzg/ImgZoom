## imgZoom ##

一个react图片全屏展示组件

### Usage ###

1. npm install
2. gulp watch

## exam ##
	var React = require('react')
	var ReactDOM = require('react-dom')
	var ImgZoom = require('../src/imgZoom.js');
	var App = React.createClass({

    render: function() {
        var t = this;
        return (
            <div className='ani'>
                <img className='img' data-toggle='imgZoom' src='/demo/img/b3.jpg' />
                <img className='img' data-toggle='imgZoom' src='/demo/img/b5.jpg' />
                <div className='divimg' style={{width:90,height:100}} data-toggle='imgZoom' >asdfasdf</div>
                <ImgZoom ref='imgZoom' />
            </div>
        );
    }
	});
	ReactDOM.render(<App />, document.getElementById('AppContainer'));

1. add `<ImgZoom ref='imgZoom' />`
2. add `data-toggle='imgZoom'` in `<img />` or `<div></div>`with background-image.