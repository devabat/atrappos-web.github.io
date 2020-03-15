import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {
    faTimes,
    faTrash,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DeletePathModal = (props) => {
    const {showDeletePathModal, showDeleteModal, deleteName, deletePathAction} = props;
    const [show, setShow] = useState(false);

    const handleClose = () => {
        showDeleteModal(false, null, null);
    };

    useEffect(()=> {
        setShow(showDeletePathModal)
    }, [showDeletePathModal]);


    return (
            <Modal show={show}
                   onHide={handleClose}
                   backdrop="static"
                   backdropClassName="warning-backdrop"
                   dialogClassName="warning-modal">
                <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the path <b>{deleteName}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        <span><FontAwesomeIcon icon={faTimes} /></span>
                        <span>Cancel</span>
                    </Button>
                    <Button variant="danger" onClick={deletePathAction}>
                        <span><FontAwesomeIcon icon={faTrash} /></span>
                        <span>Delete</span>
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}
