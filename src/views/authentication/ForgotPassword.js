import React from 'react';
import AuthHelper from './modules/AuthHelper';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CLink,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const ForgotPassword = () => {
    const {
        forgotPassword,
        forgotPasswordChangeHandler,
        verifyForgotPassword
    } = AuthHelper();

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm>
                                    <h1>Forgot Password</h1>
                                    <p className="text-muted">Insert your email below.</p>
                                    <CRow>
                                        <CCol xs="12" md="12">
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-envelope-open" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput type="email" name="email" placeholder="Email Address" value={forgotPassword.email} onChange={forgotPasswordChangeHandler} />
                                            </CInputGroup>
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs="12" md="12">
                                            <CButton color="success" className="px-4" onClick={verifyForgotPassword}>Send Email Verification</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                            <CCard className="text-white py-5 d-md-down-none" style={{ width: '44%', background: '#3deb77' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Selamat Datang Di Website Sistem Informasi Twincom Service Center</h2>
                                        <img src="https://drive.google.com/thumbnail?id=12ubasd0uZrQ3LFlQ3Hw1mG4Q8ORLZ3Ao" width="180" height="180" alt="" className="mr-2 mb-2" />
                                        <p>Masukkan email anda agar bisa melakukan reset password.</p>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default ForgotPassword;