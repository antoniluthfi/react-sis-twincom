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
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,  
    CTextarea
} from '@coreui/react';
import CurrencyFormat from 'react-currency-format';

const ModalUpdatePengerjaan = props => {
    let {
        openUpdateModal,
        closeModalHandler,
        color,
        changeHandler,
        input,
        garansiVisible,
        alasanBatalVisible,
        submitHandler
    } = props;

    return (
        <CModal 
            show={openUpdateModal} 
            onClose={() => closeModalHandler('Update')}
            color={color}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Updata Data Pengerjaan</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="6" className="mb-3">
                        <CLabel>Status Pengerjaan</CLabel>

                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="status-pengerjaan-3" name="status_pengerjaan" value="3" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="status-pengerjaan-3">Selesai</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="status-pengerjaan-1-2" name="status_pengerjaan" value="1" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="status-pengerjaan-1-2">Cancel</CLabel>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6" className={garansiVisible}>
                        <CLabel>Cek Stiker</CLabel>

                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="belum-ditempel" name="cek_stiker" value="0" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="belum-ditempel">Belum ditempel</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="sudah-ditempel" name="cek_stiker" value="1" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="sudah-ditempel">Sudah Ditempel</CLabel>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6" className={garansiVisible}>
                        <CFormGroup>
                            <CLabel htmlFor="garansi">Garansi</CLabel>
                            <CInput type="number" id="garansi" name="garansi" value={input.garansi} min="0" placeholder="Masukkan Garansi" onChange={changeHandler}/>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6" className={alasanBatalVisible}>
                        <CFormGroup>
                            <CLabel htmlFor="alasan-batal">Alasan Batal</CLabel>
                            <CInput type="text" id="alasan-batal" name="alasan_batal" value={input.alasan_batal} placeholder="Alasan Batal" onChange={changeHandler}/>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="biaya-service">Biaya Service</CLabel>
                            <CurrencyFormat id="biaya-service" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Biaya Service" />
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6">
                        <CLabel htmlFor="pengerjaan">Pengerjaan</CLabel>
                        <CTextarea 
                            name="pengerjaan" 
                            id="pengerjaan" 
                            rows="5"
                            placeholder="Masukkan Pengerjaan" 
                            value={input.pengerjaan}
                            onChange={changeHandler}
                        />
                    </CCol>

                    <CCol xs="12" md="6">
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
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('Update')}>Update</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Update')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalUpdatePengerjaan;