import React, { Component } from 'react';
import './FormPage.css';
import UploadButton from '../../images/upload-button.png'

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {response: {}, barcodeNumber: '', 
    imageURL: "https://images.barcodelookup.com/8910/89101614-1.jpg",
    name: 'Dove Antiperspirant Deodorant Advanced Care Rejuvenate 2.6 Oz', category: 'Personal Care', notes: '', tags: ["Deodorant & Anti-Perspirant","Deodorant"], showError: 'none', showForm: false, loading: false};
    this.hiddenFileInput = React.createRef();
  }

 searchBarcodeItem() {
      this.getBarcodeItem().then(res => {
        if (Object.keys(res).length === 0) {
          this.setState({ showError: 'block'})
        } else {
          this.setState({ response: res, tags: res.tags, name: res.name, category: res.category, imageURL: res.imageURL });
          this.showForm();
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
  window.location.reload(true)
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
    <div className="add-edit-container">
      { this.state.loading ?
      <div className="loading-container"> <div className="form-load-symbol"/></div>
      : null }
      { true ? 
      <div className="form-header">
        <h2 style={{marginLeft: '40%', width: '48%'}}>Add Item</h2>
        <h2 style={{cursor: 'pointer'}}>X</h2>
      </div> : 
        <div>Edit</div>
      }
      { this.state.showForm ?
      <div className="form-container">
        <div style={{marginLeft: '1em'}}>
        <div className="item-image-container">
          <input type="file" ref={this.hiddenFileInput} onChange={this.onImageChange} style={{display: 'none'}}/>
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
        <div style={{paddingTop: '2em', paddingBottom: '2em'}}>
          <button className="save-button" onClick={()=>this.cancelForm()}>Save</button>
          <button className="cancel-button" onClick={()=>this.cancelForm()}>Cancel</button>
        </div>
        </div>
      </div>
      :
      <div>
        <div style={{marginTop: '12em'}}>
          <input type="text" name="barcodeNumber" className="searchCode-box" placeholder="Enter barcode" onChange={this.onChange} value={this.state.barcodeNumber}/>
          <button className="searchCode-button" onClick={()=>this.searchBarcodeItem()} ref={this.hiddenInput}>Search</button>
          <p style={{marginLeft: "33%", color: "red", fontSize: "1em", display: this.state.showError}}>Item not found. Please try again.</p>
          <p style={{marginLeft: "43%", fontSize: '1.3em'}}>or</p>
          <div className="enter-manually" onClick={()=> this.showForm()}><p>Enter manually</p></div>
        </div>
      </div>
      }
    </div>
    );
  }
}

export default FormPage;