import React from 'react';
import {
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter, 
    CInputRadio,
    CSelect,
    CButton
} from '@coreui/react';
import CurrencyFormat from 'react-currency-format';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ModalPelunasanPembayaran = props => {
    let {
        openLunasModal,
        closeModalHandler,
        changeHandler,
        rekeningVisibility,
        loadDataRekening,
        dataRekening,
        adminOptions,
        currentAdmin,
        setCurrentAdmin,
        input,
        setInput,
        submitHandler,
    } = props;

    return (
        <CModal 
            show={openLunasModal} 
            onClose={() => closeModalHandler('Lunasi')}
            color="success"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Bayar Sisa Kekurangan Pembayaran</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="6" className="mb-3">
                        <CLabel>Pilih Kas</CLabel>

                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="bank-2" name="kas" value="1" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="bank-2">Bank</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="tunai-2" name="kas" value="0" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="tunai-2">Tunai</CLabel>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6">
                        <CFormGroup className={rekeningVisibility}>
                            <CLabel htmlFor="norekening">Pilih Rekening</CLabel>
                            <CSelect custom name="norekening" id="norekening" value={input.norekening} onChange={changeHandler} >
                                <option key="sdnjns" value="">Pilih Salah Satu</option>
                                {loadDataRekening ? null : 
                                    dataRekening.map((item, index) => (
                                        <option key={index} value={`${item.norekening} / ${item.nama_bank}`}>{item.norekening} / {item.nama_bank}</option>
                                    ))
                                }
                            </CSelect>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" lg="12">
                        <CFormGroup>
                            <CLabel htmlFor="nominal">Nominal</CLabel>
                            <CurrencyFormat id="nominal" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Nominal" />
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="12">
                        <CFormGroup>
                            <CLabel htmlFor="input-admin">Pilih Admin</CLabel>
                            <Autocomplete
                                id="input-admin"
                                clearOnEscape={true}
                                options={adminOptions}
                                getOptionSelected={(option, value) => option.name == value.name}
                                getOptionLabel={option => option.name}
                                value={{ name: currentAdmin.name }}
                                onChange={(event, values) => {
                                    if(values !== null) {
                                        setCurrentAdmin({
                                            ...currentAdmin, name: values.name
                                        });

                                        setInput({
                                            ...input, id_admin: values.id
                                        });
                                    } else {
                                        setCurrentAdmin({
                                            ...currentAdmin, name: ''
                                        });

                                        setInput({
                                            ...input, id_admin: ''
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
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('Lunasi')}>Bayar</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Lunasi')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPelunasanPembayaran;