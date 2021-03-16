import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'fontsource-roboto';
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
    CInputRadio,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CInputCheckbox,
    CTextarea
} from '@coreui/react'
import PengembalianBarangHelper from './modules/PengembalianBarangHelper';
import CurrencyFormat from 'react-currency-format';

const PengembalianBarang = () => {
    const {
        fields,
        kodeCabang,
        statusPembayaran,
        statusPengerjaan,
        statusPengembalian,
        stiker,
        success, setSuccess,
        danger,
        openModalKembalikanBarang,
        openCancelModal,
        openBayarModal,
        info,
        warning, setWarning,
        color, 
        modalTitle,
        dataPengembalian,
        isLoading,
        currentPengembalian, 
        loadDataPengembalian,
        dataRekening,
        loadDataRekening, 
        rekeningVisibility,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        input, setInput,
        cetakLaporan,
        details,
        nominalVisibility,
        sandiTransaksi,
        loadSandiTransaksi,
        dataCabang,
        loadDataCabang,
        adminOptions, 
        currentAdmin, setCurrentAdmin,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPengembalianById,
        getDataRekening,
        getSandiTransaksi,
        cetakLaporanHandler,
        getDataCabang
    } = PengembalianBarangHelper();

    useEffect(() => {
        getCurrentUser();
        getDataRekening();
        getSandiTransaksi();
        getDataCabang();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Pengembalian</CCardHeader>
                        <CRow>
                            <CCol xs="12" md="12" className="ml-4 mt-2 mb-0">
                                <CButton size="sm" color="warning" onClick={() => setWarning(!warning)}>
                                    Cetak Laporan
                                </CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <CDataTable
                                items={dataPengembalian}
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
                                    'no_pengembalian':
                                    (item => (
                                        <td className="text-center">
                                            {item.no_pengembalian}
                                        </td>
                                    )),
                                    'no_service':
                                    (item => (
                                        <td className="text-center">
                                            {kodeCabang(item.penerimaan.cabang.nama_cabang)}{item.no_service}
                                        </td>
                                    )),
                                    'nama_pelanggan':
                                    (item => (
                                        <td>
                                            {item.penerimaan.customer.nama}
                                        </td>
                                    )),
                                    'merek_tipe':
                                    (item => (
                                        <td className="text-center">
                                            {item.penerimaan.merek} {item.penerimaan.tipe}
                                        </td>
                                    )),
                                    'bj': 
                                    (item => (
                                        <td className="text-center">
                                            {item.penerimaan.bj.nama_bj}
                                        </td>
                                    )),
                                    'admin':
                                    (item => (
                                        <td>
                                            {item.penerimaan.admin.name}
                                        </td>
                                    )),
                                    'teknisi_pj':
                                    (item => (
                                        <td>
                                            {item.pj.teknisi.name}
                                        </td>
                                    )),
                                    'status_pembayaran':
                                    (item => (
                                        <td className="text-center">
                                            {statusPembayaran(item.status_pembayaran)}
                                        </td>
                                    )),
                                    'stiker':
                                    (item => (
                                        <td className="text-center">
                                            {item.cek_stiker === null ? stiker(item.pengerjaan.cek_stiker) : stiker(item.cek_stiker)}
                                        </td>
                                    )),
                                    'status_pengembalian':
                                    (item => (
                                        <td className="text-center">
                                            {statusPengembalian(item.status_pengembalian)}
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
                                                <CCardBody>
                                                    <CButton size="sm" color="info" onClick={() => getDataPengembalianById(item.no_pengembalian, 'view')}>
                                                        View Details
                                                    </CButton>
                                                    {item.status_pengembalian == 0 && item.status_pembayaran == 0 ? 
                                                        <>
                                                            <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengembalianById(item.no_pengembalian, item.pengerjaan.status_pengerjaan === 0 || item.pengerjaan.status_pengerjaan === 1 || item.pengerjaan.status_pengerjaan === 2 ? 'cancel' : 'kembalikan')}>
                                                                {item.pengerjaan.status_pengerjaan === 0 || item.pengerjaan.status_pengerjaan === 1 || item.pengerjaan.status_pengerjaan === 2 ? 'Cancel' : 'Kembalikan'}
                                                            </CButton>
                                                        </> :
                                                    item.status_pengembalian == 1 && item.status_pembayaran == 0 ?
                                                        <>
                                                            <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengembalianById(item.no_pengembalian, 'bayar')}>
                                                                Bayar
                                                            </CButton>
                                                        </> :
                                                        null                                                   
                                                    }
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengembalianById(item.no_pengembalian, 'delete')}>
                                                        Delete
                                                    </CButton>
                                                    <a href={`${process.env.REACT_APP_PUBLIC_URL}/nota-service/${item.no_service}`} target="_blank">
                                                        <CButton size="sm" color="warning" className="ml-1">
                                                            Cetak Nota Service
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

            {/* view data */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('View')}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Data Pengembalian</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        {
                            loadDataPengembalian ? null :
                            <>
                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nomor-pengembalian">Nomor Pengembalian</CLabel>
                                            <CInput type="text" id="nomor-pengembalian" name="no_pengembalian" value={currentPengembalian.no_pengembalian} onChange={changeHandler} placeholder="Masukkan Nomor Pengembalian" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nomor-service">Nomor Service</CLabel>
                                            <CInput type="text" id="nomor-service" name="no_service" value={`${kodeCabang(currentPengembalian.penerimaan.cabang.nama_cabang)}${currentPengembalian.no_service}`} onChange={changeHandler} placeholder="Masukkan Nomor Service" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="nama-pelanggan">Nama Pelanggan</CLabel>
                                            <CInput type="text" id="nama-pelanggan" name="nama_pelanggan" value={currentPengembalian.penerimaan.customer.nama} onChange={changeHandler} placeholder="Masukkan Nama Pelanggan" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="merek-tipe">Merek Tipe</CLabel>
                                            <CInput type="text" id="merek-tipe" name="merek_tipe" value={`${currentPengembalian.penerimaan.merek} ${currentPengembalian.penerimaan.tipe}`} onChange={changeHandler} placeholder="Masukkan Merek" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="stiker-twincom">Stiker Twincom</CLabel>
                                            <CInput type="text" id="stiker-twincom" name="stiker_twincom" value={stiker(currentPengembalian.pengerjaan.cek_stiker)} onChange={changeHandler} placeholder="Masukkan Nama Pelanggan" disabled={true} />
                                        </CFormGroup>
                                    </CCol>

                                    {
                                        currentPengembalian.pengerjaan.status_pengerjaan === 3 ? 
                                        <>
                                            <CCol xs="12" lg="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="status-pembayaran">Status Pembayaran</CLabel>
                                                    <CInput type="text" id="status-pembayaran" name="status_pembayaran" value={statusPembayaran(currentPengembalian.status_pembayaran)} onChange={changeHandler} placeholder="Status Pembayaran" disabled={true} />
                                                </CFormGroup>
                                            </CCol>
                                        </> :
                                        <>
                                            <CCol xs="12" lg="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="status-pengerjaan">Status Pengerjaan</CLabel>
                                                    <CInput type="text" id="status-pengerjaan" name="status_pengerjaan" value={statusPengerjaan(currentPengembalian.pengerjaan.status_pengerjaan)} onChange={changeHandler} placeholder="Status Pengerjaan" disabled={true} />
                                                </CFormGroup>
                                            </CCol>
                                        </>
                                    }
                                </CRow>

                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="status-pengembalian">Status Pengembalian</CLabel>
                                            <CInput type="text" id="status-pengembalian" name="status_pengembalian" value={statusPengembalian(currentPengembalian.status_pengembalian)} onChange={changeHandler} placeholder="Status Pembayaran" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            </>
                        }
                    </CForm>
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* kembalikan barang modal */}
            <CModal 
                show={openModalKembalikanBarang} 
                onClose={() => closeModalHandler('Kembalikan')}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Kembalikan Barang</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {
                        loadDataPengembalian ? null :
                        <>
                            <CRow className="mb-2">
                                <CCol xs="12" md="4">
                                    <CLabel>Metode Pembayaran</CLabel>

                                    <CFormGroup variant="custom-radio">
                                        <CInputRadio custom id="cash" name="dp" value="0" onChange={changeHandler}/>
                                        <CLabel variant="custom-checkbox" htmlFor="cash">Lunas</CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="custom-radio">
                                        <CInputRadio custom id="dp" name="dp" value="1" onChange={changeHandler}/>
                                        <CLabel variant="custom-checkbox" htmlFor="dp">JT</CLabel>
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="4">
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

                                <CCol xs="12" md="4">
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
                                <CCol xs="12" lg="12">
                                    <CFormGroup className={nominalVisibility}>
                                        <CLabel htmlFor="biaya-service">Bayar Biaya Service Rp. {currentPengembalian.pengerjaan.biaya_service}</CLabel>
                                        <CurrencyFormat id="biaya-service" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="biaya_service" value={input.biaya_service} onChange={changeHandler} placeholder="Masukkan Nominal" />
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
                        </>
                    }
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('Kembalikan')}>Kembalikan</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Kembalikan')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* cancel modal */}
            <CModal 
                show={openCancelModal} 
                onClose={() => closeModalHandler('Cancel')}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Cancel Barang</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Kembalikan sekarang?
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('Cancel')}>Kembalikan</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Cancel')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* bayar modal */}
            <CModal 
                show={openBayarModal} 
                onClose={() => closeModalHandler('Bayar')}
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
                    <CButton color="success" onClick={() => submitHandler('Bayar')}>Bayar</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Bayar')}>Cancel</CButton>
                </CModalFooter>
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

            {/* cetak laporan */}
            <CModal 
                show={warning} 
                onClose={() => closeModalHandler('CetakLaporan')}
                color="warning"
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

export default PengembalianBarang;