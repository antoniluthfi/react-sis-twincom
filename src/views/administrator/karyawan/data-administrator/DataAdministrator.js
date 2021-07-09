import React, { useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import DataAdministratorHelper from './modules/DataAdministratorHelper';
import ModalAdministrator from './modules/ModalAdministrator';
import TableAdministrator from './modules/TableAdministrator';

const DataAdministrator = () => {
    const {
        statusAkun,
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataAdministrator, setDataAdministrator,
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
        getDataAdministrator,
        getDataAdministratorById,
        getDataCabang
    } = DataAdministratorHelper();

    useEffect(() => {
        getDataAdministrator();
        getDataCabang();

        return () => {
            setDataAdministrator([]);
            setDataCabang([]);
            setLoadDataCabang(true);
        }
    }, []);

    return (
        <div>
            <ModalAdministrator
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
                        <CCardHeader>Data Administrator</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableAdministrator 
                                dataAdministrator={dataAdministrator}
                                fields={fields}
                                isLoading={isLoading}
                                statusAkun={statusAkun}
                                details={details}
                                toggleDetails={toggleDetails}
                                currentUser={currentUser}
                                getDataAdministratorById={getDataAdministratorById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataAdministrator;