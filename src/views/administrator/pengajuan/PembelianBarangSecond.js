import React, { useEffect } from 'react';
import PembelianBarangSecondHelper from './modules/PembelianBarangSecondHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CInputRadio,
    CModalFooter,
    CCollapse,
    CValidFeedback
} from '@coreui/react';
import ModalTambahDanUpdate from './ModalTambahDanUpdate';
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
        input, 
        modalTitle,
        hargaBeliVisibility,
        alasanBatalVisibility,
        details, 
        toggleDetails,
        changeHandler,
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
            <ModalTambahDanUpdate 
                success={success}
                closeModalHandler={closeModalHandler}
                modalTitle={modalTitle}
                changeHandler={changeHandler}
                hargaBeliVisibility={hargaBeliVisibility}
                input={input}
                submitHandler={submitHandler}
                currentDataPengajuan={currentDataPengajuan}
                alasanBatalVisibility={alasanBatalVisibility}        
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