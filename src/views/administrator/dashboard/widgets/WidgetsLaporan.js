import React, { useState, useEffect } from 'react'
import {
    CWidgetDropdown,
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CLabel,
    CSelect,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../../../charts/ChartLineSimple'
import WidgetsLaporanHelper from '../modules/WidgetsLaporanHelper';

const WidgetsLaporan = () => {
    const {
        success, setSuccess,
        loadData,
        pemasukanBanjarbaru,
        pemasukanLandasanUlin,
        pemasukanBanjarmasin,
        dataCabang,
        loadDataCabang,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        cetakLaporan,
        setCurrentCabang,
        getPendinganTeknisi,
        cetakLaporanHandler,
        getDataLaporan,
        getDataCabang
    } = WidgetsLaporanHelper();

    useEffect(() => {
        getPendinganTeknisi();
        getDataCabang();
    }, []); 

    // render
    return (
        <>
        <h4>Laporan Total Pemasukan</h4>
        <CRow>
            <CCol sm="6" lg="4">
                <CWidgetDropdown
                    color="gradient-primary"
                    header={`Rp. ${loadData ? 0 : pemasukanBanjarbaru === 0 ? 0 : pemasukanBanjarbaru.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}`} 
                    text="Pemasukan kas cabang Banjarbaru" 
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="c-chart-wrapper mt-3 mx-3"
                            style={{height: '70px'}}
                            // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                            pointHoverBackgroundColor="primary"
                            label="Members"
                            labels="months"
                        />
                    }
                >
                    {pemasukanBanjarbaru === 0 ? null : 
                        <CDropdown>
                            <CDropdownToggle color="transparent">
                                <CIcon name="cil-settings"/>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                                <CDropdownItem 
                                    onClick={() => {
                                        setCurrentCabang('Banjarbaru');
                                        setSuccess(!success);
                                    }}
                                >Cetak Laporan
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>                    
                    }
                </CWidgetDropdown>
            </CCol>

            <CCol sm="6" lg="4">
                <CWidgetDropdown
                    color="gradient-info"
                    header={`Rp. ${loadData ? 0 : pemasukanLandasanUlin === 0 ? 0 : pemasukanLandasanUlin.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}`} 
                    text="Pemasukan kas cabang Landasan Ulin" 
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="c-chart-wrapper mt-3 mx-3"
                            style={{height: '70px'}}
                            // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                            pointHoverBackgroundColor="primary"
                            label="Members"
                            labels="months"
                        />
                    }
                >
                    {pemasukanLandasanUlin === 0 ? null : 
                        <CDropdown>
                            <CDropdownToggle color="transparent">
                                <CIcon name="cil-settings"/>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                                <CDropdownItem 
                                    onClick={() => {
                                        setCurrentCabang('Landasan Ulin');
                                        setSuccess(!success);
                                    }}
                                >Cetak Laporan
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>                    
                    }
                </CWidgetDropdown>
            </CCol>

            <CCol sm="6" lg="4">
                <CWidgetDropdown
                    color="gradient-warning"
                    header={`Rp. ${loadData ? 0 : pemasukanBanjarmasin === 0 ? 0 : pemasukanBanjarmasin.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}`} 
                    text="Pemasukan kas cabang Banjarmasin" 
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="c-chart-wrapper mt-3 mx-3"
                            style={{height: '70px'}}
                            // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                            pointHoverBackgroundColor="primary"
                            label="Members"
                            labels="months"
                        />
                    }
                >
                    {pemasukanBanjarmasin === 0 ? null :
                        <CDropdown>
                            <CDropdownToggle color="transparent">
                                <CIcon name="cil-settings"/>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                                <CDropdownItem 
                                    onClick={() => {
                                        setCurrentCabang('Banjarmasin');
                                        setSuccess(!success);
                                    }}
                                >Cetak Laporan
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>                    
                    }
                </CWidgetDropdown>
            </CCol>
        </CRow>

        {/* cetak laporan */}
        <CModal 
            show={success} 
            onClose={() => setSuccess(!success)}
            color="success"
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
                <CButton color="success" onClick={getDataLaporan}>Cetak Laporan</CButton>{' '}
                <CButton color="secondary" onClick={() => setSuccess(!success)}>Cancel</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

export default WidgetsLaporan
