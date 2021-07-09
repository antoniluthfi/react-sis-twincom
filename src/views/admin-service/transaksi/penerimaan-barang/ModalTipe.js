import React from 'react';
import {
    CSelect,
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

const ModalTipe = props => {
    let {
        openTipeModal,
        setOpenTipeModal,
        inputTipe,
        tipeChangeHandler,
        formDisabled,
        additionalFormSubmitHandler
    } = props;

    return (
        <CModal 
            show={openTipeModal} 
            onClose={() => setOpenTipeModal(!openTipeModal)}
            color="primary"
        >
            <CModalHeader closeButton>
                <CModalTitle>Tambah Data Tipe</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="nama-tipe">Nama Tipe</CLabel>
                        <CInput type="text" id="nama-tipe" name="tipe" value={inputTipe.tipe} onChange={tipeChangeHandler} placeholder="Masukkan Nama Merek" disabled={formDisabled} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="kategori">Kategori</CLabel>
                        <CSelect custom name="kategori" id="kategori" value={inputTipe.kategori} onChange={tipeChangeHandler} disabled={formDisabled} >
                            <option value="Laptop">Laptop</option>
                            <option value="PC">PC</option>
                            <option value="Printer">Printer</option>
                            <option value="CCTV">CCTV</option>
                        </CSelect>
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => additionalFormSubmitHandler('tipe')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setOpenTipeModal(!openTipeModal)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalTipe;