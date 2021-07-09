import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'  
import PengerjaanHelper from '../modules/PengerjaanHelper';
import ModalTambahPengerjaan from './ModalTambahPengerjaan';
import ModalUpdatePengerjaan from './ModalUpdatePengerjaan';
import ModalViewPengerjaan from './ModalViewPengerjaan';
import TablePengerjaan from './TablePengerjaan';

const Pengerjaan = () => {
    const {
        fields,
        success,
        danger,
        info,
        openUpdateModal,
        color,
        isLoading,
        details,
        input, setInput,
        partnerOptions,
        dataPengerjaan,
        currentTeknisipj,
        currentPengerjaan,
        loadCurrentPengerjaan,
        garansiVisible,
        alasanBatalVisible,
        kodeCabang,
        statusPengerjaan,
        toggleDetails,
        submitHandler,
        changeHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPengerjaanById,
        getDataPartner,
        sendEmailNotification,
        getOneSignalPlayerId
    } = PengerjaanHelper();

    const runFunction = () => {
        getCurrentUser();
        getDataPartner();
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
            <ModalTambahPengerjaan 
                success={success}
                closeModalHandler={closeModalHandler}
                color={color}
                changeHandler={changeHandler} 
                input={input}
                setInput={setInput}
                partnerOptions={partnerOptions}
                submitHandler={submitHandler}
            />

            <ModalUpdatePengerjaan 
                openUpdateModal={openUpdateModal}
                closeModalHandler={closeModalHandler}
                color={color}
                changeHandler={changeHandler}
                input={input}
                garansiVisible={garansiVisible}
                alasanBatalVisible={alasanBatalVisible}
                submitHandler={submitHandler}
            />

            <ModalViewPengerjaan 
                info={info}
                closeModalHandler={closeModalHandler}
                loadCurrentPengerjaan={loadCurrentPengerjaan}
                kodeCabang={kodeCabang}
                currentPengerjaan={currentPengerjaan}
                changeHandler={changeHandler}
                statusPengerjaan={statusPengerjaan}
                currentTeknisipj={currentTeknisipj}
            />
            
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Pengerjaan</CCardHeader>
                        <CCardBody>
                            <TablePengerjaan 
                                dataPengerjaan={dataPengerjaan}
                                fields={fields}
                                isLoading={isLoading}
                                kodeCabang={kodeCabang}
                                details={details}
                                toggleDetails={toggleDetails}
                                statusPengerjaan={statusPengerjaan}
                                getDataPengerjaanById={getDataPengerjaanById}
                                sendEmailNotification={sendEmailNotification}
                                getOneSignalPlayerId={getOneSignalPlayerId}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default Pengerjaan;