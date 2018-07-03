import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeValue} from '../../redux/action-creators';


class Wizard4 extends Component {
  render() {
    return (
     
      <div className='wizard-container'> 
      <label>Loan Amount</label>
      <input type='text' name='loan_amount' value={this.props.loan_amount} onChange={(event)=>this.props.changeValue(event)}/>
      <label >Monthly Mortgage</label>
      <input type='text' name='monthly_mortgage' value={this.props.monthly_mortgage} onChange={(event)=>this.props.changeValue(event)}/>

      
    </div>
      
    );
  }
}

function mapStateToProps ({ loan_amount, monthly_mortgage }) {
  return { loan_amount, monthly_mortgage };
  }

export default connect(mapStateToProps, { changeValue })(Wizard4); 