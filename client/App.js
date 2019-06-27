import React from 'react';
import Axios from "axios";
import List from './List';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
    }
    
    componentDidMount(){
        console.log('oi');
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
        
        return (
            <div>
                <h1>hola</h1>
                
                {this.state.todos.length !== 0 ? this.state.todos.map((user) => <List msg={user} />) : null}
            </div>
        )
    }


}

export default App;