import React, { Component } from 'react';
import './CreateAcctPage.css';
import InventorLogo from '../images/InventorMeLogo.png';
import { BrowserRouter, Route, Switch ,Link} from "react-router-dom";
class CreateAcctPage extends Component{
    
    render(){
    return (
        <div class="createacct-title">
        <div class="createacct-inventor-title"></div>
        <img src={InventorLogo} class="center" alt="" />
        <p className = 'p'>this is acct page </p>
        
        </div>
    
      );
    }
}
export default CreateAcctPage;