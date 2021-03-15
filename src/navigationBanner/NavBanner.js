import React, { Component } from 'react';
import InventorLogo from '../images/InventorLogo.png'
import hamburgerIcon from '../images/hamburgerIcon.png'
import './NavBanner.css';
import OverlayMenu from 'react-overlay-menu';
import { Link } from "react-router-dom";
import { AccountContext } from '../util/Accounts';

class NavBanner extends Component {
    static contextType = AccountContext
    constructor(props) {
       super(props);
       this.state = { response: '', isOpen: false, showProfileMenu: false, show: true, style : {
        width : 150,
        height: 0,
    }};
       this.toggleMenu = this.toggleMenu.bind(this);
       this.profileMenu = React.createRef();
       this.handleClickOutside = this.handleClickOutside.bind(this);
       this.showProfileMenu = this.showProfileMenu.bind(this);
       this.closeProfileMenu = this.closeProfileMenu.bind(this);
       this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.getProfile().then(res => {
            this.setState({ response: res })
        }).catch(err => console.log(err));
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

    getProfile = async () => {
        const response = await fetch('/api/user');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

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
    logoutUser(){
        const { logout } = this.context;
        logout();
        window.location.href="/signin-page";
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
                <div class="profile" onClick={this.showProfileMenu}>
                    <img style={{borderRadius: "12em", height: "2.5em", width: "2.5em", 'paddingTop': '0.4em'}} alt="" src={this.state.response.userProfilePicURL} />
                    <p class="firstName-profile"> {this.state.response.userFirstName}</p>
                </div>
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
                    <Link style={{ textDecoration: 'none' }} onClick={this.logoutUser}>
                    <div><p>Logout</p></div>
                    </Link>
                </div>
          </div>
        </div>
        );
    }
}

export default NavBanner;