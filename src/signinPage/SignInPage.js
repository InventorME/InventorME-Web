import React, { Component } from 'react';
import './SignInPage.css';
import ProfileBox from '../images/profile-box.png';
import { AccountContext } from '../util/Accounts';
import ToastMessage from '../components/toastMessage/ToastMessage';



class SignInPage extends Component{
  static contextType = AccountContext
    constructor(props) {
        super(props);
        this.state = { response: '', post: '', email: '', password: '', loading: false };
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.submit = this.submit.bind(this);
        this.toast = React.createRef();
      }
      
      componentDidMount() {
        const { getSession } = this.context;
        getSession()
        .then(session => {
          console.log('Signed In:', "user found");
          console.log('Session:', session);
          window.location.href="/items-page";
        }).catch(err => {
          console.log('err:', "no user found");
        });
      }

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
          this.toastMessage("Error: Please Type Email");
        else if(this.state.password === "")
          this.toastMessage("Error: Please Type Password");
        else
          this.submit();
      };

      submit(event){
        this.setState({ loading: true})
        const { authenticate } = this.context;
        authenticate(this.state.email, this.state.password)
          .then(data =>{
            window.location.href="/items-page";
          })
          .catch(err =>{
            this.setState({ loading: false})
            this.toastMessage('Error: Password or Email is incorrect');
          })
      };

      toastMessage = (message) => {
        this.toast.current.openToast(message);
      };


   render(){
       return(
    <div className="signin-title">
      { this.state.loading ?
      <div className="loading-container-sign"> <div className="form-load-symbol-sign"/></div>
      : null }
    <div className="signin-inventor-title">
    <h2>InventorME</h2>
    </div>
    <ToastMessage ref={this.toast}/>
    <div  className="login-box">
    <img className = "lbox"img style = {this.state.style} src={ProfileBox} alt=""/>
    <p className ="Password"> Password: </p>
    <input type="password"
      input className = "password" 
      value={this.state.password} 
      onChange={this.setPassword}/>
    <p className ="Email"> Email: </p>
    <input type="text" 
     input className = "email" 
     value={this.state.email} 
     onChange={this.setEmail}/>
        <button className="login-account" onClick={this.validateUser}>Log in</button>
        <p className ="or-message"> Don't have an account?</p>
        <button className="create-account" onClick={event =>  window.location.href="/createacct-page"}>Create an Account</button>
      </div>
      </div>      
       );
  }
}
   
    
export default SignInPage;