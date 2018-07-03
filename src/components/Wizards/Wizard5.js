import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeValue} from '../../redux/action-creators';



class Wizard5 extends Component {
  render() {
    const recommendedRent = Number(this.props.monthly_mortgage) + (this.props.monthly_mortgage / 4)
  
    return (
     
      <div className='wizard-container'> 
        

        <label>Desired Rent </label>
        <input type='text' name='desired_rent' value={this.props.desired_rent} onChange={(event)=>this.props.changeValue(event)}/>
        <p>Recommended Rent ${recommendedRent}</p>
        
      </div>
      
    );
  }
}

function mapStateToProps ({ monthly_mortgage, desired_rent}) {
  return { monthly_mortgage, desired_rent};
  }

export default connect(mapStateToProps, { changeValue })(Wizard5); 