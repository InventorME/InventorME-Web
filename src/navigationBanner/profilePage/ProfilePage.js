import React, { Component } from 'react';
import './ProfilePage.css';
import ReactRoundedImage from "react-rounded-image"
import UploadButton from '../../images/upload-button.png'
import PhoneInput from 'react-phone-input-2'
import ToastMessage from '../../components/toastMessage/ToastMessage';
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { AccountContext } from '../../util/Accounts';
import BackButton from '../../images/back-button.png'
import { Link } from "react-router-dom";

class ProfilePage extends Component {
  static contextType = AccountContext
  constructor(props) {
    super(props);
    this.state = { loading: false, profile: true,
      userID: null,
      firstName: '',
      lastName: '',
      userEmail: '',
      userProfilePic: '',
      userPhone: ''
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.hiddenFileInput = React.createRef();
    this.toast = React.createRef();
  }

  componentDidMount() {
    this.setState({ loading: true });
    const { getSession } = this.context;
    getSession()
      .then((data) => { 
        this.setState({ response: data.user })
        this.setState({ firstName: data.name })
        this.setState({ lastName: data.family_name })
        this.setState({ userEmail: data.email })
        this.setState({ userPhone: data.phone_number })
        // this.setState({ userProfilePic: res.userProfilePicURL }) 
        this.setState({ loading: false });       
      })
      .catch(err =>{
        console.log(err);
        this.toastMessage("Error: No user found, please sign in again");
    });
  }
  
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

  phoneOnChange = (event) => {
    this.setState({userPhone: "+" + event});
  }

  onImageChange = async(event) => {
    if (event.target.files && event.target.files[0]) { 
      this.setState({userProfilePic: URL.createObjectURL(event.target.files[0])});    
    }
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
    var regex = /^(\+1\d{3}\d{3}\d{4}$)/g
    return regex.test(num);
  }

  emailCheck(str){
    var regex = /^[a-zA-Z]+[0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g
    return regex.test(str);
  }

  validateUser(){
    if(this.state.firstName === ""){
      this.toastMessage("Error: Please Type First Name");
    } else if(this.state.lastName === ""){
      this.toastMessage("Error: Please Type Last Name");
    } else if(!this.phoneCheck(this.state.userPhone)){
      this.toastMessage("Error: Please Type A Valid Phone Number");
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
    let phone = "+" + this.state.userPhone;
    this.setState({userPhone: phone});
    if(!this.validateUser()){   
      event.preventDefault();
    } else {
      this.setState({ loading: true });
      event.preventDefault();
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
            if (err) {
              console.error(err);
              this.setState({ loading: false });
              this.toastMessage('Error: Failed to save profile.');
            } else {
              this.toastMessage('Saved Successfully! ㋡');
              this.reloadPage();
            }
          });
        });
      
    }
  }
  
  toastMessage = (message) => {
    this.toast.current.openToast(message);
  };

  handleClick = () => {
    this.hiddenFileInput.current.click();
  };

render() {
    return (
      <div>
        { this.state.loading ?
        <div class="load-container"> <div class="load-symbol"/></div>
        : null }
        <div class="profile-banner">
        <Link to="/items-page" style={{ textDecoration: 'none' }}>
          <img src={BackButton} class="profile-back" alt="back" />
        </Link> 
        <h2>InventorME</h2>   
      </div>
      <div className="profile-container">
        <ToastMessage ref={this.toast}/>
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
                <h1 class="profile-name" style={{display: 'inline-flex'}}>
                  <div style={{paddingRight: '1em'}}>{this.state.firstName}</div> 
                  <div>{this.state.lastName}</div>
                </h1>
              </div>
              
              <div style={{display: 'inline-flex', marginTop: '2%', width: '100%', height: '25%'}}>
                <div class ="edit-email-input">
                  <h3 class ="edit-email"> Email: </h3>
                  <p class="user-email-value">{this.state.userEmail}</p>
                </div>
                <div class = "edit-phone-input">
                  <h3 class = "edit-phone"> Phone Number: </h3>
                  <p class="phone-number-value">{this.formatPhoneNumber(this.state.userPhone)}</p>
                </div>
              </div>

              <button class="update-profile" onClick={() => this.toggleForm()}>UPDATE PROFILE</button>
            </div>
            : 
          <form style={{height: '100vh'}}>
            <div style={{display: 'inline-flex', width: '100%', height: '20%'}}>
              <div class="profile-image-container">
              <input type="file" ref={this.hiddenFileInput} onChange={this.onImageChange} style={{display: 'none'}}/>
                <ReactRoundedImage 
                roundedColor="#66A5CC"
                imageWidth="170"
                imageHeight="160"
                roundedSize="1"
                image={this.state.userProfilePic} />
              <img onClick={this.handleClick} src={UploadButton} className="file-upload" alt=""/>
              </div>
            </div>

            <div style={{display: 'inline-flex', width: '100%', height: '20%', marginLeft: '31%', paddingTop: '2em'}}>
              <div class="edit-first-input">
              <p class="edit-first"> First Name: </p>
              <input class="first-input" type="text" onChange={this.firstNameOnChange} value={this.state.firstName} />
              </div>
              <div class="edit-last-input">
              <p class="edit-last"> Last Name: </p>  
              <input type="text" class="last-input" value={this.state.lastName} onChange={this.lastNameOnChange}/>
              </div>
            </div>
            
            <div style={{display: 'inline-flex', width: '100%', height: '22%'}}>
              <div class = "edit-phone-input2">
              <p class = "edit-phone"> Phone Number: </p>
              <PhoneInput country='us' countryCodeEditable={false} withCountryCallingCode={true} class="phone-input"  value={this.state.userPhone} onChange={this.phoneOnChange}/>
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
      </div>
    );
  }
}

export default ProfilePage;