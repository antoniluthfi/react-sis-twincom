import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableArusKas = props => {
    let {
        arusKas,
        fields,
        isLoading,
        kas,
        pembayaran,
        details,
        toggleDetails,
        getDataArusKasById
    } = props;

    return (
        <CDataTable
            items={arusKas}
            fields={fields}
            striped
            sorter
            hover
            tableFilter
            noItemsView={isLoading ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={isLoading}                    
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'no_bukti':
                (item => (
                    <td className="text-center">
                        {item.no_bukti}
                    </td>
                )),
                'norekening':
                (item => (
                    <td className="text-center">
                        {item.norekening}
                    </td>
                )),
                'kas':
                (item => (
                    <td className="text-center">
                        {kas(item.kas)}
                    </td>
                )),
                'dp':
                (item => (
                    <td className="text-center">
                        {pembayaran(item.dp)}
                    </td>
                )),
                'masuk':
                (item => (
                    <td className="text-right">
                        {item.masuk === 1 ? 'Rp. ' + item.nominal : null}
                    </td>
                )),
                'keluar':
                (item => (
                    <td className="text-right">
                        {item.keluar === 1 ? 'Rp. ' + item.nominal : null}
                    </td>
                )),
                'id_admin':
                (item => (
                    <td>
                        {item.admin == null ? null : item.admin.name}
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
                    (item, index) => {
                    return (
                    <CCollapse show={details.includes(index)}>
                        <CCardBody>
                            <CButton size="sm" color="info" onClick={() => getDataArusKasById(item.no_bukti, 'view')}>
                                View Details
                            </CButton>
                            {item.no_service != 0 || item.no_pembayaran != 0 || item.no_pengembalian != 0 ? null :
                                <div>
                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataArusKasById(item.no_bukti, 'update')}>
                                        Update
                                    </CButton>
                                </div>
                            }
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataArusKasById(item.no_bukti, 'delete')}>
                                Delete
                            </CButton>
                        </CCardBody>
                    </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TableArusKas;