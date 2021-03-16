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
    CInputRadio,
    CInputCheckbox,
} from '@coreui/react';
import ArusKasHelper from './modules/ArusKasHelper';
import CurrencyFormat from 'react-currency-format';

const ArusKas = () => {
    const {
        fields,
        kas,
        pembayaran,
        kodeCabang,
        success, setSuccess, 
        danger, 
        info, 
        warning, setWarning,
        color, 
        modalTitle,
        buttonSubmitName,
        arusKas,
        isLoading,
        currentArusKas,
        loadCurrentArusKas,
        currentUser,
        details,
        dataCabang,
        loadDataCabang,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        dataRekening,
        loadDataRekening,
        rekeningVisibility,
        sandiTransaksiOptions,
        currentSandiTransaksi, setCurrentSandiTransaksi,
        input, setInput,
        cetakLaporan,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataArusKasById,
        getDataRekening,
        getDataSandiTransaksi,
        getDataCabang,
        cetakLaporanHandler
    } = ArusKasHelper();

    useEffect(() => {
        getCurrentUser();
        getDataRekening();
        getDataSandiTransaksi();
        getDataCabang();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader style={{ marginBottom: 5 }}>Arus Kas</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton size="sm" color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2 mr-2">Tambah Data</CButton>
                                <CButton size="sm" color="warning" onClick={() => setWarning(!warning)} className="mt-2">
                                    Cetak Laporan
                                </CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
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
                                                    <>
                                                        <CButton size="sm" color="success" className="ml-1" onClick={() => getDataArusKasById(item.no_bukti, 'update')}>
                                                            Update
                                                        </CButton>
                                                    </>
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
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit, view data */}
            <CModal 
                show={success} 
                onClose={() => closeModalHandler(buttonSubmitName)}
                color={color}
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6" className="mb-2">
                                <CLabel>Kas</CLabel>

                                <CFormGroup variant="custom-radio">
                                    <CInputRadio custom id="tunai" name="kas" value="0" onChange={changeHandler} />
                                    <CLabel variant="custom-checkbox" htmlFor="tunai">Tunai</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-radio">
                                    <CInputRadio custom id="bank" name="kas" value="1" onChange={changeHandler} />
                                    <CLabel variant="custom-checkbox" htmlFor="bank">Bank</CLabel>
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
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="nominal">Nominal</CLabel>
                                    <CurrencyFormat id="nominal" thousandSeparator={true} prefix={'Rp. '} customInput={CInput} name="nominal" value={input.nominal} onChange={changeHandler} placeholder="Masukkan Nominal" />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="input-transaksi">Pilih Transaksi</CLabel>
                                    <Autocomplete
                                        id="input-transaksi"
                                        clearOnEscape={true}
                                        options={sandiTransaksiOptions}
                                        getOptionSelected={(option, value) => option.sandi_transaksi === value.sandi_transaksi}
                                        getOptionLabel={option => option.sandi_transaksi}
                                        value={{ sandi_transaksi: currentSandiTransaksi.sandi_transaksi }}
                                        onChange={(event, values) => {
                                            console.log(values);
                                            if(values !== null) {
                                                setCurrentSandiTransaksi({
                                                    ...currentSandiTransaksi, sandi_transaksi: values.sandi_transaksi
                                                });

                                                setInput({
                                                    ...input, id_sandi: values.id
                                                });
                                            } else {
                                                setCurrentSandiTransaksi({
                                                    ...currentSandiTransaksi, sandi_transaksi: ''
                                                });

                                                setInput({
                                                    ...input, id_sandi: ''
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
                                    <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                    <CInput type="text" id="keterangan" name="keterangan" value={input.keterangan} onChange={changeHandler} placeholder="Masukkan Keterangan" />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler(buttonSubmitName)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* view data */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('view')}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Data Arus Kas</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadCurrentArusKas ? null :
                        <>
                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nomor-bukti">Nomor Bukti</CLabel>
                                        <CInput type="text" id="nomor-bukti" name="no_bukti" value={currentArusKas.no_bukti} onChange={changeHandler} placeholder="Nomor Bukti" disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                {currentArusKas.no_service === 0 ? null :
                                    <>
                                        <CCol xs="12" md="6">
                                            <CFormGroup>
                                                <CLabel htmlFor="nomor-service">Nomor Service</CLabel>
                                                <CInput type="text" id="nomor-service" name="no_service" value={`${kodeCabang(currentArusKas.penerimaan.cabang.nama_cabang)}${currentArusKas.no_service}`} onChange={changeHandler} placeholder="Nomor Service" disabled={true} />
                                            </CFormGroup>
                                        </CCol>
                                    </>
                                }
                            </CRow>

                            {currentArusKas.no_service === 0 ? null :
                                <CRow>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="merek-tipe">Merek Tipe</CLabel>
                                            <CInput type="text" id="merek-tipe" name="merek" value={`${currentArusKas.penerimaan.merek} ${currentArusKas.penerimaan.tipe}`} onChange={changeHandler} placeholder="Merek Tipe" disabled={true} />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="jenis">Jenis</CLabel>
                                            <CInput type="text" id="jenis" name="jenis" value={currentArusKas.penerimaan.jenis_penerimaan} onChange={changeHandler} placeholder="Jenis Penerimaan" disabled={true} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            }

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="pembayaran">Pembayaran</CLabel>
                                        <CInput type="text" id="pembayaran" name="pembayaran" value={pembayaran(currentArusKas.dp)} onChange={changeHandler} placeholder="Pembayaran" disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="kas">Kas</CLabel>
                                        <CInput type="text" id="kas" name="kas" value={kas(currentArusKas.kas)} onChange={changeHandler} placeholder="Kas" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="rekening">Rekening</CLabel>
                                        <CInput type="text" id="rekening" name="rekening" value={currentArusKas.norekening} onChange={changeHandler} placeholder="Rekening" disabled={true} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="jenis-transaksi">Jenis Transaksi</CLabel>
                                        <CInput type="text" id="jenis-transaksi" name="jenis_transaksi" value={currentArusKas.masuk === 1 ? 'Masuk' : currentArusKas.keluar === 1 ? 'Keluar' : null} onChange={changeHandler} placeholder="Jenis Transaksi" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol>
                                    <CFormGroup>
                                        <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                        <CInput type="text" id="keterangan" name="keterangan" value={currentArusKas.keterangan} onChange={changeHandler} placeholder="Rekening" disabled={true} />
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
                onClose={() => setWarning(!warning)}
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

export default ArusKas;