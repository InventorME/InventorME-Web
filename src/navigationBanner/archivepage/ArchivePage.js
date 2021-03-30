import React, { Component } from 'react';
import './ArchivePage.css';
import NavBanner from '../NavBanner.js';
import Table from '../Table.js'
class ArchivePage extends Component {
    

    render() {
      
        return (
            <div>
            <NavBanner/>
            
            <Table/>
        </div>
    
               
               
        )
    }
}
    export default ArchivePage;