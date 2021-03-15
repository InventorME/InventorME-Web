import React, { Component } from 'react';
import InventorLogo from '../images/InventorLogo.png'
import hamburgerIcon from '../images/hamburgerIcon.png'
import './NavBanner.css';
import OverlayMenu from 'react-overlay-menu';
import { Link } from "react-router-dom";
import FormPage from '../components/formPage/FormPage';

class NavBanner extends Component {

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
                    <div className="add-item-button">Add Item</div>
                </div>
                <div className="profile" onClick={this.showProfileMenu}>
                    <img style={{borderRadius: "12em", height: "2.5em", width: "2.5em", 'paddingTop': '0.4em'}} alt="" src={this.state.response.userProfilePicURL} />
                    <p className="firstName-profile"> {this.state.response.userFirstName}</p>
                </div>
                </div>
            <OverlayMenu
            open={this.state.isOpen}
            onClose={this.toggleMenu}>
                <div className="side-menu">
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 className="menu-text">Collections</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 className="menu-text">Folders</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 className="menu-text">Archive</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 className="menu-text">Date</h1></div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }}>
                    <div><h1 className="menu-text">Settings</h1></div>
                    </Link>
                    <Link to="/about-page" style={{ textDecoration: 'none' }}>
                    <div><h1 className="menu-text">About</h1></div>
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
                    <Link style={{ textDecoration: 'none' }}>
                    <div><p>Logout</p></div>
                    </Link>
                </div>
          </div>
          <div>
            <FormPage/>
          </div>
        </div>
        );
    }
}

export default NavBanner;