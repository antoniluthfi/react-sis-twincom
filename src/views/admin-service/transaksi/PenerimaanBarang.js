import React, { useEffect, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PenerimaanBarangHelper from './modules/PenerimaanBarangHelper';
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
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CTextarea,
    CSpinner
} from '@coreui/react';

const PenerimaanBarang = () => {
    const { 
        getCurrentUser, 
        getDataPelanggan, 
        kodeCabang, 
        fields,
        success, setSuccess,
        openPersiapanBarangBaruModal, setOpenPersiapanBarangBaruModal,
        openJasaLainlainModal, setOpenJasaLainlainModal,
        openModalPengajuan, setOpenModalPengajuan,
        openVideoModal, setOpenVideoModal,
        openWatchVideoModal, setOpenWatchVideoModal,
        danger, setDanger,
        openCustomerModal, setOpenCustomerModal,
        openBJModal, setOpenBJModal,
        openMerekModal, setOpenMerekModal,
        openTipeModal, setOpenTipeModal,
        openProblemModal, setOpenProblemModal,
        openKondisiModal, setOpenKondisiModal,
        openKelengkapanModal, setOpenKelengkapanModal,
        color,
        isLoading,
        dataPenerimaanBarang,
        loadCurrentPenerimaan, setLoadCurrentPenerimaan,
        dataMerek,
        loadDataMerek,
        textBJ,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle, 
        fileVideo, setFileVideo,
        loadVideo,
        input, setInput,
        inputPengajuan, 
        inputCustomer,
        inputBJ, 
        inputMerek,
        inputTipe,
        inputProblem,
        inputKondisi,
        inputKelengkapan,
        details,
        currentUser,
        customerOptions, 
        currentCustomer, setCurrentCustomer,
        bjOptions, 
        currentBj, setCurrentBj,
        tipeOptions, 
        problemOptions, 
        currentProblem, setCurrentProblem,
        kondisiOptions,
        currentKondisi, setCurrentKondisi,
        teknisiOptions,
        currentTeknisi, setCurrentTeknisi,
        kelengkapanOptions,
        currentKelengkapan, setCurrentKelengkapan,
        autocompleteDisabled,
        sisaGaransiVisibility,
        playing,
        toggleDetails,
        openBJModalHandler,
        closeModalHandler,
        changeHandler,
        pengajuanChangeHandler,
        customerChangeHandler,
        bjChangeHandler,
        merekChangeHandler,
        additionalFormSubmitHandler,
        submitHandler,
        getDataPenerimaanBarangById,
        tipeChangeHandler, 
        openTipeModalHandler,
        problemChangeHandler, 
        getDataProblem,
        kondisiChangeHandler,
        getDataKondisi,
        getDataTeknisi,
        getDataKelengkapan,
        kelengkapanChangeHandler,
        jenisPenerimaanHandler,
        getDataMerek,
        startVideo,
        stopVideo,
        uploadVideo
    } = PenerimaanBarangHelper();

    const onDrop = useCallback(acceptedFiles => {
        setFileVideo(acceptedFiles[0]);
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    useEffect(() => {
        getCurrentUser();
        getDataPelanggan();
        getDataProblem();
        getDataKondisi();
        getDataTeknisi();
        getDataKelengkapan();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Penerimaan Barang</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                {currentUser.jabatan === 'sales' ? 
                                    <CButton color="success" onClick={() => jenisPenerimaanHandler('Persiapan Barang Baru')} className="ml-3 mt-2">Tambah Data</CButton>
                                    : null 
                                }
                                {currentUser.jabatan === 'admin service' ? 
                                    <>
                                    <CDropdown className="ml-3 mt-2">
                                        <CDropdownToggle color="secondary">
                                            Tambah Data
                                        </CDropdownToggle>
                                        <CDropdownMenu placement="right">
                                                <CDropdownItem onClick={() => jenisPenerimaanHandler('Penerimaan Barang Service')}>Penerimaan Barang Service</CDropdownItem>
                                                <CDropdownItem onClick={() => jenisPenerimaanHandler('Persiapan Barang Baru')}>Persiapan Barang Baru</CDropdownItem>
                                                <CDropdownItem onClick={() => jenisPenerimaanHandler('Jasa Lain-lain')}>Jasa Lain-lain</CDropdownItem>
                                                <CDropdownItem onClick={() => jenisPenerimaanHandler('Pengajuan Pembelian Barang Second')}>Pengajuan Pembelian Barang Second</CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                    </> : null
                                }
                            </CCol>
                        </CRow>
                        <CCardBody>
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
                                            {item.customer.nama}
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
                                            <>
                                                <td className="text-center">
                                                    -
                                                </td>    
                                            </>
                                            : 
                                            <>
                                                <td>
                                                    {item.merek}
                                                </td>    
                                            </>
                                    },
                                    'tipe':
                                    (item) => {
                                            return item.tipe === null ? 
                                            <>
                                                <td className="text-center">
                                                    -
                                                </td>    
                                            </>
                                            : 
                                            <>
                                                <td>
                                                    {item.tipe}
                                                </td>    
                                            </>
                                    },
                                    'sn':
                                    (item) => {
                                            return item.sn === null ? 
                                            <>
                                                <td className="text-center">
                                                    -
                                                </td>    
                                            </>
                                            : 
                                            <>
                                                <td>
                                                    {item.sn}
                                                </td>    
                                            </>
                                    },
                                    'problem':
                                    (item) => {
                                            return item.problem === null ? 
                                            <>
                                                <td className="text-center">
                                                    -
                                                </td>    
                                            </>
                                            : 
                                            <>
                                                <td>
                                                    {item.problem}
                                                </td>    
                                            </>
                                    },
                                    'kondisi':
                                    (item) => {
                                            return item.kondisi === null ? 
                                            <>
                                                <td className="text-center">
                                                    -
                                                </td>    
                                            </>
                                            : 
                                            <>
                                                <td>
                                                    {item.kondisi}
                                                </td>    
                                            </>
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
                                                    <CButton size="sm" color="info" onClick={() => {
                                                        if(item.jenis_penerimaan === 'Penerimaan Barang Service' || item.jenis_penerimaan === 'Pengajuan Pembelian Barang Second') {
                                                            setSuccess(!success);
                                                        } else if(item.jenis_penerimaan === 'Persiapan Barang Baru') {
                                                            setOpenPersiapanBarangBaruModal(!openPersiapanBarangBaruModal);
                                                        } else if(item.jenis_penerimaan === 'Jasa Lain-lain') {
                                                            setOpenJasaLainlainModal(!openJasaLainlainModal);
                                                        } 
                                                        
                                                        getDataPenerimaanBarangById(item.no_service_penerimaan, 'view');
                                                    }}>
                                                        View Details
                                                    </CButton>
                                                    <CButton size="sm" color="success" className="ml-1" onClick={() => {
                                                        if(item.jenis_penerimaan === 'Penerimaan Barang Service') {
                                                            setSuccess(!success);
                                                        } else if(item.jenis_penerimaan === 'Persiapan Barang Baru') {
                                                            setOpenPersiapanBarangBaruModal(!openPersiapanBarangBaruModal);
                                                        } else if(item.jenis_penerimaan === 'Jasa Lain-lain') {
                                                            setOpenJasaLainlainModal(!openJasaLainlainModal);
                                                        } else if(item.jenis_penerimaan === 'Pengajuan Pembelian Barang Second') {
                                                            console.log('open');
                                                            setOpenModalPengajuan(!openModalPengajuan);
                                                        }
                                                        
                                                        getDataPenerimaanBarangById(item.no_service_penerimaan, 'update');
                                                    }}>
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
                                                        <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPenerimaanBarangById(item.no_service_penerimaan, 'cancel')}>
                                                            Batalkan {item.jenis_penerimaan === 'Pengajuan Pembelian Barang Second' ? 'Pengajuan' : 'Pengerjaan'}
                                                        </CButton>                                                    
                                                    }
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => {
                                                        getDataPenerimaanBarangById(item.no_service_penerimaan, 'delete');
                                                    }}>
                                                        Delete
                                                    </CButton>
                                                    {item.jenis_penerimaan === 'Pengajuan Pembelian Barang Second' ? 
                                                        <CButton size="sm" color="primary" className="ml-1" onClick={() => getDataPenerimaanBarangById(item.no_service_penerimaan, 'update')} disabled={item.pengajuan == null ? false : item.pengajuan.pengajuan_harga != null ? true : false}>
                                                            Ajukan Pembelian Barang Second
                                                        </CButton> :
                                                        null                                               
                                                    }
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
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit, view data penerimaan barang service */}
            <CModal 
                show={success} 
                onClose={closeModalHandler}
                color={color}
                closeOnBackdrop={false}
            >
                {loadCurrentPenerimaan ? null :
                    <CModalHeader closeButton>
                        <CModalTitle>{modalTitle} Penerimaan Barang Service</CModalTitle>
                    </CModalHeader>                
                }
                <CModalBody>
                    {loadCurrentPenerimaan ? 
                        <>
                            <div class="text-center" style={{ height: 400, paddingTop: 180 }}>
                                <div class="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                                    <p class="sr-only">Loading...</p>
                                </div>
                                <h6 className="text-center">Tunggu bentar yaa..</h6>
                            </div>
                        </> : 
                        <>
                            <CForm action="" method="post">
                                <CFormGroup>
                                    <CLabel htmlFor="nama-pelanggan" style={{ cursor: 'pointer' }} onClick={() => setOpenCustomerModal(!openCustomerModal)}>Nama Pelanggan +</CLabel>
                                    <Autocomplete
                                        id="nama-pelanggan"
                                        disabled={autocompleteDisabled}
                                        options={customerOptions}
                                        getOptionSelected={(option, value) => option.nama === value.nama}
                                        getOptionLabel={(option) => `${option.nama} / ${option.nomorhp}`}
                                        value={{ nama: currentCustomer.nama, nomorhp: currentCustomer.nomorhp }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentCustomer({
                                                    nama: values.nama, 
                                                    nomorhp: values.nomorhp
                                                });

                                                setInput({
                                                    ...input, id_customer: values.id
                                                });
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>
                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="input-bj2">Pilih <span style={{ cursor: 'pointer' }} onClick={() => openBJModalHandler('Barang')}>Barang + </span></CLabel>
                                            <Autocomplete
                                                id="input-bj2"
                                                disabled={autocompleteDisabled}
                                                options={bjOptions}
                                                clearOnEscape={true}
                                                getOptionSelected={(option, value) => option.nama_bj === value.nama_bj}
                                                getOptionLabel={option => option.nama_bj}
                                                value={{nama_bj: currentBj.nama_bj}}
                                                onChange={(event, value) => {
                                                    if(value !== null) {
                                                        setCurrentBj({
                                                            ...currentBj, nama_bj: value.nama_bj
                                                        });

                                                        setInput({
                                                            ...input, id_bj: value.id
                                                        });

                                                        getDataMerek('Barang', value.nama_bj); 
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
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="input-merek" style={{ cursor: 'pointer' }} onClick={() => setOpenMerekModal(!openMerekModal)}>Pilih Merek + </CLabel>
                                            <CSelect custom name="merek" id="input-merek" value={input.merek} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="">Pilih Salah Satu</option>
                                                {
                                                    loadDataMerek ? null :
                                                    dataMerek.map(item => (
                                                        <option key={item.id} value={item.merek}>{item.merek}</option>
                                                    ))
                                                }
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="input-tipe" style={{ cursor: 'pointer' }} onClick={() => openTipeModalHandler(input.merek)}>Pilih Tipe + </CLabel>
                                            <Autocomplete
                                                id="input-tipe"
                                                disabled={autocompleteDisabled}
                                                options={tipeOptions}
                                                getOptionSelected={(option, value) => option.tipe === value.tipe}
                                                getOptionLabel={(option) => option.tipe}
                                                value={{ tipe: input.tipe }}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        setInput({
                                                            ...input, tipe: values.tipe
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
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="sn">Serial Number</CLabel>
                                            <CInput type="text" id="sn" name="sn" value={input.sn} onChange={changeHandler} placeholder="Masukkan Serial Number" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="cek-stiker">Stiker Twincom</CLabel>
                                            <CSelect custom name="cek_stiker" id="cek-stiker" value={input.cek_stiker} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="0">Belum Ada</option>
                                                <option value="1">Sudah Ada</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="12">
                                        <CFormGroup>
                                            <CLabel htmlFor="input-problem" style={{ cursor: 'pointer' }} onClick={() => setOpenProblemModal(!openProblemModal)}>Problem + </CLabel>
                                            <Autocomplete
                                                id="input-problem"
                                                disabled={autocompleteDisabled}
                                                multiple
                                                clearOnEscape={true}
                                                options={problemOptions}
                                                getOptionSelected={(option, value) => option.nama_problem === value.nama_problem}
                                                getOptionLabel={(option) => option.nama_problem}
                                                value={currentProblem}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        let data = [];
                                                        values.map(item => data.push(item.nama_problem));
                                                        setInput({
                                                            ...input, problem: data.toString()
                                                        });

                                                        let data2 = data.map(item => ({ nama_problem: item }));
                                                        setCurrentProblem(data2);
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
                                        <CFormGroup>
                                            <CLabel htmlFor="input-kondisi" style={{ cursor: 'pointer' }} onClick={() => setOpenKondisiModal(!openKondisiModal)}>Kondisi + </CLabel>
                                            <Autocomplete
                                                id="input-kondisi"
                                                disabled={autocompleteDisabled}
                                                multiple
                                                clearOnEscape={true}
                                                options={kondisiOptions}
                                                getOptionSelected={(option, value) => option.nama_kondisi === value.nama_kondisi}
                                                getOptionLabel={option => option.nama_kondisi}
                                                value={currentKondisi}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        let data = [];
                                                        values.map(item => data.push(item.nama_kondisi));

                                                        setInput({
                                                            ...input, kondisi: data.toString()
                                                        });

                                                        let data2 = data.map(item => ({ nama_kondisi: item }));
                                                        setCurrentKondisi(data2);
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
                                        <CFormGroup>
                                            <CLabel htmlFor="input-teknisi-pj">Teknisi PJ</CLabel>
                                            <Autocomplete
                                                id="input-teknisi-pj"
                                                disabled={autocompleteDisabled}
                                                multiple
                                                clearOnEscape={true}
                                                options={teknisiOptions}
                                                getOptionSelected={(option, value) => option.name === value.name}
                                                getOptionLabel={(option) => option.name}
                                                value={currentTeknisi}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        let data = [];
                                                        values.map(item => data.push(item.name));

                                                        setInput({
                                                            ...input, id_teknisi: data.toString()
                                                        });

                                                        let data2 = values.map(item => ({ name: item.name }));
                                                        setCurrentTeknisi(data2);
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
                                        <CFormGroup>
                                            <CLabel htmlFor="input-kelengkapan" style={{ cursor: 'pointer' }} onClick={() => setOpenKelengkapanModal(!openKelengkapanModal)}>Kelengkapan + </CLabel>
                                            <Autocomplete
                                                id="input-kelengkapan"
                                                disabled={autocompleteDisabled}
                                                multiple
                                                options={kelengkapanOptions}
                                                getOptionSelected={(option, value) => option.nama_kelengkapan === value.nama_kelengkapan}
                                                getOptionLabel={(option) => option.nama_kelengkapan}
                                                value={currentKelengkapan}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        let data = [];
                                                        values.map(item => data.push(item.nama_kelengkapan));

                                                        setInput({
                                                            ...input, kelengkapan: data.toString()
                                                        });

                                                        let data2 = data.map(item => ({ nama_kelengkapan: item }));
                                                        setCurrentKelengkapan(data2);
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
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="layanan">Layanan</CLabel>
                                            <CSelect custom name="layanan" id="layanan" value={input.layanan} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="0">Reguler</option>
                                                <option value="1">Prioritas</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="mulai">Mulai</CLabel>
                                            <CInput type="number" id="mulai" name="mulai" value={input.mulai} min="0" onChange={changeHandler} placeholder="Estimasi Mulai" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="sampai">Sampai</CLabel>
                                            <CInput type="number" id="sampai" name="sampai" value={input.sampai} min="0" onChange={changeHandler} placeholder="Estimasi Sampai" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="satuan">Satuan</CLabel>
                                            <CSelect custom name="satuan" id="satuan" value={input.satuan} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="Menit">Menit</option>
                                                <option value="Jam">Jam</option>
                                                <option value="Hari">Hari</option>
                                                <option value="Minggu">Minggu</option>
                                                <option value="Bulan">Bulan</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="data-penting">Data Penting</CLabel>
                                            <CSelect custom name="data_penting" id="data-penting" value={input.data_penting} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="0">Tidak Ada</option>
                                                <option value="1">Ada</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="status-garansi">Status Garansi</CLabel>
                                            <CSelect custom name="status_garansi" id="status-garansi" value={input.status_garansi} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="0">Tidak</option>
                                                <option value="1">Ya</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" md="6" className={sisaGaransiVisibility}>
                                        <CFormGroup>
                                            <CLabel htmlFor="sisa-garansi">Sisa Garansi</CLabel>
                                            <CInput type="number" id="sisa-garansi" name="sisa_garansi" value={input.sisa_garansi} min="0" onChange={changeHandler} placeholder="Masukkan Sisa Garansi (Hari)" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" md="6" className={sisaGaransiVisibility}>
                                        <CFormGroup>
                                            <CLabel htmlFor="rma">RMA</CLabel>
                                            <CSelect custom name="rma" id="rma" value={input.rma} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="">Pilih Salah Satu</option>
                                                <option value="ASC">ASC</option>
                                                <option value="EASC">EASC</option>
                                                <option value="ASP">ASP</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CLabel htmlFor="permintaan">Permintaan</CLabel>
                                        <CTextarea 
                                            name="permintaan" 
                                            id="permintaan" 
                                            rows="5"
                                            placeholder="Masukkan Permintaan" 
                                            value={input.permintaan}
                                            onChange={changeHandler}
                                            disabled={formDisabled}
                                        />
                                    </CCol>
                                    <CCol xs="12" lg="6">
                                        <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                        <CTextarea 
                                            name="keterangan" 
                                            id="keterangan" 
                                            rows="5"
                                            placeholder="Masukkan Keterangan" 
                                            value={input.keterangan}
                                            onChange={changeHandler}
                                            disabled={formDisabled}
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </>
                    }
                </CModalBody>
                {loadCurrentPenerimaan ? null :
                    <CModalFooter>
                        <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                        <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler('Not Delete')}>Cancel</CButton>
                    </CModalFooter>
                }
            </CModal>

            {/* add, edit, view data persiapan barang baru */}
            <CModal 
                show={openPersiapanBarangBaruModal} 
                onClose={closeModalHandler}
                color={color}
                closeOnBackdrop={false}
            >
                {loadCurrentPenerimaan ? null :
                    <CModalHeader closeButton>
                        <CModalTitle>{modalTitle} Persiapan Barang Baru</CModalTitle>
                    </CModalHeader>                
                }
                <CModalBody>
                    {loadCurrentPenerimaan ? 
                        <>
                            <div class="text-center" style={{ height: 400, paddingTop: 180 }}>
                                <div class="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                                    <p class="sr-only">Loading...</p>
                                </div>
                                <h6 className="text-center">Tunggu bentar yaa..</h6>
                            </div>
                        </> : 
                        <>
                            <CForm action="" method="post">
                                <CFormGroup>
                                    <CLabel htmlFor="nama-pelanggan" style={{ cursor: 'pointer' }} onClick={() => setOpenCustomerModal(!openCustomerModal)}>Nama Pelanggan + </CLabel>
                                    <Autocomplete
                                        id="nama-pelanggan"
                                        disabled={autocompleteDisabled}
                                        options={customerOptions}
                                        getOptionSelected={(option, value) => option.nama === value.nama}
                                        getOptionLabel={(option) => `${option.nama} / ${option.nomorhp}`}
                                        value={{ nama: currentCustomer.nama, nomorhp: currentCustomer.nomorhp }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentCustomer({
                                                    nama: values.nama, 
                                                    nomorhp: values.nomorhp
                                                });

                                                setInput({
                                                    ...input, id_customer: values.id
                                                });
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>
                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="input-bj">Pilih <span style={{ cursor: 'pointer' }} onClick={() => openBJModalHandler("Barang")}>Barang + </span></CLabel>
                                            <Autocomplete
                                                id="input-bj"
                                                disabled={autocompleteDisabled}
                                                options={bjOptions}
                                                getOptionSelected={(option, value) => option.nama_bj === value.nama_bj}
                                                getOptionLabel={(option) => option.nama_bj}
                                                value={{nama_bj: currentBj.nama_bj}}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        setCurrentBj({
                                                            nama_bj: values.nama_bj
                                                        });

                                                        setInput({
                                                            ...input, id_bj: values.id
                                                        });

                                                        getDataMerek('Barang', values.nama_bj); 
                                                    }                            
                                                }}
                                                renderInput={(params) => 
                                                    <TextField {...params} />
                                                }
                                            />                                
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="input-merek" style={{ cursor: 'pointer' }} onClick={() => setOpenMerekModal(!openMerekModal)}>Pilih Merek + </CLabel>
                                            <CSelect custom name="merek" id="input-merek" value={input.merek} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="">Pilih Salah Satu</option>
                                                {
                                                    loadDataMerek ? null :
                                                    dataMerek.map(item => (
                                                        <option key={item.id} value={item.merek}>{item.merek}</option>
                                                    ))
                                                }
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="input-tipe" style={{ cursor: 'pointer' }} onClick={() => openTipeModalHandler(input.merek)}>Pilih Tipe +</CLabel>
                                            <Autocomplete
                                                id="input-tipe"
                                                disabled={autocompleteDisabled}
                                                options={tipeOptions}
                                                getOptionSelected={(option, value) => option.tipe === value.tipe}
                                                getOptionLabel={(option) => option.tipe}
                                                value={{ tipe: input.tipe }}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        setInput({
                                                            ...input, tipe: values.tipe
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
                                        <CFormGroup>
                                            <CLabel htmlFor="input-teknisi-pj">Teknisi PJ</CLabel>
                                            <Autocomplete
                                                id="input-teknisi-pj"
                                                disabled={autocompleteDisabled}
                                                multiple
                                                clearOnEscape={true}
                                                options={teknisiOptions}
                                                getOptionSelected={(option, value) => option.name === value.name}
                                                getOptionLabel={(option) => option.name}
                                                value={currentTeknisi}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        let data = [];
                                                        values.map(item => data.push(item.name));

                                                        setInput({
                                                            ...input, id_teknisi: data.toString()
                                                        });

                                                        let data2 = values.map(item => ({ name: item.name }));
                                                        setCurrentTeknisi(data2);
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
                                        <CFormGroup>
                                            <CLabel htmlFor="input-kelengkapan" style={{ cursor: 'pointer' }} onClick={() => setOpenKelengkapanModal(!openKelengkapanModal)}>Kelengkapan + </CLabel>
                                            <Autocomplete
                                                id="input-kelengkapan"
                                                disabled={autocompleteDisabled}
                                                multiple
                                                options={kelengkapanOptions}
                                                getOptionSelected={(option, value) => option.nama_kelengkapan === value.nama_kelengkapan}
                                                getOptionLabel={(option) => option.nama_kelengkapan}
                                                value={currentKelengkapan}
                                                onChange={(event, values) => {
                                                    if(values !== null) {
                                                        let data = [];
                                                        values.map(item => data.push(item.nama_kelengkapan));

                                                        setInput({
                                                            ...input, kelengkapan: data.toString()
                                                        });

                                                        let data2 = data.map(item => ({ nama_kelengkapan: item }));
                                                        setCurrentKelengkapan(data2);
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
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="mulai">Mulai</CLabel>
                                            <CInput type="number" id="mulai" name="mulai" value={input.mulai} min="0" onChange={changeHandler} placeholder="Estimasi Mulai" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="sampai">Sampai</CLabel>
                                            <CInput type="number" id="sampai" name="sampai" value={input.sampai} min="0" onChange={changeHandler} placeholder="Estimasi Sampai" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="satuan">Satuan</CLabel>
                                            <CSelect custom name="satuan" id="satuan" value={input.satuan} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="Menit">Menit</option>
                                                <option value="Jam">Jam</option>
                                                <option value="Hari">Hari</option>
                                                <option value="Minggu">Minggu</option>
                                                <option value="Bulan">Bulan</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CLabel htmlFor="permintaan">Permintaan</CLabel>
                                        <CTextarea 
                                            name="permintaan" 
                                            id="permintaan" 
                                            rows="5"
                                            placeholder="Masukkan Permintaan" 
                                            value={input.permintaan}
                                            onChange={changeHandler}
                                            disabled={formDisabled}
                                        />
                                    </CCol>
                                    <CCol xs="12" lg="6">
                                        <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                        <CTextarea 
                                            name="keterangan" 
                                            id="keterangan" 
                                            rows="5"
                                            placeholder="Masukkan Keterangan" 
                                            value={input.keterangan}
                                            onChange={changeHandler}
                                            disabled={formDisabled}
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </>
                    }
                </CModalBody>
                {loadCurrentPenerimaan ? null :
                    <CModalFooter>
                        <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                        <CButton color="secondary" className={buttonVisibility} onClick={() => setOpenPersiapanBarangBaruModal(!openPersiapanBarangBaruModal)}>Cancel</CButton>
                    </CModalFooter>                
                }
            </CModal>

            {/* add, edit, view jasa lain-lain */}
            <CModal 
                show={openJasaLainlainModal} 
                onClose={closeModalHandler}
                color={color}
                closeOnBackdrop={false}
            >
                {loadCurrentPenerimaan ? null :
                    <CModalHeader closeButton>
                        <CModalTitle>{modalTitle} Jasa Lain-lain</CModalTitle>
                    </CModalHeader>                
                }
                <CModalBody>
                    {loadCurrentPenerimaan ? 
                        <>
                            <div class="text-center" style={{ height: 400, paddingTop: 180 }}>
                                <div class="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                                    <p class="sr-only">Loading...</p>
                                </div>
                                <h6 className="text-center">Tunggu bentar yaa..</h6>
                            </div>
                        </> : 
                        <>
                            <CForm action="" method="post">
                                <CFormGroup>
                                    <CLabel htmlFor="nama-pelanggan" style={{ cursor: 'pointer' }} onClick={() => setOpenCustomerModal(!openCustomerModal)}>Nama Pelanggan + </CLabel>
                                    <Autocomplete
                                        id="nama-pelanggan"
                                        disabled={autocompleteDisabled}
                                        options={customerOptions}
                                        getOptionSelected={(option, value) => option.nama === value.nama}
                                        getOptionLabel={(option) => `${option.nama} / ${option.nomorhp}`}
                                        value={{ nama: currentCustomer.nama, nomorhp: currentCustomer.nomorhp }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentCustomer({
                                                    nama: values.nama, 
                                                    nomorhp: values.nomorhp
                                                });

                                                setInput({
                                                    ...input, id_customer: values.id
                                                });
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>

                                <CFormGroup>
                                    <CLabel htmlFor="input-bj">Pilih <span style={{ cursor: 'pointer' }} onClick={() => openBJModalHandler("Jasa")}>Jasa + </span></CLabel>
                                    <Autocomplete
                                        id="input-bj"
                                        disabled={autocompleteDisabled}
                                        options={bjOptions}
                                        getOptionSelected={(option, value) => option.nama_bj === value.nama_bj}
                                        getOptionLabel={(option) => option.nama_bj}
                                        value={{nama_bj: currentBj.nama_bj}}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentBj({
                                                    nama_bj: values.nama_bj
                                                });

                                                setInput({
                                                    ...input, id_bj: values.id
                                                });
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>

                                <CFormGroup>
                                    <CLabel htmlFor="input-teknisi-pj">Teknisi PJ</CLabel>
                                    <Autocomplete
                                        id="input-teknisi-pj"
                                        disabled={autocompleteDisabled}
                                        multiple
                                        clearOnEscape={true}
                                        options={teknisiOptions}
                                        getOptionSelected={(option, value) => option.name === value.name}
                                        getOptionLabel={(option) => option.name}
                                        value={currentTeknisi}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                let data = [];
                                                values.map(item => data.push(item.name));

                                                setInput({
                                                    ...input, id_teknisi: data.toString()
                                                });

                                                let data2 = values.map(item => ({ name: item.name }));
                                                setCurrentTeknisi(data2);
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>

                                <CFormGroup>
                                    <CLabel htmlFor="input-kelengkapan" style={{ cursor: 'pointer' }} onClick={() => setOpenKelengkapanModal(!openKelengkapanModal)}>Kelengkapan + </CLabel>
                                    <Autocomplete
                                        id="input-kelengkapan"
                                        disabled={autocompleteDisabled}
                                        multiple
                                        options={kelengkapanOptions}
                                        getOptionSelected={(option, value) => option.nama_kelengkapan === value.nama_kelengkapan}
                                        getOptionLabel={(option) => option.nama_kelengkapan}
                                        value={currentKelengkapan}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                let data = [];
                                                values.map(item => data.push(item.nama_kelengkapan));

                                                setInput({
                                                    ...input, kelengkapan: data.toString()
                                                });

                                                let data2 = data.map(item => ({ nama_kelengkapan: item }));
                                                setCurrentKelengkapan(data2);
                                            }                            
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="layanan">Layanan</CLabel>
                                            <CSelect custom name="layanan" id="layanan" value={input.layanan} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="0">Reguler</option>
                                                <option value="1">Prioritas</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="mulai">Mulai</CLabel>
                                            <CInput type="number" id="mulai" name="mulai" value={input.mulai} min="0" onChange={changeHandler} placeholder="Estimasi Mulai" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="sampai">Sampai</CLabel>
                                            <CInput type="number" id="sampai" name="sampai" value={input.sampai} min="0" onChange={changeHandler} placeholder="Estimasi Sampai" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="satuan">Satuan</CLabel>
                                            <CSelect custom name="satuan" id="satuan" value={input.satuan} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="Menit">Menit</option>
                                                <option value="Jam">Jam</option>
                                                <option value="Hari">Hari</option>
                                                <option value="Minggu">Minggu</option>
                                                <option value="Bulan">Bulan</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" lg="6">
                                        <CLabel htmlFor="permintaan">Permintaan</CLabel>
                                        <CTextarea 
                                            name="permintaan" 
                                            id="permintaan" 
                                            rows="5"
                                            placeholder="Masukkan Permintaan" 
                                            value={input.permintaan}
                                            onChange={changeHandler}
                                            disabled={formDisabled}
                                        />
                                    </CCol>
                                    <CCol xs="12" lg="6">
                                        <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                        <CTextarea 
                                            name="keterangan" 
                                            id="keterangan" 
                                            rows="5"
                                            placeholder="Masukkan Keterangan" 
                                            value={input.keterangan}
                                            onChange={changeHandler}
                                            disabled={formDisabled}
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </>
                    }
                </CModalBody>
                {loadCurrentPenerimaan ? null :
                    <CModalFooter>
                        <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                        <CButton color="secondary" className={buttonVisibility} onClick={() => setOpenJasaLainlainModal(!openJasaLainlainModal)}>Cancel</CButton>
                    </CModalFooter>                
                }
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

            {/* customer modal */}
            <CModal 
                show={openCustomerModal} 
                onClose={() => setOpenCustomerModal(!openCustomerModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data Pelanggan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="nama">Nama</CLabel>
                            <CInput type="text" id="nama" name="nama" value={inputCustomer.nama} onChange={customerChangeHandler} placeholder="Masukkan Nama" disabled={formDisabled} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="alamat">Alamat</CLabel>
                            <CInput type="text" id="alamat" name="alamat" value={inputCustomer.alamat} onChange={customerChangeHandler} placeholder="Masukkan Alamat" disabled={formDisabled} />
                        </CFormGroup>

                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="email">Email</CLabel>
                                    <CInput type="email" id="email" name="email" value={inputCustomer.email} onChange={customerChangeHandler} placeholder="Masukkan Email" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                    <CInput type="text" id="nomorhp" name="nomorhp" value={inputCustomer.nomorhp} onChange={customerChangeHandler} placeholder="Masukkan Nomor HP" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="segmen">Segmen</CLabel>
                                    <CSelect custom name="segmen" id="segmen" value={inputCustomer.segmen} onChange={customerChangeHandler} disabled={formDisabled} >
                                        <option value="user">User</option>
                                        <option value="reseller">Reseller</option>
                                        <option value="special">Special</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="status-akun">Status Akun</CLabel>
                                    <CSelect custom name="status_akun" id="status-akun" value={inputCustomer.status_akun} onChange={customerChangeHandler} disabled={formDisabled} >
                                        <option value="0">Tidak Aktif</option>
                                        <option value="1">Aktif</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => additionalFormSubmitHandler('pelanggan')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setOpenCustomerModal(!openCustomerModal)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* Barang jasa */}
            <CModal 
                show={openBJModal} 
                onClose={() => setOpenBJModal(!openBJModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data {textBJ}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="nama-bj">Nama {textBJ}</CLabel>
                            <CInput type="text" id="nama-bj" name="nama_bj" value={inputBJ.nama_bj} onChange={bjChangeHandler} placeholder={`Masukkan Nama ${textBJ}`} disabled={formDisabled} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="form-data-penting">Form Data Penting</CLabel>
                            <CSelect custom name="form_data_penting" id="form-data-penting" value={inputBJ.form_data_penting} onChange={bjChangeHandler} disabled={formDisabled} >
                                <option value="0">Sembunyikan</option>
                                <option value="1">Tampilkan</option>
                            </CSelect>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" className={buttonVisibility} onClick={() => additionalFormSubmitHandler('bj')}>Submit</CButton>{' '}
                    <CButton color="secondary" className={buttonVisibility} onClick={() => setOpenBJModal(!openBJModal)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* Merek Modal */}
            <CModal 
                show={openMerekModal} 
                onClose={() => setOpenMerekModal(!openMerekModal)}
                color="primary"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data Merek</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="nama-merek">Nama Merek</CLabel>
                            <CInput type="text" id="nama-merek" name="merek" value={inputMerek.merek} onChange={merekChangeHandler} placeholder="Masukkan Nama Merek" disabled={formDisabled} />
                        </CFormGroup>
                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-pc">Input PC</CLabel>
                                    <CSelect custom name="pc" id="input-pc" value={inputMerek.pc} onChange={merekChangeHandler} disabled={formDisabled} >
                                        <option value="0">Sembunyikan</option>
                                        <option value="1">Tampilkan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-laptop">Input Laptop</CLabel>
                                    <CSelect custom name="laptop" id="input-laptop" value={inputMerek.laptop} onChange={merekChangeHandler} disabled={formDisabled} >
                                        <option value="0">Sembunyikan</option>
                                        <option value="1">Tampilkan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-cctv">Input CCTV</CLabel>
                                    <CSelect custom name="cctv" id="input-cctv" value={inputMerek.cctv} onChange={merekChangeHandler} disabled={formDisabled} >
                                        <option value="0">Sembunyikan</option>
                                        <option value="1">Tampilkan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-printer">Input Printer</CLabel>
                                    <CSelect custom name="printer" id="input-printer" value={inputMerek.printer} onChange={merekChangeHandler} disabled={formDisabled} >
                                        <option value="0">Sembunyikan</option>
                                        <option value="1">Tampilkan</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => additionalFormSubmitHandler('merek')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setOpenMerekModal(!openMerekModal)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* Tipe modal */}
            <CModal 
                show={openTipeModal} 
                onClose={() => setOpenTipeModal(!openTipeModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data Tipe</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="nama-tipe">Nama Tipe</CLabel>
                            <CInput type="text" id="nama-tipe" name="tipe" value={inputTipe.tipe} onChange={tipeChangeHandler} placeholder="Masukkan Nama Merek" disabled={formDisabled} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="kategori">Kategori</CLabel>
                            <CSelect custom name="kategori" id="kategori" value={inputTipe.kategori} onChange={tipeChangeHandler} disabled={formDisabled} >
                                <option value="Laptop">Laptop</option>
                                <option value="PC">PC</option>
                                <option value="Printer">Printer</option>
                                <option value="CCTV">CCTV</option>
                            </CSelect>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => additionalFormSubmitHandler('tipe')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setOpenTipeModal(!openTipeModal)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* Problem Modal */}
            <CModal 
                show={openProblemModal} 
                onClose={() => setOpenProblemModal(!openProblemModal)}
                color="primary"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data Problem / Request</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="nama-problem">Nama Problem / Request</CLabel>
                            <CInput type="text" id="nama-problem" name="nama_problem" value={inputProblem.nama_problem} onChange={problemChangeHandler} placeholder="Masukkan Nama Problem" disabled={formDisabled} />
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => additionalFormSubmitHandler('problem')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setOpenProblemModal(!openProblemModal)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CModal 
                show={openKondisiModal} 
                onClose={() => setOpenKondisiModal(!openKondisiModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data Kondisi</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="nama-kondisi">Nama Kondisi</CLabel>
                            <CInput type="text" id="nama-kondisi" name="nama_kondisi" value={inputKondisi.nama_kondisi} onChange={kondisiChangeHandler} placeholder="Masukkan Nama Kondisi" disabled={formDisabled} />
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => additionalFormSubmitHandler('kondisi')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setOpenKondisiModal(!openKondisiModal)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* Kelengkapan modal */}
            <CModal 
                show={openKelengkapanModal} 
                onClose={() => setOpenKelengkapanModal(!openKelengkapanModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Tambah Data Kelengkapan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CFormGroup>
                            <CLabel htmlFor="nama-kelengkapan">Nama Kelengkapan</CLabel>
                            <CInput type="text" id="nama-kelengkapan" name="nama_kelengkapan" value={inputKelengkapan.nama_kelengkapan} onChange={kelengkapanChangeHandler} placeholder="Masukkan Nama Kondisi" disabled={formDisabled} />
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => additionalFormSubmitHandler('kelengkapan')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setOpenKelengkapanModal(!openKelengkapanModal)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* Pengajuan modal */}
            <CModal 
                show={openModalPengajuan} 
                onClose={() => setOpenModalPengajuan(!openModalPengajuan)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Pengajuan Pembelian Barang Second</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nama-toko">Nama Toko Asal</CLabel>
                                    <CInput type="text" id="nama-toko" name="nama_toko_asal" value={inputPengajuan.nama_toko_asal} onChange={pengajuanChangeHandler} placeholder="Masukkan Nama Toko" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="tanggal-pembelian">Tanggal Pembelian</CLabel>
                                    <CInput type="date" id="tanggal-pembelian" name="tanggal_pembelian" value={inputPengajuan.tanggal_pembelian} onChange={pengajuanChangeHandler} placeholder="Masukkan Tanggal Pembelian" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="harga-awal-beli">Harga Awal Beli</CLabel>
                                    <CInput type="number" id="harga-awal-beli" name="harga_beli" value={inputPengajuan.harga_beli} onChange={pengajuanChangeHandler} placeholder="Masukkan Harga Awal Beli" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="lama-pemakaian">Lama Pemakaian</CLabel>
                                    <CInput type="text" id="lama-pemakaian" name="lama_pemakaian" value={inputPengajuan.lama_pemakaian} onChange={pengajuanChangeHandler} placeholder="Masukkan Lama Pemakaian" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="segel-distri">Segel Distri</CLabel>
                                    <CInput type="date" id="segel-distri" name="segel_distri" value={inputPengajuan.segel_distri} onChange={pengajuanChangeHandler} placeholder="Masukkan Tanggal Pembelian" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="pengajuan-harga">Harga Yang Diajukan</CLabel>
                                    <CInput type="number" id="pengajuan-harga" name="pengajuan_harga" value={inputPengajuan.pengajuan_harga} onChange={pengajuanChangeHandler} placeholder="Masukkan Pengajuan Harga" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="alasan-menjual">Alasan Menjual</CLabel>
                                    <CInput type="text" id="alasan-menjual" name="alasan_menjual" value={inputPengajuan.alasan_menjual} onChange={pengajuanChangeHandler} placeholder="Masukkan Alasan Menjual" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                    <CInput type="text" id="keterangan" name="keterangan" value={inputPengajuan.keterangan} onChange={pengajuanChangeHandler} placeholder="Masukkan Keterangan" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="kode-jual">Kode Jual</CLabel>
                                    <CSelect custom name="kode_jual" id="kode-jual" value={inputPengajuan.kode_jual} onChange={pengajuanChangeHandler} disabled={formDisabled} >
                                        <option value="0">Tukar Tambah</option>
                                        <option value="1">Jual Saja</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => additionalFormSubmitHandler('pengajuan')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setOpenModalPengajuan(!openModalPengajuan)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* video modal */}
            <CModal 
                show={openVideoModal} 
                onClose={() => {
                    setOpenVideoModal(!openVideoModal);
                    setLoadCurrentPenerimaan(true);
                }}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Record Video</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadVideo ? 
                        <>
                            <div class="text-center" style={{ height: 400, paddingTop: 180 }}>
                                <div class="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <h6 className="text-center">Tunggu bentar yaa..</h6>
                            </div>
                        </> :
                        <>
                            <CRow>
                                <CCol xs="12" md="12">
                                    <audio id="player" controls className="d-none"></audio>
                                    <video
                                        height="50%"
                                        width="100%"
                                        autoPlay
                                        id="show-video"
                                    ></video>
                                    <video
                                        height="50%"
                                        width="100%"
                                        autoPlay
                                        id="prev-video"
                                        controls
                                    ></video>
                                </CCol>
                            </CRow>
                            <CRow className="mt-3">
                                <CCol xs="12" md="12">
                                    {playing ? 
                                        <CButton sm color="danger" className="text-center mr-1" onClick={stopVideo}>Stop</CButton> :
                                        <CButton sm color="info" className="text-center mr-1" onClick={startVideo}>Start</CButton>
                                    }
                                    <CSelect size="md" id="audioOptions" className="d-inline mr-1" style={{ width: 100 }}></CSelect>
                                    <CSelect size="md" id="cameraOptions" className="d-inline mr-1" style={{ width: 100 }}></CSelect>
                                    <a className="btn btn-info" id="btn-download">Download</a>

                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                            <p>Drop the files here ...</p> :
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                        }
                                    </div>
                                    <CButton sm color="success" onClick={uploadVideo}>Upload</CButton>
                                </CCol>                        
                            </CRow>
                        </>
                    }
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* watch video modal */}
            <CModal 
                show={openWatchVideoModal} 
                onClose={() => setOpenWatchVideoModal(!openWatchVideoModal)}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Watch Video</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="12">
                            <video
                                height="100%"
                                width="100%"
                                id="watch-video"
                                controls
                                autoPlay
                            ></video>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>
        </>
    )
}

export default PenerimaanBarang;