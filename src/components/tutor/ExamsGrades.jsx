import React, { useState, useEffect } from 'react'
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import { Row, Col, Tab, Nav, Table, Badge } from 'react-bootstrap';

function ExamsGrades({ userID, studentsRecord }) {
    console.log(studentsRecord)
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="0">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            {studentsRecord && (
                                studentsRecord.map((list, i) => {
                                    return (
                                        <Nav.Item key={i}>
                                            <Nav.Link eventKey={i} className="d-flex justify-content-between">
                                                <h5>{list.name}</h5>
                                                <Badge variant="light"><h5>{list.students.length} Student(s)</h5></Badge>
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                })
                            )}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {studentsRecord && (
                                studentsRecord.map((list, i) => {
                                    return (
                                        <Tab.Pane key={i} eventKey={i}>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.students.map((s, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{s.firstname}</td>
                                                                <td>{s.lastname}</td>
                                                                <td>{s.email}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Tab.Pane>
                                    )
                                })
                            )}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}

export default ExamsGrades
