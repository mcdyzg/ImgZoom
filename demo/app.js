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