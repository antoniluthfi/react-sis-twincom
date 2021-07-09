import React, { useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react';
import DataKelengkapanHelper from '../modules/DataKelengkapanHelper';
import ModalKelengkapan from './ModalKelengkapan';
import TableKelengkapan from './TableKelengkapan';

const DataKelengkapan = () => {
    const {
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataKelengkapan,
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
        getDataKelengkapanById
    } = DataKelengkapanHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <ModalKelengkapan 
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
                        <CCardHeader>Data Kelengkapan</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableKelengkapan 
                                dataKelengkapan={dataKelengkapan}
                                fields={fields}
                                isLoading={isLoading}
                                toggleDetails={toggleDetails}
                                details={details}
                                currentUser={currentUser}
                                getDataKelengkapanById={getDataKelengkapanById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataKelengkapan;