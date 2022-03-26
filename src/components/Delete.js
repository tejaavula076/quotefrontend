import React, { useState } from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom";

export const DeleteModal = (props) => {
  const { id, isOpen } = props;
  // Modal open state
  const [modal, setModal] = React.useState(isOpen);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  const history = useHistory();
  async function deleteQuote(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });
    //window.location.reload();
    setModal?.(false);
    props.onClose();
  }

  const onClose1 = () => {
    setModal?.(false);
    props.onClose();
  };

  return (
    <>
      <div
        style={{
          display: "block",
          width: 700,
          padding: 30
        }}
      >
        <Modal
          isOpen={modal}
          // toggle={toggle}
          modalTransition={{ timeout: 500 }}
        >
          <ModalHeader>Delete Quote</ModalHeader>
          <ModalBody>You really want to delete this quote?</ModalBody>
          <ModalFooter>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => onClose1()}
            >
              Close
            </Button>
            <Button
              type="button"
              className="btn btn-primary"
              onClick={() => deleteQuote(id)}
            >
              Yes, Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default DeleteModal;
