import React, {Component} from "react";
//import ReactDOM from 'react-dom';
//import {Button} from 'react-bootstrap';

class Book extends Component {
    
      
    render(){
        return(
            <div className='book'>
                <p>Title: {this.props.title} </p>
                <a href={this.props.alink}><img src={this.props.img} alt="nothing" className='book-img'></img></a>
            </div>
        )
    }
}

export default Book;