import React from 'react';
import {
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CButton,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,  
    CInputCheckbox,
    CSelect,
} from '@coreui/react';

const ModalCetakLaporanPembayaran = props => {
    let {
        warning,
        closeModalHandler,
        cetakLaporanHandler,
        cetakLaporan,
        loadDataCabang,
        dataCabang,
        submitHandler,
        setWarning,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift
    } = props;

    return (
        <CModal 
            show={warning} 
            onClose={() => closeModalHandler('CetakLaporan')}
            color="warning"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Cetak Laporan</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="12" className="mb-2">
                        <CFormGroup variant="custom-checkbox" inline>
                            <CInputCheckbox custom id="filter-lebih-dari-satuhari" name="filter_lebih_dari_satuhari" defaultChecked={false} onChange={cetakLaporanHandler} />
                            <CLabel variant="custom-checkbox" htmlFor="filter-lebih-dari-satuhari">Filter lebih dari 1 hari</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-checkbox" inline>
                            <CInputCheckbox custom id="filter-cabang" name="filter_cabang" defaultChecked={false} onChange={cetakLaporanHandler} />
                            <CLabel variant="custom-checkbox" htmlFor="filter-cabang">Filter Cabang</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-checkbox" inline>
                            <CInputCheckbox custom id="filter-shift" name="filter_shift" defaultChecked={false} onChange={cetakLaporanHandler} />
                            <CLabel variant="custom-checkbox" htmlFor="filter-shift">Filter Shift</CLabel>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup>
                            <CLabel htmlFor="dari">Dari</CLabel>
                            <CInput type="date" id="dari" name="dari" value={cetakLaporan.dari} onChange={cetakLaporanHandler} placeholder="dd/mm/yy" />
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6">
                        <CFormGroup className={filterLebihDariSatuHari}>
                            <CLabel htmlFor="sampai">Sampai</CLabel>
                            <CInput type="date" id="sampai" name="sampai" value={cetakLaporan.sampai} onChange={cetakLaporanHandler} placeholder="dd/mm/yy" />
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" md="6">
                        <CFormGroup className={filterCabang}>
                            <CLabel htmlFor="cabang">Cabang</CLabel>
                            <CSelect custom name="cabang" id="cabang" value={cetakLaporan.cabang} onChange={cetakLaporanHandler} >
                                <option key="sdnjns" value="">Pilih Salah Satu</option>
                                {loadDataCabang ? null : 
                                    dataCabang.map((item, index) => (
                                        <option key={index} value={item.id}>{item.nama_cabang}</option>
                                    ))
                                }
                            </CSelect>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6">
                        <CFormGroup className={filterShift}>
                            <CLabel htmlFor="shift">Shift</CLabel>
                            <CSelect custom name="shift" id="shift" value={cetakLaporan.shift} onChange={cetakLaporanHandler} >
                                <option value="">Pilih Salah Satu</option>
                                <option value="0">Shift 1</option>
                                <option value="1">Shift 2</option>
                            </CSelect>
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="warning" onClick={() => submitHandler('CetakLaporan')}>Cetak Laporan</CButton>{' '}
                <CButton color="secondary" onClick={() => setWarning(!warning)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalCetakLaporanPembayaran;