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

const ModalViewPembayaran = props => {
    let {
        info,
        closeModalHandler,
        loadDataPembayaran,
        currentPembayaran,
        kodeCabang,
    } = props;

    return (
        <CModal 
            show={info} 
            onClose={() => closeModalHandler('View')}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Data Pembayaran {loadDataPembayaran ? null : `${currentPembayaran.penerimaan.customer.name} - ${currentPembayaran.penerimaan.bj.nama_bj}`}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {loadDataPembayaran ? null : 
                    <div>
                        <CForm action="" method="post">
                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nomor-pembayaran">Nomor Pembayaran</CLabel>
                                        <CInput type="text" id="nomor-pembayaran" name="no_pembayaran" value={currentPembayaran.no_pembayaran} placeholder="Masukkan Nomor Pembayaran" disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nomor-service">Nomor Service</CLabel>
                                        <CInput type="text" id="nomor-service" name="no_service" value={`${kodeCabang(currentPembayaran.penerimaan.cabang.nama_cabang.toLowerCase())}${currentPembayaran.no_service}`} placeholder="Masukkan Nomor Service" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nama-pelanggan">Nama Pelanggan</CLabel>
                                        <CInput type="text" id="nama-pelanggan" name="nama_pelanggan" value={currentPembayaran.penerimaan.customer.name} placeholder="Masukkan Nama Pelanggan" disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="bj">Jasa</CLabel>
                                        <CInput type="text" id="bj" name="bj" value={currentPembayaran.penerimaan.bj.nama_bj} placeholder="Masukkan Jasa" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nama-admin">Nama Admin</CLabel>
                                        <CInput type="text" id="nama-admin" name="nama_admin" value={currentPembayaran.admin == null ? '-' : currentPembayaran.admin.name} placeholder="Masukkan Nama Admin" disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nama-kas">Kas</CLabel>
                                        <CInput type="text" id="nama-kas" name="kas" value={currentPembayaran.arusKas == null ? '-' : currentPembayaran.arusKas.kas == 0 ? 'Tunai' : 'Bank'} placeholder="Masukkan Kas" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            {currentPembayaran.arusKas == null ? null :
                                <div>
                                    <CRow>
                                        <CCol xs="12" md="6">
                                            <CFormGroup>
                                                <CLabel htmlFor="metode-pembayaran">Pembayaran</CLabel>
                                                <CInput type="text" id="metode-pembayaran" name="pembayaran" value={currentPembayaran.dp == 0 ? 'Cash' : 'DP'} placeholder="Masukkan Metode Pembayaran" disabled={true} />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" md="6">
                                            <CFormGroup>
                                                <CLabel htmlFor="nominal-pembayaran">Nominal</CLabel>
                                                <CInput type="text" id="nominal-pembayaran" name="nominal" value={`Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentPembayaran.nominal)}`} placeholder="Masukkan Nominal" disabled={true} />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                </div>
                            }

                            <CRow>
                                <CCol xs="12" md="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="status-pembayaran">Status Pembayaran</CLabel>
                                        <CInput type="text" id="status-pembayaran" name="status_pembayaran" value={currentPembayaran.status_pembayaran == 0 ? 'Belum Lunas' : 'Lunas'} placeholder="Status Pembayaran" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="keterangan-pembayaran">Keterangan Pembayaran</CLabel>
                                        <CInput type="text" id="keterangan-pembayaran" name="keterangan_pembayaran" value={currentPembayaran.keterangan_pembayaran == null ? '-' : currentPembayaran.keterangan_pembayaran} placeholder="Masukkan Keterangan" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CForm>
                    </div>
                }
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal>
    )
}

export default ModalViewPembayaran;