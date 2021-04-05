import React, { Component } from 'react';
import './Collections.css';
import NavBanner from '../NavBanner.js';
import { AiOutlinePlusCircle } from "react-icons/ai";


class Collections extends Component {
  renderFolders = (props) =>{
    return(
      <div className='area' style={{backgroundColor:props.color}}>
            <AiOutlinePlusCircle onClick={() => alert('Clicked')} class={'icon'}/>
            <div className='textTittle'>{props.tittle}</div>
            <div className='textAmount'>Items: {props.amount}</div>
      </div>

    );
  }
  render() {
      return (
      <div>
          <NavBanner/>
          <this.renderFolders tittle="Tittle number 1" amount='50' color='red'/>
          <this.renderFolders tittle="Tittle number 1" amount='50' color='red'/>
          <this.renderFolders tittle="Tittle number 1" amount='50' color='red'/>
          <this.renderFolders tittle="Tittle number 1" amount='50' color='red'/>
          <this.renderFolders tittle="Tittle number 1" amount='50' color='red'/>
          <this.renderFolders tittle="Tittle number 1" amount='50' color='red'/>
          <this.renderFolders tittle="Tittle number 1" amount='50' color='red'/>
      </div>
      );
    }
  }
  
  export default Collections;