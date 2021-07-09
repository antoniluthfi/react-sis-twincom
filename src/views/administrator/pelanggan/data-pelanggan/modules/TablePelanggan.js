import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TablePelanggan = props => {
    let {
        dataPelanggan,
        fields,
        isLoading,
        statusAkun,
        details,
        toggleDetails,
        currentUser,
        getDataPelangganById
    } = props;

    return (
        <CDataTable
            items={dataPelanggan}
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
                    <td className="text-center">
                        {i + 1}
                    </td>
                )),
                'jabatan':
                (item => <td className="text-center">{item.jabatan}</td>),
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
                            <CButton size="sm" color="info" onClick={() => getDataPelangganById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {item.member == null ? 
                                <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataPelangganById(item.id, 'aktifkan member')}>
                                    Jadikan Member
                                </CButton> :
                                <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataPelangganById(item.id, 'aktifkan member')}>
                                    Update Member
                                </CButton>
                            }
                            {currentUser.jabatan === 'admin service' ? null :
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPelangganById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPelangganById(item.id, 'delete')}>
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

export default TablePelanggan;