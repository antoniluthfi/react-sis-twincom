import React from 'react';
import {
    CRow,
    CCol,
    CInputCheckbox,
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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ModalPembelianBarangSecond = props => {
    let {
        success,
        closeModalHandler,
        modalTitle, 
        loadCurrentDataPengajuan,
        currentDataPengajuan,
        input,
        setInput,
        changeHandler,
        checkboxChangeHandler,
        dataTeknisi,
        currentTeknisi,
        setCurrentTeknisi,
        submitHandler
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={() => closeModalHandler('update')}
            color="success"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle} {loadCurrentDataPengajuan ? null : `${currentDataPengajuan.penerimaan.merek} ${currentDataPengajuan.penerimaan.tipe}`}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="processor">Prosesor</CLabel>
                                <CInput type="text" id="processor" name="processor" value={input.processor} onChange={changeHandler} placeholder="Masukkan Jenis Prosesor"/>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="memory">Memory</CLabel>
                                <CInput type="text" id="memory" name="memory" value={input.memory} onChange={changeHandler} placeholder="Masukkan Kapasitas RAM"/>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="harddisk">Harddisk</CLabel>
                                <CInput type="text" id="harddisk" name="harddisk" value={input.harddisk} onChange={changeHandler} placeholder="Masukkan Kapasitas HDD"/>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="graphic_card">Graphic Card</CLabel>
                                <CInput type="text" id="graphic_card" name="graphic_card" value={input.graphic_card} onChange={changeHandler} placeholder="Masukkan Jenis Graphic Card"/>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CLabel className="text-center">Kondisi</CLabel>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="cd_dvd" 
                                    name="cd_dvd" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="cd_dvd">DVD/CD</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="keyboard" 
                                    name="keyboard" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="keyboard">Keyboard</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="lcd" 
                                    name="lcd" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="lcd">LCD</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="usb" 
                                    name="usb" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="usb">USB</CLabel>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="camera" 
                                    name="camera" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="camera">Camera</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="charger" 
                                    name="charger" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="charger">Charger</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="casing" 
                                    name="casing" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="casing">Casing</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="touchpad" 
                                    name="touchpad" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="touchpad">Touchpad</CLabel>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="wifi" 
                                    name="wifi" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="wifi">WiFi</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="lan" 
                                    name="lan" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="lan">LAN</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="sound" 
                                    name="sound" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="sound">Sound</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="6" md="3">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="baterai" 
                                    name="baterai" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="baterai">Baterai</CLabel>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CLabel className="text-center mt-3">Kelengkapan</CLabel>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="4" md="4">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="nota" 
                                    name="nota" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="nota">Nota</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="4" md="4">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="kotak" 
                                    name="kotak" 
                                    value="1" 
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="kotak">Kotak</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="4" md="4">
                            <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox 
                                    id="tas" 
                                    name="tas" 
                                    value="1" 
                                    // defaultChecked={currentDataPengajuan.tas === '1' ? true : false}
                                    onChange={checkboxChangeHandler}
                                />
                                <CLabel variant="checkbox" className="form-check-label" htmlFor="tas">Tas</CLabel>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow className="mt-3">
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="input-pengecek">Pilih Teknisi Pengecek</CLabel>
                                <Autocomplete
                                    id="input-pengecek"
                                    clearOnEscape={true}
                                    options={dataTeknisi}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    getOptionLabel={option => option.name}
                                    value={{ name: currentTeknisi.name }}
                                    onChange={(event, values) => {
                                        if(values !== null) {
                                            setCurrentTeknisi({
                                                ...currentTeknisi, name: values.name
                                            });

                                            setInput({
                                                ...input, id_teknisi: values.id
                                            });
                                        } else {
                                            setCurrentTeknisi({
                                                ...currentTeknisi, name: ''
                                            });

                                            setInput({
                                                ...input, id_teknisi: ''
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
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('update')}>Update</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('update')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPembelianBarangSecond;