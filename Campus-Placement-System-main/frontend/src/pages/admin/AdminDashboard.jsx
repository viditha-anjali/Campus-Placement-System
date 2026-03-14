import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import api from '../../api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [students, setStudents] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [placements, setPlacements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, studentsRes, companiesRes, placementsRes] = await Promise.all([
                    api.get('admin/dashboard/'),
                    api.get('admin/students/'),
                    api.get('admin/companies/'),
                    api.get('admin/placements/')
                ]);
                setStats(statsRes.data);
                setStudents(studentsRes.data);
                setCompanies(companiesRes.data);
                setPlacements(placementsRes.data);
            } catch (err) {
                console.error("Failed to load admin dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center mt-5"><h4>Loading Placement Analytics...</h4></div>;

    return (
        <div className="admin-dashboard">
            <h2 className="mb-4">Placement Cell Admin Dashboard</h2>
            <hr/>
            
            <section className="analytics-overview mb-5">
                <h4>Analytics Overview</h4>
                <Row>
                    <Col md={4} className="mb-3">
                        <Card className="text-white bg-primary shadow-sm border-0 h-100">
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                <Card.Title>Total Students</Card.Title>
                                <h2 className="display-4 font-weight-bold">{stats?.total_students}</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="text-white bg-success shadow-sm border-0 h-100">
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                <Card.Title>Total Companies</Card.Title>
                                <h2 className="display-4 font-weight-bold">{stats?.total_companies}</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="text-white bg-info shadow-sm border-0 h-100">
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                <Card.Title>Total Jobs Posted</Card.Title>
                                <h2 className="display-4 font-weight-bold">{stats?.total_jobs}</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Card className="text-white bg-warning shadow-sm border-0 text-dark h-100">
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                <Card.Title>Total Applications</Card.Title>
                                <h2 className="display-4 font-weight-bold">{stats?.total_applications}</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Card className="text-white bg-danger shadow-sm border-0 h-100">
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                <Card.Title>Successful Placements</Card.Title>
                                <h2 className="display-4 font-weight-bold">{stats?.total_placements}</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>

            <section className="detailed-lists">
                <Tabs defaultActiveKey="students" id="admin-dashboard-tabs" className="mb-3">
                    <Tab eventKey="students" title="Students">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Table responsive hover>
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Major</th>
                                            <th>GPA</th>
                                            <th>Graduation</th>
                                            <th>Skills</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(student => (
                                            <tr key={student.id}>
                                                <td>{student.first_name} {student.last_name}</td>
                                                <td>{student.major}</td>
                                                <td>{student.gpa || 'N/A'}</td>
                                                <td>{student.graduation_year || 'N/A'}</td>
                                                <td>{student.skills || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Tab>
                    <Tab eventKey="companies" title="Companies">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Table responsive hover>
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Company Name</th>
                                            <th>Location</th>
                                            <th>Website</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companies.map(company => (
                                            <tr key={company.id}>
                                                <td>{company.name}</td>
                                                <td>{company.location || 'N/A'}</td>
                                                <td>{company.website ? <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a> : 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Tab>
                    <Tab eventKey="placements" title="Placements">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Table responsive hover>
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Student</th>
                                            <th>Company</th>
                                            <th>Job Title</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {placements.map(app => (
                                            <tr key={app.id}>
                                                <td>{app.student_details?.first_name} {app.student_details?.last_name}</td>
                                                <td>{app.job_details?.company_name}</td>
                                                <td>{app.job_details?.title}</td>
                                                <td><span className="badge bg-success">{app.status}</span></td>
                                                <td>{new Date(app.applied_on).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>
            </section>
        </div>
    );
};

export default AdminDashboard;
