import React, { Component } from 'react';
import './CreateAcctPage.css';
import InventorLogo from '../images/InventorMeLogo.png';
import { Link} from "react-router-dom";
import BackButton from '../images/back-button.png';
import UserPool from "../util/UserPool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import ToastMessage from '../components/toastMessage/ToastMessage';


class CreateAcctPage extends Component{
  constructor(props) {
    super(props);
    this.state = {response: '', post: '', email: '', password: '', phone_number: '', name: '', family_name: '', loading: false}
    this.setPassword = this.setPassword.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.submit = this.submit.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setName = this.setName.bind(this);
    this.setFamilyName = this.setFamilyName.bind(this);
    this.toast = React.createRef();
  }
  
  setEmail(event){
    this.setState({ email: event.target.value});
    event.preventDefault();
  }
  setPassword(event){
    this.setState({ password: event.target.value});
    event.preventDefault();
  }
  setName(event){
    this.setState({ name: event.target.value});
    event.preventDefault();
  }
  setFamilyName(event){
    this.setState({ family_name: event.target.value});
    event.preventDefault();
  }
  setPhone(event){
    this.setState({ phone_number: event.target.value});
    event.preventDefault();
  }

  submit(event){
    this.setState({ loading: true})
    const attributeList = [];
    attributeList.push(new CognitoUserAttribute({
      Name: 'name',
      Value: this.state.name
    }));
    attributeList.push(new CognitoUserAttribute({
      Name: 'phone_number',
      Value: this.state.phone_number
    }));
    attributeList.push(new CognitoUserAttribute({
      Name: 'family_name',
      Value: this.state.family_name
    }));

    UserPool.signUp(this.state.email, this.state.password, attributeList, null, (err, data) => {
      if (err){
        this.setState({ loading: true})
        this.toastMessage('Error creating account')
      } 
      //If no errors new user is created here
      else{
        window.location.href="/items-page";
      }
      
    });

  }
  upperCheck(str){
    if(str.toLowerCase() === str){
      return false;
    }
    return true;
  }
  lowerCheck(str){
    if(str.toUpperCase() === str){
      return false;
    }
    return true;
  }
  alphCheck(str){
    var regex = /[a-zA-Z]/g;
    return regex.test(str);
  }
  numCheck(str){
    var regex = /\d/g;
    return regex.test(str);
  }
  phoneCheck(num){
    //insert phone number checking here
    var regex = /^(\+1\d{3}\d{3}\d{4}$)/g
    return regex.test(num);
  }
  emailCheck(str){
    var regex = /^[a-zA-Z]+[0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g
    return regex.test(str);
  }
  


  validateUser(){
    if(this.state.name === ""){
      this.toastMessage("Create Account Error: Please Type First Name");
    }else if(this.state.family_name === ""){
      this.toastMessage("Create Account Error: Please Type Last Name");
    }else if(this.state.password.length<8){
      this.toastMessage("Create Account Error: Password Must Be At Least 8 Characters Long");
    }else if(!this.alphCheck(this.state.password)){
      this.toastMessage("Create Account Error: Password Must Contain Letter");
    }else if(!this.upperCheck(this.state.password)){
      this.toastMessage("Create Account Error: Password Must Contain One Upper-Case Letter");
    }else if(!this.lowerCheck(this.state.password)){
      this.toastMessage("Create Account Error: Password Must Contain One Lower-Case Letter");
    }else if(!this.numCheck(this.state.password)){
      this.toastMessage("Create Account Error: Password Must Contain One Number");
    }else if(!this.phoneCheck(this.state.phone_number)){
      this.toastMessage("Create Account Error: Phone Number Must Be At Least 9 Numbers Long");
    }else if(!this.emailCheck(this.state.email)){
      this.toastMessage("Create Account Error: Email must be in the correct format 'Example@Example.Example'");
    }
    else{
      this.submit();
    }

  };

  toastMessage = (message) => {
    this.toast.current.openToast(message);
  };

    render(){
    return (
      <div class="createacct-title">
        { this.state.loading ?
      <div className="loading-container-sign"> <div className="form-load-symbol-sign"/></div>
      : null }
      <div class="createacct-inventor-title">
      <h2>InventorME</h2>
      </div>

      <Link to="/signin-page" style={{ textDecoration: 'none' }}>
          <img src={BackButton} class="backwards" alt="back" />
      </Link> 
      <ToastMessage ref={this.toast}/>

    <p className ="Email2"> Email: </p>
    <input type="text"  input class = "email2" value={this.state.email} onChange={this.setEmail}/>

    <p className = "Fname"> First Name: </p>
    <input type="text"  input class = "first" value={this.state.name} onChange={this.setName}/>

    <p className = "Lname"> Last Name: </p>
    <input type="text"  input class = "last" value={this.state.family_name} onChange={this.setFamilyName}/>

    <p className = "Phone"> Phone Number: </p>
    <input type = "text" input class = "phone" value={this.state.phone_number} onChange={this.setPhone}/>

    <p className = "Password2"> Password: </p>
    <input type="password"  input class = "password2" value={this.state.password} onChange={this.setPassword}/>

    <button className="goto-account" onClick={this.validateUser}>Create Account </button>
    <img src={InventorLogo} class="calogo" alt="" />

</div>     
    
      );
    }
}
export default CreateAcctPage;