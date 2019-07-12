import React from 'react';
import Axios from 'axios';
import DropDown from './dropDown';


//when you enter instead of clicking on an  Autofilling from the drop down menu
//then get the id for the top   Autofilling which will be this.state  Autofilling[0]
class Search extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            input: '', //current state of search bar
            items: [], //names of items 
            Autofilling: [], //items that will be render below the search bar
            showMenu: true //maybe new component to control the menu sropdown 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        //need to compare realtime keystrokes to filter thru names
        // const names = this.state.items.map(  Autofilling) =>  Autofilling.name);
        const names = this.state.items; //taking names that are in the state currently
        let autoFill = [];
        let searching = [];
        names.filter((name) => { //only works when the word after the initial word is directly after in the Autofilling name
            if(name.includes(e.currentTarget.value.toLowerCase())){ //try to compare by each word, and if it isnt included then drop it 

                if(e.currentTarget.value.length !== 0){
                    
                    autoFill.push(name);
                    //************************************************* */check to see which. Autofilling has more in common with the input
                    this.setState({ 
                        input: e.currentTarget.value,
                        Autofilling: autoFill 
                    });
                }else{
                    this.setState({ Autofilling: [] })                                                                 
                }
            }
        })
    }

    handleSubmit(){
        console.log(this.state.input);
        Axios.post('http://localhost:3001/find', { name: this.state.Autofilling[0]}) //going to use the first arr in the autocorrection
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
        Axios.get('http://localhost:3001/items') //recieving all names from all the Autofilling names
        .then(response => { this.setState({ items: response.data }) })
        .catch(err => console.log('ERR', err));
    }

    filterThruAutoFill(){
        if(AutoFilling.length > 0){
            console.log("filter thru more with input");
        }
    }

    render(){
        return(
            <div>
 
                {console.log(this.state.input)}
                {/* <nav className="white" role="navigation">
                
                    <div className="nav-wrapper container row">
                    <div className="col s2"><img src="../Zbay.png"></img></div>
                    <div className="col s3"><input type= "text" placeholder="Search" onChange={this.handleChange}></input></div>
                    <div><button onClick={this.handleSubmit}>Go</button></div> */}

            
                    {/* <div className="col s1"><button class="btn waves-effect waves-light" type="submit"  name="action">Submit
                        <i class="material-icons right">send</i>
                    </button></div> */}
        
                    {/* <div className="col s1"></div>
                        <ul className="left hide-on-med-and-down">
                        <li><a href="#">Navbar Link</a></li>
                        </ul>
                
                        <ul id="nav-mobile" className="sidenav">
                        <li><a href="#">Navbar Link</a></li>
                        </ul>
                        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i class="material-icons">menu</i></a>
                    </div>
                </nav> */}
                <div className="w3-white">
                <img src="../Zbay.png"></img>
                <div className="w3-dropdown-hover">
                    <button className="w3-button">Shop by category</button>
                    <div className="w3-dropdown-content">
                    <table>
                        <tr>
                            <th>Collectibles and art</th>
                            <th>Fashion</th>
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
                    </table>
                    </div>
                </div>
                
                
                <input type="text" className="w3-bar-item w3-button" placeholder="Search for anything" onChange={this.handleChange}></input>
                 <button className="w3-bar-item w3-button w3-blue" onClick={this.handleSubmit}>Search</button>
                
                </div>
                

                {/* <form class="form-inline md-form form-sm mt-0">
                <i class="fas fa-search" aria-hidden="true"></i>
                <input Style="padding:0 0 0 20px" class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                    aria-label="Search" onChange={this.handleChange}/>
                </form> */}

                
                {(this.state.Autofilling.length !== 0) ? 
                <div>
                <p>{this.state.Autofilling[0]}</p>
                <p>{this.state.Autofilling[1]}</p>
                <p>{this.state.Autofilling[2]}</p>
                <p>{this.state.Autofilling[3]}</p>
                </div>
                : null
                }
            </div>
        )
    }
}

export default Search;