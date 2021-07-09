import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TablePenerimaanBarang = props => {
    let {
        dataPenerimaan,
        fields,
        loadDataPenerimaan,
        kodeSuratJalan,
        currentUser,
        kodeCabang,
        toggleDetails,
        details,
        getDataListPengirimanByNoService
    } = props;
    
    return (
        <CDataTable
            items={dataPenerimaan}
            fields={fields}
            striped
            sorter
            hover
            columnFilter
            noItemsView={loadDataPenerimaan ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={loadDataPenerimaan}        
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'no_surat_jalan':
                (item => (
                    <td className="text-center">
                        {item.length > 0 ? `${kodeSuratJalan(currentUser.cab_penempatan)}${item.no_surat_jalan}` : null}
                    </td>
                )),
                'no_service':
                (item => (
                    <td className="text-center">
                        {item.length > 0 ? `${kodeCabang(item.penerimaan.cabang.nama_cabang)}${item.no_service}` : null}
                    </td>
                )),
                'status':
                (item => (
                    <td className="text-center">
                        {item.length > 0 ? (item.status_pengiriman === 0 ? 'Terkirim' : 'Kembali') : null}
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
                            <CButton size="sm" color="info" onClick={() => getDataListPengirimanByNoService(item.no_service, 'view')}>
                                View Details
                            </CButton>
                            <CButton size="sm" color="success" className="ml-1" onClick={() => getDataListPengirimanByNoService(item.no_service, 'update')}>
                                Update
                            </CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataListPengirimanByNoService(item.no_service, 'delete')}>
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

export default TablePenerimaanBarang;