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
    <div>
        <NavBanner/>
      <div className="acct-container">
        <div>yooo</div>okkkk
      </div>
    </div>
    );
  }
}

export default ItemsPage;