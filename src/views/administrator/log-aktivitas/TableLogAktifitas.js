import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableLogAktifitas = props => {
    let {
        dataLog,
        fields,
        isLoading,
        toggleDetails,
        details,
        getLogAktivitasById
    } = props;

    return (
        <CDataTable
            items={dataLog}
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
                'nama':
                (item => (
                    <td>
                        {item.user == null ? '-' : item.user.name}
                    </td>
                )),
                'hak_akses':
                (item => (
                    <td className="text-center">
                        {item.hak_akses}
                    </td>
                )),
                'halaman':
                (item => (
                    <td className="text-center">
                        {item.halaman}
                    </td>
                )),
                'method':
                (item => (
                    <td className="text-center">
                        {item.method}
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
                    (item, index) => {
                    return (
                    <CCollapse show={details.includes(index)}>
                        <CCardBody>
                            <CButton size="sm" color="info" onClick={() => getLogAktivitasById(item.id)}>
                                View Details
                            </CButton>
                        </CCardBody>
                    </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TableLogAktifitas;