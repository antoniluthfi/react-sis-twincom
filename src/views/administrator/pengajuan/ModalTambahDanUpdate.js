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
    CInputRadio  
} from '@coreui/react';

const ModalTambahDanUpdate = props => {
    let {
        success,
        closeModalHandler,
        modalTitle,
        changeHandler,
        hargaBeliVisibility,
        input,
        submitHandler,
        currentDataPengajuan,
        alasanBatalVisibility
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={() => closeModalHandler('update')}
            color="success"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CRow>
                        <CCol xs="12" md="6">
                            <CLabel>Tanggapan Pengajuan</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="tanggapan-setuju" name="dibeli" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="tanggapan-setuju">Setujui</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="tanggapan-tolak" name="dibeli" value="0" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="tanggapan-tolak">Tolak</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup className={hargaBeliVisibility}>
                                <CLabel htmlFor="harga_beli">Harga Beli</CLabel>
                                <CInput type="number" id="harga_beli" name="harga_beli" value={input.harga_beli} onChange={changeHandler} placeholder="Masukkan Harga Beli"/>
                                <p style={{ fontSize: 12 }}>Harga yang diajukan Rp. {currentDataPengajuan.pengajuan_harga}</p>
                            </CFormGroup>

                            <CFormGroup className={alasanBatalVisibility}>
                                <CLabel htmlFor="alasan_batal">Alasan Batal</CLabel>
                                <CInput type="number" id="alasan_batal" name="alasan_batal" value={input.alasan_batal} onChange={changeHandler} placeholder="Masukkan Alasan Batal"/>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('update')}>Update</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('update')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalTambahDanUpdate;