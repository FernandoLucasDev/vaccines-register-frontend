import React, { useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

const VaccineRegister = ({ onSave, onCancel, isLoading }) => {
    const [vaccineData, setVaccineData] = useState({
        name: '',
        producer_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaccineData({ ...vaccineData, [name]: value });
    };

    const handleSave = () => {
        if (vaccineData.name && vaccineData.producer_name) {
            onSave(vaccineData);
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <Form className='w-75'>

        <Row>
            <Col sm={6}>
            <Form.Group controlId="formVaccineName">
                <Form.Label>Vaccine Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={vaccineData.name}
                    onChange={handleChange}
                    placeholder="Enter vaccine name"
                    required
                />
            </Form.Group>
            </Col>
            <Col sm={6}>
            <Form.Group controlId="formProducerName">
                <Form.Label>Producer Name</Form.Label>
                <Form.Control
                    type="text"
                    name="producer_name"
                    value={vaccineData.producer_name}
                    onChange={handleChange}
                    placeholder="Enter producer name"
                    required
                />
            </Form.Group>
            </Col>
        </Row>
        {
            !isLoading ? 
            (
                <Form.Group className="mb-3 mt-3">
                    <Button variant="primary" onClick={handleSave} className="me-2 w-25">
                        Save
                    </Button>
                    <Button variant="secondary" className='w-25' onClick={onCancel}>
                        Cancel
                    </Button>
                </Form.Group>
            ) : (
                <Spinner animation="grow" variant="info" />
            )
        }
    </Form>
    );
};





export default VaccineRegister;
