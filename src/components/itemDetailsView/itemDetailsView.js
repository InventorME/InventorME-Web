import React, { Component } from 'react';
import './itemDetailsView.css';
import FormPage from '../formPage/FormPage';

class ItemDetailsView extends Component{
    constructor(props) {
        super(props);
        this.state = { item: this.props.editItem[0], detailsView: true }
        this.toggleItemMenu = this.toggleItemMenu.bind(this);
    }

    componentDidMount() {
        console.log(this.state.item)
    }

    toggleItemMenu() {
        this.setState({ detailsView: !this.state.detailsView });
    }

    render(){
    return (
        <div style={{zIndex: '1'}}>
        { this.state.detailsView ? 
          <div>show details view with button *pass item on edit
              <button onClick={() => this.toggleItemMenu()}>Edit</button>
          </div> : 
          <FormPage addItem={false} item={this.state.item} toggleItemMenu={this.toggleItemMenu} userEmail={this.state.item.userEmail}/> }
        </div>
      );
    }
}

export default ItemDetailsView;