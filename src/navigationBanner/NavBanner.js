import React, { Component } from 'react';
import InventorLogo from '../images/InventorLogo.png'
import hamburgerIcon from '../images/hamburgerIcon.png'
import './NavBanner.css';
import OverlayMenu from 'react-overlay-menu';
import { Link } from "react-router-dom";
import FormPage from '../components/formPage/FormPage';
import { AccountContext } from '../util/Accounts';

class NavBanner extends Component {
    static contextType = AccountContext
    constructor(props) {
       super(props);
       this.state = { response: '', isOpen: false, showItemMenu: false, showProfileMenu: false, show: true, 
       firstName: '',
       style : {
        width : 150,
        height: 0,
    }};
       this.toggleMenu = this.toggleMenu.bind(this);
       this.toggleItemMenu = this.toggleItemMenu.bind(this);
       this.profileMenu = React.createRef();
       this.handleClickOutside = this.handleClickOutside.bind(this);
       this.showProfileMenu = this.showProfileMenu.bind(this);
       this.closeProfileMenu = this.closeProfileMenu.bind(this);
       this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        const { getSession } = this.context;
        getSession()
          .then((data) => {
            this.setState({ firstName: data.name })
            // this.setState({ userProfilePic: res.userProfilePicURL })        
          })
          .catch(err =>{
            console.log(err);
            this.toastMessage("Error: No user found, please sign in again");
        });
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

    toggleItemMenu() {
        this.setState({ showItemMenu: !this.state.showItemMenu });
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
                <div className="menu">
                    <img className="menu-icon" src={hamburgerIcon} alt="Menu" onClick={this.toggleMenu}/>
                </div>
                <div className="title">
                    <div className="inventor-title">InventorME</div>
                    <img src={InventorLogo} className="inventor-logo" alt="" />
                </div>
                <div style={{backgroundColor: 'white', borderRadius: '1em', textAlign: 'center', marginTop: '2em', cursor: 'pointer', fontSize: '0.6em', height: '3em', width: '7em'}}>
                    <div className="add-item-button" onClick={() => this.toggleItemMenu()}>Add Item</div>
                </div>
                <div className="profile" onClick={this.showProfileMenu}>
                    <img style={{borderRadius: "12em", height: "2.5em", width: "2.5em", 'paddingTop': '0.4em'}} alt="" src={this.state.response.userProfilePicURL} />
                    <p className="firstName-profile"> {this.state.firstName}</p>
                </div>
                </div>
            <OverlayMenu
            open={this.state.isOpen}
            onClose={this.toggleMenu}>
                <div class="side-menu">
                    <Link to = "/items-page"style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Items</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Collections</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Folders</h1></div>
                    </Link>
                    <Link to ="/archivepage" style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Archive</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Stats</h1></div>
                    </Link>
                    <Link to="/about-page" style={{ textDecoration: 'none' }}>
                    <div><h1 class="menu-text">Profile</h1></div>
                    </Link>
                </div>
            </OverlayMenu>            
            <div>
               <div ref={this.profileMenu}
                className = "overlay"
                style = {this.state.style}>
                    <Link to="/profile-page" style={{ textDecoration: 'none' }}>
                    <div><p>Profile</p></div>
                    </Link>
                    <div onClick={this.logoutUser} style={{cursor: 'pointer'}}>
                        <p>Logout</p>
                    </div>
                </div>
          </div>
          <div>
            { this.state.showItemMenu ?
            <FormPage toggleItemMenu = {this.toggleItemMenu}/> : null }
          </div>
        </div>
        );
    }
}

export default NavBanner;