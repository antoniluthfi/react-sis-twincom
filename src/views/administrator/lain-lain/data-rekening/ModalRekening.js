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

const ModalRekning = props => {
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
        submitHandler,
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={closeModalHandler}
            color={color}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="norekening">Nomor Rekening</CLabel>
                        <CInput type="text" id="norekening" name="norekening" value={input.norekening} onChange={changeHandler} placeholder="Masukkan Nama Kondisi" disabled={formDisabled} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="nama-bank">Bank</CLabel>
                        <CSelect custom name="nama_bank" id="nama-bank" value={input.nama_bank} onChange={changeHandler} disabled={formDisabled} >
                            <option value="BRI">BRI</option>
                            <option value="BNI">BNI</option>
                            <option value="BCA">BCA</option>
                            <option value="Mandiri">Mandiri</option>
                        </CSelect>
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler('Not Delete')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalRekning;