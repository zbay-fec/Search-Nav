import React from 'react';
import Axios from "axios";
import List from './List';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        //set to const bc its asynchronous
        const update = event.target.value;
        this.setState({userInput: update})
    }
    handleSubmit(){
        Axios.post('http://localhost:3000/todos', {messages: this.state.userInput})
        .then(results => this.setState({todos: results.data}))
        .catch((err) => console.log('app', err));
    }
    componentDidMount(){
        let curTodos = this.state.todos;
        Axios.get('http://localhost:3000/todos')
        .then((todos) => { console.log(todos.data)
        curTodos.push(todos.data)
        this.setState({
            todos: todos.data
        })})
        .catch((err) => console.log(err));
    }
    
    render (){
        console.log(this.state.todos);
        return (
            <div>
                <h1>ToDo</h1>
                <input onChange={this.handleChange} type='text' placeholder='new todos here'/>
                <input type='Submit' onClick={this.handleSubmit}/>
                {this.state.todos.length !== 0 ? this.state.todos.map((user, i) => <List msg={user} key={i}/>) : null}
                {/* <response handleResponse={this.handleResponse}/> -implement handleResponse and bind in constructor*/ } 
            </div>
        )
    }
}

export default App;

//Warning: Each child in a list should have a unique "key" prop. --> think has to do with the fact that there are no unique ids for the messages, such as a 
//fixed - must set a unique id for each object bc there is no other unique id currently in the db.