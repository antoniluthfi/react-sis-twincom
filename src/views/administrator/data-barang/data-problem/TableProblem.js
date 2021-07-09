import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableProblem = props => {
    let {
        dataProblem,
        fields,
        isLoading,
        details,
        toggleDetails,
        currentUser,
        getDataProblemById
    } = props;

    return (
        <CDataTable
            items={dataProblem}
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
                'nama_problem':
                (item => (
                    <td className="text-center">
                        {item.nama_problem}
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
                            <CButton size="sm" color="info" onClick={() => getDataProblemById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null :
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataProblemById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataProblemById(item.id, 'delete')}>
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

export default TableProblem;