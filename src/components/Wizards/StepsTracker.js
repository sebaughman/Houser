import React, { Component } from 'react';
import './stepTracker.css'
import stepActive from '../../assets/step_active.png';
import stepInactive from "../../assets/step_inactive.png";
import stepCompleted from "../../assets/step_completed.png";


class StepsTracker extends Component {

leaveWizard(){
  this.props.history.push('/dashboard')
}

  render() {
    const steps = ['1', '2', '3', '4', '5'];
    
    const stepIcons = steps.map((step, i)=>{
    
      if(step < this.props.step){
        return(
          <div key={i} className='icon'>
          <img alt='step-tracker icon'  src={stepCompleted} />
          </div>
        )}
      else if (step === this.props.step){
        return(
          <div key={i} className='icon'>
          <img alt='step-tracker icon'  src={stepActive} />
          </div>
        )}
      else {
        return(
          <div key={i} className='icon'>
          <img alt='step-tracker icon'  src={stepInactive} />
          </div>
        )}
    })

//not working
    //   switch(step){
    //     case step < this.props.step:
    //         return <img key={i} src={stepCompleted} />;
    //     case step === this.props.step:
    //         return <img key={i} src={stepActive} />;
    //     case step > this.props.step:
    //         return <img key={i} src={stepInactive} />;
    //     default:
    //         return <img key={i} src={stepInactive} />;
    // }})


    return (
     
      <div className='step-tracker-container'> 
        <div className='step-tracker-header'>
          <p>Add New Listing</p>
          <button className='cancel-button' onClick={()=>this.leaveWizard()}>Cancel</button>
        </div>
        <div className='step-tracker-div'>
          <p>{`Step ${this.props.step}`}</p>
          <div className='step-icons'>
            
              {stepIcons}
           
          </div>
        </div>
      </div>
      
    );
  }
}

export default StepsTracker;