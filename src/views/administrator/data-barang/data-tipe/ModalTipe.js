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

const ModalTipe = props => {
    let {
        success,
        closeModalHandler,
        buttonSubmitName,
        color,
        modalTitle,
        input,
        changeHandler,
        formDisabled,
        buttonVisibility,
        submitHandler,
        loadDataMerek,
        dataMerek,
        loadDataBjBarang,
        dataBjBarang
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={closeModalHandler}
            color={color}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{modalTitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="nama-tipe">Nama Tipe</CLabel>
                        <CInput type="text" id="nama-tipe" name="tipe" value={input.tipe} onChange={changeHandler} placeholder="Masukkan Nama Merek" disabled={formDisabled} />
                    </CFormGroup>
                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="merek">Merek</CLabel>
                                <CSelect custom name="merek" id="merek" value={input.merek} onChange={changeHandler} disabled={formDisabled} >
                                    {
                                        loadDataMerek ? <option value="">Pilih Salah satu</option> :
                                        <div>
                                        <option value="">Pilih Salah satu</option>
                                        {dataMerek.map(item => 
                                            <option key={item.id} value={item.merek}>{item.merek}</option>
                                        )} 
                                        </div>
                                    }
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="kategori">Kategori</CLabel>
                                <CSelect custom name="kategori" id="kategori" value={input.kategori} onChange={changeHandler} disabled={formDisabled} >
                                    {loadDataBjBarang ? <option value="">Pilih Salah satu</option> : 
                                        <div>
                                        <option value="">Pilih Salah satu</option>
                                        {dataBjBarang.map(item => (
                                            <option key={item.id} value={item.nama_bj}>{item.nama_bj}</option>
                                        ))}
                                        </div>
                                    }
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler('Not Delete')}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalTipe;