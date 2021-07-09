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

const ModalSandiTransaksi = props => {
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
                        <CLabel htmlFor="sandi-transaksi">Sandi Transaksi</CLabel>
                        <CInput type="text" id="sandi-transaksi" name="sandi_transaksi" value={input.sandi_transaksi} onChange={changeHandler} placeholder="Masukkan Nama Kondisi" disabled={formDisabled} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="jenis-transaksi">Jenis Transaksi</CLabel>
                        <CSelect custom name="jenis_transaksi" id="jenis-transaksi" value={input.jenis_transaksi} onChange={changeHandler} disabled={formDisabled} >
                            <option value="0">Keluar</option>
                            <option value="1">Masuk</option>
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

export default ModalSandiTransaksi;