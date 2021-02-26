import React, { Component } from 'react';
import InventorLogo from '../images/InventorLogo.png'
import hamburgerIcon from '../images/hamburgerIcon.png'
import './NavBanner.css';
import OverlayMenu from 'react-overlay-menu';
import { Link } from "react-router-dom";

class NavBanner extends Component {

    constructor(props) {
       super(props);
       this.state = { isOpen: false, showProfileMenu: false, show: true, style : {
        width : 150,
        height: 0,
    }};
       this.toggleMenu = this.toggleMenu.bind(this);
       this.profileMenu = React.createRef();
       this.handleClickOutside = this.handleClickOutside.bind(this);
       this.showProfileMenu = this.showProfileMenu.bind(this);
       this.closeProfileMenu = this.closeProfileMenu.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate = () => {     
        const { callChildReset } = this.props;
        if (callChildReset > 0) {
            this.showProfileMenu()
        }
    }

    handleClickOutside(event) {
        if (this.profileMenu && !this.profileMenu.current.contains(event.target)) {
            this.closeProfileMenu();
        }
    }

    toggleMenu() {
       this.setState({ isOpen: !this.state.isOpen });
    }

    showProfileMenu() {
        const style = { width : 150, height: 140 };
        this.setState({ style });
    }

    closeProfileMenu() {
        const style = { width : 150, height: 0 };
        this.setState({ style });
    }

    render() {
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
                <div class="profile" onClick={this.showProfileMenu}>Profile</div>
            </div>
            <OverlayMenu
            open={this.state.isOpen} 
            onClose={this.toggleMenu}>
                <div class="side-menu">
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Categories</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Photos</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Completed</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Date</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Settings</h1></div>
                    </Link>
                    <Link to="/about-page" style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">About</h1></div>
                    </Link>
                </div>
            </OverlayMenu>            
            <div>
               <div ref={this.profileMenu}
                class = "overlay"
                style = {this.state.style}>
                    <Link to="/profile-page" style={{ textDecoration: 'none' }}>
                    <div><p>Profile</p></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><p>Logout</p></div>
                    </Link>
                </div>
          </div>
        </div>
        );
    }
}

export default NavBanner;