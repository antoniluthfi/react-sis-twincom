import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import DataPelangganHelper from './modules/DataPelangganHelper';
import ModalPelanggan from './modules/ModalPelanggan';
import ModalTambahDiskon from './modules/ModalTambahDiskon';
import TablePelanggan from './modules/TablePelanggan';

const DataPelanggan = () => {
    const {
        statusAkun,
        fields,
        success, setSuccess,
        diskonModal,
        color,
        currentUser,
        isLoading, setIsLoading,
        dataPelanggan, setDataPelanggan,
        setDataCabang,
        setLoadDataCabang,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input,
        inputDiskon,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        diskonChangeHandler,
        submitHandler,
        getDataPelanggan,
        getDataPelangganById,
        getDataCabang
    } = DataPelangganHelper();

    useEffect(() => {
        getDataPelanggan();
        getDataCabang();

        return () => {
            setIsLoading(true);
            setDataPelanggan([]);
            setDataCabang([]);
            setLoadDataCabang(true);
        }
    }, []);

    return (
        <div>
            <ModalPelanggan
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

            <ModalTambahDiskon 
                diskonModal={diskonModal}
                closeModalHandler={closeModalHandler}
                inputDiskon={inputDiskon}
                diskonChangeHandler={diskonChangeHandler}
                submitHandler={submitHandler}
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Pelanggan</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TablePelanggan 
                                dataPelanggan={dataPelanggan}
                                fields={fields}
                                isLoading={isLoading}
                                statusAkun={statusAkun}
                                details={details}
                                toggleDetails={toggleDetails}
                                currentUser={currentUser}
                                getDataPelangganById={getDataPelangganById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataPelanggan;