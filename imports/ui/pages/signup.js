import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import './style.css';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  }

  onChange(e) {
    if (e.target.name === 'firstName') {
      this.setState({ firstName: e.target.value });
    } else if (e.target.name === 'lastName') {
      this.setState({ lastName: e.target.value });
    } else if (e.target.name === 'email') {
      this.setState({ email: e.target.value });
    } else if (e.target.name === 'password') {
      this.setState({ password: e.target.value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      profile: {
        name: {
          first: this.state.firstName,
          last: this.state.lastName,
        },
      },
    };
    Accounts.createUser(user, (error) => {
      if (error) {
        alert(error.reason, 'danger');
      } else {
        browserHistory.push('/');
        alert('Welcome!', 'success');
      }
    });
  }

  render() {
    return (
      <div className="login-page" style={{backgroundColor: 'darkseagreen', padding: 10 }}>
        <div className="form" style={{ marginTop: 30 }}>
          <h4 className="page-header" style={{ marginTop: 0 }}>Sign Up</h4>
          <form ref="signup" className="login-form"  onSubmit={(e) => this.handleSubmit(e) }>
            <FormGroup>
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                type="text"
                ref="firstName"
                name="firstName"
                placeholder="First Name"
                onChange={(e) => this.onChange(e) }
                />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                type="text"
                ref="lastName"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) => this.onChange(e) }
                />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="text"
                ref="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => this.onChange(e) }

                />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
                onChange={(e) => this.onChange(e) }
                />
            </FormGroup>
            <Button type="submit" bsStyle="success">Sign Up</Button>
          </form>
          <p>Already have an account?<Link to="/login">Log In</Link>.</p>
        </div>
      </div>
    );
  }
}
