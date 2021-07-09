import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableBarangJasa = props => {
    let {
        dataBarang,
        fields,
        isLoading,
        toggleDetails,
        details,
        currentUser,
        jenis,
        inputForm,
        getDataBarangById
    } = props;

    return (
        <CDataTable
            items={dataBarang}
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
                'jenis':
                (item) => (
                    <td className="py-2 text-center">
                        {jenis(item.jenis)}
                    </td>
                ),
                'form_data_penting':
                (item) => (
                    <td>
                        {inputForm(item.form_data_penting)}
                    </td>
                ),
                'merek_dan_tipe':
                (item) => (
                    <td>
                        {inputForm(item.merek_dan_tipe)}
                    </td>
                ),
                'sn':
                (item) => (
                    <td>
                        {inputForm(item.sn)}
                    </td>
                ),
                'stiker':
                (item) => (
                    <td>
                        {inputForm(item.stiker)}
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
                    (item, index) => {
                    return (
                    <CCollapse show={details.includes(index)}>
                        <CCardBody>
                            <CButton size="sm" color="info" onClick={() => getDataBarangById(item.id, 'view')}>
                                View Details
                            </CButton>
                            {currentUser.jabatan === 'admin service' ? null : 
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataBarangById(item.id, 'update')}>
                                        Update
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataBarangById(item.id, 'delete')}>
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

export default TableBarangJasa;