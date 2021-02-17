import React, { Component } from 'react';
import './HomePage.css';
import InventorLogo from '../images/InventorMeLogo.png';
import {Link} from "react-router-dom";
class HomePage extends Component{
    
    render(){
    return (
        <div class="home-title">
        <div class="home-inventor-title"></div>
        <img src={InventorLogo} class="center" alt="" />
        <p className = 'primary'>InventorMe is a new, revolutionary management app that prioritizes and streamlines efficiency for
        digital photos, documents, and other items that you need to oversee.
        You now have the power to manage all of your belongings with just the tip of your fingers.  </p>
        <p className = 'secondary'> Join the Revolution today </p>
        <Link to= "/signin-page" className = 'click'>Sign In</Link>
        </div>
    
      );
    }
}
export default HomePage;