import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import './style.css';
export class Login extends React.Component {
 
 constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
     }
   }
    onChange(e){
        if(e.target.name === 'email') {
            this.setState({email: e.target.value});
        }else{
            this.setState({password: e.target.value});
        }   
    }
    
   handleSubmit(event) {
    event.preventDefault();
	const {email, password} = this.state;
	   Meteor.loginWithPassword(email, password, (error) => {
     if (error) {
       alert(error.reason, 'warning');
     } else {
       alert('Logged in!', 'success');
         browserHistory.push('/');
     }
   });
  }

  render() {
    return(
      <div className="login-page"  style={{ backgroundColor: 'darkseagreen', padding: 10, marginTop: 65 }}>
        <div className="form" style={{ marginTop: 30 }}>
          <h4 style={{ marginTop: 0 }}>Login</h4>
          <form ref="login" onSubmit={ (e) => this.handleSubmit(e) }>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="email"
                ref="email"
                name="email"
                onChange={(e) => this.onChange(e)}
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup>
            <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
                onChange={(e) => this.onChange(e)}
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Login</Button>
          </form>
        </div>
      </div>
    );
  }
}
