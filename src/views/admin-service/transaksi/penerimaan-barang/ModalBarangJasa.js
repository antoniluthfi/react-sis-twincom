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

const ModalBarangJasa = props => {
    let {
        openBJModal,
        setOpenBJModal,
        textBJ,
        inputBJ,
        bjChangeHandler,
        formDisabled,
        buttonVisibility,
        additionalFormSubmitHandler
    } = props;

    return (
        <CModal 
            show={openBJModal} 
            onClose={() => setOpenBJModal(!openBJModal)}
            color="primary"
        >
            <CModalHeader closeButton>
                <CModalTitle>Tambah Data {textBJ}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="nama-bj">Nama {textBJ}</CLabel>
                        <CInput type="text" id="nama-bj" name="nama_bj" value={inputBJ.nama_bj} onChange={bjChangeHandler} placeholder={`Masukkan Nama ${textBJ}`} disabled={formDisabled} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="form-data-penting">Form Data Penting</CLabel>
                        <CSelect custom name="form_data_penting" id="form-data-penting" value={inputBJ.form_data_penting} onChange={bjChangeHandler} disabled={formDisabled} >
                            <option value="0">Sembunyikan</option>
                            <option value="1">Tampilkan</option>
                        </CSelect>
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" className={buttonVisibility} onClick={() => additionalFormSubmitHandler('bj')}>Submit</CButton>{' '}
                <CButton color="secondary" className={buttonVisibility} onClick={() => setOpenBJModal(!openBJModal)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalBarangJasa;