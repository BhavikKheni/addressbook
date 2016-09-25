import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Table, Glyphicon, Panel, FormControl, Col, Modal, Button, Pager } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Contacts } from '../../api/contact/contact.js';
import { removeContact } from '../../api/contact/method.js';

import { Meteor } from 'meteor/meteor';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            search: '',
            start: 0,
            limit: 3,
            contact: [],
        };
    }

    deleteContact(event, contact) {
        event.preventDefault();
        this.setState({ showModal: true, contact });
    }

    componentDidMount() {
        Tracker.autorun(() => {
            Meteor.subscribe('contacts', () => {
                this.loadContacts(0);
            });
        });
    }
    onChange(e) {
        if (e.target.value) {
            this.onSearch(e.target.value);
        } else {
            this.loadContacts(this.state.start);
        }
    }

    loadContacts(start) {
        const { limit } = this.state;
        const contact = Contacts.find({}, { skip: start, limit }).fetch();
        this.setState({ contact, start });
    }

    onNext(e, next) {
        e.preventDefault();
        if (next <= this.props.contacts.length) {
            this.loadContacts(next);
        }
    }

    onPrev(e, prev) {
        e.preventDefault();
        if (prev >= 0) {
            this.loadContacts(prev);
        }
    }
    onSearch(keyword) {
        const name = keyword.trim();
        const regex = new RegExp(name, "gi");
        const contact = Contacts.find({ $or: [{ firstName: regex }] }).fetch();
        this.setState({ contact });
    }
    handleRemoveContact(e, id) {
        e.preventDefault();
        removeContact.call({
            id,
        }, (error) => {
            if (error) {
                alert(error.reason, 'danger');
            } else {
                this.setState({ showModal: false, contact: null });

            }
        });
    }

    handleClose() {
        this.setState({ showModal: false, contact: null });
    }

    renderContats() {
        let that = this;

        return this.state.contact.map((contact, i) => (
            <tr key={i}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td className="text-center"><Link to={{ pathname: '/contacts/contactEdit/' + contact._id }} >
                    <Glyphicon glyph="pencil"
                        style={{ cursor: 'pointer' }}/>
                </Link></td>
                <td className="text-center"><span onClick={(e) => this.deleteContact(e, contact) }>
                    <Glyphicon glyph="remove"
                        style={{ cursor: 'pointer' }}/>
                </span></td>
            </tr>

        ));
    }
    render() {
        const {start, limit} = this.state;
        return (
            <Panel header="create contact" bsStyle="primary" style={{ marginTop: '2%' }}>
                <Col sm={6} className="pull-right" style={{ padding: 10 }}>
                    <FormControl
                        type="text"
                        name="keyword"
                        placeholder="search"
                        onChange={(e) => this.onChange(e) }
                        />
                </Col>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th className="text-center">First Name</th>
                            <th className="text-center">Last Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderContats() }
                    </tbody>
                </Table>
                <Modal show={this.state.showModal} onHide={() => this.handleClose.bind() }>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.contact &&
                            <p> Are you sure you want to delete <b> {this.state.contact.firstName} </b>?</p>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose.bind(this) }>CANCEL</Button>
                        <Button bsStyle="primary" onClick={(e) => this.handleRemoveContact(e, this.state.contact._id) }>OK</Button>
                    </Modal.Footer>
                </Modal>
                <Pager>
                    <Pager.Item previous onClick={(e) => this.onPrev(e, start - limit)}>Previous</Pager.Item>
                    <Pager.Item next onClick={(e) => this.onNext(e, start + limit) }>Next</Pager.Item>
                </Pager>
            </Panel>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('contacts');
    return {
        contacts: Contacts.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
        user: Meteor.user(),
    };
}, List);