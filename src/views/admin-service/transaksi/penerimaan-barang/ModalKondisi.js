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

const ModalKondisi = props => {
    let {
        openKondisiModal,
        setOpenKondisiModal,
        inputKondisi,
        kondisiChangeHandler,
        formDisabled,
        additionalFormSubmitHandler
    } = props;

    return (
        <CModal 
            show={openKondisiModal} 
            onClose={() => setOpenKondisiModal(!openKondisiModal)}
            color="primary"
        >
            <CModalHeader closeButton>
                <CModalTitle>Tambah Data Kondisi</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="nama-kondisi">Nama Kondisi</CLabel>
                        <CInput type="text" id="nama-kondisi" name="nama_kondisi" value={inputKondisi.nama_kondisi} onChange={kondisiChangeHandler} placeholder="Masukkan Nama Kondisi" disabled={formDisabled} />
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => additionalFormSubmitHandler('kondisi')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setOpenKondisiModal(!openKondisiModal)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalKondisi;