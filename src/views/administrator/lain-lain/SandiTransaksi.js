import React, { useEffect } from 'react'
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
    CSelect
} from '@coreui/react'
import SandiTransaksiHelper from './modules/SandiTransaksiHelper';

const SandiTransaksi = () => {
    const {
        jenisTransaksi,
        fields,
        success, setSuccess,
        danger,
        color,
        isLoading,
        dataSandiTransaksi,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input,
        role,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getCurrentUser,
        getDataSandiTransaksiById,
    } = SandiTransaksiHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Sandi Transaksi</CCardHeader>
                        {role === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <CDataTable
                                items={dataSandiTransaksi}
                                fields={fields}
                                striped
                                sorter
                                hover
                                columnFilter
                                noItemsView={isLoading ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={isLoading}        
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'id':
                                    (item) => {
                                        return (
                                            <td className="py-2 text-center">
                                                {item.id}
                                            </td>
                                        )
                                    },
                                    'jenis_transaksi':
                                    (item) => {
                                        return (
                                            <td className="py-2 text-center">
                                                {jenisTransaksi(item.jenis_transaksi)}
                                            </td>
                                        )
                                    },
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
                                                <CButton size="sm" color="info" onClick={() => getDataSandiTransaksiById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                {role === 'admin service' ? null :
                                                    <>
                                                        <CButton size="sm" color="success" className="ml-1" onClick={() => getDataSandiTransaksiById(item.id, 'update')}>
                                                            Update
                                                        </CButton>
                                                        <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataSandiTransaksiById(item.id, 'delete')}>
                                                            Delete
                                                        </CButton>                                                        
                                                    </>
                                                }
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
                color={color}
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="sandi-transaksi">Sandi Transaksi</CLabel>
                            <CInput type="text" id="sandi-transaksi" name="sandi_transaksi" value={input.sandi_transaksi} onChange={changeHandler} placeholder="Masukkan Nama Kondisi" disabled={formDisabled} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="jenis-transaksi">Jenis Transaksi</CLabel>
                            <CSelect custom name="jenis_transaksi" id="jenis-transaksi" value={input.jenis_transaksi} onChange={changeHandler} disabled={formDisabled} >
                                <option value="0">Keluar</option>
                                <option value="1">Masuk</option>
                            </CSelect>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler('Not Delete')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* delete data */}
            <CModal 
                show={danger} 
                onClose={closeModalHandler}
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
                    <CButton color="danger" onClick={() => submitHandler('Delete')}>Delete</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Delete')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default SandiTransaksi;