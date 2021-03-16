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
  CSelect,
  CModalFooter,
  CCollapse
} from '@coreui/react'
import DataBarangHelper from './modules/DataBarangHelper';

const DataBarang = () => {
    const {
        jenis, 
        formDataPenting, 
        fields,
        success, setSuccess,
        danger,  
        color, 
        isLoading,
        dataBarang,
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
        getDataBarangById,
    } = DataBarangHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Barang & Jasa</CCardHeader>
                        {role === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <CDataTable
                                items={dataBarang}
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
                                    ((item, i) => (
                                        <td className="py-2 text-center">
                                            {i + 1}
                                        </td>
                                    )), 
                                    'jenis':
                                    (item) => (
                                        <td className="py-2 text-center">
                                            {jenis(item.jenis)}
                                        </td>
                                    ),
                                    'form_data_penting':
                                    (item) => (
                                        <td>
                                            {formDataPenting(item.form_data_penting)}
                                        </td>
                                    ),
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
                                                <CButton size="sm" color="info" onClick={() => getDataBarangById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                {role === 'admin service' ? null : 
                                                    <>
                                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataBarangById(item.id, 'update')}>
                                                        Update
                                                    </CButton>
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataBarangById(item.id, 'delete')}>
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
                            <CLabel htmlFor="nama-bj">Nama Barang/Jasa</CLabel>
                            <CInput type="text" id="nama-bj" name="nama_bj" value={input.nama_bj} onChange={changeHandler} placeholder="Masukkan Nama Barang/Jasa" disabled={formDisabled} />
                        </CFormGroup>
                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="jenis-bj">Jenis</CLabel>
                                    <CSelect custom name="jenis" id="jenis-bj" value={input.jenis} onChange={changeHandler} disabled={formDisabled} >
                                        <option value="0">Barang</option>
                                        <option value="1">Jasa</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="form-data-penting">Form Data Penting</CLabel>
                                    <CSelect custom name="form_data_penting" id="form-data-penting" value={input.form_data_penting} onChange={changeHandler} disabled={formDisabled} >
                                        <option value="0">Sembunyikan</option>
                                        <option value="1">Tampilkan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
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
                onClose={() => closeModalHandler('Delete')}
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

export default DataBarang;