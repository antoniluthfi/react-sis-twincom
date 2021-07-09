import React from 'react';
import {
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CInputRadio,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,
    CSelect,
    CButton  
} from '@coreui/react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyFormat from 'react-currency-format';

const ModalPelunasanPembayaran = props => {
    let {
        openBayarModal,
        closeModalHandler,
        loadDataPengembalian,
        currentPengembalian,
        diskon,
        changeHandler,
        rekeningVisibility,
        input,
        setInput,
        loadDataRekening,
        dataRekening,
        adminOptions,
        currentAdmin,
        setCurrentAdmin,
        submitHandler
    } = props;

    return (
        <CModal 
            show={openBayarModal} 
            onClose={() => closeModalHandler('Bayar')}
            color="success"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Bayar Sisa Kekurangan Pembayaran {loadDataPengembalian ? null : currentPengembalian.diskon_kecewa != null ? `(Sisa Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentPengembalian.pengerjaan.biaya_service - currentPengembalian.nominal)})` : currentPengembalian.diskon == '1' ? `(Sisa Rp. ${new Intl.NumberFormat(['ban', 'id']).format(diskon(currentPengembalian.pengerjaan.biaya_service, currentPengembalian.penerimaan.customer.member.diskon) - currentPengembalian.nominal)})` : null}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {loadDataPengembalian ? null : 
                    <div>
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
                                        getOptionSelected={(option, value) => option.name === value.name}
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
                    </div>
                }
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('Bayar')}>Bayar</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Bayar')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPelunasanPembayaran;