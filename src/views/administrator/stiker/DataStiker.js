import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import DataStikerHelper from './modules/DataStikerHelper';
import ModalStiker from './ModalStiker';
import TableStiker from './TableStiker';

const DataStiker= () => {    
    const {
        fields,
        input,
        success,
        details,
        toggleDetails,
        successToggle,
        changeHandler, 
        submitHandler,
        closeModalHandler,
        currentUser,
        dataStiker,
        isLoading,
        dataCabang,
        loadDataCabang,
        buttonSubmitName,
        buttonVisibility,
        color,
        formDisabled,
        modalTitle,
        getCurrentUser,
        getDataStikerById,
        getDataCabang
    } = DataStikerHelper();

    const runFunction = () => {
        getCurrentUser();
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
            <ModalStiker 
                success={success}
                closeModalHandler={closeModalHandler}
                buttonSubmitName={buttonSubmitName}
                color={color}
                modalTitle={modalTitle}
                input={input}
                changeHandler={changeHandler}
                loadDataCabang={loadDataCabang}
                dataCabang={dataCabang}
                buttonVisibility={buttonVisibility}
                submitHandler={submitHandler}
                formDisabled={formDisabled}
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Stiker</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    {/* <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton> */}
                                    <CButton color="success" onClick={successToggle} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableStiker 
                                dataStiker={dataStiker}
                                fields={fields}
                                isLoading={isLoading}
                                details={details}
                                toggleDetails={toggleDetails}
                                currentUser={currentUser}
                                getDataStikerById={getDataStikerById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataStiker;