import React, { useEffect } from 'react';
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
    CModalFooter,
    CCollapse,
    CTextarea
} from '@coreui/react';
import PenerimaanBarangPartnerHelper from './modules/PenerimaanBarangPartnerHelper'; 
import CurrencyFormat from 'react-currency-format'; 

const PenerimaanBarangPartner = () => {
    const {
        fields,
        success,
        danger,
        info,
        currentUser,
        dataPenerimaan,
        loadDataPenerimaan,
        dataTagihanPartner,
        currentDataPenerimaan,
        loadCurrentDataPenerimaan,
        formDisabled,
        input,
        details, setDetails,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataListPengirimanByNoService
    } = PenerimaanBarangPartnerHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    const kodeSuratJalan = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'SJ.BJB.';
            case 'Banjarmasin':
                return 'SJ.BJM.';
            case 'Landasan Ulin':
                return 'SJ.LNU.';
            default:
                return '';
        }
    }

    const kodeCabang = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'S.BJB.';
            case 'Landasan Ulin':
                return 'S.LNU.';
            case 'Banjarmasin':
                return 'S.BJM.';
            default:
                return '';
        }
    }

    return (
        <div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Penerimaan Barang Partner</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataPenerimaan}
                                fields={fields}
                                striped
                                sorter
                                hover
                                columnFilter
                                noItemsView={loadDataPenerimaan ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataPenerimaan}        
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'no_surat_jalan':
                                    (item => (
                                        <td className="text-center">
                                            {item.length > 0 ? `${kodeSuratJalan(currentUser.cab_penempatan)}${item.no_surat_jalan}` : null}
                                        </td>
                                    )),
                                    'no_service':
                                    (item => (
                                        <td className="text-center">
                                            {item.length > 0 ? `${kodeCabang(item.penerimaan.cabang.nama_cabang)}${item.no_service}` : null}
                                        </td>
                                    )),
                                    'status':
                                    (item => (
                                        <td className="text-center">
                                            {item.length > 0 ? (item.status_pengiriman === 0 ? 'Terkirim' : 'Kembali') : null}
                                        </td>
                                    )),
                                    'show_details':
                                    (item, index)=>{
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
                                        (item, index)=>{
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <CButton size="sm" color="info" onClick={() => getDataListPengirimanByNoService(item.no_service, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataListPengirimanByNoService(item.no_service, 'update')}>
                                                    Update
                                                </CButton>
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataListPengirimanByNoService(item.no_service, 'delete')}>
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
                onClose={closeModalHandler}
                color="success"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Update Data Pengiriman</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="biaya">Masukkan Biaya</CLabel>
                            <CurrencyFormat id="biaya" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Biaya Service" disabled={formDisabled} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="keterangan">Keterangan</CLabel>
                            <CTextarea 
                                name="keterangan" 
                                id="keterangan" 
                                rows="5"
                                placeholder="Masukkan Keterangan" 
                                value={input.keterangan}
                                onChange={changeHandler}
                            />
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('Update')}>Update</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Update')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* view data */}
            <CModal 
                show={info} 
                onClose={closeModalHandler}
                color="info"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Data Pengiriman</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadCurrentDataPenerimaan ? null : 
                        <div>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="no_surat_jalan">No Surat Jalan</CLabel>
                                    <CInput type="text" id="no_surat_jalan" name="no_surat_jalan" value={`${kodeSuratJalan(currentDataPenerimaan[0].surat_jalan.admin.cab_penempatan)}${currentDataPenerimaan[0].no_surat_jalan}`} onChange={changeHandler} placeholder="Nomor Surat Jalan" disabled={true} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="no_service">No Service</CLabel>
                                    <CInput type="text" id="no_service" name="no_service" value={`${kodeCabang(currentDataPenerimaan[0].penerimaan.cabang.nama_cabang)}${currentDataPenerimaan[0].no_service}`} onChange={changeHandler} placeholder="Nomor Service" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="bj">Barang Jasa</CLabel>
                                    <CInput type="text" id="bj" name="bj" value={currentDataPenerimaan[0].penerimaan.bj.nama_bj} onChange={changeHandler} placeholder="Barang Jasa" disabled={true} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="partner">Partner</CLabel>
                                    <CInput type="text" id="partner" name="partner" value={currentDataPenerimaan[0].surat_jalan.partner.nama} onChange={changeHandler} placeholder="Partner" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="admin">Admin</CLabel>
                                    <CInput type="text" id="admin" name="admin" value={currentDataPenerimaan[0].surat_jalan.admin.name} onChange={changeHandler} placeholder="Admin" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="admin">Admin</CLabel>
                                    <CInput type="text" id="admin" name="admin" value={currentDataPenerimaan[0].surat_jalan.pengirim.name} onChange={changeHandler} placeholder="Pengirim" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="pengantar">Pengantar</CLabel>
                                    <CInput type="text" id="pengantar" name="pengantar" value={currentDataPenerimaan[0].surat_jalan.pengantar.name} onChange={changeHandler} placeholder="Pengantar" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="status">Status</CLabel>
                                    <CInput type="text" id="status" name="status" value={currentDataPenerimaan[0].status === 0 ? 'Terkirim' : 'Kembali'} onChange={changeHandler} placeholder="Pengantar" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        </div>                    
                    }
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* reset data */}
            <CModal 
                show={danger} 
                onClose={() => closeModalHandler('Delete')}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Reset Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    This data will be reset parmanently. Are you sure wanna reset it anyway?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => submitHandler('Delete')}>Reset</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Delete')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default PenerimaanBarangPartner;