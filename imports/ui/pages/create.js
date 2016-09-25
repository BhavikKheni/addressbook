import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { insertContact, updateContact } from '../../api/contact/method.js';

export class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      validation: false,
    }
  }

  componentWillMount() {
    this.setState({ validation: false });
  }

  onChange(e) {
    if (e.target.name === 'firstName') {
      this.setState({ firstName: e.target.value });
    } else if (e.target.name === 'lastName') {
      this.setState({ lastName: e.target.value });
    } else if (e.target.name === 'email') {
      this.setState({ email: e.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {firstName, lastName, email } = this.state;
    if (firstName !== '' && lastName !== '' && email !== '') {
      insertContact.call({
        firstName,
        lastName,
        email,
      }, (error) => {
        if (error) {
          console.log(error.reason, 'danger');
        } else {
          browserHistory.push('/contacts/ContactList');
        }
      });
    } else {
      this.setState({ validation: true });
    }
  }
  onCancel(event) {
    event.preventDefault();
    browserHistory.push('/contacts');
  }
  getValidationState() {
    if (this.state.validation) {
      if (this.state.firstName === '') return "error";
      if (this.state.lastName === '') return "error";
      if (this.state.email === '') return "error";
    }
  }
  render() {
    return (
      <Panel header="Create Contact" bsStyle="primary" style={{ marginTop: '2%' }}>
        <form className="create" onSubmit={(e) => this.handleSubmit(e) }>
          <Row>
            <Col xs={ 6 } sm={ 6 }>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState() }>
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.firstName}
                  name="firstName"
                  placeholder="First Name"
                  onChange={(e) => this.onChange(e) }
                  />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
            <Col xs={ 6 } sm={ 6 }>
              <FormGroup  controlId="formBasicText2"  validationState={this.getValidationState() }>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.lastName}
                  name="lastName"
                  placeholder="Last Name"
                  onChange={(e) => this.onChange(e) }
                  />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup controlId="formBasicText3" validationState={this.getValidationState() }>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              name="email"
              placeholder="Email Address"
              onChange={(e) => this.onChange(e) }
              />
            <FormControl.Feedback />
          </FormGroup>
          <Button type="submit" bsStyle="success">Save</Button> <Button
            type="button" bsStyle="default" onClick={(e) => this.onCancel(e) }>cancel</Button>
        </form>
      </Panel>
    );
  }
}
