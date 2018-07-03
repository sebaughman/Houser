import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeValue} from '../../redux/action-creators';


class Wizard2 extends Component {
  render() {
    return (
     
      <div className='wizard-container'> 
        <label>Address</label>
        <input type='text' name='address' value={this.props.address} onChange={(event)=>this.props.changeValue(event)}/>
        <div className='city-state-container'>
          <div className='city-state'>
            <label>City</label>
            <input type='text' name='city' value={this.props.city} onChange={(event)=>this.props.changeValue(event)}/>
          </div>
          <div className='city-state'>
            <label>State</label>
            <input type='text' name='state' value={this.props.state} onChange={(event)=>this.props.changeValue(event)}/>
          </div>
        </div>
        <label >Zip</label>
        <input className='zip' type='text' name='zip' value={this.props.zip} onChange={(event)=>this.props.changeValue(event)}/>

        
      </div>
      
    );
  }
}

function mapStateToProps ({ address, city, state, zip }) {
  return { address, city, state, zip };
  }

export default connect(mapStateToProps, { changeValue })(Wizard2); 