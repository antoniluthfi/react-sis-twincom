import React, { useEffect, useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import PengirimanBarangHelper from './modules/PengirimanBarangHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,
    CCollapse,
    CTextarea
} from '@coreui/react';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlusCircle, faTrash
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core';

const PengirimanBarang = () => {
    const {
        fields,
        kodeSuratJalan,
        kodeCabang,
        success, setSuccess,
        danger, 
        info, 
        openModalBarang, setOpenModalBarang,
        color,
        isLoading,
        dataPengiriman,
        dataListPengiriman,
        loadDataListPengiriman,
        input, setInput,
        inputBarang, setInputBarang,
        buttonSubmitName,
        modalTitle,
        details, setDetails,
        currentUser,
        currentPengiriman,
        loadCurrentPengiriman,
        dataBarangService,
        loadDataBarangService,
        dataPartner,
        loadDataPartner,
        currentPartner, setCurrentPartner,
        dataTeknisi,
        loadDataTeknisi,
        currentPengirim, setCurrentPengirim,
        currentPengantar, setCurrentPengantar,
        currentBarangService, setCurrentBarangService,
        dataBarangForCurrentSuratJalan,
        currentKelengkapan,
        loadCurrentKelengkapan,
        toggleDetails,
        changeHandler,
        barangChangeHandler,
        addBarangHandler,
        removeBarangHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPengirimanBarangById,
        getDataPartner,
        getDataTeknisi,
        getListKelengkapanByNoService
    } = PengirimanBarangHelper();

    const [kelengkapan, setKelengkapan] = useState([]);

    useEffect(() => {
        getCurrentUser();
        getDataPartner();
        getDataTeknisi();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Pengiriman Barang</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <CDataTable
                                items={dataPengiriman}
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
                                    'no_surat_jalan':
                                    (item => (
                                        <td className="text-center">
                                            {`${kodeSuratJalan(item.admin.cab_penempatan)}${item.no_surat_jalan}`}
                                        </td>
                                    )),
                                    'tujuan':
                                    (item => (
                                        <td className="text-center">
                                            {item.partner.nama}
                                        </td>
                                    )),
                                    'alamat':
                                    (item => (
                                        <td className="text-center">
                                            {item.partner.alamat}
                                        </td>
                                    )),
                                    'admin':
                                    (item => (
                                        <td>
                                            {item.admin.name}
                                        </td>
                                    )),
                                    'pengirim':
                                    (item => (
                                        <td>
                                            {item.pengirim.name}
                                        </td>
                                    )),
                                    'pengantar':
                                    (item => (
                                        <td>
                                            {item.pengantar.name}
                                        </td>
                                    )),
                                    'created_at':
                                    (item => (
                                        <td className="text-center">
                                            {moment(item.created_at).format('MMMM Do YYYY')}
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
                                                <h4>
                                                    {item.username}
                                                </h4>
                                                <CButton size="sm" color="info" onClick={() => getDataPengirimanBarangById(item.no_surat_jalan, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengirimanBarangById(item.no_surat_jalan, item.list_pengiriman.length > 0 ? 'update barang' : 'tambah barang')}>
                                                    {item.list_pengiriman.length > 0 ? 'Update Barang' : 'Tambah Barang'}
                                                </CButton>
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengirimanBarangById(item.no_surat_jalan, 'delete')}>
                                                    Delete
                                                </CButton>
                                                <a href={`${process.env.REACT_APP_LARAVEL_URL}/surat-jalan/${item.no_surat_jalan}`} target="_blank">
                                                    <CButton size="sm" color="warning" className="ml-1">
                                                        Cetak Surat Jalan
                                                    </CButton>
                                                </a>
                                            </CCardBody>
                                        </CCollapse>
                                        )
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit, view data */}
            <CModal 
                show={success} 
                onClose={() => closeModalHandler('submit')}
                color={color}
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="nama-partner">Pilih Tujuan</CLabel>
                                    <Autocomplete
                                        id="nama-partner"
                                        options={dataPartner}
                                        getOptionSelected={(option, value) => option.nama === value.nama}
                                        getOptionLabel={(option) => option.nama}
                                        value={{ nama: currentPartner.nama }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentPartner({
                                                    nama: values.nama, 
                                                });

                                                setInput({
                                                    ...input, id_partner: values.id
                                                });
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="pengirim">Pengirim</CLabel>
                                    <Autocomplete
                                        id="pengirim"
                                        options={dataTeknisi}
                                        getOptionSelected={(option, value) => option.name === value.name}
                                        getOptionLabel={(option) => option.name}
                                        value={{ name: currentPengirim.name }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentPengirim({
                                                    name: values.name, 
                                                });

                                                setInput({
                                                    ...input, id_pengirim: values.id
                                                });
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="pengantar">Pengantar</CLabel>
                                    <Autocomplete
                                        id="pengantar"
                                        options={dataTeknisi}
                                        getOptionSelected={(option, value) => option.name === value.name}
                                        getOptionLabel={(option) => option.name}
                                        value={{ name: currentPengantar.name }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentPengantar({
                                                    name: values.name, 
                                                });

                                                setInput({
                                                    ...input, id_pengantar: values.id
                                                });
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" lg="12">
                                <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                <CTextarea 
                                    name="keterangan" 
                                    id="keterangan" 
                                    rows="5"
                                    placeholder="Masukkan Keterangan" 
                                    value={input.keterangan}
                                    onChange={changeHandler}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('submit')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* view pengiriman */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('view')}
                color="info"
                size="xl"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Pengiriman Barang</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadCurrentPengiriman ? null : 
                        <>
                        <CRow>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="no_surat_jalan">Nomor Surat Jalan</CLabel>
                                    <CInput type="text" id="no_surat_jalan" name="no_surat_jalan" value={`${kodeSuratJalan(currentPengiriman.admin.cab_penempatan)}${currentPengiriman.no_surat_jalan}`} onChange={changeHandler} placeholder="Nomor Surat Jalan" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="partner">Tujuan</CLabel>
                                    <CInput type="text" id="partner" name="partner" value={currentPengiriman.partner.nama} onChange={changeHandler} placeholder="Nama Partner" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="alamat">Alamat</CLabel>
                                    <CInput type="text" id="alamat" name="alamat" value={currentPengiriman.partner.alamat} onChange={changeHandler} placeholder="Alamat Partner" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>    
                        
                        <CRow>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="pengirim">Pengirim</CLabel>
                                    <CInput type="text" id="pengirim" name="pengirim" value={currentPengiriman.pengirim.name} onChange={changeHandler} placeholder="Pengirim" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="pengantar">Pengantar</CLabel>
                                    <CInput type="text" id="pengantar" name="pengantar" value={currentPengiriman.pengantar.name} onChange={changeHandler} placeholder="Pengantar" disabled={true} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                    <CInput type="text" id="keterangan" name="keterangan" value={currentPengiriman.keterangan} onChange={changeHandler} placeholder="Pengantar" disabled={true} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        </>
                    }

                    <CRow>
                        <CCol xs="12" md="12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">No Service</th>
                                        <th className="text-center">Serial Number</th>
                                        <th className="text-center">Kelengkapan</th>
                                        <th className="text-center">Kerusakan</th>
                                        <th className="text-center">Status Pengiriman</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadDataListPengiriman ? null :
                                        dataListPengiriman.map((item, index) => (
                                            <>
                                            <tr>
                                                <td className="text-center">{kodeCabang(item.penerimaan.id_cabang)}{item.no_service}</td>
                                                <td className="text-center">{item.penerimaan.sn}</td>
                                                <td className="text-center">{item.kelengkapan}</td>
                                                <td className="text-center">{item.kerusakan}</td>
                                                <td className="text-center">{item.status_pengiriman === 0 ? 'Terkirim' : 'Kembali'}</td>
                                            </tr>
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* modal tambah barang */}
            <CModal 
                show={openModalBarang} 
                onClose={() => setOpenModalBarang(!openModalBarang)}
                color="success"
                size="xl"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data Barang</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" lg="12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">No Service</th>
                                        <th className="text-center">Kelengkapan</th>
                                        <th className="text-center">Kerusakan</th>
                                        <th className="text-center">
                                            <Button>
                                                <FontAwesomeIcon icon={faPlusCircle} onClick={addBarangHandler} />
                                            </Button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inputBarang.map((inbar, i) => (
                                        <Fragment key={i}>
                                        <tr>
                                            <td className="text-center">
                                                {loadDataBarangService ? null : 
                                                    <Autocomplete
                                                        id="barang-service"
                                                        options={dataBarangService}
                                                        getOptionSelected={(option, value) => option.id_cabang === value.id_cabang}
                                                        getOptionLabel={option => option.no_service_penerimaan.toString()}
                                                        // value={{ no_service_penerimaan: currentBarangService.no_service }}
                                                        onChange={(event, values) => {
                                                            if(values !== null) {
                                                                setCurrentBarangService({
                                                                    ...currentBarangService,
                                                                    id_cabang: kodeCabang(values.id_cabang),
                                                                    no_service: values.no_service_penerimaan
                                                                });
                
                                                                let selected = [...inputBarang];
                                                                selected[i].no_service = values.no_service_penerimaan;
                                                                selected[i].sn = values.sn;
                                                                selected[i].kerusakan = values.kerusakan;
                                                                setInputBarang(selected);

                                                                getListKelengkapanByNoService(values.no_service_penerimaan);
                                                            } else {
                                                                setCurrentBarangService({
                                                                    ...currentBarangService,
                                                                    id_cabang: '',
                                                                    no_service: ''
                                                                });

                                                                let selected = [...inputBarang];
                                                                selected[i].no_service = '';
                                                                selected[i].sn = '';
                                                                selected[i].kerusakan = '';
                                                                setInputBarang(selected);
                                                            }                       
                                                        }}
                                                        renderInput={(params) => 
                                                            <TextField {...params} placeholder={kodeCabang(currentUser.cab_penempatan)} />
                                                        }
                                                    />  
                                                }                                                                         
                                            </td>
                                            <td className="text-center">
                                                {loadCurrentKelengkapan ? null : 
                                                    <Autocomplete
                                                        id="kelengkapan"
                                                        multiple
                                                        options={currentKelengkapan}
                                                        getOptionSelected={(option, value) => option.kelengkapan === value.kelengkapan}
                                                        getOptionLabel={(option) => option.kelengkapan}
                                                        // value={{ kelengkapan: currentBarangService.kelengkapan }}
                                                        onChange={(event, values) => {
                                                            if(values !== null) {
                                                                let data = [];
                                                                values.map(item => data.push(item.kelengkapan));
                
                                                                setCurrentBarangService({
                                                                    ...currentBarangService,
                                                                    kelengkapan: data
                                                                });
                
                                                                let selected = [...inputBarang];
                                                                selected[i].kelengkapan = data;
                                                                setInputBarang(selected);
                                                            } else {
                                                                setCurrentBarangService({
                                                                    ...currentBarangService,
                                                                    kelengkapan: ''
                                                                });

                                                                let selected = [...inputBarang];
                                                                selected[i].kelengkapan = '';
                                                                setInputBarang(selected);
                                                            }                          
                                                        }}
                                                        renderInput={(params) => 
                                                            <TextField {...params} />
                                                        }
                                                    />                                
                                                }
                                            </td>
                                            <td className="text-center">
                                                {loadCurrentKelengkapan ? null :
                                                    <TextField name="kerusakan" onChange={e => barangChangeHandler(i, e)} />
                                                }
                                            </td>
                                            <td className="text-center">
                                                <Button>
                                                    <FontAwesomeIcon icon={faTrash} onClick={removeBarangHandler} />
                                                </Button>
                                            </td>
                                        </tr>
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('Tambah Barang')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setOpenModalBarang(!openModalBarang)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* delete data */}
            <CModal 
                show={danger} 
                onClose={closeModalHandler}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Hapus Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    This data will be deleted parmanently. Are you sure wanna delete it anyway?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => submitHandler('Delete')}>Delete</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('delete')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default PengirimanBarang;