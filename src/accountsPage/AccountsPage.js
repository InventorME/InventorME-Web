import React, { Component } from 'react';
import './AccountsPage.css';
import NavBanner from '../navigationBanner/NavBanner.js'
import FormPage from '../components/formPage/FormPage.js';

class AccountsPage extends Component {

render() {
    return (
    <div className="container">
        <NavBanner/>
      <div>
       <FormPage/>
      </div>
    </div>
    );
  }
}

export default AccountsPage;