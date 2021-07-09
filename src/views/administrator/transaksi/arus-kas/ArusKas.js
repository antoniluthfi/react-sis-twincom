import React, { useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react'
import ArusKasHelper from '../modules/ArusKasHelper';
import ModalTambahDanUpdate from './ModalTambahDanUpdate';
import ModalViewArusKas from './ModalViewArusKas';
import ModalCetakLaporan from './ModalCetakLaporan';
import TableArusKas from './TableArusKas';

const ArusKas = () => {
    const {
        fields,
        kas,
        pembayaran,
        kodeCabang,
        success, setSuccess, 
        info, 
        warning, setWarning,
        color, 
        modalTitle,
        buttonSubmitName,
        arusKas,
        isLoading,
        currentArusKas,
        loadCurrentArusKas,
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
        adminOptions,
        currentAdmin, setCurrentAdmin,
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

    const runFunction = () => {
        getCurrentUser();
        getDataRekening();
        getDataSandiTransaksi();
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
            <ModalTambahDanUpdate 
                success={success}
                closeModalHandler={closeModalHandler}
                color={color}
                modalTitle={modalTitle}
                buttonSubmitName={buttonSubmitName}
                changeHandler={changeHandler}
                rekeningVisibility={rekeningVisibility}
                input={input}
                setInput={setInput}
                loadDataRekening={loadDataRekening}
                dataRekening={dataRekening}
                sandiTransaksiOptions={sandiTransaksiOptions}
                currentSandiTransaksi={currentSandiTransaksi}
                setCurrentSandiTransaksi={setCurrentSandiTransaksi}
                adminOptions={adminOptions}
                currentAdmin={currentAdmin}
                setCurrentAdmin={setCurrentAdmin}
                submitHandler={submitHandler}
            />

            <ModalViewArusKas 
                info={info}
                closeModalHandler={closeModalHandler}
                loadCurrentArusKas={loadCurrentArusKas}
                currentArusKas={currentArusKas}
                changeHandler={changeHandler}
                kodeCabang={kodeCabang}
                pembayaran={pembayaran}
                kas={kas}
            />

            <ModalCetakLaporan 
                warning={warning}
                setWarning={setWarning}
                cetakLaporanHandler={cetakLaporanHandler}
                cetakLaporan={cetakLaporan}
                filterLebihDariSatuHari={filterLebihDariSatuHari}
                filterCabang={filterCabang}
                filterShift={filterShift}
                loadDataCabang={loadDataCabang}
                dataCabang={dataCabang}
                submitHandler={submitHandler}
            />

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
                            <TableArusKas 
                                arusKas={arusKas}
                                fields={fields}
                                isLoading={isLoading}
                                kas={kas}
                                pembayaran={pembayaran}
                                details={details}
                                toggleDetails={toggleDetails}
                                getDataArusKasById={getDataArusKasById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default ArusKas;