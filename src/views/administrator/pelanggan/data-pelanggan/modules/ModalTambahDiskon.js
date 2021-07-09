import React from 'react';
import {
    CRow,
    CCol,
    CSelect,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,  
} from '@coreui/react';
import CurrencyFormat from 'react-currency-format';

const ModalTambahDiskon = props => {
    let {
        diskonModal,
        closeModalHandler,
        inputDiskon,
        diskonChangeHandler,
        submitHandler,
    } = props;

    return (
        <CModal 
            show={diskonModal} 
            onClose={closeModalHandler}
            color="warning"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Buat Diskon</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="diskon-persen">Diskon Persen</CLabel>
                            <CInput type="number" id="diskon-persen" name="diskon_persen" value={inputDiskon.diskon_persen || ''} onChange={diskonChangeHandler} placeholder="Masukkan Diskon" />
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="diskon-langsung">Diskon Langsung</CLabel>
                            <CurrencyFormat id="diskon-langsung" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="diskon_langsung" value={inputDiskon.diskon_langsung || ''} onChange={diskonChangeHandler} placeholder="Masukkan Diskon" />
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="poin">Poin</CLabel>
                            <CInput type="number" id="poin" name="poin" value={inputDiskon.poin || ''} onChange={diskonChangeHandler} placeholder="Masukkan Diskon" />
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="status">Status</CLabel>
                            <CSelect custom name="status" id="status" value={inputDiskon.status || ''} onChange={diskonChangeHandler} >
                                <option value="0">Tidak Aktif</option>
                                <option value="1">Aktif</option>
                            </CSelect>
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="warning" onClick={() => submitHandler('submit diskon')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('diskon')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalTambahDiskon;