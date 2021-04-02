import React, { Component } from 'react';
import './ItemsPage.css';
<<<<<<< Updated upstream
import NavBanner from '../NavBanner.js'
=======
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
>>>>>>> Stashed changes

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { response: '' };
 }

render() {
    return (
    <div>
      <NavBanner/>
      <div className="acct-container">
        <div>yooo</div>
      </div>
    </div>
    );
  }
}

export default ItemsPage;