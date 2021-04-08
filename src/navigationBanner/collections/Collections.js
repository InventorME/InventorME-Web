import React, { Component } from 'react';
import './Collections.css';
import NavBanner from '../NavBanner.js';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Database } from '../../util/Database';
import { colors } from '../../util/objectColors';
import FormPage from '../../components/formPage/FormPage';
import { Auth } from 'aws-amplify';

var color=0;

class Collections extends Component {
  constructor(props) {
    super(props)
    this.state = {
        items: [], 
        editItem: false, 
        item: null,
        showItemMenu: false,
        collection: '',
        userEmail: '', loading: false
    }
    
    this.closeItemMenu = this.closeItemMenu.bind(this);
  }
  async componentDidMount() {
    this.setState({ loading: true });
    this.getItems();
    try{
      const data = await Auth.currentUserInfo();
      this.setState({userEmail: data.attributes.email })
      this.setState({ loading: false });
    }  
    catch (error) {
      console.log('could not find user :(', error);
      window.location.href="/signin-page";
    }
  }

  filterItemByID(ID, collectionName) {
        this.setState({ item: this.state.items[collectionName].filter(item => item.itemID === ID), editItem: true });
  }

  closeItemMenu() {
    this.setState({ showItemMenu: false });
  }

  openItemMenu(prop) {
    this.setState({ showItemMenu: true, collection: prop });
  }

  getItems = async () => {
    const db = new Database();
    try {
        const body = await db.get();
        
        let collectionItems = [];
        if (body.items.length > 0)
        collectionItems = body.items.filter(item => item.Collections !== null)

        var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };

        var groubedByTeam = groupBy(collectionItems , 'itemCategory')
        this.setState({ items: groubedByTeam })
        this.setState({ collectionTittle: Object.keys(groubedByTeam) })
        
        this.render();
        this.setState({ loading: false });
    }
    catch (error) {
        console.log('Error pulling data', error);
    }
  }

  renderFolders = (props) =>{
    return(
      <div className='area' style={{backgroundColor:props.color}}>
            <AiOutlinePlusCircle onClick={() => this.openItemMenu(props.tittle)} className={'icon'}/>
            <div className='textTittle'>{props.tittle}</div>
            <div className='textAmount'>{props.amount}</div>
      </div>
    );
  }

  getColors(){
    color++;
    return colors.object[color%8];
  }

  render() {
      return (
      <div className='container'>
        <NavBanner/>
        { this.state.loading ?
        <div className="loading-container"> <div className="form-load-symbol"/></div>: null }
        { this.state.showItemMenu ?
            <div style={{marginTop: '3%'}}><FormPage toggleItemMenu = {this.closeItemMenu} userEmail={this.state.userEmail} collection={this.state.collection} addCollection = {true}/></div> : null }
        
        <div className='container2'>
            {this.state.collectionTittle ? this.state.collectionTittle.map((collTittle) => (
              <this.renderFolders tittle={collTittle} amount={this.state.items[collTittle].length} color={this.getColors()}/>
            )):null}
         </div>
      </div>
      );
    }
  }
  
  export default Collections;