import React, { Component } from 'react';
import './ItemsPage.css';
import NavBanner from '../NavBanner.js'

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { response: '' };
 }

render() {
    return (
    <div>
      <NavBanner/>
      <div className="acct-container">
        <div>yooo</div>
      </div>
    </div>
    );
  }
}

export default ItemsPage;