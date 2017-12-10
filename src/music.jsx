import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Book from './List.jsx';

import {Button, FormControl, FormGroup, ControlLabel, Form} from 'react-bootstrap';

class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
                titles: null,
                imgId: [],
                link: "",
                buffBooks: [],
                index: null
            }           
        }
    
    getData(event) {
        this.setState({title:event.target.value});
    }
    showTitle() {
        
        const heroku = `https://cors-anywhere.herokuapp.com/`
        const URLTITLE = 'http://openlibrary.org/search.json?';
        let mas = this.state.title.split('');
        let urlAd = mas.map((x) => {
            if(x === ' ') {
                 return x = '+';
            } else {
                return x;
            }
        });
        let mas2 = urlAd.join('');
        let genURL =`${heroku}${URLTITLE}q=${mas2}`;
        
        let receiveData = fetch(genURL, {method:'GET'});
        
        receiveData
        .then((data) => data.json())
        .then((data) =>  
        {   
                let arrayClean = [];
                let masHref = [];
                let buffArray = data.docs.map((item) => item);
                for (let x = 0; x < buffArray.length; x++) {
                    if (buffArray[x].hasOwnProperty('cover_i') && buffArray[x].cover_i !== undefined) {
                                 
                       arrayClean.push(buffArray[x]);
                    }
                }
                
                this.setState({buffBooks: arrayClean});
                
                let links = this.state.buffBooks.map((item, index)=> {
                    if(item.isbn) {
                        fetch(`${heroku}http://openlibrary.org/api/volumes/brief/isbn/${item.isbn[0]}.json`, {method:'GET' })
                        .then((data)=> data.json())
                        .then((data)=> {
                            
                            
                                masHref.push(<Book alink={`http://openlibrary.org/${Object.keys(data.records)}`}
                                title={item.title}
                                key={index}
                                img={`http://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
                                />);
                               
                                
                            
                       
                            
                            let list = React.createElement('div', null, masHref);
                            ReactDOM.render(list, document.getElementById('list'));    
                        })
                    }
                    return null;
                })

                            
                           
                
     
        })
        
                         
                
            } 
            
               
  
    render() {
        return (
            <div>
                <h1>Welcome to Book App</h1>
                <Form inline>
                    <FormGroup>
                        <ControlLabel><h4>Search By Book Name or Author Name:</h4></ControlLabel>{'  '}
                        <FormControl type="text" placeholder="Enter text" onChange={(event) => this.getData(event)}/>
                        <Button bsStyle="danger" onClick={()=> this.showTitle()}>Submit</Button>
                    </FormGroup>
                </Form>
                <div id='list' className='List'></div>               
                
            </div>
        )
    }
}

export default Music;