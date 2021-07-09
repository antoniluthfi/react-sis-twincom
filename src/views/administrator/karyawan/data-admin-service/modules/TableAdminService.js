import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableAdminService = props => {
    let {
        dataAdminService,
        fields,
        isLoading,
        statusAkun,
        details,
        toggleDetails,
        currentUser,
        getDataAdminServiceById
    } = props;

    return (
        <CDataTable
            items={dataAdminService}
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
                            <CButton size="sm" color="info" onClick={() => getDataAdminServiceById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null :
                                <>
                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataAdminServiceById(item.id, 'update')}>
                                    Update
                                </CButton>
                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataAdminServiceById(item.id, 'delete')}>
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

export default TableAdminService;