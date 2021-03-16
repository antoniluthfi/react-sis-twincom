import React, { useEffect, useState } from 'react';
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
    CSelect,
    CInputRadio,
    CTextarea,
    CModalFooter,
    CCollapse
} from '@coreui/react'  
import PengerjaanHelper from './modules/PengerjaanHelper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

const Pengerjaan = () => {
    const {
        fields,
        success,
        danger,
        info,
        openUpdateModal,
        color,
        isLoading,
        details,
        input, setInput,
        partnerOptions,
        dataPengerjaan,
        currentTeknisipj,
        currentPengerjaan,
        loadCurrentPengerjaan,
        garansiVisible,
        alasanBatalVisible,
        kodeCabang,
        statusPengerjaan,
        toggleDetails,
        submitHandler,
        changeHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPengerjaanById,
        getDataPartner,
        sendEmailNotification
    } = PengerjaanHelper();

    useEffect(() => {
        getCurrentUser();
        getDataPartner();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Pengerjaan</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataPengerjaan}
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
                                    'no_pengerjaan': 
                                    (item => (
                                        <td className="text-center">
                                            { item.no_pengerjaan }
                                        </td>
                                    )),
                                    'no_service': 
                                    (item => (
                                        <td className="text-center">
                                            {`${kodeCabang(item.nama_cabang)}${item.no_service_penerimaan}`}
                                        </td>
                                    )),
                                    'jenis_penerimaan':
                                    (item => (
                                        <td className="text-center">
                                            {item.jenis_penerimaan}
                                        </td>
                                    )),
                                    'customer':
                                    (item => (
                                        <td>
                                            {item.customer}
                                        </td>
                                    )),
                                    'id_bj': 
                                    (item => (
                                        <td className="text-center">
                                            {item.nama_bj}
                                        </td>
                                    )),
                                    'merek': 
                                    (item => (
                                        <td className="text-center">
                                            {item.merek}
                                        </td>
                                    )),
                                    'tipe': 
                                    (item => (
                                        <td className="text-center">
                                            {item.tipe}
                                        </td>
                                    )),
                                    'problem': 
                                    (item => (
                                        <td>
                                            {item.problem}
                                        </td>
                                    )),
                                    'kondisi':
                                    (item => (
                                        <td>
                                            {item.kondisi}
                                        </td>
                                    )),
                                    'permintaan':
                                    (item => (
                                        <td>
                                            {item.permintaan}
                                        </td>
                                    )),
                                    'keterangan': 
                                    (item => (
                                        <td>
                                            {item.keterangan}
                                        </td>
                                    )),
                                    'tempo':
                                    (item => (
                                        <td>
                                            {moment(item.tempo).format('ll')}
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
                                        (item, index)=>{
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <h4 className="lead ml-4 mb-0 mt-3">
                                                Posisi Barang : {item.partner}
                                            </h4>
                                            <h4 className="lead ml-4 mb-1 mt-0">
                                                Status Pengerjaan : {statusPengerjaan(item.status_pengerjaan)}
                                            </h4>    
                                            <CCardBody>
                                                <CButton size="sm" color="info" onClick={() => getDataPengerjaanById(item.no_pengerjaan, 'view')}>
                                                    View Details
                                                </CButton>
                                                {
                                                    item.status_pengerjaan === 3 ? null :
                                                    <>
                                                        <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengerjaanById(item.no_pengerjaan, item.status_pengerjaan === 0 ? 'Kerjakan' : 'Update Progress')}>
                                                            {item.status_pengerjaan === 0 ? 'Kerjakan' : 'Update Progress'}
                                                        </CButton>
                                                    </>
                                                }
                                                {
                                                    item.status_pengerjaan === 3 ? 
                                                    <CButton size="sm" color="warning" onClick={() => sendEmailNotification(item)}>
                                                        Send Email
                                                    </CButton>
                                                    : null
                                                }
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengerjaanById(item.no_pengerjaan, 'delete')}>
                                                    Delete
                                                </CButton>
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

            {/* add, edit data pengerjaan */}
            <CModal 
                show={success} 
                onClose={() => closeModalHandler('Submit')}
                color={color}
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data Pengerjaan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="6">
                            <CLabel>Status Pengerjaan</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="status-pengerjaan-2" name="status_pengerjaan" value="2" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="status-pengerjaan-2">Sedang dikerjakan</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="status-pengerjaan-1" name="status_pengerjaan" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="status-pengerjaan-1">Cancel</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="biaya-service">Biaya Service (opsional)</CLabel>
                                <CurrencyFormat id="biaya-service" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Biaya Service" />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="partner">Partner</CLabel>
                                <Autocomplete
                                    id="partner"
                                    options={partnerOptions}
                                    getOptionSelected={(option, value) => option.nama === value.nama}
                                    getOptionLabel={(option) => option.nama}
                                    onChange={(event, values) => {
                                        if(values !== null) {
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
                        <CCol>
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
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('Submit')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Submit')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* update data pengerjaan modal */}
            <CModal 
                show={openUpdateModal} 
                onClose={() => closeModalHandler('Update')}
                color={color}
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Updata Data Pengerjaan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="6" className="mb-3">
                            <CLabel>Status Pengerjaan</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="status-pengerjaan-3" name="status_pengerjaan" value="3" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="status-pengerjaan-3">Selesai</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="status-pengerjaan-1-2" name="status_pengerjaan" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="status-pengerjaan-1-2">Cancel</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6" className={garansiVisible}>
                            <CLabel>Cek Stiker</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="belum-ditempel" name="cek_stiker" value="0" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="belum-ditempel">Belum ditempel</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="sudah-ditempel" name="cek_stiker" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="sudah-ditempel">Sudah Ditempel</CLabel>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6" className={garansiVisible}>
                            <CFormGroup>
                                <CLabel htmlFor="garansi">Garansi</CLabel>
                                <CInput type="number" id="garansi" name="garansi" value={input.garansi} min="0" placeholder="Masukkan Garansi" onChange={changeHandler}/>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6" className={alasanBatalVisible}>
                            <CFormGroup>
                                <CLabel htmlFor="alasan-batal">Alasan Batal</CLabel>
                                <CInput type="text" id="alasan-batal" name="alasan_batal" value={input.alasan_batal} placeholder="Alasan Batal" onChange={changeHandler}/>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="biaya-service">Biaya Service</CLabel>
                                <CurrencyFormat id="biaya-service" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Biaya Service" />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CLabel htmlFor="pengerjaan">Pengerjaan</CLabel>
                            <CTextarea 
                                name="pengerjaan" 
                                id="pengerjaan" 
                                rows="5"
                                placeholder="Masukkan Pengerjaan" 
                                value={input.pengerjaan}
                                onChange={changeHandler}
                            />
                        </CCol>

                        <CCol xs="12" md="6">
                            <CLabel htmlFor="keterangan-2">Keterangan</CLabel>
                            <CTextarea 
                                name="keterangan" 
                                id="keterangan-2" 
                                rows="5"
                                placeholder="Masukkan Keterangan" 
                                value={input.keterangan}
                                onChange={changeHandler}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('Update')}>Update</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Update')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* view data */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('View')}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Data Pengerjaan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {
                        loadCurrentPengerjaan ? null : 
                        <>
                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="no-service">Nomor Service</CLabel>
                                        <CInput type="text" id="no-service" name="no_service" value={`${kodeCabang(currentPengerjaan.penerimaan.cabang.nama_cabang)}${currentPengerjaan.no_service}`} placeholder="Masukkan Nomor Service" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nama-pelanggan">Nama Pelanggan</CLabel>
                                        <CInput type="text" id="nama-pelanggan" name="nama_pelanggan" value={currentPengerjaan.penerimaan.customer.nama} placeholder="Masukkan Nomor Service" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="merek">Merek</CLabel>
                                        <CInput type="text" id="merek" name="merek" value={currentPengerjaan.penerimaan.merek} placeholder="Masukkan Merek" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="tipe">Tipe</CLabel>
                                        <CInput type="text" id="tipe" name="tipe" value={currentPengerjaan.penerimaan.tipe} placeholder="Masukkan Tipe" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="bj">Barang/Jasa</CLabel>
                                        <CInput type="text" id="bj" name="bj" value={currentPengerjaan.penerimaan.bj.nama_bj} placeholder="Masukkan Barang Jasa" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="status-pengerjaan">Status Pengerjaan</CLabel>
                                        <CInput type="text" id="status-pengerjaan" name="status_pengerjaan" value={statusPengerjaan(currentPengerjaan.status_pengerjaan)} placeholder="Satatus Pengerjaan" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="problem">Problem</CLabel>
                                        <CInput type="text" id="problem" name="problem" value={currentPengerjaan.penerimaan.problem} placeholder="Masukkan Problem" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="kondisi">Kondisi</CLabel>
                                        <CInput type="text" id="kondisi" name="kondisi" value={currentPengerjaan.penerimaan.kondisi} placeholder="Masukkan Kondisi" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="estimasi">Estimasi</CLabel>
                                        <CInput type="text" id="estimasi" name="estimasi" value={currentPengerjaan.penerimaan.estimasi} placeholder="Estimasi Penyelesaian" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="jatuh-tempo">Jatuh Tempo</CLabel>
                                        <CInput type="text" id="jatuh-tempo" name="jatuh_tempo" value={currentPengerjaan.penerimaan.tempo} placeholder="Batas Tempo Pengerjaan" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="biaya-service">Biaya Service</CLabel>
                                        <CInput type="text" id="biaya-service" name="biaya_service" value={currentPengerjaan.biaya_service} placeholder="Biaya Service" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="garansi">Garansi</CLabel>
                                        <CInput type="text" id="garansi" name="garansi" value={`${currentPengerjaan.garansi} Hari`} placeholder="Masukkan Garansi" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="teknisi">Teknisi PJ</CLabel>
                                        <CInput type="text" id="teknisi" name="teknisi" value={currentTeknisipj} placeholder="Teknisi PJ" onChange={changeHandler} disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </>
                    }
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* delete data */}
            <CModal 
                show={danger} 
                onClose={() => closeModalHandler('Delete')}
                color="danger"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Hapus Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    This data will be deleted parmanently. Are you sure wanna delete it anyway?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => submitHandler('Delete')}>Delete</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Delete')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Pengerjaan;