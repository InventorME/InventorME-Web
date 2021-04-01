import React, { Component } from 'react'
import './StatsPage.css'
import NavBanner from '../NavBanner.js'
import StatsTable from '../StatsTable.js'

class StatsPage extends Component {
    render() {
        return (
        <div>
            <NavBanner/>
            <div style={{marginTop: '8%', marginLeft: '13%'}}>
                <div>
                <StatsTable/>
                </div>
            </div>
        </div>        
        );
      }
    }
 
  

export default StatsPage;