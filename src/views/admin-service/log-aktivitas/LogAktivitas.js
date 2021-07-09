import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';
import LogAktivitasHelper from './modules/LogAktivitasHelper';
import ModalLogAktifitas from './ModalLogAktifitas';
import TableLogAktifitas from './TableLogAktifitas';
  
const LogAktivitas = () => {
    const {
        fields,
        info, setInfo,
        dataLog,
        isLoading,
        details,
        currentDataLog,
        loadDataLog,
        toggleDetails,
        getCurrentUser,
        getLogAktivitasById
    } = LogAktivitasHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <ModalLogAktifitas 
                info={info}
                setInfo={setInfo}
                loadDataLog={loadDataLog}
                currentDataLog={currentDataLog}
            />
        
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Aktifitas Anda</CCardHeader>
                        <CCardBody>
                            <TableLogAktifitas 
                                dataLog={dataLog}
                                fields={fields}
                                isLoading={isLoading}
                                toggleDetails={toggleDetails}
                                details={details}
                                getLogAktivitasById={getLogAktivitasById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default LogAktivitas;