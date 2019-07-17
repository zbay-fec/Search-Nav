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
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    

    handleSubmit(e){
        console.log(e);
        let target = e;
        const y = document.getElementById("item"); //************************************** */
        console.log(y, 'testing');
        const x = document.getElementById("item");
        console.log(x.value, "supposed to be top item");
        if(!this.state.items.includes(e)){
            target = x.value;
        }else{
            target = e;
        }


        console.log(x.value, "item");
        console.log(target, "target");

        
        //going to be what is dispatched to the window
        // if(this.state.selected.length !== 0){
        //     target = this.state.selected[0]; //what is selected withing the autofilling dropdown
        // }else{
        //     target = this.state.Autofilling[0];
        // }

        
        Axios.post('http://localhost:3001/find', { name: target}) //going to use the first arr in the autocorrection
        .then(response => {
            this.setState({ selected: [], input: '' }); //reset to empty array after searching for the selected item
            console.log(response.data[0].productID);
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
        if(this.state.items.includes(e.target.value)){
            console.log(e.target.value);
            // selected.push(e.target.value);
            // this.setState({ selected: })
            this.handleSubmit(e.target.value);
            //e.target.value = ''; // resetting input after searching
        }else{
            null;
        }

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
                    <ul id="right-top">
                        <li className="sell">
                            <span className="span-sell">sell</span>
                        </li>
                        <li className="my-ebay">
                            <span className="span-My">My eBay</span>
                        </li>
                        <li className="notifications">
                            <button className="bell-icon">
                                <i id="alert"></i>
                            </button>
                        </li>
                        <li className="cart">
                            <a href="/cart" className="cart-icon">
                                <i id="shop"></i>
                            </a>
                        </li>
                        
                    </ul>
                </div>
                <div className="Search-component">
                <div className="w4-white">
                    <img src="../Zbay.png"></img>
                   
                <div className="w3-dropdown-hover">
                    <button className="category-dropdown" aria-expanded="false">Shop by <p rowspan="2">category<i id="arrow-dropdown"></i></p></button>
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
                        <th rowspan="2">Home & Garden</th>
                        </tr>
                    </table>
                    </div>
                </div>
                

                
                <input onChange={this.handleSelection} list="item-names" className="Searchbar" type="text" placeholder="Search for anything" ></input>
                <datalist id="item-names">
                    {this.state.items.map((name) => {
                        return <option id="item" value={name}>{name}</option>
                    })}
                </datalist>
               
                    
                    
                    
                    <select className="dropdown"> 
                        <option value="All Categories">All Categories</option>
                        <option value="Antiques">Anitques</option>
                        <option value="Ar">Art</option>
                        <option value="Baby">Baby</option>
                        <option value="Books">Books</option>
                        <option value="Business & Industrial">Business & Industrial</option>
                        <option value="test">test</option>
                        <option value="test">test</option>
                    </select>
                 <button className="Search" onClick={this.handleSubmit}>Search</button>
                 <div className="showcontent">
                 </div>


                 {<Table2 />}
                 
                </div>
            </div>
                

                
            </div>
        )
    }
}

export default Search;