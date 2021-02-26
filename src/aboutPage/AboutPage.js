import React, { Component } from 'react';
import './AboutPage.css';
import InventorLogo from '../images/InventorMeLogo.png';
import { Link } from "react-router-dom";
import BackButton from '../images/back-button.png'
class AboutPage extends Component{
    
    render(){
    return (
        <div class="home-title">
        <Link to="/accounts-page" style={{ textDecoration: 'none' }}>
          <img src={BackButton} class="profile-back" alt="back" />
        </Link> 
        <img src={InventorLogo} class="center" alt="" />
        <p className = 'primary'>InventorMe is a new, revolutionary management app that prioritizes and streamlines efficiency for
        digital photos, documents, and other items that you need to oversee.
        You now have the power to manage all of your belongings with just the tip of your fingers.  </p>
        </div>
      );
    }
}
export default AboutPage;