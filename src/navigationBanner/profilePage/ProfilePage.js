import React, { Component } from 'react';
import './ProfilePage.css';
import { Link } from "react-router-dom";
import BackButton from '../../images/back-button.png'
import ReactRoundedImage from "react-rounded-image"
import UploadButton from '../../images/upload-button.png'
import Input, { isPossiblePhoneNumber } from 'react-phone-number-input/input'

class ProfilePage extends Component {
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
    this.hiddenFileInput = React.createRef();
  }

  componentDidMount() {
    this.getProfile()
      .then(res => { 
        let formatPhone = "+" + res.userPhone;
        this.setState({ response: res })
        this.setState({ firstName: res.userFirstName })
        this.setState({ lastName: res.userLastName })
        this.setState({ userEmail: res.userEmail })
        this.setState({ userPhone: formatPhone })
        this.setState({ userProfilePic: res.userProfilePicURL })
      })
      .catch(err => console.log(err));
  }
  
  getProfile = async () => {
    const response = await fetch('/api/profile');
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
    if(!isPossiblePhoneNumber(this.state.userPhone)){   
      event.preventDefault();
      const toastStyle = { width : '17%', height: '12%' };
      this.setState({ toastStyle, toastMessage: 'Error: Failed to save ☹' });
      this.closeToast();
    } else {
      const reqBody = {
        userID: this.state.userID,
        userFirstName: this.state.firstName,
        userLastName: this.state.lastName,
        userEmail: this.state.userEmail,
        userPhone: this.state.userPhone,
        userProfilePicURL: this.state.userProfilePic
      };
      event.preventDefault();
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
              <h1 class="profile-name">{this.state.response.userFirstName} {this.state.response.userLastName}</h1>
            </div>
            
            <div style={{display: 'inline-flex', width: '100%', height: '25%'}}>
               <div class ="edit-email-input">
                <h3 class ="edit-email"> Email: </h3>
                <p class="user-email-value">{this.state.response.userEmail}</p>
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
              <p class="creation-date">{this.state.response.userID}</p>
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
            <input disabled={this.state.disabled} type="text" class="last-input"value={this.state.lastName} onChange={this.lastNameOnChange}/>
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