import React, { Component } from 'react';
import './SignInPage.css';
import { Link, useHistory, withRouter } from "react-router-dom";
import ProfileBox from '../images/profile-box.png';
import { AccountContext } from '../util/Accounts';



class SignInPage extends Component{
  static contextType = AccountContext
    constructor(props) {
        super(props);
        this.state = { response: '', post: '', email: '', password: '' };
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.submit = this.submit.bind(this);

      }
      componentDidMount() {
        const { getSession } = this.context;
        console.log("componentDidMount");
        getSession()
        .then(session => {
          console.log('Signed In:', "user found");
          console.log('Session:', session);
          window.location.href="/items-page";
        }).catch(err => {
          console.log('err:', "no user found");
        });
        this.callApi()
          .then(res => this.setState({ response: res }))
          .catch(err => console.log(err));
      }
      
      callApi = async () => {
        const response = await fetch('/api/user');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };


      setEmail(event){
        this.setState({ email: event.target.value});
        event.preventDefault();
      }
      setPassword(event){
        this.setState({ password: event.target.value});
        event.preventDefault();
      }
      validateUser(event){
        if(this.state.email === "")
          alert("Error: Please Type Email");
        else if(this.state.password === "")
          alert("Error: Please Type Password");
        else
          this.submit();
      };
      submit(event){
        const { authenticate } = this.context;
        authenticate(this.state.email, this.state.password)
          .then(data =>{
            //success
            // console.log('Logged in!', data);
            window.location.href="/items-page";
            // console.log('Logged in!', data);
          })
          .catch(err =>{
            alert("Error: Password or Email is incorrect");
            console.error('Failed to login!', err);
          })
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
    <input type="password"
      input className = "password" 
      value={this.state.password} 
      onChange={this.setPassword}/>
    <p class ="Email"> Email: </p>
    <input type="text" 
     input className = "email" 
     value={this.state.email} 
     onChange={this.setEmail}/>
        <button class="login-account" onClick={this.validateUser}>Log in</button>
        <p class ="or-message"> Don't have an account?</p>
        <button class="create-account" onClick={event =>  window.location.href="/createacct-page"}>Create an Account</button>
      </div>
      </div>


    
      
       );
  }
}
   
    
export default SignInPage;