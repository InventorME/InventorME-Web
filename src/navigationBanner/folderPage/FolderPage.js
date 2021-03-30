import React, { Component } from 'react'
import './FolderPage.css'
import NavBanner from '../NavBanner.js'
import FolderTable from '../FolderTable.js'
class FolderPage extends Component {
    render() {
        return (
        <div>
            <NavBanner/>
            <div>
            <div style={{overflowY: 'scroll', height: '100vh'}}>
            <FolderTable/>
            </div>
            </div>
          
        </div>
        
        
        );
      }
    }
 
  

export default FolderPage;