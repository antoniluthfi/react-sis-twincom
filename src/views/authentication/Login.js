import React, { useState, useCallback } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
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
    CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import Swal from 'sweetalert2';
import LogHelper from '../log/LogHelper';
import moment from 'moment';

const Login = ({ history }) => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const { writeActivityLog } = LogHelper();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [routeLocation, setRouteLocation] = useState('/login');
    const [shiftVisibility, setShiftVisibility] = useState('d-block');
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: 'user',
        shift: '0'
    });

    const updateUser = async (id, token) => {
        await axios.put(`${baseUrl}/user/${id}`, {
            shift: input.shift 
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });
    }

    const login = useCallback(() => {
        if(input.role === 'administrator' || input.role === 'reviewer') {
            var role = 'user';
        } 
        
        if(input.role === 'customer' || input.role === 'user') {
            var role = input.role;
        }

        console.log(role);
        axios.post(`${baseUrl}/login`, {
            email: input.email,
            password: input.password,
            role: role
        })
        .then(response => {
            localStorage.setItem('sis-token', response.data.success.token);
            localStorage.setItem('sis-role', response.data.success.user.jabatan ? 'user' : 'customer');
            localStorage.setItem('sis-shift', input.shift);
            
            if(shiftVisibility === 'd-block') {
                updateUser(response.data.success.user.id, response.data.success.token);
            }

            Swal.fire(
                'Login Berhasil',
                response.data.message,
                'success'
            );

            if(role === 'user') {
                const result = response.data.success;
                writeActivityLog(result.user.id, result.user.jabatan ? result.user.jabatan : result.user.role, 'Login', 'POST', `${result.user.name} login pada ${moment().format('LTS')}`);

                switch (result.user.jabatan) {
                    case 'administrator':
                        setRouteLocation('/dashboard-administrator');
                        break;
                    case 'admin service':
                        setRouteLocation('/dashboard-admin-service');
                        break;
                    case 'sales': 
                        setRouteLocation('/dashboard-sales');
                        break;
                    case 'teknisi': 
                        setRouteLocation('/dashboard-teknisi');
                        break;
                    case 'reviewer': 
                        setRouteLocation('/dashboard-review');
                        break;
                    default:
                        setRouteLocation('/login');
                        break;
                }
            } else if(role === 'customer') {
                setRouteLocation('/dashboard-customer');
            }

            setIsLoggedIn(true);
        })
        .catch(error => {
            Swal.fire(
                'Login Gagal',
                error.response.data.message,
                'error'
            );
        });
    }, [history, input]);

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });

        if(event.target.name === 'role') {
            if(event.target.value === 'administrator' || event.target.value === 'customer' || event.target.value === 'reviewer') {
                setShiftVisibility('d-none');
            } else {
                setShiftVisibility('d-block');
            }
        }
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            {isLoggedIn ? <Redirect to={routeLocation} /> : null}

            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm>
                                    <h1>Login</h1>
                                    <p className="text-muted">Sign In to your account</p>
                                    <CRow>
                                        <CCol xs="12" md="12">
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-envelope-open" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput type="email" name="email" placeholder="Email Address" value={input.email} onChange={changeHandler} />
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
                                        <CCol>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-people" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CSelect custom name="role" id="form-data-penting" placeholder="Login as" value={input.role} onChange={changeHandler}>
                                                    <option value="customer">Customer</option>
                                                    <option value="user">Employee</option>
                                                    <option value="administrator">Administrator</option>
                                                    <option value="reviewer">Reviewer</option>
                                                </CSelect>
                                            </CInputGroup>
                                        </CCol>
                                    </CRow>

                                    <CRow className={shiftVisibility}>
                                        <CCol xs="12" md="12">
                                            <CInputGroup className="mb-4">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-people" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CSelect custom name="shift" id="form-data-penting" placeholder="Shift" value={input.shift} onChange={changeHandler}>
                                                    <option value="0">Shift 1</option>
                                                    <option value="1">Shift 2</option>
                                                </CSelect>
                                            </CInputGroup>
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs="6">
                                            <CButton color="success" className="px-4" onClick={login}>Login</CButton>
                                        </CCol>
                                        <CCol xs="6" className="text-right">
                                            <CLink to="/forgot-password">
                                                <CButton color="text-success" className="px-0">Forgot password?</CButton>
                                            </CLink>
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
                                        <p>Silahkan login untuk mengakses fitur-fitur didalam nya.</p>
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

export default withRouter(Login)
