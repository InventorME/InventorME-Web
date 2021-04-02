import React, { Component } from 'react';
import './ItemsPage.css';
import NavBanner from '../NavBanner.js';
import { Auth } from 'aws-amplify';
import upload from '../../images/upload-button.png'
import ItemDetailsView from '../../components/itemDetailsView/itemDetailsView';
class ItemsPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            Current_Items: [],
            Headers: ['Name', 'Collection', 'Notes', 'Image'],
            editItem: false, item: null, loading: false
        }
        this.toggleDetailsView = this.toggleDetailsView.bind(this);
    }

    componentDidMount(){
      this.setState({loading: true})
        
      this.setState({loading: false})
    }
  
    getItems = async () => {
        try{
          const data = await Auth.currentUserInfo();
          var email = data.attributes.email;
        }
        catch(error){
          console.log('could not find user :(', error);
        }
        let queryURL = 'https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items?userEmail="' + email + '"';
        const response = await fetch(queryURL.toString());
        const body = await response.json();
        let items = [];
        if(body.items.length > 0)
          items = body.items.filter(item => item.itemArchived === 0)
          if (response.status !== 200) throw Error(body.message);
        return items;
    }

    filterItemByID(ID) {
      this.setState({item: this.state.Current_Items.filter(item => item.itemID === ID), editItem: true});
    }



    componentDidMount(){
      this.setState({loading: true})
        const { getSession } = this.context;
        getSession()
            .then((data) => {
                this.getItems(data.email).then(data => this.setState({ Current_Items: data}))
            })
            .catch(err =>{
            console.log(err);
            });
      this.setState({loading: false})
    }
  
    getItems = async (email) => {
        let queryURL = 'https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items?userEmail="' + email + '"';
        const response = await fetch(queryURL.toString());
        const body = await response.json();
        let items = [];
        if(body.items.length > 0)
          items = body.items.filter(item => item.itemArchived === 0)
          if (response.status !== 200) throw Error(body.message);
        return items;
    }

    filterItemByID(ID) {
      this.setState({item: this.state.Current_Items.filter(item => item.itemID === ID), editItem: true});
    }

    toggleDetailsView() {
      this.setState({ editItem: !this.state.editItem });
    }

    renderTableHeader(){
        return this.state.Headers.map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        return (
            <div>
              <NavBanner/>
              { this.state.loading ?
              <div className="loading-container"> <div className="form-load-symbol"/></div>
              : null }
              { this.state.editItem ? 
                <ItemDetailsView toggleDetailsView = {this.toggleDetailsView} editItem = {this.state.item}/> :
                null }
              <div style={{overflowY: 'scroll', height: '100vh'}}>
                <h1 id = 'Title'>Current Items</h1>
                <table id= 'Current_Items' style={{ marginBottom: '12em', cursor: 'pointer'}}>
                <tbody>
                <tr>{this.renderTableHeader()}</tr>
                { this.state.Current_Items ? this.state.Current_Items.map((Current_Item) => (
                <tr key = {Current_Item.itemID} onClick={() => this.filterItemByID(Current_Item.itemID)}>
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
            </div>
        )
    }
}
export default ItemsPage;