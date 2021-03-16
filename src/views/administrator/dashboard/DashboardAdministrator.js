import React, { lazy, useEffect, Fragment } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CRow,
    CLabel,
    CInput,
    CDataTable,
    CCollapse
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment';
import DashboardAdministratorHelper from './modules/DashboardAdministratorHelper';

const WidgetsPendingan = lazy(() => import('./widgets/WidgetsPendingan.js'));
const WidgetsLaporan = lazy(() => import('./widgets/WidgetsLaporan'));
const WidgetsRating = lazy(() => import('./widgets/WidgetsRating'));

const DashboardAdministrator = () => {
    const {
        fieldsRatingAdmin,
        fieldsRatingTeknisi,
        info, 
        loadData,
        dataNotifikasi,
        currentNotification,
        loadCurrentNotification,
        dataRatingAdmin,
        loadDataRatingAdmin,
        dataRatingTeknisi,
        loadDataRatingTeknisi,
        details,
        toggleDetails,
        getDataNotifikasi,
        getCurrentNotification,
        closeModalHandler,
        getDataRatingAdmin,
        getDataRatingTeknisi,
        getUserById
    } = DashboardAdministratorHelper();

    useEffect(() => {
        getDataNotifikasi('teknisi');
        getDataRatingAdmin();
        getDataRatingTeknisi();
    }, []);

    return (
        <>
        <WidgetsLaporan />
        <WidgetsPendingan />
        <WidgetsRating />

        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Timeline Teknisi</CCardHeader>
                    <CCardBody>
                        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center"><CIcon name="cil-people" /></th>
                                    <th className="text-center">Nama Teknisi</th>
                                    <th className="text-center">Cabang</th>
                                    <th className="text-center">Keterangan</th>
                                    <th className="text-center">Waktu</th>
                                    <th className="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadData ? null : 
                                    dataNotifikasi.map(item => (
                                    <Fragment key={item.id}>
                                        <tr>
                                            <td className="text-center">
                                                <div className="c-avatar">
                                                    <img src="https://drive.google.com/thumbnail?id=1_7XnKmMvFWy4lh9TuoQYwgKUhVclYddz" className="c-avatar-img" alt="user" />
                                                    <span className="c-avatar-status bg-success"></span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>{item.user == null ? null : item.user.name}</div>
                                                <div className="small text-muted">
                                                {item.user == null ? null : `Terdaftar pada ${moment(item.user.created_at).format('ll')}`}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {item.user == null ? null : item.user.cab_penempatan}
                                            </td>
                                            <td>
                                                {item.user == null ? null : item.user.name} {item.keterangan}
                                            </td>
                                            <td className="text-center">
                                                {moment(item.created_at).fromNow()}
                                            </td>
                                            <td className="text-center">
                                                <CButton size="md" color="info" onClick={() => getCurrentNotification(item.user_id)}>
                                                    Lihat Detail
                                                </CButton>
                                            </td>
                                        </tr>                    
                                    </Fragment>
                                ))
                            }
                            </tbody>
                        </table>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardHeader>Rating Pelayanan Teknisi</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={dataRatingTeknisi}
                            fields={fieldsRatingTeknisi}
                            striped
                            sorter
                            hover
                            columnFilter
                            noItemsView={loadDataRatingTeknisi ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                            loading={loadDataRatingTeknisi}    
                            // itemsPerPageSelect
                            itemsPerPage={5}
                            pagination
                            scopedSlots = {{
                                'id':
                                (item, index) => (
                                    <td className="py-2 text-center">
                                        {index + 1}
                                    </td>
                                ), 
                                'cab_penempatan':
                                (item => (
                                    <td className="text-center">
                                        {item.cabang}
                                    </td>
                                )),
                                'created_at':
                                (item => (
                                    <td className="text-center">
                                        {moment(item.created_at).format('ll')}
                                    </td>
                                )),
                                'rating': 
                                ((item, i) => (
                                    <td className="text-center">
                                        {item.rating === 0 ? 'Belum ada penilaian' : `Rata-rata ${item.rating} Bintang`}
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
                                            <CButton size="sm" color="info" onClick={() => getUserById(item.id)}>
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

        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardHeader>Rating Pelayanan Admin Service</CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={dataRatingAdmin}
                            fields={fieldsRatingAdmin}
                            striped
                            sorter
                            hover
                            columnFilter
                            noItemsView={loadDataRatingAdmin ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                            loading={loadDataRatingAdmin}    
                            // itemsPerPageSelect
                            itemsPerPage={5}
                            pagination
                            scopedSlots = {{
                                'id':
                                (item, index) => (
                                    <td className="py-2 text-center">
                                        {index + 1}
                                    </td>
                                ), 
                                'cab_penempatan':
                                (item => (
                                    <td className="text-center">
                                        {item.cabang}
                                    </td>
                                )),
                                'created_at':
                                (item => (
                                    <td className="text-center">
                                        {moment(item.created_at).format('ll')}
                                    </td>
                                )),
                                'rating': 
                                ((item, i) => (
                                    <td className="text-center">
                                        {item.rating === 0 ? 'Belum ada penilaian' : `Rata-rata ${item.rating} Bintang`}
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
                                            <CButton size="sm" color="info" onClick={() => getUserById(item.id)}>
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

        {/* modal info */}
        <CModal 
            show={info} 
            onClose={closeModalHandler}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Data Pendingan {loadCurrentNotification ? null : currentNotification.name}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-1">
                    <CCol xs="12" md="6">
                        <CLabel htmlFor="total-pengerjaan">Total Pengerjaan</CLabel>
                        <CInput type="text" name="total_pengerjaan" id="total-pengerjaan" placeholder="Total Pengerjaan" value={loadCurrentNotification ? null : currentNotification.total_pendingan} disabled={true}/>
                    </CCol>

                    <CCol xs="12" md="6">
                        <CLabel htmlFor="belum-dikerjakan">Belum Dikerjakan</CLabel>
                        <CInput type="text" name="belum_dikerjakan" id="belum-dikerjakan" placeholder="Belum Dikerjakan" value={loadCurrentNotification ? null : currentNotification.belum_dikerjakan} disabled={true}/>
                    </CCol>
                </CRow>

                <CRow className="mb-1">
                    <CCol xs="12" md="6">
                        <CLabel htmlFor="sedang-dikerjakan">Sedang Dikerjakan</CLabel>
                        <CInput type="text" name="sedang_dikerjakan" id="sedang-dikerjakan" placeholder="Sedang Dikerjakan" value={loadCurrentNotification ? null : currentNotification.sedang_dikerjakan} disabled={true}/>
                    </CCol>

                    <CCol xs="12" md="6">
                        <CLabel htmlFor="selesai">Selesai</CLabel>
                        <CInput type="text" name="selesai" id="selesai" placeholder="Selesai" value={loadCurrentNotification ? null : currentNotification.selesai} disabled={true}/>
                    </CCol>
                </CRow>

                <CRow className="mb-1">
                    <CCol xs="12" md="6">
                        <CLabel htmlFor="cancel">Cancel</CLabel>
                        <CInput type="text" name="cancel" id="cancel" placeholder="cancel" value={loadCurrentNotification ? null : currentNotification.cancel} disabled={true}/>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal>
        </>
    )
}

export default DashboardAdministrator;
