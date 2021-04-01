import React, { Component } from 'react';
import './StatsTable.css'
import upload from '../images/upload-button.png'
import { AccountContext } from '../util/Accounts'
import Collapsible from 'react-collapsible'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import {buildStyles} from 'react-circular-progressbar';


// The order of the circles starts at the top and goes right then down
// So, for example, Circle1 = top left corner, circle4 = top right corner, 
// circle8 = bottom left corner, etc



class StatsTable extends Component {
  static contextType = AccountContext
  constructor(props){
      super(props)
      this.state = {
          Archived_Items: [],
          Headers: ['Name', 'Category', 'Notes', 'Archived'],
      }
  }

  componentDidMount(){
      const { getSession } = this.context;
      getSession()
          .then((data) => {
              this.getItems(data.email).then(data => this.setState({ Archived_Items: data}))
          })
          .catch(err =>{
          console.log(err);
          });
  }
  getItems = async (email) => {
      let queryURL = 'https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items?userEmail="' + email + '"';
      const response = await fetch(queryURL.toString());
      const body = await response.json();
    // let archivedItems = [];

     //var groupBy = function(xs, key) {
     // return xs.reduce(function(rv, x) {
     //   (rv[x[key]] = rv[x[key]] || []).push(x);
     //   return rv;
     // }, {});
    //};

    //var groubedByTeam=groupBy(archivedItems, 'itemArchived')
    //console.log(groubedByTeam);


     if(body.items.length > 0)

      if(body.items.filter(item => item.itemArchived === 1)){
        let archivedItems = [];
       archivedItems = body.items.filter(item => item.itemArchived === 1)
      console.log(archivedItems.length)
      
         if (response.status !== 200) throw Error(body.message);
     // return archivedItems.length
     this.setState({archiveLength:archivedItems.length})
     this.setState({allLength:body.items.length})
      }

  }



  renderTableHeader(){
      return this.state.Headers.map((key,index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
  }


    render() {const percentage = 100;
        return (


   <div> 
  <p className = "Circle_1"> Net Worth </p>
  <div className = "Circle1"style={{ width: 200, height: 200 }}>       
  <CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
    // Colors
    pathColor: `rgba(14, 126, 146, ${percentage / 100})`,
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#0e7e92',
  })}
/>
</div>
<p className = "Circle_2"> Depreciation </p>
<div className = "Circle2"style={{ width: 200, height: 200 }}>       
  <CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
    // Colors
    pathColor: `rgba(14, 126, 146, ${percentage / 100})`,
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#0e7e92',
  })}
/>
</div>


<p className = "Circle_3">Archived Items </p>
<div className = "Circle3"style={{ width: 200, height: 200 }}>       
  <CircularProgressbar
  value={this.state.archiveLength}
  text={`${this.state.archiveLength}`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
    // Colors
    pathColor: `rgba(14, 126, 146, ${this.state.archiveLength/100})`,
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#0e7e92',
  })}
/>
</div>

<p className = "Circle_4"> # All Items </p>
<div className = "Circle4"style={{ width: 200, height: 200 }}>       
  <CircularProgressbar
  value={this.state.allLength}
  text={`${this.state.allLength}`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
    // Colors
    pathColor: `rgba(14, 126, 146, ${this.state.allLength/100})`,
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#0e7e92',
  })}
/>
</div>
<p className = "Circle_5"> Money Invested </p>
<div className = "Circle5"style={{ width: 200, height: 200 }}>       
  <CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
    // Colors
    pathColor: `rgba(14, 126, 146, ${percentage / 100})`,
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#0e7e92',
  })}
/>
</div>

<p className = "Circle_6"> Items Sold </p>
<div className = "Circle6"style={{ width: 200, height: 200 }}>       
  <CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
    // Colors
    pathColor: `rgba(14, 126, 146, ${percentage / 100})`,
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#0e7e92',
  })}
/>
</div>
<p className = "Circle_7"> % Money Lost </p>
<div className = "Circle7"style={{ width: 200, height: 200 }}>       
  <CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
    // Colors
    pathColor: `rgba(14, 126, 146, ${percentage / 100})`,
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#0e7e92',
    
     
  })}
/>
</div>
<p className = "Circle_8"> Monthly Recurring Cost </p>
<div className = "Circle8"style={{ width: 200, height: 200 }}>       
  <CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,
    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,
    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',
    // Colors
    pathColor: `rgba(14, 126, 146, ${percentage / 100})`,
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#0e7e92',
  })}
/>
</div>


</div>



        )
    }
}
export default StatsTable;