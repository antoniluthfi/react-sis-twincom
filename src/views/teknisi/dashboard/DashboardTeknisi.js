import React, { lazy, Fragment, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import WidgetsHelper from './widgets/WidgetsHelper';

const WidgetsTeknisi = lazy(() => import('./widgets/WidgetsTeknisi.js'));
const WidgetsRating = lazy(() => import('./widgets/WidgetsRating'));

const DashboardTeknisi = () => {
    const {
        loadNotifikasi,
        dataNotifikasi,
        getCurrentUser
    } = WidgetsHelper();

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
        <WidgetsRating />
        <WidgetsTeknisi />
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>Timeline Anda</CCardHeader>
                    <CCardBody>
                        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center"><CIcon name="cil-people" /></th>
                                    <th className="text-center">Nama Teknisi</th>
                                    <th className="text-center">Cabang</th>
                                    <th className="text-center">Keterangan</th>
                                    <th className="text-center">Waktu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadNotifikasi ? null :
                                    dataNotifikasi.map(item => (
                                    <Fragment key={item.id}>
                                        <tr>
                                            <td className="text-center">
                                                <div className="c-avatar">
                                                    <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                                                    <span className="c-avatar-status bg-success"></span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>{item.name}</div>
                                                <div className="small text-muted">
                                                    Terdaftar pada {moment(item.terdaftar).format('ll')}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {item.cab_penempatan}
                                            </td>
                                            <td>
                                                {item.name} {item.keterangan}
                                            </td>
                                            <td className="text-center">
                                                {moment(item.created_at).fromNow()}
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
        </>
    )
}

export default DashboardTeknisi;