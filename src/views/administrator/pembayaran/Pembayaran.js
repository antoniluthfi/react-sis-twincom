import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    CModalFooter,
    CCollapse,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CTextarea,
    CInputRadio,
    CInputCheckbox
} from '@coreui/react'
import PembayaranHelper from './modules/PembayaranHelper';
import CurrencyFormat from 'react-currency-format';

const Pembayaran = () => {
    const {
        fields,
        kodeCabang,
        success, setSuccess,
        danger, 
        info, 
        warning, setWarning,
        openLunasModal,
        color, 
        dataPembayaran, 
        isLoading,
        currentPembayaran,
        loadDataPembayaran,
        details,
        modalTitle,
        buttonSubmitName,
        dataRekening,
        loadDataRekening,
        dataCabang,
        loadDataCabang,
        rekeningVisibility,
        nominalVisibility,
        adminOptions,
        currentAdmin, setCurrentAdmin,
        sandiTransaksi,
        loadSandiTransaksi,
        input, setInput,
        cetakLaporan,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPembayaranById,
        getSandiTransaksi,
        getDataRekening,
        cetakLaporanHandler,
        getDataCabang
    } = PembayaranHelper();

    useEffect(() => {
        getCurrentUser();
        getSandiTransaksi();
        getDataRekening();
        getDataCabang();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Pembayaran</CCardHeader>
                        <CRow>
                            <CCol xs="12" md="12" className="ml-4 mt-2 mb-0">
                                <CButton size="sm" color="warning" onClick={() => setWarning(!warning)}>
                                    Cetak Laporan
                                </CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <CDataTable
                                items={dataPembayaran}
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
                                    'no_pembayaran':
                                    (item => (
                                        <td className="text-center">
                                            {item.no_pembayaran}
                                        </td>
                                    )),
                                    'no_service':
                                    (item => (
                                        <td className="text-center">
                                            {kodeCabang(item.cabang)}{item.no_service}
                                        </td>
                                    )),
                                    'bj':
                                    (item => (
                                        <td className="text-center">
                                            {item.penerimaan.bj.nama_bj}
                                        </td>
                                    )),
                                    'norekening':
                                    (item => (
                                        <td className="text-center">
                                            {item.norekening === null ? '-' : item.norekening}
                                        </td>
                                    )),
                                    'kas':
                                    (item => (
                                        <td className="text-center">
                                            {item.nominal === 0 ? '-' : item.kas === 0 ? 'Tunai' : 'Bank'}
                                        </td>
                                    )),
                                    'pembayaran':
                                    (item => (
                                        <td className="text-center">
                                            {item.nominal === 0 ? '-' : item.dp === 0 ? 'Cash' : 'DP'}
                                        </td>
                                    )),
                                    'nominal':
                                    (item => (
                                        <td className="text-right">
                                            {item.nominal === 0 ? item.nominal : `Rp. ${item.nominal}`}
                                        </td>
                                    )),
                                    'status_pembayaran':
                                    (item => (
                                        <td className="text-center">
                                            {item.status_pembayaran === 0 ? 'Belum Lunas' : 'Lunas'}
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
                                    'shift':
                                    (item => (
                                        <td className="text-center">
                                            {item.nominal === 0 ? '-' : item.shift === 0 ? 'Shift 1' : 'Shift 2'}
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
                                                onClick={() => {toggleDetails(index)}}
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
                                                <CButton size="sm" color="info" onClick={() => getDataPembayaranById(item.no_pembayaran, 'view')}>
                                                    View Details
                                                </CButton>
                                                {item.dp == 0 && item.nominal == 0 ? 
                                                    <>
                                                        <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPembayaranById(item.no_pembayaran, 'bayar')}>
                                                            Bayar
                                                        </CButton>
                                                    </> :
                                                    item.nominal < item.pengerjaan.biaya_service ?
                                                    <>
                                                        <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPembayaranById(item.no_pembayaran, 'lunasi')}>
                                                            Lunasi
                                                        </CButton>
                                                    </> :
                                                    null
                                                }
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPembayaranById(item.no_pembayaran, 'delete')}>
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

            {/* view data */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('View')}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Data Pembayaran {loadDataPembayaran ? null : `${currentPembayaran.penerimaan.customer.nama} - ${currentPembayaran.penerimaan.bj.nama_bj}`}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadDataPembayaran ? null : 
                        <>
                            <CForm action="" method="post">
                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nomor-pembayaran">Nomor Pembayaran</CLabel>
                                            <CInput type="text" id="nomor-pembayaran" name="no_pembayaran" value={currentPembayaran.no_pembayaran} placeholder="Masukkan Nomor Pembayaran" disabled={true} />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nomor-service">Nomor Service</CLabel>
                                            <CInput type="text" id="nomor-service" name="no_service" value={`${kodeCabang(currentPembayaran.penerimaan.cabang.nama_cabang)}${currentPembayaran.no_service}`} placeholder="Masukkan Nomor Pembayaran" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nama-pelanggan">Nama Pelanggan</CLabel>
                                            <CInput type="text" id="nama-pelanggan" name="nama_pelanggan" value={currentPembayaran.penerimaan.customer.nama} placeholder="Masukkan Nomor Pembayaran" disabled={true} />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="bj">Jasa</CLabel>
                                            <CInput type="text" id="bj" name="bj" value={currentPembayaran.penerimaan.bj.nama_bj} placeholder="Masukkan Nomor Pembayaran" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nama-admin">Nama Admin</CLabel>
                                            <CInput type="text" id="nama-admin" name="nama_admin" value={currentPembayaran.admin == null ? '-' : currentPembayaran.admin.name} placeholder="Masukkan Nomor Pembayaran" disabled={true} />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nama-kas">Kas</CLabel>
                                            <CInput type="text" id="nama-kas" name="kas" value={currentPembayaran.arusKas == null ? '-' : currentPembayaran.arusKas.kas === 0 ? 'Tunai' : 'Bank'} placeholder="Masukkan Nomor Pembayaran" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                {currentPembayaran.arusKas == null ? null :
                                    <>
                                        <CRow>
                                            <CCol xs="12" md="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="metode-pembayaran">Pembayaran</CLabel>
                                                    <CInput type="text" id="metode-pembayaran" name="pembayaran" value={currentPembayaran.dp === 0 ? 'Cash' : 'DP'} placeholder="Masukkan Metode Pembayaran" disabled={true} />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" md="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="nominal-pembayaran">Nominal</CLabel>
                                                    <CInput type="text" id="nominal-pembayaran" name="nominal" value={`Rp. ${currentPembayaran.nominal}`} placeholder="Masukkan Nominal" disabled={true} />
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </>
                                }

                                <CRow>
                                    <CCol xs="12" md="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="status-pembayaran">Status Pembayaran</CLabel>
                                            <CInput type="text" id="status-pembayaran" name="status_pembayaran" value={currentPembayaran.status_pembayaran === 0 ? 'Belum Lunas' : 'Lunas'} placeholder="Status Pembayaran" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" md="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="keterangan-pembayaran">Keterangan Pembayaran</CLabel>
                                            <CInput type="text" id="keterangan-pembayaran" name="keterangan_pembayaran" value={currentPembayaran.keterangan_pembayaran == null ? '-' : currentPembayaran.keterangan_pembayaran} placeholder="Masukkan Keterangan" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </>
                    }
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* modal bayar */}
            <CModal 
                show={success} 
                onClose={() => closeModalHandler('Bayar')}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Bayar {loadDataPembayaran ? null : `${currentPembayaran.penerimaan.bj.nama_bj} - ${currentPembayaran.penerimaan.customer.nama}`}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-2">
                        <CCol xs="12" md="6">
                            <CLabel>Metode Pembayaran</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="cash" name="dp" value="0" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="cash">Cash</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="dp" name="dp" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="dp">DP</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CLabel>Pilih Kas</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="bank" name="kas" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="bank">Bank</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="tunai" name="kas" value="0" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="tunai">Tunai</CLabel>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="12">
                            <CFormGroup className={nominalVisibility}>
                                <CLabel htmlFor="biaya_service">Bayar Biaya Service {loadDataPembayaran ? null : `Rp. ${currentPembayaran.pengerjaan.biaya_service}`}</CLabel>
                                <CurrencyFormat id="biaya_service" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Nominal" />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup className={rekeningVisibility}>
                                <CLabel htmlFor="norekening">Pilih Rekening</CLabel>
                                <CSelect custom name="norekening" id="norekening" value={input.norekening} onChange={changeHandler} >
                                    <option key="sdnjns" value="">Pilih Salah Satu</option>
                                    {loadDataRekening ? null : 
                                        dataRekening.map((item, index) => (
                                            <option key={index} value={`${item.norekening} / ${item.nama_bank}`}>{item.norekening} / {item.nama_bank}</option>
                                        ))
                                    }
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="sandi-transaksi">Pilih Transaksi</CLabel>
                                <CSelect custom name="id_sandi" id="sandi-transaksi" value={input.id_sandi} onChange={changeHandler} >
                                    <option key="sdnjnsakfss" value="">Pilih Salah Satu</option>
                                    {loadSandiTransaksi ? null : 
                                        sandiTransaksi.map((item, index) => (
                                            <option key={index} value={item.id}>{item.sandi_transaksi}</option>
                                        ))
                                    }
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="input-admin">Pilih Admin</CLabel>
                                <Autocomplete
                                    id="input-admin"
                                    clearOnEscape={true}
                                    options={adminOptions}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    getOptionLabel={option => option.name}
                                    value={{ name: currentAdmin.name }}
                                    onChange={(event, values) => {
                                        if(values !== null) {
                                            setCurrentAdmin({
                                                ...currentAdmin, name: values.name
                                            });

                                            setInput({
                                                ...input, id_admin: values.id
                                            });
                                        } else {
                                            setCurrentAdmin({
                                                ...currentAdmin, name: ''
                                            });

                                            setInput({
                                                ...input, id_admin: ''
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
                    <CButton color="success" onClick={() => submitHandler('Bayar')}>Bayar</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Bayar')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* modal lunasi */}
            <CModal 
                show={openLunasModal} 
                onClose={() => closeModalHandler('Lunasi')}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Bayar Sisa Kekurangan Pembayaran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="6" className="mb-3">
                            <CLabel>Pilih Kas</CLabel>

                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="bank-2" name="kas" value="1" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="bank-2">Bank</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio">
                                <CInputRadio custom id="tunai-2" name="kas" value="0" onChange={changeHandler}/>
                                <CLabel variant="custom-checkbox" htmlFor="tunai-2">Tunai</CLabel>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup className={rekeningVisibility}>
                                <CLabel htmlFor="norekening">Pilih Rekening</CLabel>
                                <CSelect custom name="norekening" id="norekening" value={input.norekening} onChange={changeHandler} >
                                    <option key="sdnjns" value="">Pilih Salah Satu</option>
                                    {loadDataRekening ? null : 
                                        dataRekening.map((item, index) => (
                                            <option key={index} value={`${item.norekening} / ${item.nama_bank}`}>{item.norekening} / {item.nama_bank}</option>
                                        ))
                                    }
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" lg="12">
                            <CFormGroup>
                                <CLabel htmlFor="nominal">Nominal</CLabel>
                                <CurrencyFormat id="nominal" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Nominal" />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="input-admin">Pilih Admin</CLabel>
                                <Autocomplete
                                    id="input-admin"
                                    clearOnEscape={true}
                                    options={adminOptions}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    getOptionLabel={option => option.name}
                                    value={{ name: currentAdmin.name }}
                                    onChange={(event, values) => {
                                        if(values !== null) {
                                            setCurrentAdmin({
                                                ...currentAdmin, name: values.name
                                            });

                                            setInput({
                                                ...input, id_admin: values.id
                                            });
                                        } else {
                                            setCurrentAdmin({
                                                ...currentAdmin, name: ''
                                            });

                                            setInput({
                                                ...input, id_admin: ''
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
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('Lunasi')}>Bayar</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Lunasi')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* delete data */}
            <CModal 
                show={danger} 
                onClose={closeModalHandler}
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

            {/* cetak laporan */}
            <CModal 
                show={warning} 
                onClose={() => closeModalHandler('CetakLaporan')}
                color="warning"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Cetak Laporan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="12" className="mb-2">
                            <CFormGroup variant="custom-checkbox" inline>
                                <CInputCheckbox custom id="filter-lebih-dari-satuhari" name="filter_lebih_dari_satuhari" defaultChecked={false} onChange={cetakLaporanHandler} />
                                <CLabel variant="custom-checkbox" htmlFor="filter-lebih-dari-satuhari">Filter lebih dari 1 hari</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-checkbox" inline>
                                <CInputCheckbox custom id="filter-cabang" name="filter_cabang" defaultChecked={false} onChange={cetakLaporanHandler} />
                                <CLabel variant="custom-checkbox" htmlFor="filter-cabang">Filter Cabang</CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-checkbox" inline>
                                <CInputCheckbox custom id="filter-shift" name="filter_shift" defaultChecked={false} onChange={cetakLaporanHandler} />
                                <CLabel variant="custom-checkbox" htmlFor="filter-shift">Filter Shift</CLabel>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="dari">Dari</CLabel>
                                <CInput type="date" id="dari" name="dari" value={cetakLaporan.dari} onChange={cetakLaporanHandler} placeholder="dd/mm/yy" />
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup className={filterLebihDariSatuHari}>
                                <CLabel htmlFor="sampai">Sampai</CLabel>
                                <CInput type="date" id="sampai" name="sampai" value={cetakLaporan.sampai} onChange={cetakLaporanHandler} placeholder="dd/mm/yy" />
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" md="6">
                            <CFormGroup className={filterCabang}>
                                <CLabel htmlFor="cabang">Cabang</CLabel>
                                <CSelect custom name="cabang" id="cabang" value={cetakLaporan.cabang} onChange={cetakLaporanHandler} >
                                    <option key="sdnjns" value="">Pilih Salah Satu</option>
                                    {loadDataCabang ? null : 
                                        dataCabang.map((item, index) => (
                                            <option key={index} value={item.id}>{item.nama_cabang}</option>
                                        ))
                                    }
                                </CSelect>
                            </CFormGroup>
                        </CCol>

                        <CCol xs="12" md="6">
                            <CFormGroup className={filterShift}>
                                <CLabel htmlFor="shift">Shift</CLabel>
                                <CSelect custom name="shift" id="shift" value={cetakLaporan.shift} onChange={cetakLaporanHandler} >
                                    <option value="">Pilih Salah Satu</option>
                                    <option value="0">Shift 1</option>
                                    <option value="1">Shift 2</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" onClick={() => submitHandler('CetakLaporan')}>Cetak Laporan</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Pembayaran;