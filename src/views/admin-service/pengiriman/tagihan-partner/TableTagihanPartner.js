import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TableTagihanPartner = props => {
    let {
        dataTagihanPartner,
        fields,
        loadDataTagihanPartner,
        kodeCabang,
        currentUser,
        details,
        toggleDetails,
        getDataTagihanPartnerByNoService
    } = props;

    return (
        <CDataTable
            items={dataTagihanPartner}
            fields={fields}
            striped
            sorter
            hover
            columnFilter
            noItemsView={loadDataTagihanPartner ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={loadDataTagihanPartner}    
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'no_service':
                (item => (
                    <td className="text-center">
                        {kodeCabang(currentUser.cab_penempatan)}{item.no_service}
                    </td>
                )),
                'partner':
                (item => (
                    <td className="text-center">
                        {item.partner.nama}
                    </td>
                )),
                'biaya_service':
                (item => (
                    <td className="text-right">
                        Rp. {item.biaya_service}
                    </td>
                )),
                'keterangan':
                (item => (
                    item.keterangan == null ? 
                        <td className="text-center">
                            -
                        </td> :
                    <td>
                        {item.keterangan}
                    </td>
                )),
                'status_pembayaran':
                (item => (
                    <td className="text-center">
                        {item.status_pembayaran === 0 ? 'Belum Lunas' : 'Lunas'}
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
                            <CButton size="sm" color="info" onClick={() => getDataTagihanPartnerByNoService(item.no_service, 'view')}>
                                View Details
                            </CButton>
                            <CButton size="sm" color="success" className="ml-1" onClick={() => getDataTagihanPartnerByNoService(item.no_service, 'update')}>
                                Update
                            </CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataTagihanPartnerByNoService(item.no_service, 'reset')}>
                                Reset
                            </CButton>
                        </CCardBody>
                    </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TableTagihanPartner;