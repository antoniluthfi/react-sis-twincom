import React, { useEffect, useState } from 'react';
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
    CCollapse
} from '@coreui/react';
import LogAktivitasHelper from './modules/LogAktivitasHelper';
  
const LogAktivitas = () => {
    const {
        fields,
        info, setInfo,
        dataLog,
        isLoading,
        details,
        currentDataLog,
        loadDataLog,
        toggleDetails,
        getCurrentUser,
        getLogAktivitasById
    } = LogAktivitasHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Aktifitas User</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataLog}
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
                                    ((item, index) => (
                                        <td className="text-center">
                                            {index + 1}
                                        </td>
                                    )),
                                    'nama':
                                    (item => (
                                        <td>
                                            {item.user == null ? '-' : item.user.name}
                                        </td>
                                    )),
                                    'hak_akses':
                                    (item => (
                                        <td className="text-center">
                                            {item.hak_akses}
                                        </td>
                                    )),
                                    'halaman':
                                    (item => (
                                        <td className="text-center">
                                            {item.halaman}
                                        </td>
                                    )),
                                    'method':
                                    (item => (
                                        <td className="text-center">
                                            {item.method}
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
                                        (item, index) => {
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <CButton size="sm" color="info" onClick={() => getLogAktivitasById(item.id)}>
                                                    View Details
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
                show={info} 
                onClose={() => setInfo(!info)}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Log Aktivitas</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        {loadDataLog ? null : 
                            <>                            
                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nama">Nama</CLabel>
                                            <CInput type="text" id="nama" name="name" value={currentDataLog.user.name} placeholder="Nama User" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="hak_akses">Hak Akses</CLabel>
                                            <CInput type="text" id="hak_akses" name="hak_akses" value={currentDataLog.hak_akses} placeholder="Hak Akses" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="halaman">Halaman</CLabel>
                                            <CInput type="text" id="halaman" name="halaman" value={currentDataLog.halaman} placeholder="Halaman Yang Diakses" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="method">Aksi</CLabel>
                                            <CInput type="text" id="method" name="method" value={currentDataLog.method} placeholder="Aksi Yang Dilakukan" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" md="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                            <CInput type="text" id="keterangan" name="keterangan" value={currentDataLog.keterangan} placeholder="Keterangan" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            </>
                        }
                    </CForm>
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>
        </>
    )
}

export default LogAktivitas;