import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Contacts } from '../../api/contact/contact.js';
import { updateContact } from '../../api/contact/method.js';

export class Edit extends React.Component {
    constructor(props) {
        super(props);
        var contacts = Contacts.find(this.props.params.id).fetch();
        this.state = {
            contact: contacts[0],
            validation: false,
        };
    }
    componentWillMount() {
        this.setState({ validation: false });
    }
    onChange(e) {
        if (e.target.name === 'firstName') {
            this.state.contact.firstName = e.target.value;
        }
        else if (e.target.name === 'lastName') {
            this.state.contact.lastName = e.target.value;
        }
        else if (e.target.name === 'email') {
            this.state.contact.email = e.target.value;
        }
        this.setState(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { _id, firstName, lastName, email } = this.state.contact;
        var that = this;
        if (this.state.contact.firstName !== '' && this.state.contact.lastName !== '' && this.state.contact.email !== '') {
            updateContact.call({
                _id,
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
        }
    }
    getValidationState() {
        if (this.state.validation) {
            if (this.state.firstName === '') return "error";
            if (this.state.lastName === '') return "error";
            if (this.state.email === '') return "error";
        }
    }
    onCancel(event) {
        event.preventDefault();
        browserHistory.push('/contacts');
    }

    render() {
        return (
            <Panel header="Edit Contact" bsStyle="primary" style={{ marginTop: '2%' }}>
                <form className="create" onSubmit={(e) => this.handleSubmit(e) }>
                    <Row>
                        <Col xs={ 6 } sm={ 6 }>
                            <FormGroup validationState={this.getValidationState() }>
                                <ControlLabel>First Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.contact.firstName}
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={(e) => this.onChange(e) }
                                    />
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                        <Col xs={ 6 } sm={ 6 }>
                            <FormGroup>
                                <ControlLabel>Last Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.contact.lastName}
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={(e) => this.onChange(e) }
                                    />
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <ControlLabel>Email Address</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.contact.email}
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
