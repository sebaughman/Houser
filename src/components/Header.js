import React, { Component } from 'react';
import axios from 'axios';
import './header.css'


class Header extends Component {



  logout(){
    axios.delete(`/api/logout`)
      .then(response=>{
        console.log(response)
        this.props.history.push('/')
      })
  }

  render() {
    
    return (
     
      <div className="header-container">

      <div className="header">

        <div className="title-container">
          <div className='header-logo' />
          <div className='title'> Houser Dashboard </div>
        </div>

        <div className='logout'> <button onClick={()=>this.logout()}>Logout</button></div>
      </div>
      </div>
      
    );
  }
}

export default Header;