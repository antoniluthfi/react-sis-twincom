import React, { useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import DataCabangHelper from './modules/DataCabangHelper';
import ModalCabang from './modules/ModalCabang';
import TableCabang from './modules/TableCabang';

const DataCabang = () => {
    const {
        fields,
        success, successToggle,
        color,
        currentUser,
        isLoading,
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
        getDataCabang,
        getDataCabangById,
    } = DataCabangHelper();
    
    useEffect(() => {
        getDataCabang();

        return function cleanup() {
            setDataCabang([]);
        }
    }, []);

    return (
        <div>
            <ModalCabang 
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
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Cabang</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={successToggle} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableCabang
                                dataCabang={dataCabang}
                                fields={fields}
                                isLoading={isLoading}
                                toggleDetails={toggleDetails}
                                details={details}
                                currentUser={currentUser}
                                getDataCabangById={getDataCabangById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataCabang;