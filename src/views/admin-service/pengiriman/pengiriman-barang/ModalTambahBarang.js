import React, { Fragment } from 'react';
import {
    CRow,
    CCol,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,  
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlusCircle, faTrash
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ModalTambahBarang = props => {
    let {
        openModalBarang,
        setOpenModalBarang,
        addBarangHandler,
        inputBarang,
        setInputBarang,
        loadDataBarangService,
        dataBarangService,
        setCurrentBarangService,
        currentBarangService,
        kodeCabang,
        getListKelengkapanByNoService,
        currentUser,
        loadCurrentKelengkapan,
        currentKelengkapan,
        barangChangeHandler,
        removeBarangHandler,
        submitHandler
    } = props;

    return (
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
    )
}

export default ModalTambahBarang;