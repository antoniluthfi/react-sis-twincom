import React, { useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import DataTipeHelper from '../modules/DataTipeHelper';
import ModalTipe from './ModalTipe';
import TableTipe from './TableTipe';

const DataTipe = () => {
    const {
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataTipe,
        dataMerek,
        loadDataMerek,
        dataBjBarang,
        loadDataBjBarang,
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
        getCurrentUser,
        getDataTipeById,
        getDataMerek,
        getDataBjBarang
    } = DataTipeHelper();

    const runFunction = () => {
        getCurrentUser();
        getDataMerek();
        getDataBjBarang();
    }

    useEffect(() => {
        let mounted = true
        runFunction();

        return function cleanup() {
            mounted = false
        }
    }, []);

    return (
        <div>
            <ModalTipe
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
                loadDataMerek={loadDataMerek}
                dataMerek={dataMerek}
                loadDataBjBarang={loadDataBjBarang}
                dataBjBarang={dataBjBarang}
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Tipe</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableTipe 
                                dataTipe={dataTipe}
                                fields={fields}
                                isLoading={isLoading}
                                details={details}
                                toggleDetails={toggleDetails}
                                currentUser={currentUser}
                                getDataTipeById={getDataTipeById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataTipe;