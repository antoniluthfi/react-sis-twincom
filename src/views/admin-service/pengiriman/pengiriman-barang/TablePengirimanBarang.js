import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';
import moment from 'moment';

const TablePengirimanBarang = props => {
    let {
        dataPengiriman,
        fields,
        isLoading,
        kodeSuratJalan,
        toggleDetails,
        details,
        getDataPengirimanBarangById
    } = props;

    return (
        <CDataTable
            items={dataPengiriman}
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
                'no_surat_jalan':
                (item => (
                    <td className="text-center">
                        {`${kodeSuratJalan(item.admin.cab_penempatan)}${item.no_surat_jalan}`}
                    </td>
                )),
                'tujuan':
                (item => (
                    <td className="text-center">
                        {item.partner.nama}
                    </td>
                )),
                'alamat':
                (item => (
                    <td className="text-center">
                        {item.partner.alamat}
                    </td>
                )),
                'admin':
                (item => (
                    <td>
                        {item.admin.name}
                    </td>
                )),
                'pengirim':
                (item => (
                    <td>
                        {item.pengirim.name}
                    </td>
                )),
                'pengantar':
                (item => (
                    <td>
                        {item.pengantar.name}
                    </td>
                )),
                'created_at':
                (item => (
                    <td className="text-center">
                        {moment(item.created_at).format('MMMM Do YYYY')}
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
                            <h4>
                                {item.username}
                            </h4>
                            <CButton size="sm" color="info" onClick={() => getDataPengirimanBarangById(item.no_surat_jalan, 'view')}>
                                View Details
                            </CButton>
                            <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengirimanBarangById(item.no_surat_jalan, item.list_pengiriman.length > 0 ? 'update barang' : 'tambah barang')}>
                                {item.list_pengiriman.length > 0 ? 'Update Barang' : 'Tambah Barang'}
                            </CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengirimanBarangById(item.no_surat_jalan, 'delete')}>
                                Delete
                            </CButton>
                            <a href={`${process.env.REACT_APP_LARAVEL_URL}/surat-jalan/${item.no_surat_jalan}`} target="_blank">
                                <CButton size="sm" color="warning" className="ml-1">
                                    Cetak Surat Jalan
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

export default TablePengirimanBarang;