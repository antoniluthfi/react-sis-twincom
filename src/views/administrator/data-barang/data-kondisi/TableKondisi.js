import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableKondisi = props => {
    let {
        dataKondisi,
        fields,
        isLoading,
        toggleDetails,
        details,
        currentUser,
        getDataKondisiById
    } = props;

    return (
        <CDataTable
            items={dataKondisi}
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
                (item, i) => (
                    <td className="py-2 text-center">
                        {i + 1}
                    </td>
                ), 
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
                            <CButton size="sm" color="info" onClick={() => getDataKondisiById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null : 
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataKondisiById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataKondisiById(item.id, 'delete')}>
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

export default TableKondisi;