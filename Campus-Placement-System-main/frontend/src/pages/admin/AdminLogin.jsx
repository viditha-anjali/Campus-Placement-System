import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setCredentials({...credentials, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid admin credentials.');
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <Card.Title className="text-center mb-2 fs-3">Placement Cell Login</Card.Title>
                        <p className="text-center text-muted mb-4">Admin access only</p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Admin Username</Form.Label>
                                <Form.Control name="username" required onChange={handleChange} placeholder="Enter admin username" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" required onChange={handleChange} placeholder="Enter password" />
                            </Form.Group>
                            <Button type="submit" variant="info" className="w-100 text-white">Login as Admin</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default AdminLogin;
