import React, { useEffect } from 'react';
import PembelianBarangSecondHelper from './modules/PembelianBarangSecondHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CInputRadio,
    CModalFooter,
    CCollapse,
    CInputCheckbox
  } from '@coreui/react'  

const PembelianBarangSecond = () => {
    const {
        fields,
        success, setSuccess,
        info,
        danger,
        warning, setWarning,
        dataPengajuan,
        isLoading,
        currentDataPengajuan,
        loadCurrentDataPengajuan,
        input, 
        modalTitle,
        details, setDetails, 
        toggleDetails,
        changeHandler,
        checkboxChangeHandler,
        closeModalHandler,
        submitHandler,
        getCurrentUser,
        getDataPengajuanByNoService
    } = PembelianBarangSecondHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

    const kodeCabang = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'S.BJB.'
            case 'Landasan Ulin':
                return 'S.LNU.';
            case 'Banjarmasin':
                return 'S.BJM.';
            default:
                return '';
        }
    }

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Pengajuan Pembelian Barang Second</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataPengajuan}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={isLoading ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={isLoading}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'no_service':
                                    (item) => (
                                        <td className="py-2 text-center">
                                            {kodeCabang(item.penerimaan.cabang.nama_cabang)}{item.no_service}
                                        </td>
                                    ), 
                                    'merek':
                                    (item => (
                                        <td className="py-2">
                                            {item.penerimaan.merek} {item.penerimaan.tipe}
                                        </td>
                                    )),
                                    'toko_asal':
                                    (item => (
                                        <td className="py-2">
                                            {item.nama_toko_asal}
                                        </td>
                                    )),
                                    'lama_pemakaian':
                                    (item) => (
                                        <td className="py-2 text-center">
                                            {item.lama_pemakaian}
                                        </td>
                                    ),
                                    'alasan_menjual':
                                    (item => (
                                        <td className="py-2">
                                            {item.alasan_menjual == null ? null : item.alasan_menjual}
                                        </td>
                                    )), 
                                    'pengecek':
                                    (item) => (
                                        <td className="py-2 text-center">
                                            {item.pengecek == null ? '-' : item.pengecek.name}
                                        </td>
                                    ),
                                    'harga_beli':
                                    (item => (
                                        item.harga_beli == null ? 
                                        <td className="py-2 text-center">
                                            -
                                        </td> :                                   
                                        <td className="py-2 text-right">
                                            Rp. {item.harga_beli}
                                        </td>
                                    )),
                                    'keterangan':
                                    (item => (
                                        <td className="py-2">
                                            {item.keterangan == null ? null : item.keterangan}
                                        </td>
                                    )), 
                                    'show_details':
                                    (item, index) => {
                                        return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={()=>{toggleDetails(index)}}
                                            >
                                                {details.includes(index) ? 'Hide' : 'Show'}
                                            </CButton>
                                        </td>
                                        )
                                    },
                                    'details':
                                        (item, index) => {
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                {
                                                    <h5>Status Pengajuan : {item.dibeli == null ? 'Menunggu Keputusan' : item.dibeli === 0 ? 'Ditolak' : 'Disetujui'}</h5>
                                                }
                                                <CButton size="sm" color="info" onClick={() => getDataPengajuanByNoService(item.no_service, 'view')}>
                                                    View Details
                                                </CButton>
                                                {item.kode_jual == null ? null :
                                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengajuanByNoService(item.no_service, 'update')}>
                                                        Update
                                                    </CButton>                                                
                                                }
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengajuanByNoService(item.no_service, 'delete')}>
                                                    Reset
                                                </CButton>
                                            </CCardBody>
                                        </CCollapse>
                                        )
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit, view data */}
            <CModal 
                show={success} 
                onClose={() => closeModalHandler('update')}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle} {loadCurrentDataPengajuan ? null : `${currentDataPengajuan.penerimaan.merek} ${currentDataPengajuan.penerimaan.tipe}`}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="processor">Prosesor</CLabel>
                                    <CInput type="text" id="processor" name="processor" value={input.processor} onChange={changeHandler} placeholder="Masukkan Jenis Prosesor"/>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="memory">Memory</CLabel>
                                    <CInput type="text" id="memory" name="memory" value={input.memory} onChange={changeHandler} placeholder="Masukkan Kapasitas RAM"/>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="harddisk">Harddisk</CLabel>
                                    <CInput type="text" id="harddisk" name="harddisk" value={input.harddisk} onChange={changeHandler} placeholder="Masukkan Kapasitas HDD"/>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="graphic_card">Graphic Card</CLabel>
                                    <CInput type="text" id="graphic_card" name="graphic_card" value={input.graphic_card} onChange={changeHandler} placeholder="Masukkan Jenis Graphic Card"/>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="12">
                                <CLabel className="text-center">Kondisi</CLabel>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="cd_dvd" 
                                        name="cd_dvd" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="cd_dvd">DVD/CD</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="keyboard" 
                                        name="keyboard" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="keyboard">Keyboard</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="lcd" 
                                        name="lcd" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="lcd">LCD</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="usb" 
                                        name="usb" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="usb">USB</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="camera" 
                                        name="camera" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="camera">Camera</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="charger" 
                                        name="charger" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="charger">Charger</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="casing" 
                                        name="casing" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="casing">Casing</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="touchpad" 
                                        name="touchpad" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="touchpad">Touchpad</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="wifi" 
                                        name="wifi" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="wifi">WiFi</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="lan" 
                                        name="lan" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="lan">LAN</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="sound" 
                                        name="sound" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="sound">Sound</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="6" md="3">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="baterai" 
                                        name="baterai" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="baterai">Baterai</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="12">
                                <CLabel className="text-center mt-3">Kelengkapan</CLabel>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="4" md="4">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="nota" 
                                        name="nota" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="nota">Nota</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="4" md="4">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="kotak" 
                                        name="kotak" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="kotak">Kotak</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="4" md="4">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox 
                                        id="tas" 
                                        name="tas" 
                                        value="1" 
                                        onChange={checkboxChangeHandler}
                                    />
                                    <CLabel variant="checkbox" className="form-check-label" htmlFor="tas">Tas</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('update')}>Update</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('update')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* delete data */}
            <CModal 
                show={danger} 
                onClose={() => closeModalHandler('delete')}
                color="danger"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Hapus Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    This data will be deleted parmanently. Are you sure wanna delete it anyway?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => submitHandler('delete')}>Delete</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('delete')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default PembelianBarangSecond;