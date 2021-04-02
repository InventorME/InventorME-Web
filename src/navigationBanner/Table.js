import React, { Component } from 'react';
import ItemDetailsView from '../components/itemDetailsView/itemDetailsView';
import archived from '../images/archived.png'
import { AccountContext } from '../util/Accounts';
import './Table.css'

class Table extends Component {
    static contextType = AccountContext
    constructor(props){
        super(props)
        this.state = {
            Archived_Items: [], loading: false,
            Headers: ['Name', 'Collection', 'Notes', 'Archived'], item: [], editItem: false
        }
        this.toggleDetailsView = this.toggleDetailsView.bind(this);
    }

    componentDidMount(){
        this.setState({loading: true})
        const { getSession } = this.context;
        getSession()
            .then((data) => {
                this.getItems(data.email).then(data => this.setState({ Archived_Items: data}))
                this.setState({loading: false})
            })
            .catch(err =>{
            console.log(err);
            });
    }

    toggleDetailsView() {
        this.setState({ editItem: !this.state.editItem });
    }

    getItems = async (email) => {
        let queryURL = 'https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items?userEmail="' + email + '"';
        const response = await fetch(queryURL.toString());
        const body = await response.json();
       let archivedItems = [];
       if(body.items.length > 0)
         archivedItems = body.items.filter(item => item.itemArchived === 1)
           if (response.status !== 200) throw Error(body.message);
        return archivedItems;
    }

    filterItemByID(ID) {
        this.setState({item: this.state.Archived_Items.filter(item => item.itemID === ID), editItem: true});
    }

    renderTableHeader(){
        return this.state.Headers.map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        return (
            <div>
                { this.state.editItem ? 
                <ItemDetailsView toggleDetailsView = {this.toggleDetailsView} editItem = {this.state.item} archive={true}/> :
                null }
                <h1 id = 'title'>Archived Items</h1>
                { this.state.loading ?
                <div className="loading-container"> <div className="form-load-symbol"/></div>
                : null }
                <table id= 'Archived_Items' style={{ marginBottom: '12em', cursor: 'pointer'}}>
                <tbody>
                <tr>{this.renderTableHeader()}</tr>
                { this.state.Archived_Items ? this.state.Archived_Items.map((Archived_Item) => (
                <tr key = {Archived_Item.itemName} onClick={() => this.filterItemByID(Archived_Item.itemID)}>
                <td>{Archived_Item.itemName}</td> 
                <td>{Archived_Item.itemCategory}</td>
                <td>{Archived_Item.itemNotes}</td>
                <td>{ Archived_Item.itemPhotoURL ?  <img src={Archived_Item.itemPhotoURL} alt="" width="40" height="30"/> :
                    <img src={archived} alt="" width="40" height="20"/>}</td>   
                </tr>
                )): null}
                </tbody>
                </table>
            </div>
        )
    }
    
}
    export default Table;