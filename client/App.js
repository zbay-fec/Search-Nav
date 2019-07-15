import React from 'react';
import Axios from 'axios';
import Table2 from './table2';


//when you enter instead of clicking on an  Autofilling from the drop down menu
//then get the id for the top   Autofilling which will be this.state  Autofilling[0]
class Search extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            input: '', //current state of search bar
            items: [], //names of items 
            Autofilling: [], //items that will be render below the search bar
            selected: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        //need to compare realtime keystrokes to filter thru names
        // const names = this.state.items.map(  Autofilling) =>  Autofilling.name);
        const names = this.state.items; //taking names that are in the state currently
        const autoFill = [];
            names.forEach(itemName => {
                if(itemName.includes(e.currentTarget.value.toLowerCase())){ //try to compare by each word, and if it isnt included then drop it 
                    if(e.currentTarget.value.length !== 0){
                        autoFill.push(itemName); 
                        
                        this.setState({ 
                            input: e.currentTarget.value,
                            Autofilling: autoFill 
                        });
                    }else{
                        this.setState({ Autofilling: [] })                                                                 
                    }
                }         
            });
    }

    handleSubmit(){
        let target; //going to be what is dispatched to the window
        if(this.state.selected.length !== 0){
            target = this.state.selected[0];
        }else{
            target = this.state.Autofilling[0];
        }

        
        Axios.post('http://localhost:3001/find', { name: target}) //going to use the first arr in the autocorrection
        .then(response => {
            console.log(response.data[0].productID);
            this.setState({ selected: [] }); //reset to empty array after searching for the selected item
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
        Axios.get('http://localhost:3001/items') //recieving all names from all the Autofilling names
        .then(response => { this.setState({ items: response.data }) })
        .catch(err => console.log('ERR', err));
    }

    handleSelection(e){
        this.state.selected.push(e.currentTarget.innerHTML);
        this.setState({ selected: e.currentTarget.innerHTML });
        this.handleSubmit();
    }

  

    render(){
        return(
            <div>
                <div className="top-bar">
                    <ul className="top">
                        <li className="user">
                            <span className="span-user">Hi <b>User</b> (<a className="signin" href='#' >Sign in</a>) </span>
                        </li>
                        <li className="Daily-Deals">
                            <span className="span-dailydeals">Daily Deals</span>
                        </li>
                        <li className="Gift-Cards">
                            <span className="span-giftcards">Gift Cards</span>
                        </li>
                        <li className="Help-Contact">
                            <span className="span-help">Help & Contact</span>
                        </li>
                    </ul>
                </div>
                <div className="Search-component">
                <div className="w3-white">
                    <img src="../Zbay.png"></img>
                   
                <div className="w3-dropdown-hover">
                    <button className="w3-button">Shop by category</button>
                    <div className="w3-dropdown-content">
                    <table classname="drop">
                        <tr> 
                            <th>Collectibles and art</th> 
                            <th>Fashion</th>
                            <th>Sporting goods</th>
                        </tr>
                        <tr> 
                            <td>Collectibles</td>
                        </tr>
                        <tr>
                            <td>Coins & paper money Antiques</td>
                        </tr>
                        <tr>
                            <td>Sports memorabillia</td>
                        </tr>
                        <tr>
                        <th rowspan="2">Electronics</th>
                        </tr>
                    </table>
                    </div>
                </div>
                
                <input className="Searchbar" type="text" placeholder="Search for anything" onChange={this.handleChange}></input>
                
                 <button className="Search" onClick={this.handleSubmit}>Search</button>
                 <div className="showcontent">
                 </div>

                 {(this.state.Autofilling.length !== 0) ?
                <table className="autofill-table">
                    <div id="autofill-column">
                    <tr>    
                    <td className="autofill-items"> 
                        <ul className="ui-autocomplete" tabindex="-1">                                                                                                                                 
                            <li id="menu-item"> 
                                <a onClick={this.handleSelection}>{this.state.Autofilling[0]}</a>
                            </li>
                            <li id="menu-item"> 
                                <a onClick={this.handleSelection}>{this.state.Autofilling[1]}</a>
                            </li>
                            <li id="menu-item"> 
                                <a onClick={this.handleSelection}>{this.state.Autofilling[2]}</a>
                            </li>
                            <li id="menu-item"> 
                                <a onClick={this.handleSelection}>{this.state.Autofilling[3]}</a>
                            </li>
                        </ul>
                        </td>
                    </tr>
                    </div>
                </table>
                : null
                }
                 {<Table2 />}
                 
                </div>
            </div>
                

                
            </div>
        )
    }
}

export default Search;