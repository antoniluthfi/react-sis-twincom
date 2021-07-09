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
} from '@coreui/react';

const ModalStiker = props => {
    let {
        success,
        closeModalHandler,
        buttonSubmitName,
        color,
        modalTitle,
        input,
        changeHandler,
        loadDataCabang,
        dataCabang,
        buttonVisibility,
        submitHandler,
        formDisabled
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
                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="jenis-stiker">Jenis Stiker</CLabel>
                                <CInput type="text" id="jenis-stiker" name="jenis_stiker" value={input.jenis_stiker || ''} onChange={changeHandler} placeholder="Masukkan Nama" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="jumlah">Jumlah</CLabel>
                                <CInput type="number" id="jumlah" name="jumlah" value={input.jumlah || ''} onChange={changeHandler} placeholder="Masukkan Jumlah" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    
                    <CRow>
                        <CCol xs="12" lg="12">
                            <CFormGroup>
                                <CLabel htmlFor="cab-penempatan">Cabang</CLabel>
                                <CSelect custom name="cabang" id="cab-penempatan" value={input.cabang || ''} onChange={changeHandler} disabled={formDisabled} >
                                    {
                                        loadDataCabang ? <option value="">Pilih Salah Satu</option> :
                                        <div>
                                        <option value="">Pilih Salah Satu</option>
                                        {dataCabang.map(item => (
                                            <option key={item.id} value={item.nama_cabang}>{item.nama_cabang}</option>
                                        ))}
                                        </div>
                                    }
                                </CSelect>
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

export default ModalStiker;