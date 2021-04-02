import React, { Component } from 'react'
import './FolderPage.css'
import NavBanner from '../NavBanner.js'
import upload from '../../images/upload-button.png'
import { AccountContext } from '../../util/Accounts';
import ItemDetailsView from '../../components/itemDetailsView/itemDetailsView';
import Collapsible from 'react-collapsible';
class FolderPage extends Component {
    static contextType = AccountContext
    constructor(props){
        super(props)
        this.state = {
            Headers: ['Name', 'Collection', 'Notes', 'Image'],
            items: [], editItem: false, item: null
        }
        this.toggleDetailsView = this.toggleDetailsView.bind(this);
    }

    componentDidMount(){
        const { getSession } = this.context;
        getSession()
            .then((data) => {
                this.getItems(data.email).then(data => this.setState({ Folder_Items: data.items}))
            })
            .catch(err =>{
            console.log(err);
            });
    }

    toggleDetailsView() {
        this.setState({ editItem: !this.state.editItem });
    }

    filterItemByID(ID, foldername) {
        this.setState({item: this.state.items[foldername].filter(item => item.itemID === ID), editItem: true});
    }
  
    getItems = async (email) => {
        let queryURL = 'https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items?userEmail="' + email + '"';
        const response = await fetch(queryURL.toString());
        const body = await response.json();
        
        let folderItems = [];
        
       if(body.items.length > 0)
         folderItems = body.items.filter(item => item.itemFolder !== null)
         folderItems = body.items.filter(item => item.itemArchived !== 1)

        var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
        };

        var groubedByTeam = groupBy(folderItems, 'itemFolder')
        if (response.status !== 200) throw Error(body.message);

        this.setState({items: groubedByTeam})
        this.setState({foldername:Object.keys(groubedByTeam)})
        return body
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
            <div style={{overflowY: 'scroll', height: '100vh'}}>
                { this.state.editItem ? 
                <div style={{marginTop: '2em'}}>
                <ItemDetailsView toggleDetailsView = {this.toggleDetailsView} editItem = {this.state.item}/></div> :
                null }
            <div style={{marginTop: '7%', marginLeft: '15%', paddingBottom: '10%'}}>
            { this.state.foldername ? this.state.foldername.map((folderName) => (
            <Collapsible trigger= {folderName}>
            <table id= 'Folder_Items' style={{ marginBottom: '2em'}}>
            <tbody>
            <tr>{this.renderTableHeader()}</tr>
            { this.state.items[folderName] ? this.state.items[folderName].map((Folder_Item) => (
            <tr style={{ cursor: 'pointer'}} onClick={() => this.filterItemByID(Folder_Item.itemID, folderName)}>
            <td>{Folder_Item.itemName}</td> 
            <td>{Folder_Item.itemCategory}</td>
            <td>{Folder_Item.itemNotes}</td>
            <td>{ Folder_Item.itemPhotoURL ?  <img src={Folder_Item.itemPhotoURL} alt="" width="40" height="30"/> :
                <img src={upload} alt="" width="40" height="30"/>}</td> 
            </tr>
            )) : null}
            </tbody>
            </table>
                </Collapsible>
               )) : null}
            </div>
            </div>          
        </div>
        
        
        );
      }
    }
 
  

export default FolderPage;