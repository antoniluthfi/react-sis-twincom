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
    CInputRadio,
    CModalFooter,
    CSelect,
    CTextarea,
    CButton
} from '@coreui/react';
import CurrencyFormat from 'react-currency-format';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ModalPengembalianBarang = props => {
    let {
        openModalKembalikanBarang,
        closeModalHandler,
        loadDataPengembalian,
        input,
        currentPengembalian,
        changeHandler,
        nominalVisibility,
        diskon,
        rekeningVisibility,
        loadDataRekening,
        dataRekening,
        loadSandiTransaksi,
        sandiTransaksi,
        submitHandler
    } = props;

    return (
        <CModal 
            show={openModalKembalikanBarang} 
            onClose={() => closeModalHandler('Kembalikan')}
            color="success"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Kembalikan Barang {loadDataPengembalian ? null : input.diskon == '1' ? `(Rp. ${new Intl.NumberFormat(['ban', 'id']).format(parseInt(currentPengembalian.pengerjaan.biaya_service) - currentPengembalian.penerimaan.customer.member.diskon.replace(/[^0-9]+/g, ""))})` : `(Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentPengembalian.pengerjaan.biaya_service)})`}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {
                    loadDataPengembalian ? null :
                    <div>
                        <CRow className="mb-2">
                            <CCol xs="12" md="4">
                                <CLabel>Metode Pembayaran</CLabel>

                                <CFormGroup variant="custom-radio">
                                    <CInputRadio custom id="cash" name="dp" value="0" onChange={changeHandler}/>
                                    <CLabel variant="custom-checkbox" htmlFor="cash">Lunas</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-radio">
                                    <CInputRadio custom id="dp" name="dp" value="1" onChange={changeHandler}/>
                                    <CLabel variant="custom-checkbox" htmlFor="dp">JT</CLabel>
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

                            <CCol xs="12" md="4">
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

                        {currentPengembalian.penerimaan.customer.member == null ? null :
                            currentPengembalian.penerimaan.customer.member.status == '1' ?
                            <CRow>
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

                                    <p className="lead text-success mb-1" style={{ fontSize: 11 }}>{input.diskon == '1' ? `Diskon ${currentPengembalian.penerimaan.customer.member.diskon}` : null}</p>
                                </CCol>
                            </CRow> : null                      
                        }

                        <CRow>
                            <CCol xs="12" lg="12">
                                <CFormGroup className={nominalVisibility}>
                                    <CLabel htmlFor="biaya-service">Bayar Biaya Service {input.diskon == '1' ? `(Rp. ${new Intl.NumberFormat(['ban', 'id']).format(parseInt(currentPengembalian.pengerjaan.biaya_service) - currentPengembalian.penerimaan.customer.member.diskon.replace(/[^0-9]+/g, ""))})` : `(Rp. ${currentPengembalian.diskon_kecewa == null ? new Intl.NumberFormat(['ban', 'id']).format(currentPengembalian.pengerjaan.biaya_service) : new Intl.NumberFormat(['ban', 'id']).format(diskon(currentPengembalian.pengerjaan.biaya_service, currentPengembalian.diskon_kecewa))})`}</CLabel>
                                    <CurrencyFormat id="biaya-service" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Nominal" />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" lg="12">
                                <CFormGroup>
                                    <CLabel htmlFor="diskon-kecewa">Diskon Kecewa</CLabel>
                                    <CurrencyFormat id="diskon-kecewa" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="diskon_kecewa" value={input.diskon_kecewa} onChange={changeHandler} placeholder="Masukkan Diskon" />
                                
                                    <p className="lead text-success mb-1" style={{ fontSize: 11 }}>{input.diskon_kecewa == '' ? null : `Sisa Rp. ${new Intl.NumberFormat(['ban', 'id']).format(diskon(currentPengembalian.pengerjaan.biaya_service, input.diskon_kecewa))}`}</p>
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
                    </div>
                }
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('Kembalikan')}>Kembalikan</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Kembalikan')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPengembalianBarang;