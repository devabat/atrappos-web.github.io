import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {
    faWalking,
    faTrashAlt,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditPathModal = (props) => {
    const {showEditPathModal, showEditModal, discardAll} = props;
    const [show, setShow] = useState(false);

    const handleClose = () => {
        showEditModal(false)
    };


    useEffect(()=> {
        setShow(showEditPathModal)
    }, [showEditPathModal]);


    return (
            <Modal show={show}
                   onHide={handleClose}
                   backdrop="static"
                   backdropClassName="warning-backdrop"
                   dialogClassName="warning-modal">
                <Modal.Header>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have unsaved changes. What would you like to do?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={discardAll}>
                        <span><FontAwesomeIcon icon={faTrashAlt} /></span>
                        <span>Discard</span>
                    </Button>
                    <Button variant="info" onClick={handleClose}>
                        <span><FontAwesomeIcon icon={faWalking} /></span>
                        <span>Continue</span>
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}
