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
import DataAdminServiceHelper from './modules/DataAdminServiceHelper';

const DataAdminService = () => {
    const {
        statusAkun,
        fields,
        success, setSuccess,
        danger,
        color,
        isLoading,
        dataAdminService,
        loadDataCabang,
        dataCabang,
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
        getDataAdminServiceById,
        getDataCabang,
    } = DataAdminServiceHelper();

    useEffect(() => {
        getCurrentUser();
        getDataCabang();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Admin Service</CCardHeader>
                        {role === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <CDataTable
                                items={dataAdminService}
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
                                    'status_akun':
                                    (item, index) => {
                                        return (
                                            <td className="py-2">
                                                {statusAkun(item.status_akun)}
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
                                        (item, index)=>{
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <CButton size="sm" color="info" onClick={() => getDataAdminServiceById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                {role === 'admin service' ? null :
                                                    <>
                                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataAdminServiceById(item.id, 'update')}>
                                                        Update
                                                    </CButton>
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataAdminServiceById(item.id, 'delete')}>
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
                            <CLabel htmlFor="name">Nama</CLabel>
                            <CInput type="text" id="name" name="name" value={input.name} onChange={changeHandler} placeholder="Masukkan Nama" disabled={formDisabled} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="alamat">Alamat</CLabel>
                            <CInput type="text" id="alamat" name="alamat" value={input.alamat} onChange={changeHandler} placeholder="Masukkan Nama" disabled={formDisabled} />
                        </CFormGroup>

                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="email">Email</CLabel>
                                    <CInput type="email" id="email" name="email" value={input.email} onChange={changeHandler} placeholder="Masukkan Nama" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                    <CInput type="text" id="nomorhp" name="nomorhp" value={input.nomorhp} onChange={changeHandler} placeholder="Masukkan Nama" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="cab-penempatan">Cabang Penempatan</CLabel>
                                    <CSelect custom name="cab_penempatan" id="cab-penempatan" value={input.cab_penempatan} onChange={changeHandler} disabled={formDisabled} >
                                        {
                                            loadDataCabang ? <option value="">Pilih Salah Satu</option> :
                                            dataCabang.map(item => (
                                                <option key={item.id} value={item.nama_cabang}>{item.nama_cabang}</option>
                                            ))
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="status-akun">Status Akun</CLabel>
                                    <CSelect custom name="status_akun" id="status-akun" value={input.status_akun} onChange={changeHandler} disabled={formDisabled} >
                                        <option value="0">Tidak Aktif</option>
                                        <option value="1">Aktif</option>
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

export default DataAdminService;