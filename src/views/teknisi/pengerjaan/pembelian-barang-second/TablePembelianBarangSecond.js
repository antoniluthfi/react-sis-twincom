import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TablePembelianBarangSecond = props => {
    let {
        dataPengajuan,
        fields,
        isLoading,
        kodeCabang,
        toggleDetails,
        details,
        getDataPengajuanByNoService
    } = props;

    return (
        <CDataTable
            items={dataPengajuan}
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
                'no_service':
                (item) => (
                    <td className="py-2 text-center">
                        {kodeCabang(item.penerimaan.cabang.nama_cabang)}{item.no_service}
                    </td>
                ), 
                'merek':
                (item => (
                    <td className="py-2">
                        {item.penerimaan.merek} {item.penerimaan.tipe}
                    </td>
                )),
                'toko_asal':
                (item => (
                    <td className="py-2">
                        {item.nama_toko_asal}
                    </td>
                )),
                'lama_pemakaian':
                (item) => (
                    <td className="py-2 text-center">
                        {item.lama_pemakaian}
                    </td>
                ),
                'alasan_menjual':
                (item => (
                    <td className="py-2">
                        {item.alasan_menjual == null ? null : item.alasan_menjual}
                    </td>
                )), 
                'pengecek':
                (item) => (
                    <td className="py-2 text-center">
                        {item.pengecek == null ? '-' : item.pengecek.name}
                    </td>
                ),
                'harga_beli':
                (item => (
                    item.harga_beli == null ? 
                    <td className="py-2 text-center">
                        -
                    </td> :                                   
                    <td className="py-2 text-right">
                        Rp. {item.harga_beli}
                    </td>
                )),
                'keterangan':
                (item => (
                    <td className="py-2">
                        {item.keterangan == null ? null : item.keterangan}
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
                            {
                                <h5>Status Pengajuan : {item.dibeli == null ? 'Menunggu Keputusan' : item.dibeli === 0 ? 'Ditolak' : 'Disetujui'}</h5>
                            }
                            <CButton size="sm" color="info" onClick={() => getDataPengajuanByNoService(item.no_service, 'view')}>
                                View Details
                            </CButton>
                            {item.kode_jual == null ? null :
                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengajuanByNoService(item.no_service, 'update')}>
                                    Update
                                </CButton>                                                
                            }
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengajuanByNoService(item.no_service, 'delete')}>
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

export default TablePembelianBarangSecond;