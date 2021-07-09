import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'fontsource-roboto';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react'
import PengembalianBarangHelper from '../modules/PengembalianBarangHelper';
import ModalViewPengembalianBarang from './ModalViewPengembalianBarang';
import ModalPengembalianBarang from './ModalPengembalianBarang';
import ModalCancel from './ModalCancel';
import ModalPelunasanPembayaran from './ModalPelunasanPembayaran';
import ModalCetakLaporan from './ModalCetakLaporan';
import TablePengembalianBarang from './TablePengembalianBarang';

const PengembalianBarang = () => {
    const {
        fields,
        kodeCabang,
        statusPembayaran,
        statusPengerjaan,
        statusPengembalian,
        stiker,
        openModalKembalikanBarang,
        openCancelModal,
        openBayarModal,
        info,
        warning, setWarning,
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
        input, 
        cetakLaporan,
        details,
        nominalVisibility,
        sandiTransaksi,
        loadSandiTransaksi,
        dataCabang,
        loadDataCabang,
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

    const runFunction = () => {
        getCurrentUser();
        getDataRekening();
        getSandiTransaksi();
        getDataCabang();
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
            <ModalViewPengembalianBarang 
                info={info}
                closeModalHandler={closeModalHandler}
                loadDataPengembalian={loadDataPengembalian}
                currentPengembalian={currentPengembalian}
                changeHandler={changeHandler}
                kodeCabang={kodeCabang}
                stiker={stiker}
                statusPembayaran={statusPembayaran}
                statusPengerjaan={statusPengerjaan}
                statusPengembalian={statusPengembalian}
            />

            <ModalPengembalianBarang 
                openModalKembalikanBarang={openModalKembalikanBarang}
                closeModalHandler={closeModalHandler}
                loadDataPengembalian={loadDataPengembalian}
                input={input}
                currentPengembalian={currentPengembalian}
                changeHandler={changeHandler}
                nominalVisibility={nominalVisibility}
                diskon={diskon}
                rekeningVisibility={rekeningVisibility}
                loadDataRekening={loadDataRekening}
                dataRekening={dataRekening}
                loadSandiTransaksi={loadSandiTransaksi}
                sandiTransaksi={sandiTransaksi}
                submitHandler={submitHandler}
            />

            <ModalPelunasanPembayaran 
                openBayarModal={openBayarModal}
                closeModalHandler={closeModalHandler}
                loadDataPengembalian={loadDataPengembalian}
                currentPengembalian={currentPengembalian}
                diskon={diskon}
                changeHandler={changeHandler}
                rekeningVisibility={rekeningVisibility}
                input={input}
                loadDataRekening={loadDataRekening}
                dataRekening={dataRekening}
                submitHandler={submitHandler}
            />

            <ModalCancel 
                openCancelModal={openCancelModal}
                closeModalHandler={closeModalHandler}
                submitHandler={submitHandler}
            />

            <ModalCetakLaporan 
                warning={warning}
                closeModalHandler={closeModalHandler}
                cetakLaporanHandler={cetakLaporanHandler}
                cetakLaporan={cetakLaporan}
                setWarning={setWarning}
                filterLebihDariSatuHari={filterLebihDariSatuHari}
                filterCabang={filterCabang}
                filterShift={filterShift}
                submitHandler={submitHandler}
                loadDataCabang={loadDataCabang}
                dataCabang={dataCabang}
            />

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
                            <TablePengembalianBarang 
                                dataPengembalian={dataPengembalian}
                                fields={fields}
                                isLoading={isLoading}
                                kodeCabang={kodeCabang}
                                statusPembayaran={statusPembayaran}
                                stiker={stiker}
                                statusPengembalian={statusPengembalian}
                                toggleDetails={toggleDetails}
                                details={details}
                                getDataPengembalianById={getDataPengembalianById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default PengembalianBarang;