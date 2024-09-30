import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ show, handleClose, message }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Atention</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MessageModal;
