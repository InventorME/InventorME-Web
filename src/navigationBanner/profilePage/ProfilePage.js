import React, { Component } from 'react';
import './ProfilePage.css';
import { Link } from "react-router-dom";
import ProfileBox from '../../images/profile-box.png'
import BackButton from '../../images/back-button.png'
class ProfilePage extends Component {
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

render() {
    return (
    <div className="profile-container">
      <div class="profile-banner">
        <Link to="/accounts-page" style={{ textDecoration: 'none' }}>
          <img src={BackButton} class="profile-back" alt="back" />
        </Link> 
        <h2>InventorME</h2>
      </div>
      <div  class="profile-box">
        <img style = {this.state.style} src={ProfileBox} alt=""/>
        <h1 class="profile-name">{this.state.response.userFirstName} {this.state.response.userLastName}</h1>
        <h2 class="phone-number">Phone Number</h2>
        <p class="phone-number-value">{this.state.response.userPhone}</p>
        <h2 class="user-email">Email</h2>
        <p class="user-email-value">{this.state.response.userEmail}</p>
        <h2 class="creation">Creation Date</h2>
        <p class="creation-date">{this.state.response.userCreateDate}</p>
        <button class="update-profile" onClick={{}}>UPDATE PROFILE</button>
      </div>
    </div>
    );
  }
}

export default ProfilePage;