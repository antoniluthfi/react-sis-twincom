import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';
import moment from 'moment';

const TablePengerjaan = props => {
    let {
        dataPengerjaan,
        fields,
        isLoading,
        kodeCabang,
        details,
        toggleDetails,
        statusPengerjaan,
        getDataPengerjaanById,
        sendEmailNotification,
        getOneSignalPlayerId,
    } = props;

    return (
        <CDataTable
            items={dataPengerjaan}
            fields={fields}
            noItemsView={isLoading ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={isLoading}        
            striped
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots = {{
                'no_pengerjaan': 
                (item => (
                    <td className="text-center">
                        { item.no_pengerjaan }
                    </td>
                )),
                'no_service': 
                (item => (
                    <td className="text-center">
                        {`${kodeCabang(item.nama_cabang)}${item.no_service_penerimaan}`}
                    </td>
                )),
                'teknisi':
                (item => (
                    <td>
                        {item.teknisi}
                    </td>
                )),
                'id_customer':
                (item => (
                    <td>
                        {item.customer}
                    </td>
                )),
                'id_bj': 
                (item => (
                    <td className="text-center">
                        {item.nama_bj}
                    </td>
                )),
                'merek': 
                (item => (
                    <td className="text-center">
                        {item.merek}
                    </td>
                )),
                'tipe': 
                (item => (
                    <td className="text-center">
                        {item.tipe}
                    </td>
                )),
                'problem': 
                (item => (
                    <td>
                        {item.problem}
                    </td>
                )),
                'kondisi':
                (item => (
                    <td>
                        {item.kondisi}
                    </td>
                )),
                'permintaan':
                (item => (
                    <td>
                        {item.permintaan}
                    </td>
                )),
                'keterangan': 
                (item => (
                    <td>
                        {item.keterangan}
                    </td>
                )),
                'tempo':
                (item => (
                    <td>
                        {moment(item.tempo).format('ll')}
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
                    (item, index)=>{
                    return (
                    <CCollapse show={details.includes(index)}>
                        <h4 className="lead ml-4 mb-0 mt-3">
                            Posisi Barang : {item.partner}
                        </h4>
                        <h4 className="lead ml-4 mb-1 mt-0">
                            Status Pengerjaan : {statusPengerjaan(item.status_pengerjaan)}
                        </h4>    
                        <CCardBody>
                            <CButton size="sm" color="info" onClick={() => getDataPengerjaanById(item.no_pengerjaan, 'view')}>
                                View Details
                            </CButton>
                            {
                                item.status_pengerjaan == 3 ? null :
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengerjaanById(item.no_pengerjaan, item.status_pengerjaan == 0 ? 'Kerjakan' : 'Update Progress')}>
                                        {item.status_pengerjaan == 0 ? 'Kerjakan' : 'Update Progress'}
                                    </CButton>
                                </div>
                            }
                            {
                                item.status_pengerjaan == 3 ? 
                                <div>
                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => sendEmailNotification(item)}>
                                        Send Email
                                    </CButton>
                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => getOneSignalPlayerId(item)}>
                                        Send Notification
                                    </CButton> 
                                </div>                                               
                                : null
                            }
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengerjaanById(item.no_pengerjaan, 'delete')}>
                                Delete
                            </CButton>
                        </CCardBody>
                    </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TablePengerjaan;