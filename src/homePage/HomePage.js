import React, { Component } from 'react';
import './HomePage.css';
import InventorLogo from '../images/InventorMeLogo.png';


class HomePage extends Component{
    handleClick(){
        var win =window.open('./signinPage/SignInPage');
        win.focus();
    }
    render(){
    return (
        <div class="title">
        <div class="inventor-title"></div>
        <img src={InventorLogo} class="center" alt="" />
        <p className = 'primary'>InventorMe is a new, revolutionary management app that prioritizes and streamlines efficieny for
        digital photos, documents, and other items that you need to oversee.
        You now have the power to manage all of your belongings with just the tip of your fingers.  </p>
        <p className = 'secondary'> Join the Revolution today </p>
        <button onClick={this.handleClick} className = 'click'>SignIn</button>
        </div>
        

        
      );
    }
} 
      





    
        
               





        


export default HomePage;