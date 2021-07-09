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
    CSelect,
    CButton,
    CTextarea,
    CModalFooter,  
} from '@coreui/react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CurrencyFormat from 'react-currency-format';

const ModalPembayaran = props => {
    let {
        success,
        closeModalHandler,
        loadDataPembayaran,
        currentPembayaran,
        input,
        setInput,
        adminOptions,
        currentAdmin,
        setCurrentAdmin,
        changeHandler,
        submitHandler,
        diskon,
        nominalVisibility,
        rekeningVisibility,
        loadDataRekening,
        dataRekening,
        loadSandiTransaksi,
        sandiTransaksi,
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={() => closeModalHandler('Bayar')}
            color="success"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Bayar {loadDataPembayaran ? null : `${currentPembayaran.penerimaan.bj.nama_bj} - ${currentPembayaran.penerimaan.customer.name}`}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-2">
                    <CCol xs="12" md="4">
                        <CLabel>Metode Pembayaran</CLabel>

                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="cash" name="dp" value="0" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="cash">Cash</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="dp" name="dp" value="1" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="dp">DP</CLabel>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="4">
                        <CLabel>Pilih Kas</CLabel>

                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="bank" name="kas" value="1" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="bank">Bank</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                            <CInputRadio custom id="tunai" name="kas" value="0" onChange={changeHandler}/>
                            <CLabel variant="custom-checkbox" htmlFor="tunai">Tunai</CLabel>
                        </CFormGroup>
                    </CCol>

                    {loadDataPembayaran ? null : currentPembayaran.penerimaan.customer.member == null ? null :
                        currentPembayaran.penerimaan.customer.member.status == '1' ?
                        <CCol xs="12" md="4">
                            <CLabel>Diskon</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="diskon-ya" name="diskon" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="diskon-ya">Ya</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="diskon-tidak" name="diskon" value="0" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="diskon-tidak">Tidak</CLabel>
                            </CFormGroup>

                            <p className="lead text-success mb-1" style={{ fontSize: 11 }}>{input.diskon == '1' ? `Diskon ${currentPembayaran.penerimaan.customer.member.diskon}` : null}</p>
                        </CCol> : null                      
                    }
                </CRow>

                <CRow>
                    <CCol xs="12" lg="6">
                        <CFormGroup>
                            <CLabel htmlFor="diskon_kecewa">Diskon Kecewa</CLabel>
                            <CurrencyFormat id="diskon_kecewa" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="diskon_kecewa" value={input.diskon_kecewa} onChange={changeHandler} placeholder="Masukkan Diskon" />
                        
                            <p className="lead text-success mb-1" style={{ fontSize: 11 }}>{input.diskon_kecewa == '' ? null : `Sisa Rp. ${new Intl.NumberFormat(['ban', 'id']).format(diskon(currentPembayaran.pengerjaan.biaya_service, input.diskon_kecewa))}`}</p>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" lg="6">
                        <CFormGroup className={nominalVisibility}>
                            <CLabel htmlFor="biaya_service">Bayar Biaya Service {loadDataPembayaran ? null : `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentPembayaran.pengerjaan.biaya_service)}`}</CLabel>
                            <CurrencyFormat id="biaya_service" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Nominal" />
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="12">
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
                    <CCol xs="12" md="12">
                        <CFormGroup>
                            <CLabel htmlFor="sandi-transaksi">Pilih Transaksi</CLabel>
                            <CSelect custom name="id_sandi" id="sandi-transaksi" value={input.id_sandi} onChange={changeHandler} >
                                <option key="sdnjnsakfss" value="">Pilih Salah Satu</option>
                                {loadSandiTransaksi ? null : 
                                    sandiTransaksi.map((item, index) => (
                                        <option key={index} value={item.id}>{item.sandi_transaksi}</option>
                                    ))
                                }
                            </CSelect>
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

                <CRow>
                    <CCol xs="12" md="12">
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
                <CButton color="success" onClick={() => submitHandler('Bayar')}>Bayar</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Bayar')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPembayaran;