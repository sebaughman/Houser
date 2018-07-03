import React, { Component } from 'react';
import './buttons.css';
import {Link} from 'react-router-dom';

class PreviousButton extends Component {
  render() {
    return (
     
      <div> 
        <Link to={`/wizard/${this.props.previousStep}`}> 
        <button className='previousButton'>Previous Step</button>
      </Link>
      </div>
      
    );
  }
}

export default PreviousButton;