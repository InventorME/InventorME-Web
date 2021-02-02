import React, { Component } from 'react';
import './Homepage.css';
import NavBanner from '../navigationBanner/NavBanner.js'

class Homepage extends Component {

render() {
    return (
    <div>
        <NavBanner/>
      <div className="Homepage">
        Homepage
      </div>
    </div>
    );
  }
}

export default Homepage;