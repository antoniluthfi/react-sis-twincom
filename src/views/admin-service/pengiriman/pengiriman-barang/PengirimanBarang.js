import React, { useEffect, useState, Fragment } from 'react';
import PengirimanBarangHelper from '../modules/PengirimanBarangHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react';  
import ModalPengirimanBarang from './ModalPengirimanBarang';
import ModalViewPengiriman from './ModalViewPengiriman';
import ModalTambahBarang from './ModalTambahBarang';
import TablePengirimanBarang from './TablePengirimanBarang';

const PengirimanBarang = () => {
    const {
        fields,
        kodeSuratJalan,
        kodeCabang,
        success, setSuccess,
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
        details, 
        currentUser,
        currentPengiriman,
        loadCurrentPengiriman,
        dataBarangService,
        loadDataBarangService,
        dataPartner,
        currentPartner, setCurrentPartner,
        dataTeknisi,
        currentPengirim, setCurrentPengirim,
        currentPengantar, setCurrentPengantar,
        currentBarangService, setCurrentBarangService,
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

    const runFunction = () => {
        getCurrentUser();
        getDataPartner();
        getDataTeknisi();
    }
    
    useEffect(() => {
        let mounted = true;
        runFunction();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <ModalPengirimanBarang 
                success={success}
                closeModalHandler={closeModalHandler}
                color={color}
                modalTitle={modalTitle}
                dataPartner={dataPartner}
                currentPartner={currentPartner}
                setCurrentPartner={setCurrentPartner}
                input={input}
                setInput={setInput}
                dataTeknisi={dataTeknisi}
                currentPengirim={currentPengirim}
                setCurrentPengirim={setCurrentPengirim}
                currentPengantar={currentPengantar}
                setCurrentPengantar={setCurrentPengantar}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
                buttonSubmitName={buttonSubmitName}
            />

            <ModalViewPengiriman 
                info={info}
                closeModalHandler={closeModalHandler}
                loadCurrentPengiriman={loadCurrentKelengkapan}
                kodeSuratJalan={kodeSuratJalan}
                currentPengiriman={currentPengiriman}
                changeHandler={changeHandler}
                loadDataListPengiriman={loadDataListPengiriman}
                dataListPengiriman={dataListPengiriman}
                kodeCabang={kodeCabang}
            />

            <ModalTambahBarang 
                openModalBarang={openModalBarang}
                setOpenModalBarang={setOpenModalBarang}
                addBarangHandler={addBarangHandler}
                inputBarang={inputBarang}
                setInputBarang={setInputBarang}
                loadDataBarangService={loadDataBarangService}
                dataBarangService={dataBarangService}
                setCurrentBarangService={setCurrentBarangService}
                currentBarangService={currentBarangService}
                kodeCabang={kodeCabang}
                getListKelengkapanByNoService={getListKelengkapanByNoService}
                currentUser={currentUser}
                loadCurrentKelengkapan={loadCurrentKelengkapan}
                currentKelengkapan={currentKelengkapan}
                barangChangeHandler={barangChangeHandler}
                removeBarangHandler={removeBarangHandler}
                submitHandler={submitHandler}
            />

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
                            <TablePengirimanBarang 
                                dataPengiriman={dataPengiriman}
                                fields={fields}
                                isLoading={isLoading}
                                kodeSuratJalan={kodeSuratJalan}
                                toggleDetails={toggleDetails}
                                details={details}
                                getDataPengirimanBarangById={getDataPengirimanBarangById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default PengirimanBarang;