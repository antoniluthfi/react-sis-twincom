import React, { useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import DataSalesHelper from './modules/DataSalesHelper';
import ModalSales from './modules/ModalSales';
import TableSales from './modules/TableSales';

const DataSales = () => {
    const {
        statusAkun,
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataSales, setDataSales,
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
        getDataSales,
        getDataSalesById,
        getDataCabang,
    } = DataSalesHelper();

    useEffect(() => {
        getDataSales();
        getDataCabang();

        return () => {
            setDataSales([]);
            setDataCabang([]);
            setLoadDataCabang(true);
        }
    }, []);

    return (
        <div>
            <ModalSales
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
                        <CCardHeader>Data Sales</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableSales 
                                dataSales={dataSales}
                                fields={fields}
                                isLoading={isLoading}
                                statusAkun={statusAkun}
                                details={details}
                                toggleDetails={toggleDetails}
                                currentUser={currentUser}
                                getDataSalesById={getDataSalesById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataSales;