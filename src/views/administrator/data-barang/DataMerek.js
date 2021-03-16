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
import DataMerekHelper from './modules/DataMerekHelper';

const DataMerek = () => {
    const {
        pc,
        laptop,
        cctv,
        printer,
        fields,
        success, setSuccess,
        danger,
        color,
        isLoading,
        dataMerek,
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
        getDataMerekById,
    } = DataMerekHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Merek</CCardHeader>
                        {role === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <CDataTable
                                items={dataMerek}
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
                                    (item) => (
                                        <td className="text-center">
                                            {item.id}
                                        </td>
                                    ),
                                    'pc':
                                    (item) => (
                                        <td>
                                            {pc(item.pc)}
                                        </td>
                                    ),
                                    'laptop':
                                    (item) => (
                                        <td>
                                            {laptop(item.laptop)}
                                        </td>
                                    ),
                                    'cctv':
                                    (item) => (
                                        <td>
                                            {cctv(item.cctv)}
                                        </td>
                                    ),
                                    'printer':
                                    (item) => (
                                        <td>
                                            {printer(item.printer)}
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
                                                    <h4>
                                                        {item.username}
                                                    </h4>
                                                    <CButton size="sm" color="info" onClick={() => getDataMerekById(item.id, 'view')}>
                                                        View Details
                                                    </CButton>
                                                    {role === 'admin service' ? null :
                                                        <>
                                                        <CButton size="sm" color="success" className="ml-1" onClick={() => getDataMerekById(item.id, 'update')}>
                                                            Update
                                                        </CButton>
                                                        <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataMerekById(item.id, 'delete')}>
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
                            <CLabel htmlFor="nama-merek">Nama Merek</CLabel>
                            <CInput type="text" id="nama-merek" name="merek" value={input.merek} onChange={changeHandler} placeholder="Masukkan Nama Merek" disabled={formDisabled} />
                        </CFormGroup>
                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-pc">Input PC</CLabel>
                                    <CSelect custom name="pc" id="input-pc" value={input.pc} onChange={changeHandler} disabled={formDisabled} >
                                        <option value="0">Sembunyikan</option>
                                        <option value="1">Tampilkan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-laptop">Input Laptop</CLabel>
                                    <CSelect custom name="laptop" id="input-laptop" value={input.laptop} onChange={changeHandler} disabled={formDisabled} >
                                        <option value="0">Sembunyikan</option>
                                        <option value="1">Tampilkan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-cctv">Input CCTV</CLabel>
                                    <CSelect custom name="cctv" id="input-cctv" value={input.cctv} onChange={changeHandler} disabled={formDisabled} >
                                        <option value="0">Sembunyikan</option>
                                        <option value="1">Tampilkan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-printer">Input Printer</CLabel>
                                    <CSelect custom name="printer" id="input-printer" value={input.printer} onChange={changeHandler} disabled={formDisabled} >
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

export default DataMerek;