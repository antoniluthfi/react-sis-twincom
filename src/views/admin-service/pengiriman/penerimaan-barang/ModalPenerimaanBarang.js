import React from 'react';
import {
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
    CTextarea
} from '@coreui/react';
import CurrencyFormat from 'react-currency-format'; 

const ModalPenerimaanBarang = props => {
    let {
        success,
        closeModalHandler,
        changeHandler,
        formDisabled,
        input,
        submitHandler
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={closeModalHandler}
            color="success"
        >
            <CModalHeader closeButton>
                <CModalTitle>Update Data Pengiriman</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="biaya">Masukkan Biaya</CLabel>
                        <CurrencyFormat id="biaya" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Biaya Service" disabled={formDisabled} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="keterangan">Keterangan</CLabel>
                        <CTextarea 
                            name="keterangan" 
                            id="keterangan" 
                            rows="5"
                            placeholder="Masukkan Keterangan" 
                            value={input.keterangan}
                            onChange={changeHandler}
                        />
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler('Update')}>Update</CButton>{' '}
                <CButton color="secondary" onClick={() => closeModalHandler('Update')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPenerimaanBarang;