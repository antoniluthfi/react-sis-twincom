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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyFormat from 'react-currency-format';

const ModalTambahPengerjaan = props => {
    let {
        success,
        closeModalHandler,
        color,
        changeHandler, 
        input,
        setInput,
        partnerOptions,
        submitHandler
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={() => closeModalHandler('Submit')}
            color={color}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Tambah Data Pengerjaan</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="6">
                        <CLabel>Status Pengerjaan</CLabel>

                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="status-pengerjaan-2" name="status_pengerjaan" value="2" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="status-pengerjaan-2">Sedang dikerjakan</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="status-pengerjaan-1" name="status_pengerjaan" value="1" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="status-pengerjaan-1">Cancel</CLabel>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="biaya-service">Biaya Service (opsional)</CLabel>
                            <CurrencyFormat id="biaya-service" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Biaya Service" />
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="12">
                        <CFormGroup>
                            <CLabel htmlFor="partner">Partner</CLabel>
                            <Autocomplete
                                id="partner"
                                options={partnerOptions}
                                getOptionSelected={(option, value) => option.nama === value.nama}
                                getOptionLabel={(option) => option.nama}
                                onChange={(event, values) => {
                                    if(values !== null) {
                                        setInput({
                                            ...input, id_partner: values.id
                                        });
                                    }                            
                                }}
                                renderInput={(params) => 
                                    <TextField {...params} />
                                }
                            />                                
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol>
                        <CLabel htmlFor="keterangan">Keterangan</CLabel>
                        <CTextarea 
                            name="keterangan" 
                            id="keterangan" 
                            rows="5"
                            placeholder="Masukkan Keterangan" 
                            value={input.keterangan}
                            onChange={changeHandler}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('Submit')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Submit')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalTambahPengerjaan;