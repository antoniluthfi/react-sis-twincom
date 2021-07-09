import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableRekening = props => {
    let {
        dataRekening,
        fields,
        isLoading,
        details,
        toggleDetails,
        currentUser,
        getDataRekeningById
    } = props;

    return (
        <CDataTable
            items={dataRekening}
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
                'norekening': 
                (item => (
                    <td className="text-center">
                        {item.norekening}
                    </td>
                )),
                'nama_bank': 
                (item => (
                    <td className="text-center">
                        {item.nama_bank}
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
                            <CButton size="sm" color="info" onClick={() => getDataRekeningById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null :
                                <div>
                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataRekeningById(item.id, 'update')}>
                                    Update
                                </CButton>
                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataRekeningById(item.id, 'delete')}>
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

export default TableRekening;