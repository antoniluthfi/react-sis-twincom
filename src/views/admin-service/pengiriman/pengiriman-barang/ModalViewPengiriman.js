import React from 'react';
import {
    CRow,
    CCol,
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

const ModalViewPengiriman = props => {
    let {
        info, 
        closeModalHandler,
        loadCurrentPengiriman,
        kodeSuratJalan,
        currentPengiriman,
        changeHandler,
        loadDataListPengiriman,
        dataListPengiriman,
        kodeCabang
    } = props;

    return (
        <CModal 
            show={info} 
            onClose={() => closeModalHandler('view')}
            color="info"
            size="xl"
        >
            <CModalHeader closeButton>
                <CModalTitle>Pengiriman Barang</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {loadCurrentPengiriman ? null : 
                    <div>
                        <CRow>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="no_surat_jalan">Nomor Surat Jalan</CLabel>
                                    <CInput type="text" id="no_surat_jalan" name="no_surat_jalan" value={`${kodeSuratJalan(currentPengiriman.admin.cab_penempatan)}${currentPengiriman.no_surat_jalan}`} onChange={changeHandler} placeholder="Nomor Surat Jalan" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="partner">Tujuan</CLabel>
                                    <CInput type="text" id="partner" name="partner" value={currentPengiriman.partner.nama} onChange={changeHandler} placeholder="Nama Partner" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="alamat">Alamat</CLabel>
                                    <CInput type="text" id="alamat" name="alamat" value={currentPengiriman.partner.alamat} onChange={changeHandler} placeholder="Alamat Partner" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>    
                        
                        <CRow>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="pengirim">Pengirim</CLabel>
                                    <CInput type="text" id="pengirim" name="pengirim" value={currentPengiriman.pengirim.name} onChange={changeHandler} placeholder="Pengirim" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="pengantar">Pengantar</CLabel>
                                    <CInput type="text" id="pengantar" name="pengantar" value={currentPengiriman.pengantar.name} onChange={changeHandler} placeholder="Pengantar" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                    <CInput type="text" id="keterangan" name="keterangan" value={currentPengiriman.keterangan} onChange={changeHandler} placeholder="Pengantar" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </div>
                }

                <CRow>
                    <CCol xs="12" md="12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">No Service</th>
                                    <th className="text-center">Serial Number</th>
                                    <th className="text-center">Kelengkapan</th>
                                    <th className="text-center">Kerusakan</th>
                                    <th className="text-center">Status Pengiriman</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadDataListPengiriman ? null :
                                    dataListPengiriman.map((item, index) => (
                                        <div>
                                            <tr>
                                                <td className="text-center">{kodeCabang(item.penerimaan.id_cabang)}{item.no_service}</td>
                                                <td className="text-center">{item.penerimaan.sn}</td>
                                                <td className="text-center">{item.kelengkapan}</td>
                                                <td className="text-center">{item.kerusakan}</td>
                                                <td className="text-center">{item.status_pengiriman === 0 ? 'Terkirim' : 'Kembali'}</td>
                                            </tr>
                                        </div>
                                    ))
                                }
                            </tbody>
                        </table>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal>
    )
}

export default ModalViewPengiriman;