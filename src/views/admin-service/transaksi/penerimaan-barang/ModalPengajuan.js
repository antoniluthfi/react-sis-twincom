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

const ModalPengajuan = props => {
    let {
        openModalPengajuan,
        setOpenModalPengajuan,
        inputPengajuan,
        pengajuanChangeHandler,
        formDisabled,
        additionalFormSubmitHandler
    } = props;

    return (
        <CModal 
            show={openModalPengajuan} 
            onClose={() => setOpenModalPengajuan(!openModalPengajuan)}
            color="primary"
        >
            <CModalHeader closeButton>
                <CModalTitle>Pengajuan Pembelian Barang Second</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post">
                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="nama-toko">Nama Toko Asal</CLabel>
                                <CInput type="text" id="nama-toko" name="nama_toko_asal" value={inputPengajuan.nama_toko_asal} onChange={pengajuanChangeHandler} placeholder="Masukkan Nama Toko" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="tanggal-pembelian">Tanggal Pembelian</CLabel>
                                <CInput type="date" id="tanggal-pembelian" name="tanggal_pembelian" value={inputPengajuan.tanggal_pembelian} onChange={pengajuanChangeHandler} placeholder="Masukkan Tanggal Pembelian" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="harga-awal-beli">Harga Awal Beli</CLabel>
                                <CInput type="number" id="harga-awal-beli" name="harga_beli" value={inputPengajuan.harga_beli} onChange={pengajuanChangeHandler} placeholder="Masukkan Harga Awal Beli" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="lama-pemakaian">Lama Pemakaian</CLabel>
                                <CInput type="text" id="lama-pemakaian" name="lama_pemakaian" value={inputPengajuan.lama_pemakaian} onChange={pengajuanChangeHandler} placeholder="Masukkan Lama Pemakaian" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="segel-distri">Segel Distri</CLabel>
                                <CInput type="date" id="segel-distri" name="segel_distri" value={inputPengajuan.segel_distri} onChange={pengajuanChangeHandler} placeholder="Masukkan Tanggal Pembelian" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="pengajuan-harga">Harga Yang Diajukan</CLabel>
                                <CInput type="number" id="pengajuan-harga" name="pengajuan_harga" value={inputPengajuan.pengajuan_harga} onChange={pengajuanChangeHandler} placeholder="Masukkan Pengajuan Harga" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="alasan-menjual">Alasan Menjual</CLabel>
                                <CInput type="text" id="alasan-menjual" name="alasan_menjual" value={inputPengajuan.alasan_menjual} onChange={pengajuanChangeHandler} placeholder="Masukkan Alasan Menjual" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                <CInput type="text" id="keterangan" name="keterangan" value={inputPengajuan.keterangan} onChange={pengajuanChangeHandler} placeholder="Masukkan Keterangan" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CFormGroup>
                                <CLabel htmlFor="kode-jual">Kode Jual</CLabel>
                                <CSelect custom name="kode_jual" id="kode-jual" value={inputPengajuan.kode_jual} onChange={pengajuanChangeHandler} disabled={formDisabled} >
                                    <option value="0">Tukar Tambah</option>
                                    <option value="1">Jual Saja</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => additionalFormSubmitHandler('pengajuan')}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setOpenModalPengajuan(!openModalPengajuan)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalPengajuan;