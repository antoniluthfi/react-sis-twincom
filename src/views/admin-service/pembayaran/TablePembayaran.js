import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TablePembayaran = props => {
    let {
        dataPembayaran,
        fields,
        isLoading,
        kodeCabang,
        toggleDetails,
        details,
        getDataPembayaranById,
    } = props;

    return (
        <CDataTable
            items={dataPembayaran}
            fields={fields}
            striped
            sorter
            hover
            tableFilter
            noItemsView={isLoading ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={isLoading}        
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'no_pembayaran':
                (item => (
                    <td className="text-center">
                        {item.no_pembayaran}
                    </td>
                )),
                'no_service':
                (item => (
                    <td className="text-center">
                        {kodeCabang(item.penerimaan.cabang.nama_cabang.toLowerCase())}{item.no_service}
                    </td>
                )),
                'bj':
                (item => (
                    <td className="text-center">
                        {item.penerimaan.bj.nama_bj}
                    </td>
                )),
                'norekening':
                (item => (
                    <td className="text-center">
                        {item.norekening === null ? '-' : item.norekening}
                    </td>
                )),
                'kas':
                (item => (
                    <td className="text-center">
                        {item.nominal == '0' ? '-' : item.kas == '0' ? 'Tunai' : 'Bank'}
                    </td>
                )),
                'pembayaran':
                (item => (
                    <td className="text-center">
                        {item.nominal == '0' ? '-' : item.dp === '0' ? 'Cash' : 'DP'}
                    </td>
                )),
                'nominal':
                (item => (
                    <td className="text-right">
                        {item.nominal == '0' ? item.nominal : `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(item.nominal)}`}
                    </td>
                )),
                'diskon':
                (item => (
                    <td className="text-right">
                        {item.diskon == '0' ? 'Tidak Ada' : item.diskon_kecewa != null ? item.diskon_kecewa : item.penerimaan.customer.member.diskon}
                    </td>
                )),
                'status_pembayaran':
                (item => (
                    <td className="text-center">
                        {item.status_pembayaran == '0' ? 'Belum Lunas' : 'Lunas'}
                    </td>
                )),
                'keterangan':
                (item => (
                    item.keterangan == null ? 
                    <td className="text-center">
                        -
                    </td> :
                    <td>
                        {item.keterangan}
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
                            onClick={() => {toggleDetails(index)}}
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
                            <CButton size="sm" color="info" onClick={() => getDataPembayaranById(item.no_pembayaran, 'view')}>
                                View Details
                            </CButton>
                            {item.status_pembayaran == 0 && item.nominal == 0 ? 
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPembayaranById(item.no_pembayaran, 'bayar')}>
                                        Bayar
                                    </CButton>
                                </div> :
                            item.status_pembayaran == 0 && item.nominal > 0 ?
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPembayaranById(item.no_pembayaran, 'lunasi')}>
                                        Lunasi sisa kekurangan
                                    </CButton>
                                </div> :
                                null
                            }
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPembayaranById(item.no_pembayaran, 'delete')}>
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

export default TablePembayaran;