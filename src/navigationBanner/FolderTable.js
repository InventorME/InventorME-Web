import React, { Component } from 'react';
import './FolderTable.css'
import upload from '../images/upload-button.png'
import { AccountContext } from '../util/Accounts';
import Collapsible from 'react-collapsible';
import { Button} from 'react-bootstrap';

class FolderTable extends Component {
    static contextType = AccountContext
    constructor(props){
        super(props)
        this.state = {
            Folder_Items: [],
            Headers: ['Name', 'Category', 'Notes', 'Image'],
        }
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
  
    getItems = async (email) => {
        let queryURL = 'https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items?userEmail="' + email + '"';
        const response = await fetch(queryURL.toString());
        const body = await response.json();
        
        let folderItems = [];
        
       if(body.items.length > 0)
         folderItems = body.items.filter(item => item.itemFolder != "null")
        //console.log(folderItems)

        var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };

          var groubedByTeam=groupBy(folderItems, 'itemFolder')
          console.log(groubedByTeam);
           if (response.status !== 200) throw Error(body.message);
          console.log( Object.keys(groubedByTeam))
          // Object.keys(groubedByTeam).forEach(function(category){
     
            //console.log(`Team ${category} has ${groubedByTeam[category].length} itemFolder : `);
          //   groubedByTeam[category].forEach(function(memb,i){
          //         console.log(`---->${i+1}. ${memb.name}.`)
           // })
      // }); 
     
          
      if (response.status !== 200) throw Error(body.message);
           return Object.keys(folderItems) ;

    }

    renderTableHeader(){
        return this.state.Headers.map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
   


    render() {

        
      
        return (
                
            <Collapsible trigger= "personal">
            <table id= 'Folder_Items' style={{ marginBottom: '12em'}}>
            <tbody>
            <tr>{this.renderTableHeader()}</tr>
            { this.state.Folder_Items ? this.state.Folder_Items.map((Folder_Item) => (
            <tr key = {Folder_Item.itemName}>
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
            
        )
    }




    
}
export default FolderTable;