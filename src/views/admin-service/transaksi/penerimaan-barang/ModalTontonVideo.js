import React from 'react';
import {
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,  
} from '@coreui/react';

const ModalTontonVideo = props => {
    let {
        openWatchVideoModal, 
        setOpenWatchVideoModal
    } = props;

    return (
        <CModal 
            show={openWatchVideoModal} 
            onClose={() => setOpenWatchVideoModal(!openWatchVideoModal)}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Watch Video</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="12">
                        <video
                            height="100%"
                            width="100%"
                            id="watch-video"
                            controls
                            autoPlay
                        ></video>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal>
    )
}

export default ModalTontonVideo;