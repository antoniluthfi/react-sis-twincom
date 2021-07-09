import React, { useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,
    CCollapse,
    CSelect
} from '@coreui/react'
import SandiTransaksiHelper from '../modules/SandiTransaksiHelper';
import ModalSandiTransaksi from './ModalSandiTransaksi';
import TableSandiTransaksi from './TableSandiTransaksi';

const SandiTransaksi = () => {
    const {
        jenisTransaksi,
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataSandiTransaksi,
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
        getDataSandiTransaksiById,
    } = SandiTransaksiHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <ModalSandiTransaksi
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
                        <CCardHeader>Data Sandi Transaksi</CCardHeader>
                        {currentUser.jabatan === 'admin service' ? null :
                            <CRow>
                                <CCol xs="6" lg="6">
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                </CCol>
                            </CRow>                        
                        }
                        <CCardBody>
                            <TableSandiTransaksi 
                                dataSandiTransaksi={dataSandiTransaksi}
                                fields={fields}
                                isLoading={isLoading}
                                jenisTransaksi={jenisTransaksi}
                                details={details}
                                toggleDetails={toggleDetails}
                                currentUser={currentUser}
                                getDataSandiTransaksiById={getDataSandiTransaksiById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default SandiTransaksi;