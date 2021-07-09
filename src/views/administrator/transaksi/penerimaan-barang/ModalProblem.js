import React from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,  
} from '@coreui/react';

const ModalProblem = props => {
    let {
        openProblemModal,
        setOpenProblemModal,
        inputProblem,
        problemChangeHandler,
        formDisabled,
        additionalFormSubmitHandler
    } = props;

    return (
        <CModal 
            show={openProblemModal} 
            onClose={() => setOpenProblemModal(!openProblemModal)}
            color="primary"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Tambah Data Problem / Request</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="nama-problem">Nama Problem / Request</CLabel>
                        <CInput type="text" id="nama-problem" name="nama_problem" value={inputProblem.nama_problem} onChange={problemChangeHandler} placeholder="Masukkan Nama Problem" disabled={formDisabled} />
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => additionalFormSubmitHandler('problem')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setOpenProblemModal(!openProblemModal)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalProblem;