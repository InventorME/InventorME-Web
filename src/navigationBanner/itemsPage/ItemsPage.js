import React, { Component } from 'react';
import './ItemsPage.css';
import NavBanner from '../NavBanner.js';
import ItemsTable from '../ItemsTable.js'
class ItemsPage extends Component {

    render() {
        return (
          <div>
            <NavBanner/>
            <div style={{overflowY: 'scroll', height: '100vh'}}>
            <ItemsTable/>
            </div>
          </div>          
        )
    }
}
export default ItemsPage;