import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableKelengkapan = props => {
    let {
        dataKelengkapan,
        fields,
        isLoading,
        toggleDetails,
        details,
        currentUser,
        getDataKelengkapanById
    } = props;

    return (
        <CDataTable
            items={dataKelengkapan}
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
                            <CButton size="sm" color="info" onClick={() => getDataKelengkapanById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null :
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataKelengkapanById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataKelengkapanById(item.id, 'delete')}>
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

export default TableKelengkapan;