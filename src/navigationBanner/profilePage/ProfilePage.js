import React, { Component } from 'react';
import './ProfilePage.css';
import { Link } from "react-router-dom";
import BackButton from '../../images/back-button.png'
import ReactRoundedImage from "react-rounded-image"
import UploadButton from '../../images/upload-button.png'
import Input, { isPossiblePhoneNumber } from 'react-phone-number-input/input'
import ToastMessage from '../../components/toastMessage/ToastMessage';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { response: '', loading: false, profile: true,
      userID: null,
      firstName: '',
      lastName: '',
      userEmail: '',
      userProfilePic: '',
      userPhone: ''
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.hiddenFileInput = React.createRef();
    this.toast = React.createRef();
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

  reloadPage = () => {
    setInterval(() => {
      window.location.reload(true)
    }, 2000); 
  }

  saveProfile=(event) => {
    if(!isPossiblePhoneNumber(this.state.userPhone)){   
      event.preventDefault();
      this.toastMessage('Error: Failed to save ☹');
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
      this.toastMessage('Saved Successfully! ㋡');
      this.setState({ loading: true });
      this.reloadPage();
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
    <div className="profile-container">
      { this.state.loading ?
      <div className="load-container"> <div className="load-symbol"/></div>
      : null }
      <div className="profile-banner">
        <Link to="/accounts-page" style={{ textDecoration: 'none' }}>
          <img src={BackButton} className="profile-back" alt="back" />
        </Link> 
        <h2>InventorME</h2>   
      </div>
      <ToastMessage ref={this.toast}/>
        { this.state.profile ?
          <div>
            <div style={{display: 'block', width: '100%', height: '20%'}}>
              <div className="profile-image-container">
               <ReactRoundedImage 
               roundedColor="#66A5CC"
               imageWidth="170"
               imageHeight="160"
               roundedSize="1"
               image={this.state.userProfilePic} />
              </div>
              <h1 className="profile-name">{this.state.response.userFirstName} {this.state.response.userLastName}</h1>
            </div>
            
            <div style={{display: 'inline-flex', width: '100%', height: '25%'}}>
               <div className ="edit-email-input">
                <h3 className ="edit-email"> Email: </h3>
                <p className="user-email-value">{this.state.response.userEmail}</p>
               </div>
               <div className = "edit-phone-input">
                <h3 className = "edit-phone"> Phone Number: </h3>
                <p className="phone-number-value">{this.formatPhoneNumber(this.state.userPhone)}</p>
               </div>
            </div>

            <div style={{display: 'inline-flex', width: '100%', height: '25%'}} className="info-container">  
              <div style={{display: 'inline-flex', width: '29%'}}>
              <h2 className="creation">Creation Date: </h2>
              <p className="creation-date">{this.state.response.userCreateDate}</p>
              </div>
              <h2 className="user-id">UserID: </h2>
              <p className="creation-date">{this.state.response.userID}</p>
            </div>
             <button className="update-profile" onClick={() => this.toggleForm()}>UPDATE PROFILE</button>
           </div>
          : 
        <form style={{height: '100vh'}}>
           <div style={{display: 'inline-flex', width: '100%', height: '20%'}}>
            <div className="profile-image-container">
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

           <div style={{display: 'inline-flex', width: '100%', height: '20%'}}>
            <div className="edit-first-input">
            <p className="edit-first"> First Name: </p>
            <input className="first-input" type="text" onChange={this.firstNameOnChange} value={this.state.firstName} />
            </div>
            <div className="edit-last-input">
            <p className="edit-last"> Last Name: </p>  
            <input type="text" className="last-input" value={this.state.lastName} onChange={this.lastNameOnChange}/>
            </div>
           </div>
          
           <div style={{display: 'inline-flex', width: '100%', height: '25%'}}>
            <div className ="edit-email-input">
              <p className ="edit-email"> Email: </p>
              <input type="text" value={this.state.userEmail} className="email-input" onChange={this.emailOnChange}/>
            </div>
            <div className = "edit-phone-input">
            <p className = "edit-phone"> Phone Number: </p>
            <Input country="US" className="phone-input"  value={this.state.userPhone} onChange={this.phoneOnChange}/>
            </div>
           </div>  
         <div style={{display: 'inline-flex', width: '100%', height: '5%'}}>
             <button type='submit' className="save-profile" onClick={this.saveProfile}>SAVE</button>
             <button className="cancel-profile" onClick={() => window.location.reload(true)}>CANCEL</button>
          </div>
        </form> 
          }
    </div>
    );
  }
}

export default ProfilePage;