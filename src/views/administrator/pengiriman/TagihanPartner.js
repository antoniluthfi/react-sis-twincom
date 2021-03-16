import React, { useEffect } from 'react';
import TagihanPartnerHelper from './modules/TagihanPartnerHelper';
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
    CTextarea,
    CModalFooter,
    CCollapse
} from '@coreui/react';
  
const TagihanPartner = () => {
    const {
        fields,
        success,
        danger,
        info,
        currentUser,
        dataTagihanPartner,
        loadDataTagihanPartner,
        currentDataTagihanPartner,
        input,
        nominalVisibility,
        details, setDetails,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataTagihanPartnerByNoService
    } = TagihanPartnerHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

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
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Tagihan Partner</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataTagihanPartner}
                                fields={fields}
                                striped
                                sorter
                                hover
                                columnFilter
                                noItemsView={loadDataTagihanPartner ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataTagihanPartner}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'no_service':
                                    (item => (
                                        <td className="text-center">
                                            {kodeCabang(currentUser.cab_penempatan)}{item.no_service}
                                        </td>
                                    )),
                                    'partner':
                                    (item => (
                                        <td className="text-center">
                                            {item.partner.nama}
                                        </td>
                                    )),
                                    'biaya_service':
                                    (item => (
                                        <td className="text-right">
                                            Rp. {item.biaya_service}
                                        </td>
                                    )),
                                    'keterangan':
                                    (item => (
                                        item.keterangan == null ? 
                                            <td className="text-center">
                                                -
                                            </td> :
                                        <td>
                                            {item.keterangan}
                                        </td>
                                    )),
                                    'status_pembayaran':
                                    (item => (
                                        <td className="text-center">
                                            {item.status_pembayaran === 0 ? 'Belum Lunas' : 'Lunas'}
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
                                                <CButton size="sm" color="info" onClick={() => getDataTagihanPartnerByNoService(item.no_service, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataTagihanPartnerByNoService(item.no_service, 'update')}>
                                                    Update
                                                </CButton>
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataTagihanPartnerByNoService(item.no_service, 'reset')}>
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
                onClose={() => closeModalHandler('Update')}
                color="success"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Update Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow className="mb-2">
                            <CCol xs="12" md="6">
                                <CLabel>Status Pembayaran</CLabel>

                                <CFormGroup variant="custom-radio">
                                    <CInputRadio custom id="lunas" name="status_pembayaran" value="1" onChange={changeHandler}/>
                                    <CLabel variant="custom-checkbox" htmlFor="lunas">Lunas</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-radio">
                                    <CInputRadio custom id="belum-lunas" name="status_pembayaran" value="0" onChange={changeHandler}/>
                                    <CLabel variant="custom-checkbox" htmlFor="belum-lunas">Belum Lunas</CLabel>
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup className={nominalVisibility}>
                                    <CLabel htmlFor="nominal">Nominal</CLabel>
                                    <CInput type="number" id="nominal" name="nominal" value={input.nominal} onChange={changeHandler} placeholder="Masukkan Nominal" />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" md="12">
                                <CLabel htmlFor="keterangan-2">Keterangan</CLabel>
                                <CTextarea 
                                    name="keterangan" 
                                    id="keterangan-2" 
                                    rows="5"
                                    placeholder="Masukkan Keterangan" 
                                    value={input.keterangan}
                                    onChange={changeHandler}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('Update')}>Update</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Update')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* reset data */}
            <CModal 
                show={danger} 
                onClose={closeModalHandler}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Reset Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    This data will be reset parmanently. Are you sure wanna reset it anyway?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => submitHandler('Reset')}>Reset</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Reset')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default TagihanPartner;