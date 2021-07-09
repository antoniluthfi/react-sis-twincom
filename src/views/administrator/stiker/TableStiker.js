import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableStiker = props => {
    let {
        dataStiker,
        fields,
        isLoading,
        details,
        toggleDetails,
        currentUser,
        getDataStikerById
    } = props;

    return (
        <CDataTable
            items={dataStiker}
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
                ((item, index) => (
                    <td className="text-center">
                        {index + 1}
                    </td>
                )),
                'jenis_stiker': 
                (item => (
                    <td className="text-center">
                        {item.jenis_stiker}
                    </td>
                )),
                'jumlah':
                (item => (
                    <td className="text-center">
                        {item.jumlah}
                    </td>
                )),
                'cabang':
                (item => (
                    <td className="text-center">
                        {item.cabang}
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
                            <CButton size="sm" color="info" onClick={() => getDataStikerById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null : 
                                <>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataStikerById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataStikerById(item.id, 'delete')}>
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

export default TableStiker;