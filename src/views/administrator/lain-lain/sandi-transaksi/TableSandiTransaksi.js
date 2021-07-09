import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableSandiTransaksi = props => {
    let {
        dataSandiTransaksi,
        fields,
        isLoading,
        jenisTransaksi,
        details,
        toggleDetails,
        currentUser,
        getDataSandiTransaksiById
    } = props;

    return (
        <CDataTable
            items={dataSandiTransaksi}
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
                (item) => {
                    return (
                        <td className="py-2 text-center">
                            {item.id}
                        </td>
                    )
                },
                'jenis_transaksi':
                (item) => {
                    return (
                        <td className="py-2 text-center">
                            {jenisTransaksi(item.jenis_transaksi)}
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
                    (item, index) => {
                    return (
                    <CCollapse show={details.includes(index)}>
                        <CCardBody>
                            <CButton size="sm" color="info" onClick={() => getDataSandiTransaksiById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null :
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataSandiTransaksiById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataSandiTransaksiById(item.id, 'delete')}>
                                        Delete
                                    </CButton>                                                        
                                </div>
                            }
                        </CCardBody>
                    </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TableSandiTransaksi;