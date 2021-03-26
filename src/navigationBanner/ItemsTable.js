import React, { Component } from 'react';
import upload from '../images/upload-button.png'

import './ItemsTable.css'



class ItemsTable extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            
    
            Current_Items:[
                {Name:"Inventory", Collections: "Hardware", Notes: "Apple",Image:<img src={upload} width="40" height="30"/>  },
                {Name:"InventorME",  Collections: "Software", Notes: "Microsoft", Image:<img src={upload} width="40" height="30"/> }
            ]
        }
    }
    renderTableData(){
    
        return this.state.Current_Items.map((Current_Item,index) => {
            
            const {Name,Collections,Notes,Image} = Current_Item
            return(
                <tr key = {Name}>
                <td>{Name}</td> 
                <td>{Collections}</td>
                <td>{Notes}</td>
                <td>{Image}</td>   
                </tr>
            )
        })
    
    }
    
    getJSON = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.open('GET',url,true);
        xhr.responseType = 'json';
        xhr.oonload = function(){
            var status = xhr.status;
            if(status === 200){
                callback(null,xhr.response);
            }else{
                callback(status,xhr.response)
            }
        };
        xhr.send();
    };
    
    renderTableHeader(){
        let header = Object.keys(this.state.Current_Items[0])
        return header.map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    render() {
      
        return (
        <div>
                <h1 id = 'Title'>Current Items</h1>
                <table id= 'Current_Items'>
                <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
            
                </tbody>
                </table>
               
                </div>
        )
    }
}
    export default ItemsTable;