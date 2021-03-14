import React, { Component } from 'react';
import './SignInPage.css';
import ProfileBox from '../images/profile-box.png';

class SignInPage extends Component{
   render(){
       return(
      <div className="signin-container">
        <div className="signin-inventor-title">
          <h2>InventorME</h2>
        </div>
        <div  className="login-box">
          <img className = "lbox"  src={ProfileBox} alt=""/>
          <p className ="Password"> Password: </p>
          <input type="password"  input className = "password"/>
          <p className ="Email"> Email: </p>
          <input type="text"  input className = "email"/>
          <button className="login-account" onClick={event =>  window.location.href="/accounts-page"}>Log in</button>
          <p className ="or-message"> Don't have an account?</p>
          <button className="create-account" onClick={event =>  window.location.href="/createacct-page"}>Create an Account </button>
        </div>
      </div>   
       );
  }
}
    
   
    
export default SignInPage;