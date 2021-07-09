import React from 'react';
import {
    CRow,
    CCol,
    CInputRadio,
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

const ModalTagihanPartner = props => {
    let {
        success,
        closeModalHandler,
        changeHandler,
        input, 
        submitHandler,
        nominalVisibility
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={() => closeModalHandler('Update')}
            color="success"
        >
            <CModalHeader closeButton>
                <CModalTitle>Update Data</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CRow className="mb-2">
                        <CCol xs="12" md="6">
                            <CLabel>Status Pembayaran</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="lunas" name="status_pembayaran" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="lunas">Lunas</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="belum-lunas" name="status_pembayaran" value="0" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="belum-lunas">Belum Lunas</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup className={nominalVisibility}>
                                <CLabel htmlFor="nominal">Nominal</CLabel>
                                <CInput type="number" id="nominal" name="nominal" value={input.nominal} onChange={changeHandler} placeholder="Masukkan Nominal" />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" md="12">
                            <CLabel htmlFor="keterangan-2">Keterangan</CLabel>
                            <CTextarea 
                                name="keterangan" 
                                id="keterangan-2" 
                                rows="5"
                                placeholder="Masukkan Keterangan" 
                                value={input.keterangan}
                                onChange={changeHandler}
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('Update')}>Update</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Update')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalTagihanPartner;