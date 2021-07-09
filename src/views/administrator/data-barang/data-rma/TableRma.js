import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableRma = props => {
    let {
        dataRma,
        fields,
        isLoading,
        details,
        toggleDetails,
        currentUser,
        getDataRmaById
    } = props;

    return (
        <CDataTable
            items={dataRma}
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
                (item) => (
                    <td className="py-2 text-center">
                        {item.id}
                    </td>
                ), 
                'name':
                (item => (
                    <td className="text-center">
                        {item.name}
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
                            <CButton size="sm" color="info" onClick={() => getDataRmaById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null : 
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataRmaById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataRmaById(item.id, 'delete')}>
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

export default TableRma;