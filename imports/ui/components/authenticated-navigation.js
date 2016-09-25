import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem, Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './style.css';
const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

export  class AuthenticatedNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        oldPassword: '',
        newPassword: '',
    };
  }

  onChangePassword(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  handleClose() {
    this.setState({ showModal: false });
  }
  onChange(e) {
    if(e.target.name === 'oldPassword') {
      this.setState({ oldPassword: e.target.value });
    } else if (e.target.name === 'newPassword'){
      this.setState({ newPassword: e.target.value });
    }
  }
  onChangeOLdPassword(e){
    e.preventDefault();
  const { oldPassword, newPassword } = this.state;
  return new Promise((resolve, reject) => {
      Accounts.changePassword(oldPassword, newPassword, (error) => {
        if (error) {
          return reject(error);
        } else {
          this.setState({ showModal: false});
        }
      });
    });
  }
  render() {
    return (
      <div>
        <Nav>
          <IndexLinkContainer to="/">
            <NavItem eventKey={ 1 } href="/" className="contact">Index</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/contacts">
            <NavItem eventKey={ 2 } href="/contacts" className="contact">Contacts</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
            <MenuItem eventKey={ 3.1 } onClick={(e) => this.onChangePassword(e) }>Change Password</MenuItem>
            <MenuItem eventKey={ 3.2 } onClick={ handleLogout }>Logout</MenuItem>
          </NavDropdown>
        </Nav>
        <Modal show={this.state.showModal} onHide={this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <FormGroup>
              <ControlLabel>Old Password</ControlLabel>
              <FormControl
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={this.state.oldPassword}
                onChange={(e) => this.onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>New Password</ControlLabel>
              <FormControl
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={this.state.newPassword}
                onChange={(e) => this.onChange(e)}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose.bind(this) }>CANCEL</Button>
            <Button bsStyle="primary" onClick={(e) => this.onChangeOLdPassword(e) }>OK</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}