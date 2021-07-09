import React from 'react';
import {
    CRow,
    CCol,
    CSelect,
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
    CTextarea
} from '@coreui/react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ModalPenerimaanBarangService = props => {
    let {
        success,
        closeModalHandler,
        color,
        loadCurrentPenerimaan,
        modalTitle,
        dataAdmin,
        currentAdmin,
        setCurrentAdmin,
        setInput,
        input,
        changeHandler,
        formDisabled,
        loadDataCabang,
        dataCabang,
        setOpenCustomerModal,
        openCustomerModal,
        autocompleteDisabled,
        customerOptions,
        currentCustomer,
        setCurrentCustomer,
        openBJModalHandler,
        bjOptions,
        currentBj,
        setCurrentBj,
        getDataMerek,
        setOpenMerekModal,
        openMerekModal,
        loadDataMerek,
        dataMerek,
        openTipeModalHandler, 
        tipeOptions,
        setOpenProblemModal,
        openProblemModal,
        problemOptions,
        currentProblem,
        setCurrentProblem,
        setOpenKondisiModal,
        openKondisiModal,
        kondisiOptions,
        currentKondisi,
        setCurrentKondisi,
        teknisiOptions, 
        currentTeknisi, 
        setCurrentTeknisi,
        setOpenKelengkapanModal,
        openKelengkapanModal,
        kelengkapanOptions,
        currentKelengkapan,
        setCurrentKelengkapan,
        sisaGaransiVisibility,
        rmaVisibility,
        loadDataRMA,
        dataRMA,
        buttonVisibility, 
        buttonSubmitName,
        submitHandler
    } = props;

    return (
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
                    <div>
                        <div className="text-center" style={{ height: 400, paddingTop: 180 }}>
                            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                                <p className="sr-only">Loading...</p>
                            </div>
                            <h6 className="text-center">Tunggu bentar yaa..</h6>
                        </div>
                    </div> : 
                    <div>
                        <CForm action="" method="post">
                            <CRow>
                                <CCol xs="12" md="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="input-admin">Pilih Admin</CLabel>
                                        <Autocomplete
                                            id="input-admin"
                                            disabled={autocompleteDisabled}
                                            clearOnEscape={true}
                                            options={dataAdmin}
                                            getOptionSelected={(option, value) => option.name === value.name}
                                            getOptionLabel={option => option.name}
                                            value={{ name: currentAdmin.name }}
                                            onChange={(event, values) => {
                                                if(values !== null) {
                                                    setCurrentAdmin({
                                                        name: values.name
                                                    });

                                                    setInput({
                                                        ...input, id_admin: values.id
                                                    });
                                                } else {
                                                    setCurrentAdmin({
                                                        name: ''
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

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="input-cabang">Pilih Cabang</CLabel>
                                        <CSelect custom name="id_cabang" id="input-cabang" value={input.id_cabang} onChange={changeHandler} disabled={formDisabled} >
                                            <option value="">Pilih Salah Satu</option>
                                            {
                                                loadDataCabang ? null :
                                                dataCabang.map(item => (
                                                    <option key={item.id} value={item.id}>{item.nama_cabang}</option>
                                                ))
                                            }
                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="12" md="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="nama-pelanggan" style={{ cursor: 'pointer' }} onClick={() => setOpenCustomerModal(!openCustomerModal)}>Nama Pelanggan + </CLabel>
                                        <Autocomplete
                                            id="nama-pelanggan"
                                            disabled={autocompleteDisabled}
                                            options={customerOptions}
                                            getOptionSelected={(option, value) => option.name === value.name}
                                            getOptionLabel={(option) => `${option.name} / ${option.nomorhp}`}
                                            value={{ name: currentCustomer.name, nomorhp: currentCustomer.nomorhp }}
                                            onChange={(event, values) => {
                                                if(values !== null) {
                                                    setCurrentCustomer({
                                                        name: values.name, 
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
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" lg="12">
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
                                                        nama_bj: value.nama_bj,
                                                        data_penting: value.form_data_penting,
                                                    });

                                                    setInput({
                                                        ...input, id_bj: value.id
                                                    });

                                                    if(value.jenis == 1) getDataMerek('jasa', value.nama_bj); 
                                                    else getDataMerek('barang', value.nama_bj);
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
                                {currentBj.merek_dan_tipe == '0' ? null :
                                    <div>                                        
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
                                    </div>
                                }
                            </CRow>

                            <CRow>
                                {currentBj.sn == '0' ? null :
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="sn">Serial Number</CLabel>
                                            <CInput type="text" id="sn" name="sn" value={input.sn} onChange={changeHandler} placeholder="Masukkan Serial Number" disabled={formDisabled} />
                                        </CFormGroup>
                                    </CCol>                                    
                                }
                                {currentBj.stiker == '0' ? null :
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="cek-stiker">Stiker Twincom</CLabel>
                                            <CSelect custom name="cek_stiker" id="cek-stiker" value={input.cek_stiker} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="0">Tidak Ada</option>
                                                <option value="1">Ada</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>                                    
                                }
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
                                        <CLabel htmlFor="input-kondisi" style={{ cursor: 'pointer' }} onClick={() => setOpenKondisiModal(!openKondisiModal)}>Kondisi Barang Secara Fisik + </CLabel>
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
                                {currentBj.data_penting == '0' ? null :
                                    <CCol xs="12" lg="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="data-penting">Data Penting</CLabel>
                                            <CSelect custom name="data_penting" id="data-penting" value={input.data_penting} onChange={changeHandler} disabled={formDisabled} >
                                                <option value="0">Tidak Ada</option>
                                                <option value="1">Ada</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>                                    
                                }

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
                                        <CLabel htmlFor="jenis-garansi">Jenis Garansi</CLabel>
                                        <CSelect custom name="jenis_garansi" id="jenis-garansi" value={input.jenis_garansi} onChange={changeHandler} disabled={formDisabled} >
                                            <option value="">Pilih Salah Satu</option>
                                            <option value="service">Garansi Service</option>
                                            <option value="purna-jual">Garansi Purna Jual</option>
                                            <option value="rma">Garansi RMA</option>
                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" md="6" className={rmaVisibility}>
                                    <CFormGroup>
                                        <CLabel htmlFor="rma">RMA</CLabel>
                                        <CSelect custom name="rma" id="rma" value={input.rma} onChange={changeHandler} disabled={formDisabled} >
                                            {loadDataRMA ? <option value="">Pilih Salah Satu</option> :
                                                <div>
                                                <option value="">Pilih Salah Satu</option>
                                                {dataRMA.map(item => (
                                                    <option key={item.id} value={item.name}>{item.name}</option>
                                                ))}     
                                                </div>                                           
                                            }
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
                    </div>
                }
            </CModalBody>
            {loadCurrentPenerimaan ? null : 
                <div>
                    <CModalFooter>
                        <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                        <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler('Not Delete')}>Cancel</CButton>
                    </CModalFooter>                    
                </div>
            }
        </CModal>
    )
}

export default ModalPenerimaanBarangService;