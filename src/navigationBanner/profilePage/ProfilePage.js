import React, { Component } from 'react';
import './ProfilePage.css';
import { Link } from "react-router-dom";

class ProfilePage extends Component {

render() {
    return (
    <div className="container">
        <Link to="/accounts-page" style={{ textDecoration: 'none' }}>
            back
        </Link>
      <div>
        Profile page
      </div>
    </div>
    );
  }
}

export default ProfilePage;