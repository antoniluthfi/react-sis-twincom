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

const ModalKelengkapan = props => {
    let {
        openKelengkapanModal,
        setOpenKelengkapanModal,
        inputKelengkapan,
        kelengkapanChangeHandler,
        formDisabled,
        additionalFormSubmitHandler
    } = props;

    return (
        <CModal 
            show={openKelengkapanModal} 
            onClose={() => setOpenKelengkapanModal(!openKelengkapanModal)}
            color="primary"
        >
            <CModalHeader closeButton>
                <CModalTitle>Tambah Data Kelengkapan</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="nama-kelengkapan">Nama Kelengkapan</CLabel>
                        <CInput type="text" id="nama-kelengkapan" name="nama_kelengkapan" value={inputKelengkapan.nama_kelengkapan} onChange={kelengkapanChangeHandler} placeholder="Masukkan Nama Kelengkapan" disabled={formDisabled} />
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => additionalFormSubmitHandler('kelengkapan')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setOpenKelengkapanModal(!openKelengkapanModal)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalKelengkapan;