import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TablePartner = props => {
    let {
        dataPartner,
        fields,
        isLoading,
        statusAkun,
        details,
        toggleDetails,
        currentUser,
        getDataPartnerById
    } = props;

    return (
        <CDataTable
            items={dataPartner}
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
                (item => (
                    <td className="text-center">
                        {item.id}
                    </td>
                )),
                'status_akun':
                (item, index) => (
                    <td className="text-center py-2">
                        {statusAkun(item.status_akun)}
                    </td>
                ),
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
                            <CButton size="sm" color="info" onClick={() => getDataPartnerById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null :
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPartnerById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPartnerById(item.id, 'delete')}>
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

export default TablePartner;