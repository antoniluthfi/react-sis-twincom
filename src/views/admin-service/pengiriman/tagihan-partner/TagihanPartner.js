import React, { useEffect } from 'react';
import TagihanPartnerHelper from '../modules/TagihanPartnerHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react';
import ModalTagihanPartner from './ModalTagihanPartner';
import TableTagihanPartner from './TableTagihanPartner';
  
const TagihanPartner = () => {
    const {
        fields,
        success,
        danger,
        currentUser,
        dataTagihanPartner,
        loadDataTagihanPartner,
        input,
        nominalVisibility,
        details, 
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataTagihanPartnerByNoService
    } = TagihanPartnerHelper();

    useEffect(() => {
        let mounted = true;
        getCurrentUser();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    const kodeCabang = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'S.BJB.';
            case 'Landasan Ulin':
                return 'S.LNU.';
            case 'Banjarmasin':
                return 'S.BJM.';
            default:
                return '';
        }
    }

    return (
        <div>
            <ModalTagihanPartner 
                success={success}
                closeModalHandler={closeModalHandler}
                changeHandler={changeHandler}
                input={input}
                submitHandler={submitHandler}
                nominalVisibility={nominalVisibility}
            />

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Tagihan Partner</CCardHeader>
                        <CCardBody>
                            <TableTagihanPartner 
                                dataTagihanPartner={dataTagihanPartner}
                                fields={fields}
                                loadDataTagihanPartner={loadDataTagihanPartner}
                                kodeCabang={kodeCabang}
                                currentUser={currentUser}
                                detail={details}
                                toggleDetails={toggleDetails}
                                getDataTagihanPartnerByNoService={getDataTagihanPartnerByNoService}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* reset data */}
            <CModal 
                show={danger} 
                onClose={closeModalHandler}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Reset Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    This data will be reset parmanently. Are you sure wanna reset it anyway?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => submitHandler('Reset')}>Reset</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('Reset')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default TagihanPartner;