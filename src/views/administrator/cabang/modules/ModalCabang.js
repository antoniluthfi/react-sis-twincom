import React from 'react';
import {
    CRow,
    CCol,
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

const ModalCabang = props => {
    let {
        success,
        closeModalHandler,
        buttonSubmitName,
        color,
        modalTitle,
        input,
        changeHandler,
        formDisabled,
        buttonVisibility,
        submitHandler
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={() => closeModalHandler(buttonSubmitName.toLowerCase())}
            color={color}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="nama-cabang">Nama Cabang</CLabel>
                        <CInput type="text" id="nama-cabang" name="nama_cabang" value={input.nama_cabang || ''} onChange={changeHandler} placeholder="Masukkan Nama Cabang" disabled={formDisabled} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="alamat">Alamat</CLabel>
                        <CInput type="text" id="alamat" name="alamat" value={input.alamat || ''} onChange={changeHandler} placeholder="Masukkan Alamat" disabled={formDisabled} />
                    </CFormGroup>
                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="email">Email</CLabel>
                                <CInput type="email" id="email" name="email" value={input.email || ''} onChange={changeHandler} placeholder="Masukkan Email" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                <CInput type="text" id="nomorhp" name="nomorhp" value={input.nomorhp || ''} onChange={changeHandler} placeholder="Masukkan Nomor HP" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName.toLowerCase())}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler(buttonSubmitName.toLowerCase())}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCabang;