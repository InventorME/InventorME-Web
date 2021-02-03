import React, { Component } from 'react';
import './AccountsPage.css';
import NavBanner from '../navigationBanner/NavBanner.js'

class AccountsPage extends Component {

render() {
    return (
    <div>
        <NavBanner/>
      <div className="Homepage">
        Accounts page
      </div>
    </div>
    );
  }
}

export default AccountsPage;