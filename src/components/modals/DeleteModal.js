import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this employee?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
