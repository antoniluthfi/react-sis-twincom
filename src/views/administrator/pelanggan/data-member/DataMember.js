import React, { useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import DataMemberHelper from './modules/DataMemberHelper';
import ModalMember from './modules/ModalMember';
import TableMember from './modules/TableMember';

const DataMember = () => {
    const {
        fields,
        success, successToggle,
        color,
        currentUser,
        isLoading, setIsLoading,
        dataMember, setDataMember,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input, setInput,
        currentCustomer, setCurrentCustomer,
        customerOptions, setCustomerOptions,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getDataMember,
        getDataMemberById,
        getDataCustomerNonMember
    } = DataMemberHelper();
    
    useEffect(() => {
        getDataMember();
        getDataCustomerNonMember();

        return () => {
            setDataMember([]);
            setIsLoading(true);
            setCustomerOptions([]);
        }
    }, []);

    return (
        <div>
            <ModalMember 
                success={success}
                closeModalHandler={closeModalHandler}
                buttonSubmitName={buttonSubmitName}
                color={color}
                modalTitle={modalTitle}
                input={input}
                setInput={setInput}
                changeHandler={changeHandler}
                formDisabled={formDisabled}
                buttonVisibility={buttonVisibility}
                submitHandler={submitHandler}
                customerOptions={customerOptions}
                currentCustomer={currentCustomer}
                setCurrentCustomer={setCurrentCustomer}
            />
            
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Member</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={successToggle} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <TableMember 
                                dataMember={dataMember}
                                fields={fields}
                                isLoading={isLoading}
                                details={details}
                                toggleDetails={toggleDetails}
                                currentUser={currentUser}
                                getDataMemberById={getDataMemberById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default DataMember;