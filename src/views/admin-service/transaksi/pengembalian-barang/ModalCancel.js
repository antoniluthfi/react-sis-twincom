import React from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,  
    CButton
} from '@coreui/react';

const ModalCancel = props => {
    let {
        openCancelModal,
        closeModalHandler,
        submitHandler
    } = props;

    return (
        <CModal 
            show={openCancelModal} 
            onClose={() => closeModalHandler('Cancel')}
            color="success"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Cancel Barang</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Kembalikan sekarang?
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('Cancel')}>Kembalikan</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Cancel')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCancel;