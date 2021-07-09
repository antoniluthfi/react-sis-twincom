import React from 'react';
import {
    CRow,
    CCol,
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

const ModalLogAktifitas = props => {
    let {
        info, 
        setInfo,
        loadDataLog,
        currentDataLog,
    } = props;

    return (
        <CModal 
            show={info} 
            onClose={() => setInfo(!info)}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Log Aktivitas</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    {loadDataLog ? null : 
                        <div>                            
                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nama">Nama</CLabel>
                                        <CInput type="text" id="nama" name="name" value={currentDataLog.user.name} placeholder="Nama User" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="hak_akses">Hak Akses</CLabel>
                                        <CInput type="text" id="hak_akses" name="hak_akses" value={currentDataLog.hak_akses} placeholder="Hak Akses" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="halaman">Halaman</CLabel>
                                        <CInput type="text" id="halaman" name="halaman" value={currentDataLog.halaman} placeholder="Halaman Yang Diakses" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="method">Aksi</CLabel>
                                        <CInput type="text" id="method" name="method" value={currentDataLog.method} placeholder="Aksi Yang Dilakukan" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                        <CInput type="text" id="keterangan" name="keterangan" value={currentDataLog.keterangan} placeholder="Keterangan" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </div>
                    }
                </CForm>
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal>
    )
}

export default ModalLogAktifitas;