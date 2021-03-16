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
  CSelect,
  CModalFooter,
  CCollapse
} from '@coreui/react';
import DataTipeHelper from './modules/DataTipeHelper';

const DataTipe = () => {
    const {
        fields,
        success, setSuccess,
        danger,
        color,
        isLoading,
        dataTipe,
        dataMerek,
        loadDataMerek,
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
        getDataTipeById,
        getDataMerek,
    } = DataTipeHelper();

    useEffect(() => {
        getCurrentUser();
        getDataMerek();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Tipe</CCardHeader>
                        {role === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <CDataTable
                                items={dataTipe}
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
                                        <td className="py-2 text-center">
                                            {item.id}
                                        </td>
                                    ),
                                    'merek': 
                                    (item) => (
                                        <td className="py-2 text-center">
                                            {item.merek}
                                        </td>
                                    ),
                                    'kategori': 
                                    (item) => (
                                        <td className="py-2 text-center">
                                            {item.kategori}
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
                                                <CButton size="sm" color="info" onClick={() => getDataTipeById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                {role === 'admin service' ? null :
                                                    <>
                                                        <CButton size="sm" color="success" className="ml-1" onClick={() => getDataTipeById(item.id, 'update')}>
                                                            Update
                                                        </CButton>
                                                        <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataTipeById(item.id, 'delete')}>
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
                            <CLabel htmlFor="nama-tipe">Nama Tipe</CLabel>
                            <CInput type="text" id="nama-tipe" name="tipe" value={input.tipe} onChange={changeHandler} placeholder="Masukkan Nama Merek" disabled={formDisabled} />
                        </CFormGroup>
                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="merek">Merek</CLabel>
                                    <CSelect custom name="merek" id="merek" value={input.merek} onChange={changeHandler} disabled={formDisabled} >
                                        {
                                            loadDataMerek ? <option value="">Pilih Salah satu</option> :
                                            <>
                                            <option value="">Pilih Salah satu</option>
                                            {dataMerek.map(item => 
                                                <option key={item.id} value={item.merek}>{item.merek}</option>
                                            )} 
                                            </>
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="kategori">Kategori</CLabel>
                                    <CSelect custom name="kategori" id="kategori" value={input.kategori} onChange={changeHandler} disabled={formDisabled} >
                                        <option value="Laptop">Laptop</option>
                                        <option value="PC">PC</option>
                                        <option value="Printer">Printer</option>
                                        <option value="CCTV">CCTV</option>
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

export default DataTipe;