import React, { Component } from 'react';
import './AccountsPage.css';
import NavBanner from '../navigationBanner/NavBanner.js'

class AccountsPage extends Component {

render() {
    return (
    <div className="container">
        <NavBanner/>
      <div>
        Accounts page
      </div>
    </div>
    );
  }
}

export default AccountsPage;