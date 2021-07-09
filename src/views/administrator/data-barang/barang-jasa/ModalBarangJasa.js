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
    CSelect
} from '@coreui/react';

const ModalBarangJasa = props => {
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
            onClose={closeModalHandler}
            color={color}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="nama-bj">Nama Barang / Jasa</CLabel>
                                <CInput type="text" id="nama-bj" name="nama_bj" value={input.nama_bj} onChange={changeHandler} placeholder="Masukkan Nama Barang / Jasa" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="jenis-bj">Jenis</CLabel>
                                <CSelect custom name="jenis" id="jenis-bj" value={input.jenis} onChange={changeHandler} disabled={formDisabled} >
                                    <option value="0">Barang</option>
                                    <option value="1">Jasa</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="form-data-penting">Data Penting</CLabel>
                                <CSelect custom name="form_data_penting" id="form-data-penting" value={input.form_data_penting} onChange={changeHandler} disabled={formDisabled} >
                                    <option value="0">Tidak</option>
                                    <option value="1">Ya</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="merek_dan_tipe">Merek & Tipe Barang</CLabel>
                                <CSelect custom name="merek_dan_tipe" id="merek_dan_tipe" value={input.merek_dan_tipe} onChange={changeHandler} disabled={formDisabled} >
                                    <option value="0">Tidak</option>
                                    <option value="1">Ya</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="sn">Serial Number</CLabel>
                                <CSelect custom name="sn" id="sn" value={input.sn} onChange={changeHandler} disabled={formDisabled} >
                                    <option value="0">Tidak</option>
                                    <option value="1">Ya</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="stiker">Diberi Stiker</CLabel>
                                <CSelect custom name="stiker" id="stiker" value={input.stiker} onChange={changeHandler} disabled={formDisabled} >
                                    <option value="0">Tidak</option>
                                    <option value="1">Ya</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler('Not Delete')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalBarangJasa;