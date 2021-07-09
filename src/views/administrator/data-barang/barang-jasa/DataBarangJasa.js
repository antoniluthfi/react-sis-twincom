import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import DataBarangHelper from '../modules/DataBarangJasaHelper';
import ModalBarangJasa from './ModalBarangJasa';
import TableBarangJasa from './TableBarangJasa';

const DataBarang = () => {
    const {
        jenis, 
        inputForm, 
        fields,
        success, setSuccess,
        color, 
        currentUser,
        isLoading,
        dataBarang,
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
        getDataBarangById,
    } = DataBarangHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <ModalBarangJasa 
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
                        <CCardHeader>Data Barang & Jasa</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableBarangJasa
                                dataBarang={dataBarang}
                                fields={fields}
                                isLoading={isLoading}
                                toggleDetails={toggleDetails}
                                details={details}
                                currentUser={currentUser}
                                jenis={jenis}
                                inputForm={inputForm}
                                getDataBarangById={getDataBarangById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataBarang;