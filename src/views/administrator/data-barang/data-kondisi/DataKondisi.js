import React, { useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react';
import DataKondisiHelper from '../modules/DataKondisiHelper';
import ModalKondisi from './ModalKondisi';
import TableKondisi from './TableKondisi';

const DataKondisi = () => {
    const {
        fields,
        success, setSuccess,
        color, 
        currentUser,
        isLoading,
        dataKondisi,
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
        getDataKondisiById,
    } = DataKondisiHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <ModalKondisi 
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
                        <CCardHeader>Data Kondisi Fisik Saat Diterima</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableKondisi 
                                dataKondisi={dataKondisi}
                                fields={fields}
                                isLoading={isLoading}
                                toggleDetails={toggleDetails}
                                details={details}
                                currentUser={currentUser}
                                getDataKondisiById={getDataKondisiById}                          
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataKondisi;