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

const ModalViewPembelianBarangSecond = props => {
    let {
        info,
        closeModalHandler,
        loadCurrentDataPengajuan,
        currentDataPengajuan,
        kodeCabang,
        changeHandler
    } = props;

    return (
        <CModal 
            show={info} 
            onClose={() => closeModalHandler('view')}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Data Pengajuan {loadCurrentDataPengajuan ? null : `${currentDataPengajuan.penerimaan.merek} ${currentDataPengajuan.penerimaan.tipe} - ${kodeCabang(currentDataPengajuan.penerimaan.cabang.nama_cabang)}${currentDataPengajuan.no_service}`}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="toko_awal_pembelian">Toko Awal Pembelian</CLabel>
                            <CInput type="text" id="toko_awal_pembelian" name="toko_awal_pembelian" value={currentDataPengajuan.nama_toko_asal} onChange={changeHandler} placeholder="Masukkan Jenis Prosesor" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="lama_pemakaian">Lama Pemakaian</CLabel>
                            <CInput type="text" id="lama_pemakaian" name="lama_pemakaian" value={currentDataPengajuan.lama_pemakaian} onChange={changeHandler} placeholder="Masukkan Kapasitas RAM" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="harga_awal_beli">Harga Awal Beli</CLabel>
                            <CInput type="text" id="harga_awal_beli" name="harga_awal_beli" value={`Rp. ${currentDataPengajuan.harga_beli}`} onChange={changeHandler} placeholder="Masukkan Jenis Prosesor" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="harga_pengajuan">Harga Pengajuan</CLabel>
                            <CInput type="text" id="harga_pengajuan" name="harga_pengajuan" value={`Rp. ${currentDataPengajuan.pengajuan_harga}`} onChange={changeHandler} placeholder="Masukkan Kapasitas RAM" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                </CRow>


                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="processor">Prosesor</CLabel>
                            <CInput type="text" id="processor" name="processor" value={currentDataPengajuan.processor} onChange={changeHandler} placeholder="Masukkan Jenis Prosesor" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="memory">Memory</CLabel>
                            <CInput type="text" id="memory" name="memory" value={currentDataPengajuan.memory} onChange={changeHandler} placeholder="Masukkan Kapasitas RAM" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="harddisk">Harddisk</CLabel>
                            <CInput type="text" id="harddisk" name="harddisk" value={currentDataPengajuan.harddisk} onChange={changeHandler} placeholder="Masukkan Kapasitas HDD" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="graphic_card">Graphic Card</CLabel>
                            <CInput type="text" id="graphic_card" name="graphic_card" value={currentDataPengajuan.graphic_card} onChange={changeHandler} placeholder="Masukkan Jenis Graphic Card" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="alasan_menjual">Alasan Menjual</CLabel>
                            <CInput type="text" id="alasan_menjual" name="alasan_menjual" value={currentDataPengajuan.alasan_menjual} onChange={changeHandler} placeholder="Masukkan Kapasitas HDD" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="kode_jual">Kode Jual</CLabel>
                            <CInput type="text" id="kode_jual" name="kode_jual" value={currentDataPengajuan.kode_jual === 0 ? 'Tukar Tambah' : 'Jual Saja'} onChange={changeHandler} placeholder="Masukkan Jenis Graphic Card" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="pengecek">Pengecek</CLabel>
                            <CInput type="text" id="pengecek" name="pengecek" value={loadCurrentDataPengajuan ? null : currentDataPengajuan.pengecek.name} onChange={changeHandler} placeholder="Masukkan Kapasitas HDD" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="status_pengajuan">Status Pengajuan</CLabel>
                            <CInput type="text" id="status_pengajuan" name="status_pengajuan" value={currentDataPengajuan.dibeli == null ? 'Menunggu Keputusan Pimpinan' : currentDataPengajuan.dibeli === 1 ? 'Disetujui' : 'Ditolak'} onChange={changeHandler} placeholder="Masukkan Jenis Graphic Card" disabled={true}/>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan="2" className="text-center">
                                        <b>Kondisi</b>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="text-center w-75">Nama</th>
                                    <th className="text-center w-25">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>DVD/CD</td>
                                    <td className="text-center">{currentDataPengajuan.cd_dvd === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Keyboard</td>
                                    <td className="text-center">{currentDataPengajuan.keyboard === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>LCD</td>
                                    <td className="text-center">{currentDataPengajuan.lcd === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>USB</td>
                                    <td className="text-center">{currentDataPengajuan.usb === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Camera</td>
                                    <td className="text-center">{currentDataPengajuan.camera === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Charger</td>
                                    <td className="text-center">{currentDataPengajuan.charger === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Casing</td>
                                    <td className="text-center">{currentDataPengajuan.casing === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Touchpad</td>
                                    <td className="text-center">{currentDataPengajuan.touchpad === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>WiFi</td>
                                    <td className="text-center">{currentDataPengajuan.wifi === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>LAN</td>
                                    <td className="text-center">{currentDataPengajuan.lan === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Sound</td>
                                    <td className="text-center">{currentDataPengajuan.sound === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Baterai</td>
                                    <td className="text-center">{currentDataPengajuan.baterai === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan="2" className="text-center">
                                        <b>Kelengkapan</b>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="text-center w-75">Nama</th>
                                    <th className="text-center w-25">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nota</td>
                                    <td className="text-center">{currentDataPengajuan.nota === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Kotak</td>
                                    <td className="text-center">{currentDataPengajuan.kotak === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Tas</td>
                                    <td className="text-center">{currentDataPengajuan.tas === 1 ? 'Ya' : 'Tidak'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal>
    )
}

export default ModalViewPembelianBarangSecond;