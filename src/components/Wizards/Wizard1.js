import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeValue} from '../../redux/action-creators';


class Wizard1 extends Component {
  render() {
    return (
     
      <div className='wizard-container'> 
        <label>Property Name</label>
        <input type='text' name='name' value={this.props.name} onChange={(event)=>this.props.changeValue(event)}/>
        <label >Property Description</label>
        <input className='desc' type='text' name='description' value={this.props.description} onChange={(event)=>this.props.changeValue(event)}/>

        
      </div>
      
    );
  }
}
function mapStateToProps ({ name, description }) {
  return { name, description };
  }

export default connect(mapStateToProps, { changeValue })(Wizard1); 