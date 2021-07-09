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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import DashboardCustomerHelper from './modules/DashboardCustomerHelper';

const DashboardCustomer = () => {
    const {
        fields,
        info, setInfo,
        success, setSuccess,
        dataService,
        loadDataService,
        currentPenerimaan,
        loadCurrentPenerimaan,
        details,
        input, setInput,
        changeHandler,
        toggleDetails,
        getCurrentUser,
        getDataPenerimaanByNoService,
        updateReviewKepuasan
    } = DashboardCustomerHelper();

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

    const statusPengerjaan = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Sedang Diproses';
            case '1':
            case 1:
                return 'Batal';
            case '2':
            case 2:
                return 'Sedang Diproses';
            case '3':
            case 3:
                return 'Selesai';
            default:
                return '';
        }
    }

    return (
        <div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Service</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataService}
                                fields={fields}
                                striped
                                sorter
                                hover
                                columnFilter
                                noItemsView={loadDataService ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataService}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'no_service':
                                    (item => (
                                        <td className="text-center">
                                            {kodeCabang(item.cabang.nama_cabang)}{item.no_service_penerimaan}
                                        </td>
                                    )),
                                    'merek':
                                    (item => (
                                        <td className="text-center">
                                            {item.merek} {item.tipe}
                                        </td>
                                    )),
                                    'bj':
                                    (item => (
                                        <td className="text-center">
                                            {item.bj.nama_bj}
                                        </td>
                                    )),
                                    'sn': 
                                    (item => (
                                        <td className="text-center">
                                            {item.sn == null ? '-' : item.sn}
                                        </td>
                                    )),
                                    'status_pengerjaan':
                                    (item => (
                                        <td className="text-center">
                                            {statusPengerjaan(item.pengerjaan.status_pengerjaan)}
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
                                                <CButton size="sm" color="info" className="mr-1" onClick={() => getDataPenerimaanByNoService(item.no_service_penerimaan, 'view')}>
                                                    View Details
                                                </CButton>
                                                {item.arus_kas == null ? null :
                                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPenerimaanByNoService(item.no_service_penerimaan, 'review')}>
                                                        Service Review
                                                    </CButton>                                                
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
                show={info} 
                onClose={() => setInfo(!info)}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Data {loadCurrentPenerimaan ? null : `${currentPenerimaan.bj.nama_bj} - ${kodeCabang(currentPenerimaan.cabang.nama_cabang)}${currentPenerimaan.no_service_penerimaan}`}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="no-service">Nomor Service</CLabel>
                                    <CInput type="text" id="no-service" name="no_service" value={loadCurrentPenerimaan ? null : `${kodeCabang(currentPenerimaan.cabang.nama_cabang)}${currentPenerimaan.no_service_penerimaan}`} placeholder="Nomor Service" disabled={true} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="bj">{loadCurrentPenerimaan ? null : currentPenerimaan.bj.jenis === 0 ? 'Jasa' : 'Barang'}</CLabel>
                                    <CInput type="text" id="bj" name="bj" value={loadCurrentPenerimaan ? null : currentPenerimaan.bj.nama_bj} placeholder={loadCurrentPenerimaan ? null : currentPenerimaan.bj.jenis === 0 ? 'Jasa' : 'Barang'} disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            {loadCurrentPenerimaan ? null : currentPenerimaan.merek == null ? null :
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="merek">Merek</CLabel>
                                        <CInput type="text" id="merek" name="merek" value={`${currentPenerimaan.merek} ${currentPenerimaan.tipe}`} placeholder="Merek" disabled={true} />
                                    </CFormGroup>
                                </CCol>                           
                            }
                            {loadCurrentPenerimaan ? null : currentPenerimaan.problem == null ? null :
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="problem">Problem</CLabel>
                                        <CInput type="text" id="problem" name="problem" value={currentPenerimaan.problem} placeholder="Problem" disabled={true} />
                                    </CFormGroup>
                                </CCol>                                                    
                            }
                            {loadCurrentPenerimaan ? null : currentPenerimaan.kondisi == null ? null :
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="kondisi">Kondisi</CLabel>
                                        <CInput type="text" id="kondisi" name="kondisi" value={currentPenerimaan.kondisi} placeholder="Kondisi" disabled={true} />
                                    </CFormGroup>
                                </CCol>              
                            }
                            {loadCurrentPenerimaan ? null : currentPenerimaan.kelengkapan == null ? null :
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="kelengkapan">Kelengkapan</CLabel>
                                        <CInput type="text" id="kelengkapan" name="kelengkapan" value={currentPenerimaan.kelengkapan} placeholder="Kelengkapan" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            }
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="serial_number">Serial Number</CLabel>
                                    <CInput type="text" id="serial_number" name="serial_number" value={loadCurrentPenerimaan ? null : currentPenerimaan.sn} placeholder="Serial Number" disabled={true} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="status_pengerjaan">Status Pengerjaan</CLabel>
                                    <CInput type="text" id="status_pengerjaan" name="status_pengerjaan" value={loadCurrentPenerimaan ? null : statusPengerjaan(currentPenerimaan.pengerjaan.status_pengerjaan)} placeholder="Serial Number" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* modal review */}
            <CModal 
                show={success} 
                onClose={() => setSuccess(!success)}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Review Kepuasan Pelanggan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="6">
                            <CLabel className="d-block">Rating Admin</CLabel>
                            {[...Array(5)].map((star, i) => {
                                const ratingValueAdmin = i + 1;

                                return (
                                    <CLabel key={i}>
                                        <CInput 
                                            type="radio" 
                                            name="rating_admin" 
                                            value={ratingValueAdmin} 
                                            onClick={() => setInput({ ...input, rating_admin: ratingValueAdmin })}
                                            className="d-none"
                                        />
                                        <FontAwesomeIcon 
                                            icon={faStar} 
                                            color={ratingValueAdmin <= input.rating_admin ? 'yellow' : 'grey'}
                                            style={{ width: 40, height: 40, cursor: 'pointer', transition: 'color 200ms' }} 
                                        />
                                    </CLabel>
                                )
                            })}
                        </CCol>

                        <CCol xs="12" md="6">
                            <CLabel className="d-block">Rating Teknisi</CLabel>
                            {[...Array(5)].map((star, i) => {
                                const ratingValueTeknisi = i + 1;

                                return (
                                    <CLabel key={i}>
                                        <CInput 
                                            type="radio" 
                                            name="rating_teknisi" 
                                            value={ratingValueTeknisi} 
                                            onClick={() => setInput({ ...input, rating_teknisi: ratingValueTeknisi })}
                                            className="d-none"
                                        />
                                        <FontAwesomeIcon 
                                            icon={faStar} 
                                            color={ratingValueTeknisi <= input.rating_teknisi ? 'yellow' : 'grey'}
                                            style={{ width: 40, height: 40, cursor: 'pointer', transition: 'color 200ms' }} 
                                        />
                                    </CLabel>
                                )
                            })}
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="6">
                            <CLabel htmlFor="ulasan-admin">Ulasan Admin</CLabel>
                            <CTextarea 
                                name="ulasan_admin" 
                                id="ulasan-admin" 
                                rows="5"
                                placeholder="Berikan Ulasan" 
                                value={input.ulasan_admin}
                                onChange={changeHandler}
                            />
                        </CCol>

                        <CCol xs="12" lg="6">
                            <CLabel htmlFor="ulasan-teknisi">Ulasan Teknisi</CLabel>
                            <CTextarea 
                                name="ulasan_teknisi" 
                                id="ulasan-teknisi" 
                                rows="5"
                                placeholder="Berikan Ulasan" 
                                value={input.ulasan_teknisi}
                                onChange={changeHandler}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={updateReviewKepuasan}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setSuccess(!success)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default DashboardCustomer;