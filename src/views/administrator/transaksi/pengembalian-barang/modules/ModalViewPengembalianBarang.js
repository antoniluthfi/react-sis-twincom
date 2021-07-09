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

const ModalViewPengembalianBarang = props => {
    let {
        info, 
        closeModalHandler,
        loadDataPengembalian,
        currentPengembalian,
        changeHandler,
        kodeCabang,
        stiker,
        statusPembayaran,
        statusPengerjaan,
        statusPengembalian
    } = props;

    return (
        <CModal 
            show={info} 
            onClose={() => closeModalHandler('View')}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Data Pengembalian</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    {
                        loadDataPengembalian ? null :
                        <div>
                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nomor-pengembalian">Nomor Pengembalian</CLabel>
                                        <CInput type="text" id="nomor-pengembalian" name="no_pengembalian" value={currentPengembalian.no_pengembalian} onChange={changeHandler} placeholder="Masukkan Nomor Pengembalian" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nomor-service">Nomor Service</CLabel>
                                        <CInput type="text" id="nomor-service" name="no_service" value={`${kodeCabang(currentPengembalian.penerimaan.cabang.nama_cabang)}${currentPengembalian.no_service}`} onChange={changeHandler} placeholder="Masukkan Nomor Service" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" lg="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nama-pelanggan">Nama Pelanggan</CLabel>
                                        <CInput type="text" id="nama-pelanggan" name="nama_pelanggan" value={currentPengembalian.penerimaan.customer.nama} onChange={changeHandler} placeholder="Masukkan Nama Pelanggan" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" lg="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="merek-tipe">Merek Tipe</CLabel>
                                        <CInput type="text" id="merek-tipe" name="merek_tipe" value={`${currentPengembalian.penerimaan.merek} ${currentPengembalian.penerimaan.tipe}`} onChange={changeHandler} placeholder="Masukkan Merek" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" lg="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="stiker-twincom">Stiker Twincom</CLabel>
                                        <CInput type="text" id="stiker-twincom" name="stiker_twincom" value={stiker(currentPengembalian.pengerjaan.cek_stiker)} onChange={changeHandler} placeholder="Masukkan Nama Pelanggan" disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                {
                                    currentPengembalian.pengerjaan.status_pengerjaan === 3 ? 
                                    <div>
                                        <CCol xs="12" lg="6">
                                            <CFormGroup>
                                                <CLabel htmlFor="status-pembayaran">Status Pembayaran</CLabel>
                                                <CInput type="text" id="status-pembayaran" name="status_pembayaran" value={statusPembayaran(currentPengembalian.status_pembayaran)} onChange={changeHandler} placeholder="Status Pembayaran" disabled={true} />
                                            </CFormGroup>
                                        </CCol>
                                    </div> :
                                    <div>
                                        <CCol xs="12" lg="6">
                                            <CFormGroup>
                                                <CLabel htmlFor="status-pengerjaan">Status Pengerjaan</CLabel>
                                                <CInput type="text" id="status-pengerjaan" name="status_pengerjaan" value={statusPengerjaan(currentPengembalian.pengerjaan.status_pengerjaan)} onChange={changeHandler} placeholder="Status Pengerjaan" disabled={true} />
                                            </CFormGroup>
                                        </CCol>
                                    </div>
                                }
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="status-pengembalian">Status Pengembalian</CLabel>
                                        <CInput type="text" id="status-pengembalian" name="status_pengembalian" value={statusPengembalian(currentPengembalian.status_pengembalian)} onChange={changeHandler} placeholder="Status Pembayaran" disabled={true} />
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

export default ModalViewPengembalianBarang;