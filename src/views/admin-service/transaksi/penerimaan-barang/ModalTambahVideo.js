import React from 'react';
import {
    CRow,
    CCol,
    CSelect,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,  
} from '@coreui/react';

const ModalTambahVideo = props => {
    let {
        openVideoModal,
        setOpenVideoModal,
        setLoadCurrentPenerimaan,
        loadVideo,
        playing,
        stopVideo,
        startVideo,
        getRootProps,
        getInputProps,
        isDragActive,
        uploadVideo
    } = props;

    return (
        <CModal 
            show={openVideoModal} 
            onClose={() => {
                setOpenVideoModal(!openVideoModal);
                setLoadCurrentPenerimaan(true);
            }}
            color="success"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Record Video</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {loadVideo ? 
                    <div>
                        <div className="text-center" style={{ height: 400, paddingTop: 180 }}>
                            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <h6 className="text-center">Tunggu bentar yaa..</h6>
                        </div>
                    </div> :
                    <div>
                        <CRow>
                            <CCol xs="12" md="12">
                                <audio id="player" controls className="d-none"></audio>
                                <video
                                    height="50%"
                                    width="100%"
                                    autoPlay
                                    id="show-video"
                                ></video>
                                <video
                                    height="50%"
                                    width="100%"
                                    autoPlay
                                    id="prev-video"
                                    controls
                                ></video>
                            </CCol>
                        </CRow>
                        <CRow className="mt-3">
                            <CCol xs="12" md="12">
                                {playing ? 
                                    <CButton size="sm" color="danger" className="text-center mr-1" onClick={stopVideo}>Stop</CButton> :
                                    <CButton size="sm" color="info" className="text-center mr-1" onClick={startVideo}>Start</CButton>
                                }
                                <CSelect size="md" id="audioOptions" className="d-inline mr-1" style={{ width: 100 }}></CSelect>
                                <CSelect size="md" id="cameraOptions" className="d-inline mr-1" style={{ width: 100 }}></CSelect>
                                <a className="btn btn-info" id="btn-download">Download</a>

                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    }
                                </div>
                                <CButton size="sm" color="success" onClick={uploadVideo}>Upload</CButton>
                            </CCol>                        
                        </CRow>
                    </div>
                }
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal>
    )
}

export default ModalTambahVideo;