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

const ModalViewArusKas = props => {
    let {
        info,
        closeModalHandler,
        loadCurrentArusKas,
        currentArusKas,
        changeHandler,
        kodeCabang,
        pembayaran,
        kas
    } = props;

    return (
        <CModal 
            show={info} 
            onClose={() => closeModalHandler('view')}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Data Arus Kas</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {loadCurrentArusKas ? null :
                    <div>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nomor-bukti">Nomor Bukti</CLabel>
                                    <CInput type="text" id="nomor-bukti" name="no_bukti" value={currentArusKas.no_bukti} onChange={changeHandler} placeholder="Nomor Bukti" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            {currentArusKas.no_service === 0 ? null :
                                <div>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nomor-service">Nomor Service</CLabel>
                                            <CInput type="text" id="nomor-service" name="no_service" value={`${kodeCabang(currentArusKas.penerimaan.cabang.nama_cabang)}${currentArusKas.no_service}`} onChange={changeHandler} placeholder="Nomor Service" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </div>
                            }
                        </CRow>

                        {currentArusKas.no_service === 0 ? null :
                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="merek-tipe">Merek Tipe</CLabel>
                                        <CInput type="text" id="merek-tipe" name="merek" value={`${currentArusKas.penerimaan.merek} ${currentArusKas.penerimaan.tipe}`} onChange={changeHandler} placeholder="Merek Tipe" disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="jenis">Jenis</CLabel>
                                        <CInput type="text" id="jenis" name="jenis" value={currentArusKas.penerimaan.jenis_penerimaan} onChange={changeHandler} placeholder="Jenis Penerimaan" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        }

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="pembayaran">Pembayaran</CLabel>
                                    <CInput type="text" id="pembayaran" name="pembayaran" value={pembayaran(currentArusKas.dp)} onChange={changeHandler} placeholder="Pembayaran" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="kas">Kas</CLabel>
                                    <CInput type="text" id="kas" name="kas" value={kas(currentArusKas.kas)} onChange={changeHandler} placeholder="Kas" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="rekening">Rekening</CLabel>
                                    <CInput type="text" id="rekening" name="rekening" value={currentArusKas.norekening} onChange={changeHandler} placeholder="Rekening" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="jenis-transaksi">Jenis Transaksi</CLabel>
                                    <CInput type="text" id="jenis-transaksi" name="jenis_transaksi" value={currentArusKas.masuk === 1 ? 'Masuk' : currentArusKas.keluar === 1 ? 'Keluar' : null} onChange={changeHandler} placeholder="Jenis Transaksi" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol>
                                <CFormGroup>
                                    <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                    <CInput type="text" id="keterangan" name="keterangan" value={currentArusKas.keterangan} onChange={changeHandler} placeholder="Rekening" disabled={true} />
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

export default ModalViewArusKas;