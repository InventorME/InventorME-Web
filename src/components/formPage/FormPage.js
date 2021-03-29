import React, { Component } from 'react';
import './FormPage.css';
import UploadButton from '../../images/upload-button.png'
import ToastMessage from '../toastMessage/ToastMessage';
import DatePicker from 'react-date-picker';
import CurrencyInput from 'react-currency-input-field';

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {response: {}, barcodeNumber: '', 
    imageURL: '',
    name: '', 
    category: '', itemLocation: '', 
    itemWorth: '', purchaseAmount: '', sellAmount: '',
    serialNum: '', recurringAmount: '',
    itemReceipt: '', itemManual: '', onlineUrl: '',
    buyDate: '', sellDate: '', 
    tags: [], notes: '',
    itemCreationDate: '', itemArchived: '', addItem: false, itemFolder: '',
    showForm: false, loading: false,
    baseURL: "https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items"};
    this.hiddenFileInput = React.createRef();
    this.scrollRef = React.createRef()
    this.toast = React.createRef();
    this.onChangeBuyDate = this.onChangeBuyDate.bind(this);
    this.onChangeSellDate = this.onChangeSellDate.bind(this);
  }

 searchBarcodeItem() {
      this.getBarcodeItem().then(res => {
        if (Object.keys(res).length === 0) {
          this.toastMessage('Item not found. Please try again.')
        } else {
          this.setState({ response: res, tags: res.tags, name: res.name, category: res.category, 
            imageURL: res.imageURL, serialNum: this.state.barcodeNumber, 
            itemWorth: res.price, onlineUrl: res.onlineUrl , addItem: true });
          this.showForm(true);
        }
        this.setState({ loading: false})
     }).catch(err => console.log(err))
 }

 getBarcodeItem = async () => {
    this.setState({ loading: true})
    const response = await fetch('/api/getBarcodeItem?code=' + this.state.barcodeNumber);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};

onChange = (event) => {
  const attribute = event.target.getAttribute('name');
  this.setState({[attribute]: event.target.value});
}

onNumberChange = (event) => {
  const attribute = event.target.getAttribute('name');
  const format = /^[0-9\b]+$/;
  if (event.target.value === '' || format.test(event.target.value)) {
    this.setState({[attribute]: event.target.value})
  }
}

toastMessage = (message) => {
  this.toast.current.openToast(message);
};


inputKeyDown = (e) => {
  const val = e.target.value;
  if (e.key === 'Enter' && val) {
    if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
      return;
    }
    this.setState({ tags: [...this.state.tags, val]});
    this.tagInput.value = null;
  }
}

removeTag = (i) => {
  const newTags = [ ...this.state.tags ];
  newTags.splice(i, 1);
  this.setState({ tags: newTags });
}

onChangeBuyDate(event) {
  this.setState({buyDate: event});
}

onChangeSellDate(event) {
  this.setState({sellDate: event});
}

showForm(add) {
  this.setState({showForm: true, addItem: add});
}

cancelForm() {
  this.scrollRef.current.scrollIntoView()
  this.setState({showForm: false, addItem: false, imageURL: '', name: '', category: '', itemLocation: '', itemWorth: '', purchaseAmount: '', sellAmount: '',
  serialNum: '', recurringAmount: '', itemReceipt: '', itemManual: '', onlineUrl: '',
  buyDate: '', sellDate: '', tags: [], notes: ''});
}

handleClick = () => {
  this.hiddenFileInput.current.click();
};

onDollarChange = (value, name) => {
  this.setState({[name]: value});
}

onImageChange = async(event) => {
  if (event.target.files && event.target.files[0]) { 
    this.setState({imageURL: URL.createObjectURL(event.target.files[0])});    
  }
}

saveItem() {
  let POSTitemFORMAT = {
      userEmail: "'lukelmiller@icloud.com'",
      itemCategory: this.state.itemCategory,
      itemName: this.state.name,
      itemPhotoURL: this.state.imageURL,
      itemSerialNum: this.state.serialNum,
      itemPurchaseAmount: this.state.purchaseAmount,
      itemWorth: this.state.itemWorth,
      itemReceiptPhotoURL: this.state.itemReceipt,
      itemManualURL: this.state.itemManual,
      itemSellDate: this.state.sellDate,
      itemBuyDate: this.state.buyDate,
      itemLocation: this.state.itemLocation,
      itemNotes: "'REALLY good for running and working out and such,Pro version'",
      itemSellAmount: this.state.sellAmount,
      itemRecurringPaymentAmount: this.state.recurringAmount,
      itemEbayURL: this.state.onlineUrl,
      itemTags: this.state.tags.join(),
      itemArchived: '0',
      itemFolder: this.state.itemFolder
  }
  this.post(POSTitemFORMAT);
}

post = async(item) => {
  return new Promise((resolve, reject)=>{
      var postData = {
          method: 'POST',
          body: JSON.stringify(item),
          headers: { 'Content-Type': 'application/json' }
      }
      fetch(this.state.baseURL,postData)
      .then(res => resolve(res.json()))
      .catch(err => reject(err))
  });
}

render() {
    return (
    <div className="add-edit-container">
      { this.state.loading ?
      <div className="loading-container"> <div className="form-load-symbol"/></div>
      : null }
      <ToastMessage ref={this.toast}/>
      { true ? 
      <div className="form-header">
        <h2 style={{marginLeft: '40%', width: '48%'}}>Add Item</h2>
        <h2 style={{cursor: 'pointer'}} onClick={()=> this.props.toggleItemMenu()}>X</h2>
      </div> : 
        <div>Edit</div>
      }
      { this.state.showForm ?
      <div className="form-container">
        <div style={{marginLeft: '1em', display: 'block'}}>
        <div className="item-image-container" ref={this.scrollRef}>
          <input type="file" ref={this.hiddenFileInput} onChange={this.onImageChange} style={{display: 'none'}}/>
          <img style={{height: "9em", width: "9em", 'paddingTop': '0.4em'}} alt="Upload item img" src={this.state.imageURL} />          
          <img onClick={this.handleClick} src={UploadButton} className="item-upload" alt=""/>
        </div>
        <div>
          <h2>Name*</h2>
          <input className="input-box" name="name" value={this.state.name} onChange={this.onChange} type="text" placeholder="Name"/>
        </div>

        <div style={{display: 'inline-flex', width: '100%'}}>
          <div style={{display: 'block'}}>
            <h2>Category*</h2>
            <input className="input-box2" name="category" value={this.state.category} onChange={this.onChange} type="text" placeholder="Category"/>
          </div>
          <div style={{display: 'block', marginLeft: '2em'}}>
            <h2>Item Location</h2>
            <input type="text" name="itemLocation" className="input-box2" placeholder="Enter item location"
              onChange={this.onChange} value={this.state.itemLocation}/>
          </div>
        </div>

        <div style={{display: 'inline-flex', width: '100%'}}>
          <div style={{display: 'block'}}>
            <h2>Item Worth</h2>
            <CurrencyInput
              prefix="$"
              name="itemWorth"
              className="input-box3"
              placeholder="$0.00"
              value={this.state.itemWorth}
              decimalsLimit={2}
              onValueChange={(value, name) => this.onDollarChange(value, name)}/>
          </div>
          <div style={{display: 'block', marginLeft: '2em'}}>
            <h2>Purchase Amount</h2>
            <CurrencyInput
              prefix="$"
              name="purchaseAmount"
              className="input-box3"
              placeholder="$0.00"
              value={this.state.purchaseAmount}
              decimalsLimit={2}
              onValueChange={(value, name) => this.onDollarChange(value, name)}/>
          </div>
          <div style={{display: 'block', marginLeft: '2em'}}>
            <h2>Sell Amount</h2>
            <CurrencyInput
              prefix="$"
              name="sellAmount"
              className="input-box3"
              placeholder="$0.00"
              value={this.state.sellAmount}
              decimalsLimit={2}
              onValueChange={(value, name) => this.onDollarChange(value, name)}/>
          </div>
        </div>

        <div style={{display: 'inline-flex', width: '100%'}}>
          <div style={{display: 'block'}}>
            <h2>Serial Number</h2>
            <input type="text" pattern="[0-9]*" name="serialNum" className="input-box3" placeholder="123456789"
              onChange={this.onNumberChange} value={this.state.serialNum} />
          </div>
          <div style={{display: 'block', marginLeft: '2em'}}>
            <h2>Recurring Payment</h2>
            <CurrencyInput
              prefix="$"
              name="recurringPayment"
              className="input-box3"
              placeholder="$0.00"
              value={this.state.recurringAmount}
              decimalsLimit={2}
              onValueChange={(value, name) => this.onDollarChange(value, name)}/>
          </div>
          <div style={{display: 'block', marginLeft: '2em'}}>
            <h2>Item Folder</h2>
            <input type="text" name="itemFolder" className="input-box3" placeholder="Enter folder name"
              onChange={this.onChange} value={this.state.itemFolder} />
          </div>
        </div>

        <div style={{display: 'inline-flex', width: '100%'}}>
          <div style={{display: 'block'}}>
            <h2>Item Receipt</h2>
            <input type="text" name="itemReceipt" className="input-box3" placeholder="Enter receipt url"
              onChange={this.onChange} value={this.state.itemReceipt} />
          </div>
          <div style={{display: 'block', marginLeft: '2em'}}>
            <h2>Item Manual Url</h2>
            <input type="text" name="itemManual" className="input-box3" placeholder="Enter manual url"
              onChange={this.onChange} value={this.state.itemManual} />
          </div>
          <div style={{display: 'block', marginLeft: '2em'}}>
            <h2>Online Url</h2>
            <input type="text" name="onlineUrl" className="input-box4" placeholder="Enter online url"
              onChange={this.onChange} value={this.state.onlineUrl} />
          </div>
        </div>

        <div style={{display: 'inline-flex', width: '100%', paddingBottom: '1em'}}>
          <div style={{display: 'block', width: '11.7em'}}>
            <h2>Buy Date</h2>
            <DatePicker onChange={this.onChangeBuyDate}
            value={this.state.buyDate}/>
          </div>
          <div style={{display: 'block', marginLeft: '2em'}}>
            <h2>Sell Date</h2>
            <DatePicker onChange={this.onChangeSellDate}
            value={this.state.sellDate}/>
          </div>
        </div>

        <h2>Tags</h2>
          <input className="input-tags-box" type="text" placeholder="Add tag" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }}/>
          <div className="input-tag">
            <ul className="input-tag-tags">
            { this.state.tags.map((tag, i) => (
              <li key={tag}>
                {tag}
                <button type="button" onClick={() => { this.removeTag(i); }}>x</button>
              </li>))}
            </ul>
          </div>
        <div style={{marginBottom: "2.5em"}}>
          <h2>Notes</h2>
          <textarea name="notes" className="input-notes" type="textarea" onChange={this.onChange} placeholder="Notes"/>
        </div>
        <div style={{paddingTop: '2em', paddingBottom: '2em'}}>
          <button className="save-button" onClick={()=>this.saveItem()}>Save</button>
          <button className="cancel-button" onClick={()=>this.cancelForm()}>Cancel</button>
        </div>
        </div>
      </div>
      :
      <div>
        <div style={{marginTop: '14em', marginLeft: '30%', width: '60%'}}>
          <input type="text" name="barcodeNumber" className="searchCode-box" placeholder="Enter barcode" onChange={this.onChange} value={this.state.barcodeNumber}/>
          <button className="searchCode-button" onClick={()=>this.searchBarcodeItem()} ref={this.hiddenInput}>Search</button>
          <p style={{marginLeft: "33%", fontSize: '1.3em'}}>or</p>
          <div className="enter-manually" onClick={()=> this.showForm(true)}><p>Enter manually</p></div>
        </div>
      </div>
      }
    </div>
    );
  }
}

export default FormPage;