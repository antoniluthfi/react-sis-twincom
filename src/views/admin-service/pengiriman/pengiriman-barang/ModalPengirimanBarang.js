import React from 'react';
import {
    CRow,
    CCol,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CTextarea,
    CModalFooter,  
} from '@coreui/react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ModalPengirimanBarang = props => {
    let {
        success,
        closeModalHandler,
        color,
        modalTitle,
        dataPartner,
        currentPartner,
        setCurrentPartner,
        input,
        setInput, 
        dataTeknisi,
        currentPengirim,
        setCurrentPengirim,
        currentPengantar,
        setCurrentPengantar,
        changeHandler,
        submitHandler,
        buttonSubmitName
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={() => closeModalHandler('submit')}
            color={color}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="nama-partner">Pilih Tujuan</CLabel>
                                <Autocomplete
                                    id="nama-partner"
                                    options={dataPartner}
                                    getOptionSelected={(option, value) => option.nama === value.nama}
                                    getOptionLabel={(option) => option.nama}
                                    value={{ nama: currentPartner.nama }}
                                    onChange={(event, values) => {
                                        if(values !== null) {
                                            setCurrentPartner({
                                                nama: values.nama, 
                                            });

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
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="pengirim">Pengirim</CLabel>
                                <Autocomplete
                                    id="pengirim"
                                    options={dataTeknisi}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    getOptionLabel={(option) => option.name}
                                    value={{ name: currentPengirim.name }}
                                    onChange={(event, values) => {
                                        if(values !== null) {
                                            setCurrentPengirim({
                                                name: values.name, 
                                            });

                                            setInput({
                                                ...input, id_pengirim: values.id
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
                                <CLabel htmlFor="pengantar">Pengantar</CLabel>
                                <Autocomplete
                                    id="pengantar"
                                    options={dataTeknisi}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    getOptionLabel={(option) => option.name}
                                    value={{ name: currentPengantar.name }}
                                    onChange={(event, values) => {
                                        if(values !== null) {
                                            setCurrentPengantar({
                                                name: values.name, 
                                            });

                                            setInput({
                                                ...input, id_pengantar: values.id
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
                        <CCol xs="12" lg="12">
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
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('submit')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPengirimanBarang;