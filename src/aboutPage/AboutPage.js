import React, { Component } from 'react';
import './AboutPage.css';
import InventorLogo from '../images/InventorMeLogo.png';
import {Link} from "react-router-dom";
class AboutPage extends Component{
    
    render(){
    return (
        <div class="home-title">
        <div class="home-inventor-title"></div>
        <img src={InventorLogo} class="center" alt="" />
        <p className = 'primary'>InventorMe is a new, revolutionary management app that prioritizes and streamlines efficiency for
        digital photos, documents, and other items that you need to oversee.
        You now have the power to manage all of your belongings with just the tip of your fingers.  </p>
        
        </div>
    
      );
    }
}
export default AboutPage;