var ImgZoom = require('./imgZoom.js');


var App = React.createClass({

    imgZoom:function(src){
        this.refs.imgZoom.show(src);
    },

    render:function(){
        return (
            <div style={{}} className='ani'>
            <img className='img' data-toggle='imgZoom' src='src/img/b3.jpg' />
            <img className='img' data-toggle='imgZoom' src='src/img/b5.jpg' />
            <div className='divimg' style={{width:90,height:100}} data-toggle='imgZoom' >asdfasdf</div>
            <ImgZoom ref='imgZoom' />
            </div>
            )
    }
});

ReactDOM.render(<App/>, document.getElementById('AppContainer'));
