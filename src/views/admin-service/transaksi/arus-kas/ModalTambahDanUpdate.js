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
    CInputRadio,
    CModalFooter,  
} from '@coreui/react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyFormat from 'react-currency-format';

const ModalTambahDanUpdate = props => {
    let {
        success,
        closeModalHandler,
        color,
        modalTitle,
        buttonSubmitName,
        changeHandler,
        rekeningVisibility,
        input,
        setInput,
        loadDataRekening,
        dataRekening,
        sandiTransaksiOptions,
        currentSandiTransaksi,
        setCurrentSandiTransaksi,
        submitHandler
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={() => closeModalHandler(buttonSubmitName)}
            color={color}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CRow>
                        <CCol xs="12" md="6" className="mb-2">
                            <CLabel>Kas</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="tunai" name="kas" value="0" onChange={changeHandler} />
                                <CLabel variant="custom-checkbox" htmlFor="tunai">Tunai</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="bank" name="kas" value="1" onChange={changeHandler} />
                                <CLabel variant="custom-checkbox" htmlFor="bank">Bank</CLabel>
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
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="nominal">Nominal</CLabel>
                                <CurrencyFormat id="nominal" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="nominal" value={input.nominal} onChange={changeHandler} placeholder="Masukkan Nominal" />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="input-transaksi">Pilih Transaksi</CLabel>
                                <Autocomplete
                                    id="input-transaksi"
                                    clearOnEscape={true}
                                    options={sandiTransaksiOptions}
                                    getOptionSelected={(option, value) => option.sandi_transaksi === value.sandi_transaksi}
                                    getOptionLabel={option => option.sandi_transaksi}
                                    value={{ sandi_transaksi: currentSandiTransaksi.sandi_transaksi }}
                                    onChange={(event, values) => {
                                        console.log(values);
                                        if(values !== null) {
                                            setCurrentSandiTransaksi({
                                                ...currentSandiTransaksi, sandi_transaksi: values.sandi_transaksi
                                            });

                                            setInput({
                                                ...input, id_sandi: values.id
                                            });
                                        } else {
                                            setCurrentSandiTransaksi({
                                                ...currentSandiTransaksi, sandi_transaksi: ''
                                            });

                                            setInput({
                                                ...input, id_sandi: ''
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
                            <CFormGroup>
                                <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                <CInput type="text" id="keterangan" name="keterangan" value={input.keterangan} onChange={changeHandler} placeholder="Masukkan Keterangan" />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler(buttonSubmitName)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalTambahDanUpdate;