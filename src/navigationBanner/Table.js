import React, { Component } from 'react';
import archived from '../images/archived.png'

import './Table.css'



class Table extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            
    
            Archived_Items:[
                {Name:"Inventory", Collections: "Electronics", Notes: "Los Angeles",Archived:<img src={archived} width="40" height="20"/>  },
                {Name:"InventorME",  Collections: "Internet", Notes: "New York City", Archived:<img src={archived} width="40" height="20"/> }
            ]
        }
    }
    renderTableData(){
    
        return this.state.Archived_Items.map((Archived_Item,index) => {
            
            const {Name,Collections,Notes,Archived} = Archived_Item
            return(
                <tr key = {Name}>
                <td>{Name}</td> 
                <td>{Collections}</td>
                <td>{Notes}</td>
                <td>{Archived}</td>   
                </tr>
            )
        })
    
    }
    
    renderTableHeader(){
        let header = Object.keys(this.state.Archived_Items[0])
        return header.map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    render() {
        return (
            <div>
                <h1 id = 'title'>Archived Items</h1>
                <table id= 'Archived_Items'>
                <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
                </tbody>
                </table>
            </div>
        )
    }
}
    export default Table;