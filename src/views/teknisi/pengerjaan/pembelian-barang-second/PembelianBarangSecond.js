import React, { useEffect } from 'react';
import PembelianBarangSecondHelper from '../modules/PembelianBarangSecondHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'
import TablePembelianBarangSecond from './TablePembelianBarangSecond';
import ModalPembelianBarangSecond from './ModalPembelianBarangSecond';

const PembelianBarangSecond = () => {
    const {
        fields,
        success, 
        dataPengajuan,
        isLoading,
        currentDataPengajuan,
        loadCurrentDataPengajuan,
        input, 
        modalTitle,
        details,
        toggleDetails,
        changeHandler,
        checkboxChangeHandler,
        closeModalHandler,
        submitHandler,
        getCurrentUser,
        getDataPengajuanByNoService
    } = PembelianBarangSecondHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    const kodeCabang = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'S.BJB.'
            case 'Landasan Ulin':
                return 'S.LNU.';
            case 'Banjarmasin':
                return 'S.BJM.';
            default:
                return '';
        }
    }

    return (
        <div>
            <ModalPembelianBarangSecond 
                success={success}
                closeModalHandler={closeModalHandler}
                modalTitle={modalTitle}
                loadCurrentDataPengajuan={loadCurrentDataPengajuan}
                currentDataPengajuan={currentDataPengajuan}
                input={input}
                changeHandler={changeHandler}
                checkboxChangeHandler={checkboxChangeHandler}
                submitHandler={submitHandler}
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Pengajuan Pembelian Barang Second</CCardHeader>
                        <CCardBody>
                            <TablePembelianBarangSecond 
                                dataPengajuan={dataPengajuan}
                                fields={fields}
                                isLoading={isLoading}
                                kodeCabang={kodeCabang}
                                toggleDetails={toggleDetails}
                                details={details}
                                getDataPengajuanByNoService={getDataPengajuanByNoService}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default PembelianBarangSecond;