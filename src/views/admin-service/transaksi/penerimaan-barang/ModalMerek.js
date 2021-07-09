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
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,  
    CTextarea
} from '@coreui/react';

const ModalMerek = props => {
    let {
        openMerekModal,
        setOpenMerekModal,
        inputMerek,
        merekChangeHandler,
        formDisabled,
        additionalFormSubmitHandler
    } = props;

    return (
        <CModal 
            show={openMerekModal} 
            onClose={() => setOpenMerekModal(!openMerekModal)}
            color="primary"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Tambah Data Merek</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="nama-merek">Nama Merek</CLabel>
                        <CInput type="text" id="nama-merek" name="merek" value={inputMerek.merek} onChange={merekChangeHandler} placeholder="Masukkan Nama Merek" disabled={formDisabled} />
                    </CFormGroup>
                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="input-pc">Input PC</CLabel>
                                <CSelect custom name="pc" id="input-pc" value={inputMerek.pc} onChange={merekChangeHandler} disabled={formDisabled} >
                                    <option value="0">Sembunyikan</option>
                                    <option value="1">Tampilkan</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="input-laptop">Input Laptop</CLabel>
                                <CSelect custom name="laptop" id="input-laptop" value={inputMerek.laptop} onChange={merekChangeHandler} disabled={formDisabled} >
                                    <option value="0">Sembunyikan</option>
                                    <option value="1">Tampilkan</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="input-cctv">Input CCTV</CLabel>
                                <CSelect custom name="cctv" id="input-cctv" value={inputMerek.cctv} onChange={merekChangeHandler} disabled={formDisabled} >
                                    <option value="0">Sembunyikan</option>
                                    <option value="1">Tampilkan</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="input-printer">Input Printer</CLabel>
                                <CSelect custom name="printer" id="input-printer" value={inputMerek.printer} onChange={merekChangeHandler} disabled={formDisabled} >
                                    <option value="0">Sembunyikan</option>
                                    <option value="1">Tampilkan</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => additionalFormSubmitHandler('merek')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setOpenMerekModal(!openMerekModal)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalMerek;