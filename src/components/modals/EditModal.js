import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import VaccinesService from '../../services/vaccines/VaccinesService';

const EditModal = ({ show, handleClose, handleSave, employee }) => {
    const [name, setName] = useState(employee?.full_name || '');
    const [vaccineId, setVaccineId] = useState(employee?.vaccines[0].vaccine_id || '');
    const [firstDose, setFirstDose] = useState(employee?.vaccines[0].first_dose_vaccine || '');
    const [secondDose, setSecondDose] = useState(employee?.vaccines[0].first_dose_vaccine || '');
    const [thirdDose, setThirdDose] = useState(employee?.vaccines[0].first_dose_vaccine || '');
    const [batch, setBatch] = useState(employee?.vaccines[0].batch || '');
    const [validate, setValidate] = useState(employee?.vaccines[0].validate_date || '');
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        const fetchVaccines = async () => {
            try {
                let vac = await VaccinesService.getAll();
                setVaccines(vac.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchVaccines();
        setName(employee?.full_name || '');
        setVaccineId(employee?.vaccines[0].vaccine_id || '');
        setFirstDose(employee?.vaccines[0].first_dose_vaccine || '');
        setSecondDose(employee?.vaccines[0].second_dose_vaccine || '');
        setThirdDose(employee?.vaccines[0].third_dose_vaccine || '');
        if (employee?.vaccines[0].vaccine_id !== 1) {
            setBatch(employee?.vaccines[0].batch || '');
            setValidate(employee?.vaccines[0].validate_date || '');
        } else {
            setBatch(null); 
            setValidate(null);
        }
    }, [employee]);

    const handleSaveChanges = () => {
        handleSave({
            ...employee,
            full_name: name,
            vaccine_id: vaccineId == "" ? employee?.vaccines[0].vaccine_id : vaccineId,
            first_dose_vaccine: firstDose == "" ? null : firstDose,
            second_dose_vaccine: secondDose == "" ? null : secondDose,
            third_dose_vaccine: thirdDose == "" ? null : thirdDose,
            validate_date:  validate == "" ? null : validate,
            batch: batch == "" ? null : batch
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formVaccine">
                        <Form.Label>Vaccine</Form.Label>
                        <Form.Control
                            as="select" 
                            value={vaccineId} 
                            disabled={employee?.vaccines[0].vaccine_id != 1}
                            onChange={(e) => setVaccineId(e.target.value)}
                        >
                            <option value="">{vaccineId != 1 ? employee?.vaccines[0].name : "Select a vaccine"}</option>
                            {Array.isArray(vaccines) && vaccines.length > 0 ? (
                                vaccines.map((vaccine) => (
                                    <option key={vaccine.id} value={vaccine.id}>
                                        {vaccine.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No vaccines available</option> 
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFirstDoseDate" className="mt-3">
                        <Form.Label>First Dose Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={firstDose}
                            onChange={(e) => setFirstDose(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSecondDoseDate" className="mt-3">
                        <Form.Label>Second Dose Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={secondDose}
                            onChange={(e) => setSecondDose(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formThirdDoseDate" className="mt-3">
                        <Form.Label>Third Dose Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={thirdDose}
                            onChange={(e) => setThirdDose(e.target.value)}
                        />
                    </Form.Group>
                    {
                        employee?.vaccines[0].vaccine_id === 1 &&
                        (<>
                        <Form.Group controlId="formBatch" className="mt-3">
                            <Form.Label>Batch</Form.Label>
                            <Form.Control
                                type="text"
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formValidate" className="mt-3">
                            <Form.Label>Validate Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={validate}
                                onChange={(e) => setValidate(e.target.value)}
                            />
                        </Form.Group>
                        </>)
                    }
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
