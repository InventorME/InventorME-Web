import React, { Component } from 'react';
import './ProfilePage.css';
import { Link } from "react-router-dom";
import BackButton from '../../images/back-button.png'
import ReactRoundedImage from "react-rounded-image"
import UploadButton from '../../images/upload-button.png'
import Input, { isPossiblePhoneNumber } from 'react-phone-number-input/input'
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { AccountContext } from '../../util/Accounts';

class ProfilePage extends Component {
  static contextType = AccountContext
  constructor(props) {
    super(props);
    this.state = { response: '', disabled: false, loading: false, toastMessage: '', profile: true,
      userID: null,
      firstName: '',
      lastName: '',
      userEmail: '',
      userProfilePic: '',
      userPhone: '',
      toastStyle : {
        width: '0%',
        height: '12%'
    }
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.hiddenFileInput = React.createRef();
  }

  componentDidMount() {
    const { getSession } = this.context;
    getSession()
      .then((data) => { 
        let formatPhone = "+" + data.phoneNumber;
        this.setState({ response: data.user })
        this.setState({ firstName: data.name })
        this.setState({ lastName: data.family_name })
        this.setState({ userEmail: data.email })
        this.setState({ userPhone: data.phone_number })
        // this.setState({ userProfilePic: res.userProfilePicURL })
        console.log("Data:",data);
        console.log("Name:",data.name);
        this.setState({ response: ''})
        
      })
      .catch(err =>{
        console.log(err);
        alert("Error: No user found, please sign in again");
    });
  }
  

  getProfile = async () => {
    const response = await fetch('/api/user');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
  }

  toggleForm() {
    this.setState({ profile: !this.state.profile });
  }

  firstNameOnChange = (event) => {
    this.setState({firstName: event.target.value});
  }

  lastNameOnChange = (event) => {
    this.setState({lastName: event.target.value});
  }

  emailOnChange = (event) => {
    this.setState({userEmail: event.target.value});
  }

  phoneOnChange = (event) => {
    this.setState({userPhone: event});
  }

  onImageChange = async(event) => {
    if (event.target.files && event.target.files[0]) { 
      this.setState({userProfilePic: URL.createObjectURL(event.target.files[0])});    
    }
  }



  // resizeFile = (file) => new Promise(resolve => {
  //   Resizer.imageFileResizer(file, 170, 160, 'PNG', 100, 0,
  //   uri => {
  //     resolve(uri); //Set uri state
  //   },
  //   'base64'
  //   );
  // });

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
    if(this.state.firstName === ""){
      alert("Create Account Error: Please Type First Name");
    }else if(this.state.lastName === ""){
      alert("Create Account Error: Please Type Last Name");
    // }else if(!this.phoneCheck(this.state.phoneNumber)){
    //   alert("Create Account Error: Phone Number Must Be At Least 9 Numbers Long");
    }else if(!this.emailCheck(this.state.userEmail)){
      alert("Create Account Error: Email must be in the correct format 'Example@Example.Example'");
    }
    else{
      return true;
    }
    return false;
  };
  

  setToastStyle(style) {
    this.setState({ toastStyle: style });
    clearInterval(this.start);
  }

  closeToast = () => {
    this.start = setInterval(() => {
      const toastStyle = { width : '0%', height: '12%' };
      this.setToastStyle(toastStyle);
    }, 3000); 
  }

  reloadPage = () => {
    setInterval(() => {
      window.location.reload(true)
    }, 2000); 
  }

  saveProfile=(event) => {
    const { getSession } = this.context;
    
    if(!isPossiblePhoneNumber(this.state.userPhone)){   
      event.preventDefault();
      const toastStyle = { width : '17%', height: '12%' };
      this.setState({ toastStyle, toastMessage: 'Error: Failed to save ☹' });
      this.closeToast();
    } else {
      event.preventDefault();
      if(this.validateUser()){
        getSession().then(({ user }) => {
          const attributes = [];
          attributes.push(new CognitoUserAttribute({
            Name: 'name',
            Value: this.state.firstName
          }));
          attributes.push(new CognitoUserAttribute({
            Name: 'phone_number',
            Value: this.state.userPhone
          }));
          attributes.push(new CognitoUserAttribute({
            Name: 'family_name',
            Value: this.state.lastName
          }));
    
          user.updateAttributes(attributes, (err, result) => {
            if (err) console.error(err);
            console.log(result);
          });
        });
      }
      const toastStyle = { width : '17%', height: '12%' };
      this.setState({ toastStyle, loading: true, disabled: true, toastMessage: 'Saved Successfully! ㋡' });
      this.reloadPage();
    }
  }
  
  handleClick = () => {
    this.hiddenFileInput.current.click();
  };

render() {
    return (
    <div className="profile-container">
      { this.state.loading ?
      <div class="load-container"> <div class="load-symbol"/></div>
      : null }
      <div class="profile-banner">
        <Link to="/accounts-page" style={{ textDecoration: 'none' }}>
          <img src={BackButton} class="profile-back" alt="back" />
        </Link> 
        <h2>InventorME</h2>   
      </div>
      <div class="toast" style={this.state.toastStyle}>
        <p class="toast-message">{this.state.toastMessage}</p>
      </div>
        { this.state.profile ?
          <div>
            <div style={{display: 'block', width: '100%', height: '20%'}}>
              <div class="profile-image-container">
               <ReactRoundedImage 
               roundedColor="#66A5CC"
               imageWidth="170"
               imageHeight="160"
               roundedSize="1"
               image={this.state.userProfilePic} />
              </div>
              <h1 class="profile-name">{this.state.userFirstName} {this.state.userLastName}</h1>
            </div>
            
            <div style={{display: 'inline-flex', width: '100%', height: '25%'}}>
               <div class ="edit-email-input">
                <h3 class ="edit-email"> Email: </h3>
                <p class="user-email-value">{this.state.userEmail}</p>
               </div>
               <div class = "edit-phone-input">
                <h3 class = "edit-phone"> Phone Number: </h3>
                <p class="phone-number-value">{this.formatPhoneNumber(this.state.userPhone)}</p>
               </div>
            </div>

            <div style={{display: 'inline-flex', width: '100%', height: '25%'}} class="info-container">  
              <div style={{display: 'inline-flex', width: '29%'}}>
              <h2 class="creation">Creation Date: </h2>
              <p class="creation-date">{this.state.response.userCreateDate}</p>
              </div>
              <h2 class="user-id">UserID: </h2>
              <p class="creation-date">{this.state.userID}</p>
            </div>
             <button class="update-profile" onClick={() => this.toggleForm()}>UPDATE PROFILE</button>
           </div>
          : 
        <form style={{height: '100vh'}}>
           <div style={{display: 'inline-flex', width: '100%', height: '20%'}}>
            <div class="profile-image-container">
             <input disabled={this.state.disabled} type="file" ref={this.hiddenFileInput} onChange={this.onImageChange} style={{display: 'none'}}/>
               <ReactRoundedImage 
               roundedColor="#66A5CC"
               imageWidth="170"
               imageHeight="160"
               roundedSize="1"
               image={this.state.userProfilePic} />
             <img onClick={this.handleClick} src={UploadButton} className="file-upload" alt=""/>
            </div>
           </div>

           <div style={{display: 'inline-flex', width: '100%', height: '20%'}}>
            <div class="edit-first-input">
            <p class="edit-first"> First Name: </p>
            <input disabled={this.state.disabled} class="first-input" type="text" onChange={this.firstNameOnChange} value={this.state.firstName} />
            </div>
            <div class="edit-last-input">
            <p class="edit-last"> Last Name: </p>  
            <input disabled={this.state.disabled} type="text" class="last-input" value={this.state.lastName} onChange={this.lastNameOnChange}/>
            </div>
           </div>
          
           <div style={{display: 'inline-flex', width: '100%', height: '25%'}}>
            <div class ="edit-email-input">
              <p class ="edit-email"> Email: </p>
              <input disabled={this.state.disabled} type="text" value={this.state.userEmail} class="email-input" onChange={this.emailOnChange}/>
            </div>
            <div class = "edit-phone-input">
            <p class = "edit-phone"> Phone Number: </p>
            <Input disabled={this.state.disabled} country="US" class="phone-input"  value={this.state.userPhone} onChange={this.phoneOnChange}/>
            </div>
           </div>
          
          {/* <p class = "Password2"> Password: </p>
          <input type="password"  input class = "password2" onChange={this.handleChange}/> */}
          <div style={{display: 'inline-flex', width: '100%', height: '5%'}}>
             <button type='submit' class="save-profile" onClick={this.saveProfile}>SAVE</button>
             <button class="cancel-profile" onClick={() => window.location.reload(true)}>CANCEL</button>
          </div>
        </form> 
          }
    </div>
    );
  }
}

export default ProfilePage;