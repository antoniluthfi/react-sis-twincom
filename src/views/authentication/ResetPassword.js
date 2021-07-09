import React, { useEffect, useState } from 'react';
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
import { useParams, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const ResetPassword = () => {
    const { id } = useParams();
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;

    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [reset, setReset] = useState(false);
    const [input, setInput] = useState({
        password: '',
        c_password: ''
    });

    const changeHandler = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }

    const getCurrentEncryptedUser = async id => {
        await axios.get(`${baseUrl}/user/my/profile/enc/${id}`, {
            headers: {
                'Accept': 'Application/json',
            }
        })
        .then(response => {
            setCurrentUser(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const resetPassword = async id => {
        if(input.password !== input.c_password) {
            Swal.fire(
                'Gagal',
                'Konfirmasi password anda dengan benar!',
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/user/reset-password/${id}`, {
                password: input.password
            },
            {
                headers: {
                    'Accept': 'Application/json',
                }    
            })
            .then(response => {
                setReset(true);
                Swal.fire(
                    'Berhasil',
                    response.data.message,
                    'success'
                );
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            });
        }
    }

    useEffect(() => {
        getCurrentEncryptedUser(id);
    }, []);

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            {!reset ? null : <Redirect to="/login" />}

            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm>
                                    <h1>Reset Password</h1>
                                    <p className="text-muted">Insert your new password.</p>
                                    <CRow>
                                        <CCol xs="12" md="12">
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-envelope-open" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput type="email" name="email" placeholder="Email Address" value={isLoading ? null : currentUser.email} disabled={true} />
                                            </CInputGroup>
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs="12" md="12">
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-lock-locked" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput type="password" name="password" placeholder="Password" value={input.password} onChange={changeHandler} />
                                            </CInputGroup>                                            
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs="12" md="12">
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-lock-locked" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput type="password" name="c_password" placeholder="Password Confirmation" value={input.c_password} onChange={changeHandler} />
                                            </CInputGroup>                                            
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs="12" md="12">
                                            <CButton color="success" className="px-4" onClick={() => resetPassword(id)}>Reset Password</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                            <CCard className="text-white py-5 d-md-down-none" style={{ width: '44%', background: '#3deb77' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sistem Informasi Twincom Service Center</h2>
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

export default ResetPassword;