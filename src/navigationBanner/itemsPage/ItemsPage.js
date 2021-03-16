import React, { Component } from 'react';
import './ItemsPage.css';
import NavBanner from '../NavBanner.js'

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { response: '', barcodeNumber: ''};
 }

 go() {
     this.getBarcodeItem().then(res => {
         this.setState({ response: res })
     }).catch(err => console.log(err));
 }

 getBarcodeItem = async () => {
   console.log(this.state.barcodeNumber)
  const response = await fetch('/api/getBarcodeItem?code=' + this.state.barcodeNumber);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

onChange = (event) => {
  this.setState({barcodeNumber: event.target.value});
}

render() {
    return (
    <div className="container">
        <NavBanner/>
      <div>
        <img style={{borderRadius: "12em", height: "5.5em", width: "5.5em", 'paddingTop': '0.4em'}} alt="" src={this.state.response.imageURL} />          
       <div> { '\n' + this.state.response.title + '\n'}</div>
        <div>{this.state.response.categories + '\n'}</div>
        <input type="text" placeholder="enter barcode" onChange={this.onChange} value={this.state.barcodeNumber}/>
        <button onClick={()=>this.go()}>get item</button>
      </div>
    </div>
    );
  }
}

export default ItemsPage;