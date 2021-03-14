import React, { Component } from 'react';
import './FormPage.css';
import UploadButton from '../../images/upload-button.png'

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {response: {}, disabled: false, barcodeNumber: '', 
    imageURL: "https://images.barcodelookup.com/8910/89101614-1.jpg",
    name: 'Dove Antiperspirant Deodorant Advanced Care Rejuvenate 2.6 Oz', category: 'Personal Care', notes: '', tags: ["Deodorant & Anti-Perspirant","Deodorant"], showError: 'none', showForm: false, loading: false};
    this.hiddenFileInput = React.createRef();
  }

 searchBarcodeItem() {
      this.getBarcodeItem().then(res => {
         this.setState({ response: res, tags: res.tags, name: res.name, category: res.category, imageURL: res.imageURL });
     }).catch(err => console.log(err))
 }

 getBarcodeItem = async () => {
    this.setState({ loading: true})
    const response = await fetch('/api/getBarcodeItem?code=' + this.state.barcodeNumber);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ loading: false})
    if (Object.keys(body).length === 0) {
      this.setState({ showError: 'block'})
    } else {
      this.showForm();
    }
    return body;
};

onChange = (event) => {
  const attribute = event.target.getAttribute('name');
  this.setState({[attribute]: event.target.value});
}

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

showForm() {
  this.setState({showForm: true});
}

cancelForm() {
  this.setState({showForm: false, showError: 'none', barcodeNumber: '', response: []});
}

handleClick = () => {
  this.hiddenFileInput.current.click();
};

onImageChange = async(event) => {
  if (event.target.files && event.target.files[0]) { 
    this.setState({imageURL: URL.createObjectURL(event.target.files[0])});    
  }
}

render() {
    return (
    <div className="container">
      { this.state.loading ?
      <div className="loading-container"> <div className="load-symbol"/></div>
      : null }
      { this.state.showForm ?
      <div className="form-container">
        <div className="item-image-container">
          <input disabled={this.state.disabled} type="file" ref={this.hiddenFileInput} onChange={this.onImageChange} style={{display: 'none'}}/>
          <img style={{height: "9em", width: "9em", 'paddingTop': '0.4em'}} alt="Upload item img" src={this.state.imageURL} />          
          <img onClick={this.handleClick} src={UploadButton} className="item-upload" alt=""/>
        </div>
        <h2>Name</h2>
        <input className="input-box" name="name" value={this.state.name} onChange={this.onChange} type="text" placeholder="Name"/>
        <h2>Category</h2>
        <input className="input-tags-box" name="category" value={this.state.category} onChange={this.onChange} type="text" placeholder="Category"/>
        <h2>Location</h2>
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
        <button className="save-button" onClick={()=>this.cancelForm()}>Save</button>
        <button className="cancel-button" onClick={()=>this.cancelForm()}>Cancel</button>
      </div>
      :
      <div>
        <div style={{marginLeft: "20%", width: "90%"}}>
          <input type="text" name="barcodeNumber" className="searchCode-box" placeholder="Enter barcode" onChange={this.onChange} value={this.state.barcodeNumber}/>
          <button className="searchCode-button" onClick={()=>this.searchBarcodeItem()} ref={this.hiddenInput}>Search</button>
          <p style={{marginLeft: "8em", color: "red", fontSize: "0.9em", display: this.state.showError}}>Item not found. Please try again.</p>
          <p style={{marginLeft: "13em"}}>or</p>
          <div className="enter-manually" onClick={()=> this.showForm()}><p>Enter manually</p></div>
        </div>
      </div>
      }
    </div>
    );
  }
}

export default FormPage;