import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './dashboard.css';


class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            filteredRent: 0,
            isLoaded: false,
            properties: [],
            allListings: false,
        }
    }

    componentDidMount(){
        axios.get('/api/properties')
            .then(response=>{
                console.log(response)
                this.setState({
                    isLoaded:true,
                    properties: response.data,
                })
            })
            .catch(err=>{
                console.log(err)
                alert(err.response.data.message)
                this.props.history.push('/')
            })
    }

    enterFilteredRent(event){
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    filterProperties(){
        this.setState({
            isLoaded:false,
        })
        axios.get(`/api/properties/${this.state.filteredRent}`)
            .then(response=>{
                console.log(response)
                this.setState({
                    isLoaded:true,
                    properties: response.data,
                })
            })
            .catch(err=>{
                console.log(err)
                alert(err.response.data.message)
                this.props.history.push('/')
            })
    }

    seeAllListings(){
        this.setState({
            isLoaded:false,
            allListings: true,
        })
        axios.get('/api/allProperties')
            .then(response=>{
                this.setState({
                    isLoaded:true,
                    properties: response.data,
                })
            })
            .catch(err=>{
                console.log(err)
                alert(err.response.data.message)
                this.props.history.push('/')
            })
    }

    resetProperties(){
        this.setState({
            isLoaded: false,
            allListings: false,
        })
        axios.get('/api/properties')
            .then(response=>{
                console.log(response)
                this.setState({
                    isLoaded:true,                        
                    properties: response.data,
                    })
                })
             .catch(err=>{
                console.log(err)
                alert(err.response.data.message)
                this.props.history.push('/')
            })
        
    }

    removeProperty(id){
        this.setState({
            isLoaded:false,
        })
        axios.delete(`/api/property/${id}`)
            .then(response=>{
                console.log(response)
                this.resetProperties()
            })
            .catch(err=>{
                console.log(err)
                alert(err.response.data.message)
                this.props.history.push('/')
            })
    }

  render() {
      const properties = this.state.properties.map((property, i)=>{
          return(
              <div className="property-tile" key={property.id}>
                <div className="property-img" style={{backgroundImage: "url(" + property.image+ ")"}}/>
                <div className="property-info">
                   
                    <p className="property-name">{property.name}</p>
                    <p className="property-address">{property.address}</p>
                    <p className="property-city-state-zip">{`${property.city}, ${property.state} ${property.zip}`}</p>
                    <div className="property-description"><p>{property.description}</p></div>
                    <p className="property-rent">{`$${property.desired_rent}`}</p>
                    <p className="property-loan-info">{`Loan Amount: $${property.loan_amount}   Monthly Mortgage: $${property.monthly_mortgage}`}</p>
                </div>
                <button onClick={(id)=>this.removeProperty(property.id)}className='delete'>X</button>
              </div>
          )
      })
    return (
     
      <div> 
          <Header history={this.props.history}/>
          <div className="dashboard-container">
            <div className="dashboard-body">
                <div className='dashboard-title'>
                    {this.state.allListings === false ? 
                    <p className="listing-title"> My Home Listings </p>
                    : <p className="listing-title"> All Home Listings </p>
                    }
                    
                    {this.state.allListings === false ? 
                    <button className='seeListings' onClick={()=>this.seeAllListings()}>See All Listings</button>
                    : <button className='seeListings' onClick={()=>this.resetProperties()}>See My Listings</button>
                    }
                </div>

                <div className="filter-container">
                    <p>List properties with rent greater than: </p>
                    <input type="text" name="filteredRent" placeholder="0" onChange={(event)=>{this.enterFilteredRent(event)}}/>
                    <div className="filter-button-container">
                        <button className="filter-button" onClick={()=>this.filterProperties()}>Filter</button>
                        <button className="reset-button" onClick={()=>this.resetProperties()}>Reset</button>
                    </div>
                </div>

                <div className="listings">
                    {this.state.isLoaded === false ? `...loading`
                        :properties
                    }
                </div>
                <Link to="/wizard/1" >
                    <button className="add-property-button">Add New Property</button>
                </Link>
            </div>
          </div>

      </div>
      
    );
  }
}

export default Dashboard;