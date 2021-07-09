import React from 'react';
import {
    CRow,
    CCol,
    CInputRadio,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,  
    CTextarea
} from '@coreui/react';

const ModalViewPengerjaan = props => {
    let {
        info,
        closeModalHandler,
        loadCurrentPengerjaan,
        kodeCabang,
        currentPengerjaan,
        changeHandler,
        statusPengerjaan,
        currentTeknisipj
    } = props;

    return (
        <CModal 
            show={info} 
            onClose={() => closeModalHandler('View')}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Data Pengerjaan</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {
                    loadCurrentPengerjaan ? null : 
                    <div>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="no-service">Nomor Service</CLabel>
                                    <CInput type="text" id="no-service" name="no_service" value={`${kodeCabang(currentPengerjaan.penerimaan.cabang.nama_cabang)}${currentPengerjaan.no_service}`} placeholder="Masukkan Nomor Service" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nama-pelanggan">Nama Pelanggan</CLabel>
                                    <CInput type="text" id="nama-pelanggan" name="nama_pelanggan" value={currentPengerjaan.penerimaan.customer.nama} placeholder="Masukkan Nomor Service" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="merek">Merek</CLabel>
                                    <CInput type="text" id="merek" name="merek" value={currentPengerjaan.penerimaan.merek} placeholder="Masukkan Merek" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="tipe">Tipe</CLabel>
                                    <CInput type="text" id="tipe" name="tipe" value={currentPengerjaan.penerimaan.tipe} placeholder="Masukkan Tipe" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="bj">Barang/Jasa</CLabel>
                                    <CInput type="text" id="bj" name="bj" value={currentPengerjaan.penerimaan.bj.nama_bj} placeholder="Masukkan Barang Jasa" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="status-pengerjaan">Status Pengerjaan</CLabel>
                                    <CInput type="text" id="status-pengerjaan" name="status_pengerjaan" value={statusPengerjaan(currentPengerjaan.status_pengerjaan)} placeholder="Satatus Pengerjaan" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="problem">Problem</CLabel>
                                    <CInput type="text" id="problem" name="problem" value={currentPengerjaan.penerimaan.problem} placeholder="Masukkan Problem" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="kondisi">Kondisi</CLabel>
                                    <CInput type="text" id="kondisi" name="kondisi" value={currentPengerjaan.penerimaan.kondisi} placeholder="Masukkan Kondisi" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="estimasi">Estimasi</CLabel>
                                    <CInput type="text" id="estimasi" name="estimasi" value={currentPengerjaan.penerimaan.estimasi} placeholder="Estimasi Penyelesaian" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="jatuh-tempo">Jatuh Tempo</CLabel>
                                    <CInput type="text" id="jatuh-tempo" name="jatuh_tempo" value={currentPengerjaan.penerimaan.tempo} placeholder="Batas Tempo Pengerjaan" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="biaya-service">Biaya Service</CLabel>
                                    <CInput type="text" id="biaya-service" name="biaya_service" value={currentPengerjaan.biaya_service} placeholder="Biaya Service" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="garansi">Garansi</CLabel>
                                    <CInput type="text" id="garansi" name="garansi" value={`${currentPengerjaan.garansi} Hari`} placeholder="Masukkan Garansi" onChange={changeHandler} disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="teknisi">Teknisi PJ</CLabel>
                                    <CInput type="text" id="teknisi" name="teknisi" value={currentTeknisipj} placeholder="Teknisi PJ" onChange={changeHandler} disabled={true} />
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

export default ModalViewPengerjaan;