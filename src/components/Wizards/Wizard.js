import React, { Component } from 'react';
import './wizard.css';
import Wizard1 from './Wizard1';
import Wizard2 from './Wizard2';
import Wizard3 from './Wizard3';
import Wizard4 from './Wizard4';
import Wizard5 from './Wizard5';
import Header from '../Header';
import StepsTracker from '../Wizards/StepsTracker';
import NextButton from '../Wizards/NextButton';
import PreviousButton from '../Wizards/PreviousButton';


class Wizard extends Component {
   
  render() {

    const step = this.props.match.params.step
    let display = (function(step){
        
        switch(step){
            case '1':
                return <Wizard1 />;
            case '2':
                return <Wizard2 />;
            case '3':
                return < Wizard3 />;
            case '4':
                return <Wizard4 />;
            case '5':
                return <Wizard5 />;
            default:
                return <Wizard1 />;
        }
    })(step);

  
    const buttonContainer = 
        this.props.match.params.step === '1'? 
               <div className='button-container'> 
                    <NextButton nextStep={ this.props.match.params.step }/> 
                </div>
               :
               <div className='button-container'> 
                    <PreviousButton previousStep={this.props.match.params.step - 1}/>
                    <NextButton history={this.props.history}  nextStep={ this.props.match.params.step } />
                </div>

    return (
        <div>
            <Header/>
            <div className='wizard-body-container'>
                <div className='mainBody'>

                <StepsTracker history={this.props.history} step={this.props.match.params.step}/>

                { display }

                { buttonContainer }
                <p></p>

                </div>
            </div>
        </div> 
    )
      
      
    
  }
}

export default Wizard;


