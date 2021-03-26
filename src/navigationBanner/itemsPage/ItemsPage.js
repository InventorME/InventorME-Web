import React, { Component } from 'react';
import './ItemsPage.css';
import NavBanner from '../NavBanner.js';
import ItemsTable from '../ItemsTable.js'
class ItemsPage extends Component {
    

    render() {
      
        return (
            <div>
            <NavBanner/>
            
            <ItemsTable/>
        </div>
    
               
               
        )
    }
}
    export default ItemsPage;