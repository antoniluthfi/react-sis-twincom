import React, { useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react'
import PembayaranHelper from './modules/PembayaranHelper';
import ModalViewPembayaran from './ModalViewPembayaran';
import ModalPembayaran from './ModalPembayaran';
import ModalPelunasanPembayaran from './ModalPelunasanPembayaran';
import ModalCetakLaporanPembayaran from './ModalCetakLaporanPembayaran';
import TablePembayaran from './TablePembayaran';

const Pembayaran = () => {
    const {
        fields,
        kodeCabang,
        success, setSuccess,
        info, 
        warning, setWarning,
        openLunasModal,
        dataPembayaran, 
        isLoading,
        currentPembayaran,
        loadDataPembayaran,
        details,
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

    const runFunction = () => {
        getCurrentUser();
        getSandiTransaksi();
        getDataRekening();
        getDataCabang();
    }

    useEffect(() => {
        let mounted = true;
        runFunction();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    const diskon = (harga_awal, diskon) => {
        let harga;
        let newDiskon = diskon.replace(/[^0-9]+/g, "");
        if(diskon.includes('Rp')) {
            harga = harga_awal - parseInt(newDiskon);
        } else if(diskon.includes('%')) {
            harga = harga_awal - (harga_awal * parseInt(newDiskon) / 100);
        }

        return harga;
    }

    return (
        <div>
            {/* view data */}
            <ModalViewPembayaran 
                info={info}
                closeModalHandler={changeHandler}
                loadDataPembayaran={loadDataPembayaran}
                currentPembayaran={currentPembayaran}
                kodeCabang={kodeCabang}
            />

            {/* bayar */}
            <ModalPembayaran 
                success={success}
                closeModalHandler={closeModalHandler}
                loadDataPembayaran={loadDataPembayaran}
                currentPembayaran={currentPembayaran}
                input={input}
                setInput={setInput}
                adminOptions={adminOptions}
                currentAdmin={currentAdmin}
                setCurrentAdmin={setCurrentAdmin}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
                diskon={diskon}
                nominalVisibility={nominalVisibility}
                rekeningVisibility={rekeningVisibility}
                loadDataRekening={loadDataRekening}
                dataRekening={dataRekening}
                loadSandiTransaksi={loadSandiTransaksi}
                sandiTransaksi={sandiTransaksi}
            />

            {/* pelunasan pembayaran */}
            <ModalPelunasanPembayaran 
                openLunasModal={openLunasModal}
                closeModalHandler={closeModalHandler}
                changeHandler={changeHandler}
                rekeningVisibility={rekeningVisibility}
                input={input}
                loadDataRekening={loadDataRekening}
                dataRekening={dataRekening}
                adminOptions={adminOptions}
                currentAdmin={currentAdmin}
                setCurrentAdmin={setCurrentAdmin}
                setInput={setInput}
                submitHandler={submitHandler}
            />

            {/* cetak laporan */}
            <ModalCetakLaporanPembayaran 
                warning={warning}
                closeModalHandler={closeModalHandler}
                cetakLaporanHandler={cetakLaporanHandler}
                cetakLaporan={cetakLaporan}
                loadDataCabang={loadDataCabang}
                dataCabang={dataCabang}
                submitHandler={submitHandler}
                setWarning={setWarning}
                filterLebihDariSatuHari={filterLebihDariSatuHari}
                filterCabang={filterCabang}
                filterShift={filterShift}        
            />

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
                            <TablePembayaran 
                                dataPembayaran={dataPembayaran}
                                fields={fields}
                                isLoading={isLoading}
                                kodeCabang={kodeCabang}
                                details={details}
                                toggleDetails={toggleDetails}
                                getDataPembayaranById={getDataPembayaranById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default Pembayaran;