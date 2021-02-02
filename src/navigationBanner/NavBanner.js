import React, { Component } from 'react';
import InventorLogo from '../images/InventorLogo.png'
import hamburgerIcon from '../images/hamburgerIcon.png'
import './NavBanner.css';
import OverlayMenu from 'react-overlay-menu';

class NavBanner extends Component {
    
    constructor(props) {
       super(props);
       this.state = { isOpen: false };
       this.toggleMenu = this.toggleMenu.bind(this);
    }
    
    toggleMenu() {
       this.setState({ isOpen: !this.state.isOpen });
    }
      
    render(){
    return (
        <div>
        <div className="NavBanner">
            <div class="menu">
                <img class="menu-icon" src={hamburgerIcon} alt="Menu" onClick={this.toggleMenu}/>
            </div>
            <div class="title">
                <div class="inventor-title">InventorME</div>
                <img src={InventorLogo} class="inventor-logo" alt="" />
            </div>
            <div class="profile">profile</div>
        </div>
        <OverlayMenu 
          open={this.state.isOpen} 
          onClose={this.toggleMenu}>
            <div class="side-menu">
                <h1 class="menu-text">Nav Item</h1>
                <h1 class="menu-text">Nav Item</h1>
                <h1 class="menu-text">Nav Item</h1>
                <h1 class="menu-text">Nav Item</h1>
                <h1 class="menu-text">Nav Item</h1>
            </div>
        </OverlayMenu>
       </div>
    );
   }
}

export default NavBanner;