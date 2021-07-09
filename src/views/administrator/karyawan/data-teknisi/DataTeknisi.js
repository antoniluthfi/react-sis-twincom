import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import DataTeknisiHelper from './modules/DataTeknisiHelper';
import ModalTeknisi from './modules/ModalTeknisi';
import TableTeknisi from './modules/TableTeknisi';

const DataTeknisi = () => {
    const {
        statusAkun,
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataTeknisi, setDataTeknisi,
        loadDataCabang, setLoadDataCabang,
        dataCabang, setDataCabang,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getDataTeknisi,
        getDataTeknisiById,
        getDataCabang,
    } = DataTeknisiHelper();


    useEffect(() => {
        getDataTeknisi();
        getDataCabang();

        return () => {
            setDataTeknisi([]);
            setDataCabang([]);
            setLoadDataCabang(true);
        }
    }, []);

    return (
        <div>
            <ModalTeknisi
                success={success}
                closeModalHandler={closeModalHandler}
                buttonSubmitName={buttonSubmitName}
                color={color}
                modalTitle={modalTitle}
                input={input}
                changeHandler={changeHandler}
                formDisabled={formDisabled}
                buttonVisibility={buttonVisibility}
                submitHandler={submitHandler}
                loadDataCabang={loadDataCabang}
                dataCabang={dataCabang}
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Teknisi</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableTeknisi
                                dataTeknisi={dataTeknisi}
                                fields={fields}
                                isLoading={isLoading}
                                statusAkun={statusAkun}
                                details={details}
                                toggleDetails={toggleDetails}
                                currentUser={currentUser}
                                getDataTeknisiById={getDataTeknisiById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataTeknisi;