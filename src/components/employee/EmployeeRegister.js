import React, { useEffect, useState } from 'react';
import { validateCPF } from '../../services/validators/Validators';
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import VaccinesService from '../../services/vaccines/VaccinesService';
import { cpfFormt } from '../../services/formaters/CpfFormat';

const EmployeeRegister = ({ onSave, onCancel, isLoading }) => {
    const [vaccines, setVaccines] = useState([]);
    const [isCpfValid, setIsCpfValid] = useState(true);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [error, setError] = useState('');
    const [employeeData, setEmployeeData] = useState({
        cpf: '',
        full_name: '',
        birth_date: '',
        vaccine_id: '',
        batch: '',
        validate_date: null,
        first_dose_vaccine: null,
        second_dose_vaccine: null,
        third_dose_vaccine: null,
        is_pcd: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName && !lastName) {
            setError('Por favor, insira pelo menos um nome ou sobrenome.');
            return;
        }

        employeeData.full_name = `${firstName} ${lastName}`;

        if (validateCPF(employeeData.cpf)) {
            employeeData.cpf = cpfFormt(employeeData.cpf);
            onSave(employeeData);
        } else {
            setIsCpfValid(false);
        }
    };

    useEffect(() => {
        const fetchVaccines = async () => {
            try {
                let vac = await VaccinesService.getAll();
                setVaccines(vac.data);
            } catch (error) {
                setError('Failed to fetch vaccines. Please try again.');
                console.error(error);
            }
        };

        fetchVaccines();
    }, []);

    return (
        <Form onSubmit={handleSubmit} className='w-75'>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row>
                <Col sm={6}>
                    <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="first_name" 
                            placeholder="Enter first name" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required 
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="last_name" 
                            placeholder="Enter last name" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="formCpf" className="mb-3">
                <Form.Label>CPF</Form.Label>
                {!isCpfValid && (
                    <Form.Text className="text-danger">
                        CPF inválido. Por favor, insira um CPF válido.
                    </Form.Text>
                )}
                <InputMask
                    mask="999.999.999-99"
                    value={employeeData.cpf}
                    onChange={handleChange}
                >
                    {() => (
                        <Form.Control 
                            type="text" 
                            name="cpf" 
                            placeholder="Enter CPF"
                            className={!isCpfValid ? 'is-invalid' : ''}
                            required 
                        />
                    )}
                </InputMask>
            </Form.Group>

            <Row>
                <Col sm={6}>
                    <Form.Group controlId="formBirthDate" className="mb-3">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="birth_date" 
                            value={employeeData.birth_date}
                            onChange={handleChange}
                            required 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="formIsPcd" className="mb-3">
                <Form.Check 
                    type="checkbox" 
                    name="is_pcd" 
                    label="Is PCD (Person with Disability)" 
                    checked={employeeData.is_pcd}
                    onChange={handleChange} 
                />
            </Form.Group>

            <Row>
                <Col sm={6}>
                    <Form.Group controlId="formVaccine">
                        <Form.Label>Vaccine</Form.Label>
                        <Form.Control
                            as="select" 
                            name="vaccine_id"
                            value={employeeData.vaccine_id} 
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a vaccine</option>
                            {Array.isArray(vaccines) && vaccines.length > 0 ? (
                                vaccines.map((vaccine) => (
                                    <option key={vaccine.id} value={vaccine.id}>
                                        {vaccine.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No vaccines available.</option> 
                            )}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group controlId="formBatch" className="mb-3">
                        <Form.Label>Batch</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="batch" 
                            placeholder="Enter batch number" 
                            value={employeeData.batch}
                            required={employeeData.vaccine_id != 1}
                            onChange={handleChange} 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <Form.Group controlId="formFirstDoseDate" className="mb-3">
                        <Form.Label>First Dose Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="first_dose_vaccine" 
                            value={employeeData.first_dose_vaccine}
                            required={employeeData.vaccine_id != 1}
                            onChange={handleChange} 
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group controlId="formSecondDoseDate" className="mb-3">
                        <Form.Label>Second Dose Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="second_dose_vaccine" 
                            value={employeeData.second_dose_vaccine}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <Form.Group controlId="formThirdDoseDate" className="mb-3">
                        <Form.Label>Third Dose Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="third_dose_vaccine" 
                            value={employeeData.third_dose_vaccine}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group controlId="formValidateDate" className="mb-3">
                        <Form.Label>Vaccine validate Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="validate_date" 
                            value={employeeData.validate_date}
                            onChange={handleChange}
                            required={employeeData.vaccine_id != 1}
                        />
                    </Form.Group>
                </Col>
            </Row>

            {
                !isLoading ? (
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit" className="me-2 w-25">
                        Save
                    </Button>
                    <Button variant="secondary" className='w-25' onClick={onCancel}>
                        Cancel
                    </Button>
                </Form.Group>
            ) : (
                <div className="justify-content-center align-items-center w-100" style={{ height: '100vh' }}>
                    <Spinner animation="grow" variant="info" />
                </div>
            )
            }
        </Form>
    );
};

export default EmployeeRegister;
