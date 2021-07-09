import React, { useEffect } from 'react';
import PembelianBarangSecondHelper from '../modules/PembelianBarangSecondHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';
import ModalPembelianBarangSecond from './ModalPembelianBarangSecond';
import ModalViewPembelianBarangSecond from './ModalViewPembelianBarangSecond';
import TablePembelianBarangSecond from './TablePembelianBarangSecond';

const PembelianBarangSecond = () => {
    const {
        fields,
        success, 
        info,
        dataPengajuan,
        isLoading,
        currentDataPengajuan,
        loadCurrentDataPengajuan,
        input, setInput,
        modalTitle,
        dataTeknisi,
        currentTeknisi, setCurrentTeknisi,
        details,  
        toggleDetails,
        changeHandler,
        checkboxChangeHandler,
        closeModalHandler,
        submitHandler,
        getCurrentUser,
        getDataPengajuanByNoService,
        getDataTeknisi
    } = PembelianBarangSecondHelper();

    const runFunction = () => {
        getCurrentUser();
        getDataTeknisi();
    }

    useEffect(() => {
        let mounted = true;
        runFunction();

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
                setInput={setInput}
                changeHandler={changeHandler}
                checkboxChangeHandler={checkboxChangeHandler}
                dataTeknisi={dataTeknisi}
                currentTeknisi={currentTeknisi}
                setCurrentTeknisi={setCurrentTeknisi}
                submitHandler={submitHandler}
            />

            <ModalViewPembelianBarangSecond 
                info={info}
                closeModalHandler={closeModalHandler}
                loadCurrentDataPengajuan={loadCurrentDataPengajuan}
                currentDataPengajuan={currentDataPengajuan}
                kodeCabang={kodeCabang}
                changeHandler={changeHandler}
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
                                details={details}
                                toggleDetails={toggleDetails}
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