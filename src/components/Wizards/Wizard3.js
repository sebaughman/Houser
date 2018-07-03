import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeValue} from '../../redux/action-creators';


class Wizard3 extends Component {
  render() {
    return (
     
      <div className='wizard-container'> 
        <div className='image-preview'  style={{backgroundImage: "url(" + this.props.image+ ")"}}>
          { this.props.image === ''?  <p>Image Preview</p>
          :<p></p>}
        </div>
      <label>Image URL</label>
        <input type='url' name='image' value={this.props.image} onChange={(event)=>this.props.changeValue(event)}/>
      </div>
      
    );
  }
}

function mapStateToProps ({ image }) {
  return { image };
  }

export default connect(mapStateToProps, { changeValue })(Wizard3); 