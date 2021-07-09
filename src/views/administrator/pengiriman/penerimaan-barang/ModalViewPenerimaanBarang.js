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
    CModalFooter,  
} from '@coreui/react';

const ModalViewPenerimaanBarang = props => {
    let {
        info,
        closeModalHandler,
        loadCurrentDataPenerimaan,
        kodeSuratJalan,
        currentDataPenerimaan,
        changeHandler,
        kodeCabang
    } = props;

    return (
        <CModal 
            show={info} 
            onClose={closeModalHandler}
            color="info"
        >
            <CModalHeader closeButton>
                <CModalTitle>Data Pengiriman</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {loadCurrentDataPenerimaan ? null : 
                    <div>
                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="no_surat_jalan">No Surat Jalan</CLabel>
                                <CInput type="text" id="no_surat_jalan" name="no_surat_jalan" value={`${kodeSuratJalan(currentDataPenerimaan[0].surat_jalan.admin.cab_penempatan)}${currentDataPenerimaan[0].no_surat_jalan}`} onChange={changeHandler} placeholder="Nomor Surat Jalan" disabled={true} />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="no_service">No Service</CLabel>
                                <CInput type="text" id="no_service" name="no_service" value={`${kodeCabang(currentDataPenerimaan[0].penerimaan.cabang.nama_cabang)}${currentDataPenerimaan[0].no_service}`} onChange={changeHandler} placeholder="Nomor Service" disabled={true} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="bj">Barang Jasa</CLabel>
                                <CInput type="text" id="bj" name="bj" value={currentDataPenerimaan[0].penerimaan.bj.nama_bj} onChange={changeHandler} placeholder="Barang Jasa" disabled={true} />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="partner">Partner</CLabel>
                                <CInput type="text" id="partner" name="partner" value={currentDataPenerimaan[0].surat_jalan.partner.nama} onChange={changeHandler} placeholder="Partner" disabled={true} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="admin">Admin</CLabel>
                                <CInput type="text" id="admin" name="admin" value={currentDataPenerimaan[0].surat_jalan.admin.name} onChange={changeHandler} placeholder="Admin" disabled={true} />
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="admin">Admin</CLabel>
                                <CInput type="text" id="admin" name="admin" value={currentDataPenerimaan[0].surat_jalan.pengirim.name} onChange={changeHandler} placeholder="Pengirim" disabled={true} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="pengantar">Pengantar</CLabel>
                                <CInput type="text" id="pengantar" name="pengantar" value={currentDataPenerimaan[0].surat_jalan.pengantar.name} onChange={changeHandler} placeholder="Pengantar" disabled={true} />
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="status">Status</CLabel>
                                <CInput type="text" id="status" name="status" value={currentDataPenerimaan[0].status === 0 ? 'Terkirim' : 'Kembali'} onChange={changeHandler} placeholder="Pengantar" disabled={true} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    </div>                    
                }
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal>
    )
}

export default ModalViewPenerimaanBarang;