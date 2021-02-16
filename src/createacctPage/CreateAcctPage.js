import React, { Component } from 'react';
import './CreateAcctPage.css';
import InventorLogo from '../images/InventorMeLogo.png';
import { BrowserRouter, Route, Switch ,Link} from "react-router-dom";
import ProfileBox from '../images/profile-box.png';

class CreateAcctPage extends Component{
  constructor(props) {
    super(props);
    this.state = { response: '', post: '' }
  }
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/profile');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

    render(){
    return (
      <div class="createacct-title">

      <div class="createacct-inventor-title">
      <h2>InventorME</h2>
      </div>

    <p class ="Email2"> Email: </p>
    <input type="text"  input class = "email2" onChange={this.handleChange}/>

    <p class = "Fname"> First Name: </p>
    <input type="text"  input class = "first" onChange={this.handleChange}/>

    <p class = "Lname"> Last Name: </p>
    <input type="text"  input class = "last" onChange={this.handleChange}/>

    <p class = "Phone"> Phone Number: </p>
    <input onChange = {event => this.setState({value: event.target.value.replace(/\D/,'')})} input class = "phone" value={this.state.value} onChange={this.handleChange}/>

    <p class = "Password2"> Password: </p>
    <input type="password"  input class = "password2" onChange={this.handleChange}/>

    <button class="goto-account" onClick={event =>  window.location.href="/signin-page"}>Create Account </button>
    <img src={InventorLogo} class="calogo" alt="" />

</div>
      
      
      
      

  
        
    
      );
    }
}
export default CreateAcctPage;