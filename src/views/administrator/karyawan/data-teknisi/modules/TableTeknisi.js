import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableTeknisi = props => {
    let {
        dataTeknisi,
        fields,
        isLoading,
        statusAkun,
        details,
        toggleDetails,
        currentUser,
        getDataTeknisiById
    } = props;

    return (
        <CDataTable
            items={dataTeknisi}
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
                            <CButton size="sm" color="info" onClick={() => getDataTeknisiById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null : 
                                <>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataTeknisiById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataTeknisiById(item.id, 'delete')}>
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

export default TableTeknisi;