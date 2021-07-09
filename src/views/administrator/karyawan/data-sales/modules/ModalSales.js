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

const ModalSales = props => {
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
        loadDataCabang,
        dataCabang
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
                        <CLabel htmlFor="name">Nama</CLabel>
                        <CInput type="text" id="name" name="name" value={input.name} onChange={changeHandler} placeholder="Masukkan Nama" disabled={formDisabled} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="alamat">Alamat</CLabel>
                        <CInput type="text" id="alamat" name="alamat" value={input.alamat} onChange={changeHandler} placeholder="Masukkan Alamat" disabled={formDisabled} />
                    </CFormGroup>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="email">Email</CLabel>
                                <CInput type="email" id="email" name="email" value={input.email} onChange={changeHandler} placeholder="Masukkan Email" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                <CInput type="text" id="nomorhp" name="nomorhp" value={input.nomorhp} onChange={changeHandler} placeholder="Masukkan Nomor Hp" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="cab-penempatan">Cabang Penempatan</CLabel>
                                <CSelect custom name="cab_penempatan" id="cab-penempatan" value={input.cab_penempatan} onChange={changeHandler} disabled={formDisabled} >
                                    {
                                        loadDataCabang ? <option value="">Pilih Salah Satu</option> :
                                        dataCabang.map(item => (
                                            <option key={item.id} value={item.nama_cabang}>{item.nama_cabang}</option>
                                        ))
                                    }
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="status-akun">Status Akun</CLabel>
                                <CSelect custom name="status_akun" id="status-akun" value={input.status_akun} onChange={changeHandler} disabled={formDisabled} >
                                    <option value="0">Tidak Aktif</option>
                                    <option value="1">Aktif</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler()}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalSales;