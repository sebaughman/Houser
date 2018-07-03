import React, { Component } from 'react';
import axios from 'axios';
import './login.css'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(event, name){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login(){
        axios.post(`/api/login`, this.state)
            .then(response=>{
                
                if(response.data.success === true){
                    this.props.history.push('/dashboard')
                }
                else{
                    alert(`${response.data.message}`)
                }
            })
            .catch(err=>{
                console.error(err)
            })
            
    }

    register(){
        axios.post(`http://localhost:8080/api/register`, this.state)
            .then(response=>{
                console.log(response)
                if(response.data.success === true){
                    this.props.history.push('/dashboard')
                }
                else{
                    alert(`${response.data.message}`)
                }
            })
    }

  render() {
    return (
     
      <div className="login-div"> 
        <div className="logo"  />
        <div className="inputs">
            <label>Username</label>
            <input type="text" name="username" value={this.state.username} onChange={(event, name)=>this.handleChange(event, name)} />
            <label> Password </label>
            <input type="password" name="password" value={this.state.password} onChange={(event, name)=>this.handleChange(event, name)} />
        </div>
        <div className="button-container">
                <button className="login" onClick={()=>this.login()}>Login</button>
                <button className="register" onClick={()=>this.register()}>Register</button>
        </div>
    
      
      
      </div>
      
    );
  }
}

export default Login;