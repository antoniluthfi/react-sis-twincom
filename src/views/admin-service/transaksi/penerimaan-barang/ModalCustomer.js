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

const ModalCustomer = props => {
    let {
        setOpenCustomerModal,
        openCustomerModal,
        inputCustomer,
        customerChangeHandler,
        formDisabled,
        additionalFormSubmitHandler
    } = props;

    return (
        <CModal 
            show={openCustomerModal} 
            onClose={() => setOpenCustomerModal(!openCustomerModal)}
            color="primary"
        >
            <CModalHeader closeButton>
                <CModalTitle>Tambah Data Pelanggan</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CForm action="" method="post">
                    <CFormGroup>
                        <CLabel htmlFor="name">Nama</CLabel>
                        <CInput type="text" id="name" name="name" value={inputCustomer.name} onChange={customerChangeHandler} placeholder="Masukkan Nama" disabled={formDisabled} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="alamat">Alamat</CLabel>
                        <CInput type="text" id="alamat" name="alamat" value={inputCustomer.alamat} onChange={customerChangeHandler} placeholder="Masukkan Alamat" disabled={formDisabled} />
                    </CFormGroup>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="email">Email</CLabel>
                                <CInput type="email" id="email" name="email" value={inputCustomer.email} onChange={customerChangeHandler} placeholder="Masukkan Email" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                <CInput type="text" id="nomorhp" name="nomorhp" value={inputCustomer.nomorhp} onChange={customerChangeHandler} placeholder="Masukkan Nomor HP" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="jabatan">Segmen</CLabel>
                                <CSelect custom name="jabatan" id="jabatan" value={inputCustomer.jabatan} onChange={customerChangeHandler} disabled={formDisabled} >
                                    <option value="user">User</option>
                                    <option value="reseller">Reseller</option>
                                    <option value="special">Special</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="status-akun">Status Akun</CLabel>
                                <CSelect custom name="status_akun" id="status-akun" value={inputCustomer.status_akun} onChange={customerChangeHandler} disabled={formDisabled} >
                                    <option value="0">Tidak Aktif</option>
                                    <option value="1">Aktif</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => additionalFormSubmitHandler('pelanggan')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setOpenCustomerModal(!openCustomerModal)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCustomer;