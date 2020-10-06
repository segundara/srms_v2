import React from 'react';
import { Accordion, Card, Button, Table } from 'react-bootstrap'

const TutorDetail = ({ user }) => {

    return (
        <>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            My Account
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {user && (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="text-center" colSpan="2">Profile Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>First Name</td>
                                            <td><strong>{user.firstname}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Last Name</td>
                                            <td><strong>{user.lastname}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td><strong>{user.email}</strong></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Student List
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Tutor List
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            Student Record
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default TutorDetail