import React from 'react';
import Axios from 'axios';
// import './style.css';


//when you enter instead of clicking on an item from the drop down menu
//then get the id for the top item which will be this.state.item[0]
class Search extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            input: '', //current state of search bar
            items: [], //names of items 
            item: [], //items that will be render below the search bar 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    Navbar(){
        
    }


    handleChange(e){
        e.preventDefault();
        //need to compare realtime keystrokes to filter thru names
        // const names = this.state.items.map((item) => item.name);
        const names = this.state.items; //taking names that are in the state currently
        let autoFill = [];
        names.filter((name) => { //only works when the word after the initial word is directly after in the item name
            if(name.includes(e.currentTarget.value.toLowerCase())){
                //console.log("name", name); //constantly filtering, but need a handle submit when that name is licked on or entered
                if(e.currentTarget.value.length !== 0){
                    autoFill.push(name);
                    //check to see which item has more in common with the input
                    this.setState({ 
                        input: e.currentTarget.value,
                        item: autoFill 
                    });
                }else{
                    this.setState({ item: [] })                                                                         
                }
            }
        })
        
    }

    handleSubmit(){
        console.log(this.state.input);
        Axios.post('http://localhost:3001/find', { name: this.state.item[0]}) //going to use the first arr in the autocorrection
        .then(response => {
            window.dispatchEvent(new CustomEvent('productChanged', {
                detail: {
                  id: response.data[0].productID
                }
              }));
            // console.log(response.data[0].productID)) //retrieves the id of the first itek in the autocorrect list
        })
        .catch(err => console.log(err))
    }

    componentWillMount(){
        Axios.get('http://localhost:3001/items') //recieving all names from all the item names
        .then(response => { this.setState({ items: response.data }) })
        .catch(err => console.log('ERR', err));
    }

    render(){
        return(
            <div>
                <nav>
                    <a href='/categories/'>Categories</a> 
                </nav>
                <form class="form-inline md-form form-sm mt-0">
                <i class="fas fa-search" aria-hidden="true"></i>
                <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                    aria-label="Search" onChange={this.handleChange}/>
                </form>
                <button onClick={this.handleSubmit} onKeyDown={this.handleSubmit}>click</button>

                
                {(this.state.item.length !== 0) ? 
                <div>
                <p>{this.state.item[0]}</p>
                <p>{this.state.item[1]}</p>
                <p>{this.state.item[2]}</p>
                <p>{this.state.item[3]}</p>
                </div>
                : null
                }
            </div>
        )
    }
}

export default Search;