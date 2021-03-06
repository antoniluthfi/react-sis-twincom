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

const ModalPersiapanBarangBaru = props => {
    let {
        setOpenPersiapanBarangBaruModal,
        openPersiapanBarangBaruModal,
        closeModalHandler,
        color,
        loadCurrentPenerimaan,
        modalTitle,
        dataSales,
        currentAdmin,
        setCurrentAdmin,
        setInput,
        input,
        setOpenMerekModal,
        openMerekModal,
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
        loadDataMerek,
        dataMerek,
        openTipeModalHandler,
        tipeOptions,
        teknisiOptions,
        setCurrentTeknisi,
        currentTeknisi,
        setOpenKelengkapanModal,
        openKelengkapanModal,
        kelengkapanOptions,
        currentKelengkapan,
        setCurrentKelengkapan,
        buttonVisibility,
        buttonSubmitName,
        submitHandler,
        noFakturVisibility,
        rmaVisibility,
        loadDataRMA,
        dataRMA
    } = props;

    return (
        <CModal 
            show={openPersiapanBarangBaruModal} 
            onClose={closeModalHandler}
            color={color}
            closeOnBackdrop={false}
        >
            {loadCurrentPenerimaan ? null :
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle} Persiapan Barang & QC</CModalTitle>
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
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="input-admin">Pilih Sales</CLabel>
                                        <Autocomplete
                                            id="input-admin"
                                            clearOnEscape={true}
                                            options={dataSales}
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

                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="input-cabang" style={{ cursor: 'pointer' }} onClick={() => setOpenMerekModal(!openMerekModal)}>Pilih Cabang</CLabel>
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
                                                        nama_bj: values.nama_bj,
                                                        data_penting: values.form_data_penting
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

                                <CCol xs="12" md="6">
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
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6" className={noFakturVisibility}>
                                    <CFormGroup>
                                        <CLabel htmlFor="no_faktur">Nomor Faktur Penjualan</CLabel>
                                        <CInput type="text" id="no_faktur" name="no_faktur" value={input.no_faktur} onChange={changeHandler} placeholder="Nomor Faktur Penjualan" disabled={formDisabled} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6" className={noFakturVisibility}>
                                    <CFormGroup>
                                        <CLabel htmlFor="tgl_faktur">Tanggal Faktur</CLabel>
                                        <CInput type="date" id="tgl_faktur" name="tgl_faktur" value={input.tgl_faktur} onChange={changeHandler} placeholder="Tanggal Faktur Penjualan" disabled={formDisabled} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="6" className={noFakturVisibility}>
                                    <CFormGroup>
                                        <CLabel htmlFor="tgl_segel_toko">Tanggal Segel Toko</CLabel>
                                        <CInput type="date" id="tgl_segel_toko" name="tgl_segel_toko" value={input.tgl_segel_toko} onChange={changeHandler} placeholder="Tanggal Segel Toko" disabled={formDisabled} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="12" md="6" className={noFakturVisibility}>
                                    <CFormGroup>
                                        <CLabel htmlFor="ketentuan">Ketentuan</CLabel>
                                        <CInput type="text" id="ketentuan" name="ketentuan" value={input.ketentuan} onChange={changeHandler} placeholder="Ketentuan" disabled={formDisabled} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
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
                <CModalFooter>
                    <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" className={buttonVisibility} onClick={() => setOpenPersiapanBarangBaruModal(!openPersiapanBarangBaruModal)}>Cancel</CButton>
                </CModalFooter>
            }
        </CModal>
    )
}

export default ModalPersiapanBarangBaru;