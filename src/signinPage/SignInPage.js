import React, { Component } from 'react';
import './SignInPage.css';
import { Link, useHistory, withRouter } from "react-router-dom";
import ProfileBox from '../images/profile-box.png';

class SignInPage extends Component{
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
       return(
    <div class="signin-title">
    <div class="signin-inventor-title">
    <h2>InventorME</h2>
    </div>

    <div  class="login-box">
    <img class = "lbox"img style = {this.state.style} src={ProfileBox} alt=""/>
    <p class ="Password"> Password: </p>
    <input type="password"  input class = "password" value={this.state.value} onChange={this.handleChange}/>
    <p class ="Email"> Email: </p>
    <input type="text"  input class = "email" value={this.state.value} onChange={this.handleChange}/>
        <button class="login-account" onClick={event =>  window.location.href="/accounts-page"}>Log in</button>
        <p class ="or-message"> Don't have an account?</p>
        <button class="create-account" onClick={event =>  window.location.href="/createacct-page"}>Create an Account </button>
      </div>
      </div>


    
      
       );
  }
}
    
   
    
export default SignInPage;