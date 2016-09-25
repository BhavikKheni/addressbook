import React from 'react';
import { Row, Col, Glyphicon, Button, Grid } from 'react-bootstrap';
import { Link } from 'react-router';

import './style.css';
export class Contacts extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>

                        <h4 className="page-header">Contacts</h4>
                        <Link to="/contacts/ContactCreate"><Button bsStyle="success">Create</Button></Link> <Link to="/contacts/ContactList">
                            <Button bsStyle="info">List</Button></Link>
                    </Col>
                    <Col xs={12} md={8}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
