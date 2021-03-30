import React, { Component } from 'react';
import { AccountContext } from '../util/Accounts';
import upload from '../images/upload-button.png'
import './ItemsTable.css'



class ItemsTable extends Component {
    static contextType = AccountContext
    constructor(props){
        super(props)
        this.state = {
            Current_Items: [],
            Headers: ['Name', 'Category', 'Notes', 'Image'],
        }
    }

    componentDidMount(){
        const { getSession } = this.context;
        getSession()
            .then((data) => {
                this.getItems(data.email).then(data => this.setState({ Current_Items: data.items}))
            })
            .catch(err =>{
            console.log(err);
            });
    }
  
    getItems = async (email) => {
        let queryURL = 'https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items?userEmail="' + email + '"';
        const response = await fetch(queryURL.toString());
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    renderTableHeader(){
        return this.state.Headers.map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
      
        return (
            <div>
                <h1 id = 'Title'>Current Items</h1>
                <table id= 'Current_Items' style={{ marginBottom: '12em'}}>
                <tbody>
                <tr>{this.renderTableHeader()}</tr>
                { this.state.Current_Items ? this.state.Current_Items.map((Current_Item) => (
                <tr key = {Current_Item.itemName}>
                <td>{Current_Item.itemName}</td> 
                <td>{Current_Item.itemCategory}</td>
                <td>{Current_Item.itemNotes}</td>
                <td>{ Current_Item.itemPhotoURL ?  <img src={Current_Item.itemPhotoURL} alt="" width="40" height="30"/> :
                    <img src={upload} alt="" width="40" height="30"/>}</td>   
                </tr>
                )) : null}
                </tbody>
                </table>
            </div>
        )
    }
}
    export default ItemsTable;