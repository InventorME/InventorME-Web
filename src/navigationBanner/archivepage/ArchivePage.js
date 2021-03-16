import React, { Component } from 'react';
import './ArchivePage.css';
import NavBanner from '../NavBanner.js'
import InventorLogo from '../../images/InventorMeLogo.png';
import BackButton from '../../images/back-button.png';
class ArchivePage extends Component {
    
constructor(props){
    super(props)
    this.state = {
        

        Archived_Items:[
            {Id_Num: 1001,Name:"Inventory", Picture:<img src={InventorLogo} width="90" height="80"/>, Category: "Electronics", Item_Creation_Date: "12-12-2021"},
            {Id_Num: 2002,Name:"InventorME", Picture:<img src={BackButton} width="90" height="80"/>, Category: "Internet", Item_Creation_Date: "12-12-1998"}
        ]
    }
}


renderTableData(){
    
    return this.state.Archived_Items.map((Archived_Item,index) => {
        
        const {Id_Num,Name,Picture,Category,Item_Creation_Date} = Archived_Item
        return(
            <tr key = {Id_Num}>
            <td>{Id_Num}</td>
            <td>{Name}</td> 
            <td>{Picture}</td>
            <td>{Category}</td>
            <td>{Item_Creation_Date}</td>   
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
    let header = Object.keys(this.state.Archived_Items[0])
    return header.map((key,index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
}

    render() {
      
        return (
        <div>
            <NavBanner/>

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
    export default ArchivePage;