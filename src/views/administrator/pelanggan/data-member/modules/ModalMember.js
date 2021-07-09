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
} from '@coreui/react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyFormat from 'react-currency-format';

const ModalMember = props => {
    let {
        success,
        closeModalHandler,
        buttonSubmitName,
        color,
        modalTitle,
        input,
        setInput,
        changeHandler,
        formDisabled,
        buttonVisibility,
        submitHandler,
        customerOptions,
        currentCustomer,
        setCurrentCustomer,
    } = props;

    return (  
        <CModal 
            show={success} 
            onClose={() => closeModalHandler(buttonSubmitName.toLowerCase())}
            color={color}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="nama-pelanggan">Nama</CLabel>
                                <Autocomplete
                                    id="nama-pelanggan"
                                    options={customerOptions}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    getOptionLabel={(option) => `${option.name} / ${option.nomorhp}`}
                                    value={{ name: currentCustomer.name || '', nomorhp: currentCustomer.nomorhp || '' }}
                                    onChange={(event, values) => {
                                        if(values !== null) {
                                            setCurrentCustomer({
                                                name: values.name, 
                                                nomorhp: values.nomorhp
                                            });

                                            setInput({
                                                ...input, user_id: values.id
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
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="diskon-persen">Diskon Persen</CLabel>
                                <CInput type="number" id="diskon-persen" name="diskon_persen" value={input.diskon_persen || ''} onChange={changeHandler} placeholder="Masukkan Diskon" />
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="diskon-langsung">Diskon Langsung</CLabel>
                                <CurrencyFormat id="diskon-langsung" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="diskon_langsung" value={input.diskon_langsung || ''} onChange={changeHandler} placeholder="Masukkan Diskon" />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CLabel htmlFor="poin">Poin</CLabel>
                            <CInput type="number" name="poin" id="poin" value={input.poin} onChange={changeHandler} placeholder="Masukkan Poin" disabled={formDisabled} />
                        </CCol>

                        <CCol xs="12" md="6">
                            <CLabel htmlFor="status">Status</CLabel>
                            <CSelect custom name="status" id="status" value={input.status} onChange={changeHandler} disabled={formDisabled} >
                                <option value="0">Tidak Aktif</option>
                                <option value="1">Aktif</option>
                            </CSelect>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName.toLowerCase())}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler(buttonSubmitName.toLowerCase())}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalMember;