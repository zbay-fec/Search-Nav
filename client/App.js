import React from 'react';
import Axios from 'axios';
import autocomplete from "react-autocomplete";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            input: '', //current state of search bar
            items: [], //names of items 
            item: {} //specific item that needs to be rendered
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        console.log(e.currentTarget.value);
        e.preventDefault();
        //need to compare realtime keystrokes to filter thru names
        const names = this.state.items.map((item) => item.name);
        console.log("Names", names);
        names.filter((name) => {
            if(name.includes(e.currentTarget.value)){
                console.log("name", name);
            }
        })
        this.setState({ input: e.currentTarget.value });
    }

    handleSubmit(e){
        
        //when ill render the page to the item thats clicked, or the exact item
    }

    componentWillMount(){
        Axios.get('http://localhost:3000/')
        .then(response => {
        this.setState({ items: response.data })
        })
        .catch(err => console.log('ERR', err));
    }

    render(){
        return(
            <div>
                <h1>oiii</h1>
                <p>{this.state.input}</p>
                <form>
                    <input type="text" onChange={this.handleChange}></input>
                    <button Submit={this.handleSubmit}>click me</button>
                </form>
            </div>
        )
    }
}

export default App;