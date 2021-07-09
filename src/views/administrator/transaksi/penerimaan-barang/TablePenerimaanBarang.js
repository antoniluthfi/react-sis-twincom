import React from 'react';
import {
    CDataTable,
    CCollapse,
    CButton,
    CCardBody
} from '@coreui/react';

const TablePenerimaanBarang = props => {
    let {
        dataPenerimaanBarang,
        fields,
        isLoading,
        kodeCabang,
        toggleDetails,
        details,
        statusPengerjaan,
        setSuccess,
        success,
        setOpenPersiapanBarangBaruModal,
        openPersiapanBarangBaruModal,
        setOpenJasaLainlainModal,
        openJasaLainlainModal,
        getDataPenerimaanBarangById,
        setOpenWatchVideoModal,
        openWatchVideoModal,
        setOpenVideoModal,
        openVideoModal,
    } = props;

    return (
        <CDataTable
            items={dataPenerimaanBarang}
            fields={fields}
            striped
            sorter
            hover
            tableFilter
            noItemsView={isLoading ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={isLoading}                        
            // columnFilter
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'no_service_penerimaan': 
                (item) => (
                    <td className="text-center">
                        {kodeCabang(item.cabang.nama_cabang)}{item.no_service_penerimaan}
                    </td>
                ),
                'id_cabang':
                (item) => (
                    <td>
                        {item.cabang.nama_cabang}
                    </td>
                ),
                'id_customer':
                (item) => (
                    <td>
                        {item.customer.name}
                    </td>
                ),
                'id_bj':
                (item) => (
                    <td>
                        {item.bj.nama_bj}
                    </td>
                ),
                'merek':
                (item) => {
                        return item.merek === null ? 
                        <td className="text-center">
                            -
                        </td>    
                        : 
                        <td>
                            {item.merek}
                        </td>    
                },
                'tipe':
                (item) => {
                        return item.tipe === null ? 
                        <td className="text-center">
                            -
                        </td>    
                        : 
                        <td>
                            {item.tipe}
                        </td>    
                },
                'sn':
                (item) => {
                        return item.sn === null ? 
                        <td className="text-center">
                            -
                        </td>    
                        : 
                        <td>
                            {item.sn}
                        </td>    
                },
                'problem':
                (item) => {
                        return item.problem === null ? 
                        <td className="text-center">
                            -
                        </td>    
                        : 
                        <td>
                            {item.problem}
                        </td>    
                },
                'kondisi':
                (item) => {
                        return item.kondisi === null ? 
                        <td className="text-center">
                            -
                        </td>    
                        : 
                        <td>
                            {item.kondisi}
                        </td>    
                },
                'estimasi':
                (item) => (
                    <td className="text-center">
                        {item.estimasi}
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
                                <h5>Posisi Barang : {item.pengerjaan.partner.nama}</h5>
                                <h5>Status Pengerjaan : {statusPengerjaan(item.pengerjaan.status_pengerjaan)}</h5>
                                <CButton 
                                    size="sm" 
                                    color="info" 
                                    onClick={() => {
                                        if(item.jenis_penerimaan === 'Penerimaan Barang Service') {
                                            setSuccess(!success);
                                        } else if(item.jenis_penerimaan === 'Persiapan Barang Baru') {
                                            setOpenPersiapanBarangBaruModal(!openPersiapanBarangBaruModal);
                                        } else if(item.jenis_penerimaan === 'Jasa Lain-lain') {
                                            setOpenJasaLainlainModal(!openJasaLainlainModal);
                                        } 

                                        getDataPenerimaanBarangById(item.no_service_penerimaan, 'view');
                                    }}
                                >
                                    View Details
                                </CButton>
                                <CButton 
                                    size="sm" 
                                    color="success" 
                                    className="ml-1" 
                                    onClick={() => {
                                        if(item.jenis_penerimaan === 'Penerimaan Barang Service') {
                                            setSuccess(!success);
                                        } else if(item.jenis_penerimaan === 'Persiapan Barang Baru') {
                                            setOpenPersiapanBarangBaruModal(!openPersiapanBarangBaruModal);
                                        } else if(item.jenis_penerimaan === 'Jasa Lain-lain') {
                                            setOpenJasaLainlainModal(!openJasaLainlainModal);
                                        } 
                        
                                        getDataPenerimaanBarangById(item.no_service_penerimaan, 'update');
                                    }}
                                >
                                    Update
                                </CButton>
                                {item.jenis_penerimaan === 'Penerimaan Barang Service' ? 
                                    item.link_video != null ? 
                                    <CButton 
                                        size="sm" 
                                        color="info" 
                                        className="ml-1" 
                                        onClick={() => {
                                            setOpenWatchVideoModal(!openWatchVideoModal);
                                            getDataPenerimaanBarangById(item.no_service_penerimaan, 'watch');
                                        }}
                                    >
                                        Watch Video
                                    </CButton> :
                                    <CButton 
                                        size="sm" 
                                        color="success" 
                                        className="ml-1" 
                                        onClick={() => {
                                            setOpenVideoModal(!openVideoModal);
                                            getDataPenerimaanBarangById(item.no_service_penerimaan, 'record');
                                        }}
                                    >
                                        Record Video
                                    </CButton> : null
                                }
                                {item.pengerjaan.status_pengerjaan === 1 ? null : 
                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => {
                                        getDataPenerimaanBarangById(item.no_service_penerimaan, 'cancel');
                                    }}>
                                        Batalkan Pengerjaan
                                    </CButton>                                                    
                                }
                                <CButton 
                                    size="sm" 
                                    color="danger" 
                                    className="ml-1" 
                                    onClick={() => {
                                        getDataPenerimaanBarangById(item.no_service_penerimaan, 'delete');
                                    }}
                                >
                                    Delete
                                </CButton>
                                
                                <a href={`${process.env.REACT_APP_PUBLIC_URL}/tanda-terima-service/${item.no_service_penerimaan}`} target="_blank">
                                    <CButton size="sm" color="warning" className="ml-1">
                                        Cetak Tanda Terima
                                    </CButton>
                                </a>
                            </CCardBody>
                        </CCollapse>
                    )
                }
            }}
        />
    )
}

export default TablePenerimaanBarang;