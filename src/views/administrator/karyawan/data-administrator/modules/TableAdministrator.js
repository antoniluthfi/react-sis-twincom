import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableAdministrator = props => {
    let {
        dataAdministrator,
        fields,
        isLoading,
        statusAkun,
        details,
        toggleDetails,
        currentUser,
        getDataAdministratorById
    } = props;

    return (
        <CDataTable
            items={dataAdministrator}
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
                    <td className="py-2 text-center">
                        {i + 1}
                    </td>
                )), 
                'jabatan':
                (item) => (
                    <td className="py-2 text-center">
                        {item.jabatan}
                    </td>
                ), 
                'status_akun':
                (item, index) => {
                    return (
                        <td className="py-2 text-center">
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
                            <CButton size="sm" color="info" onClick={() => getDataAdministratorById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null :
                                <>
                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataAdministratorById(item.id, 'update')}>
                                    Update
                                </CButton>
                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataAdministratorById(item.id, 'delete')}>
                                    Delete
                                </CButton>
                                </>                                                    
                            }
                        </CCardBody>
                    </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TableAdministrator;