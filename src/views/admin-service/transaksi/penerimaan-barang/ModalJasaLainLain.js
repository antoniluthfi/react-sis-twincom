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

const ModalJasaLainLain = props => {
    let {
        setOpenJasaLainlainModal,
        openJasaLainlainModal,
        closeModalHandler,
        color,
        loadCurrentPenerimaan,
        modalTitle,
        setInput,
        input,
        changeHandler, 
        formDisabled,
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
        teknisiOptions,
        currentTeknisi, 
        setCurrentTeknisi, 
        setOpenKelengkapanModal,
        openKelengkapanModal,
        kelengkapanOptions,
        currentKelengkapan,
        setCurrentKelengkapan,
        buttonVisibility,
        buttonSubmitName,
        submitHandler
    } = props;

    return (
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
                                        <CLabel htmlFor="no-faktur-penjualan">No Faktur Penjualan</CLabel>
                                        <CInput type="text" id="no-faktur-penjualan" name="no_faktur_penjualan" value={input.no_faktur_penjualan} onChange={changeHandler} placeholder="Masukkan Nomor Faktur Penjualan" disabled={formDisabled}/>
                                    </CFormGroup>
                                </CCol>
                            </CRow>

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
                                                nama_bj: values.nama_bj,
                                                data_penting: values.form_data_penting
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
                    </div>
                }
            </CModalBody>
            {loadCurrentPenerimaan ? null :
                <CModalFooter>
                    <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName)}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" className={buttonVisibility} onClick={() => setOpenJasaLainlainModal(!openJasaLainlainModal)}>Cancel</CButton>
                </CModalFooter>                
            }
        </CModal>
    )   
}

export default ModalJasaLainLain;