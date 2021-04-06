import React, { Component } from 'react';
import './Collections.css';
import NavBanner from '../NavBanner.js';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Database } from '../../util/Database';
import { colors } from '../../util/objectColors';

var color=0;

class Collections extends Component {
  constructor(props) {
    super(props)
    this.state = {
        items: [], 
        editItem: false, 
        item: null,
    }
  }
  componentDidMount() {
    this.getItems();
  }
  filterItemByID(ID, collectionName) {
        this.setState({ item: this.state.items[collectionName].filter(item => item.itemID === ID), editItem: true });
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
            <AiOutlinePlusCircle onClick={() => alert('Clicked')} class={'icon'}/>
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