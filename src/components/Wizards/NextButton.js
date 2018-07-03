import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { resetState } from '../../redux/action-creators'
import './buttons.css';



class NextButton extends Component {
  // constructor(props){
  //   super(props)

  //   this.addProperty = this.addProperty.bind(this)
  // }
 

  addProperty(){
    const { name, description, address, city, state, zip, image, loan_amount, monthly_mortgage, desired_rent } = this.props
    const newProperty = { name, description, address, city, state, zip, image, loan_amount, monthly_mortgage, desired_rent }
    // const newProperty =
    // {
    //   name: this.props.name, 
    //   description: this.props.description,  
    //   address: this.props.address,
    //   city: this.props.city, 
    //   state: this.props.state,
    //   zip: this.props.zip,
    //   image: this.props.image,
    //   loan_amount: this.props.loan_amount,  
    //   monthly_mortgage: this.props.monthly_mortgage,
    //   desired_rent: this.props.desired_rent,
    // }
  
    axios.post('/api/property', newProperty)
      .then((response)=>{
       
        this.props.resetState();
        this.props.history.push('/dashboard')
      })
      .catch((err)=>{
        console.log(err)
        alert(err.response.data.message)
        this.props.history.push('/')
      })
  }


  render() {
    const next = Number(this.props.nextStep) + 1;
    const button =  next === 6 ? 
       
          <button className='completeButton' onClick={()=>{this.addProperty()}}>Complete</button>
       
      : <Link to={`/wizard/${next}`}> 
          <button className='nextButton'>Next Step</button>
        </Link>
 
    return (
      <div>
        {button}
      </div>
    );
  }
}




export default connect(state=>state, { resetState })(NextButton); 