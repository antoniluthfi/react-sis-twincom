import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TablePengembalianBarang = props => {
    let {
        dataPengembalian,
        fields,
        isLoading,
        kodeCabang,
        statusPembayaran,
        stiker,
        statusPengembalian,
        toggleDetails,
        details,
        getDataPengembalianById
    } = props;

    return (
        <CDataTable
            items={dataPengembalian}
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
                'no_pengembalian':
                (item => (
                    <td className="text-center">
                        {item.no_pengembalian}
                    </td>
                )),
                'no_service':
                (item => (
                    <td className="text-center">
                        {kodeCabang(item.penerimaan.cabang.nama_cabang)}{item.no_service}
                    </td>
                )),
                'nama_pelanggan':
                (item => (
                    <td>
                        {item.penerimaan.customer.name}
                    </td>
                )),
                'merek_tipe':
                (item => (
                    <td className="text-center">
                        {item.penerimaan.merek} {item.penerimaan.tipe}
                    </td>
                )),
                'bj': 
                (item => (
                    <td className="text-center">
                        {item.penerimaan.bj.nama_bj}
                    </td>
                )),
                'nominal':
                (item => (
                    <td className="text-right">
                        Rp. {new Intl.NumberFormat(['ban', 'id']).format(item.nominal)}
                    </td>
                )),
                'biaya_service':
                (item => (
                    <td className="text-right">
                        Rp. {new Intl.NumberFormat(['ban', 'id']).format(item.pengerjaan.biaya_service)}
                    </td>
                )),
                'diskon':
                (item => (
                    <td className="text-right">
                        {item.diskon === '0' ? 'Tidak Ada' : item.diskon_kecewa != null ? item.diskon_kecewa : item.penerimaan.customer.member.diskon}
                    </td>
                )),
                'status_pembayaran':
                (item => (
                    <td className="text-center">
                        {statusPembayaran(item.status_pembayaran)}
                    </td>
                )),
                'stiker':
                (item => (
                    <td className="text-center">
                        {item.cek_stiker === null ? stiker(item.pengerjaan.cek_stiker) : stiker(item.cek_stiker)}
                    </td>
                )),
                'status_pengembalian':
                (item => (
                    <td className="text-center">
                        {statusPengembalian(item.status_pengembalian)}
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
                            <CCardBody>
                                <CButton size="sm" color="info" onClick={() => getDataPengembalianById(item.no_pengembalian, 'view')}>
                                    View Details
                                </CButton>
                                {item.status_pengembalian == 0 && item.status_pembayaran == 0 ? 
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengembalianById(item.no_pengembalian, item.pengerjaan.status_pengerjaan == 0 || item.pengerjaan.status_pengerjaan == 1 || item.pengerjaan.status_pengerjaan == 2 ? 'cancel' : 'kembalikan')}>
                                        {item.pengerjaan.status_pengerjaan == 0 || item.pengerjaan.status_pengerjaan == 1 || item.pengerjaan.status_pengerjaan == 2 ? 'Cancel' : 'Kembalikan'}
                                    </CButton>
                                    :
                                item.status_pengembalian == 1 && item.status_pembayaran == 0 ?
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengembalianById(item.no_pengembalian, 'bayar')}>
                                        Bayar
                                    </CButton>
                                    :
                                    null                                                   
                                }
                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengembalianById(item.no_pengembalian, 'delete')}>
                                    Delete
                                </CButton>
                                <a href={`${process.env.REACT_APP_PUBLIC_URL}/nota-service/${item.no_service}`} target="_blank" rel="noreferrer">
                                    <CButton size="sm" color="warning" className="ml-1">
                                        Cetak Nota Service
                                    </CButton>
                                </a>
                            </CCardBody>
                        </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TablePengembalianBarang;