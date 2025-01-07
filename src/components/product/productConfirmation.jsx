import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ show, onClose, onConfirm, actionType }) => {
let actionMessage = '';

if (actionType === 'create') {
    actionMessage = 'Are you sure you want to create this product?';
} else if (actionType === 'update') {
    actionMessage = 'Are you sure you want to update this product?';
} else if (actionType === 'delete') {
    actionMessage = 'Are you sure you want to delete this product?';
}

return (
    <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
    </Modal.Header>
    <Modal.Body>{actionMessage}</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
        Cancel
        </Button>
        <Button
        variant={actionType === 'delete' ? 'danger' : 'primary'}
        onClick={() => {
            onConfirm();
            onClose();
        }}
        >
        {actionType === 'delete' ? 'Delete' : 'Confirm'}
        </Button>
    </Modal.Footer>
    </Modal>
);
};

ConfirmationModal.propTypes = {
show: PropTypes.bool.isRequired,
onClose: PropTypes.func.isRequired,
onConfirm: PropTypes.func.isRequired,
actionType: PropTypes.oneOf(['create', 'update', 'delete']).isRequired,
};

export default ConfirmationModal;
