import React, { useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';
import PenerimaanBarangPartnerHelper from '../modules/PenerimaanBarangPartnerHelper';  
import ModalPenerimaanBarang from './ModalPenerimaanBarang';
import ModalViewPenerimaanBarang from './ModalViewPenerimaanBarang';
import TablePenerimaanBarang from './TablePenerimaanBarang';

const PenerimaanBarangPartner = () => {
    const {
        fields,
        success,
        info,
        currentUser,
        dataPenerimaan,
        loadDataPenerimaan,
        dataTagihanPartner,
        currentDataPenerimaan,
        loadCurrentDataPenerimaan,
        formDisabled,
        input,
        details, setDetails,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataListPengirimanByNoService
    } = PenerimaanBarangPartnerHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    const kodeSuratJalan = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'SJ.BJB.';
            case 'Banjarmasin':
                return 'SJ.BJM.';
            case 'Landasan Ulin':
                return 'SJ.LNU.';
            default:
                return '';
        }
    }

    const kodeCabang = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'S.BJB.';
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
            <ModalPenerimaanBarang 
                success={success}
                closeModalHandler={closeModalHandler}
                changeHandler={changeHandler}
                formDisabled={formDisabled}
                input={input}
                submitHandler={submitHandler}
            />

            <ModalViewPenerimaanBarang 
                info={info}
                closeModalHandler={closeModalHandler}
                loadCurrentDataPenerimaan={loadCurrentDataPenerimaan}
                kodeSuratJalan={kodeSuratJalan}
                currentDataPenerimaan={currentDataPenerimaan}
                changeHandler={changeHandler}
                kodeCabang={kodeCabang}
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Penerimaan Barang Partner</CCardHeader>
                        <CCardBody>
                            <TablePenerimaanBarang 
                                dataPenerimaan={dataPenerimaan}
                                fields={fields}
                                loadDataPenerimaan={loadDataPenerimaan}
                                kodeSuratJalan={kodeSuratJalan}
                                currentUser={currentUser}
                                kodeCabang={kodeCabang}
                                toggleDetails={toggleDetails}
                                details={details}
                                getDataListPengirimanByNoService={getDataListPengirimanByNoService}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default PenerimaanBarangPartner;