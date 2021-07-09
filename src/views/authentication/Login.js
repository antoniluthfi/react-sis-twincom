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
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
    const dispatch = useDispatch();
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const { writeActivityLog } = LogHelper();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [routeLocation, setRouteLocation] = useState('/login');
    const [shiftVisibility, setShiftVisibility] = useState('d-block');
    const [inputPassword, setInputPassword] = useState('password');
    const [input, setInput] = useState({
        email: '',
        password: '',
        shift: '0'
    });

    const addOneSignalDevice = async (id, token) => {
        const playerId = await window.userId;

        if(playerId) {
            await axios.post(`${baseUrl}/onesignal`, {
                user_id: id,
                player_id: playerId
            },
            {
                headers: {
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('success');
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

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
            addOneSignalDevice(id, token);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const login = useCallback(() => {
        axios.post(`${baseUrl}/login`, {
            email: input.email,
            password: input.password,
        })
        .then(response => {
            const result = response.data.success;
            localStorage.setItem('sis-token', result.token);
            localStorage.setItem('sis-shift', input.shift);

            dispatch({
                type: 'LOGIN',
                payload: result.user
            });
            
            if(shiftVisibility === 'd-block') {
                updateUser(result.user.id, result.token);
            }

            Swal.fire(
                'Login Berhasil',
                response.data.message,
                'success'
            );

            if(result.jabatan !== 'user' || result.jabatan !== 'reseller') {
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
                    case 'user':
                    case 'reseller':
                        setRouteLocation('/dashboard-customer');
                        break;
                    default:
                        setRouteLocation('/login');
                        break;
                }
            }

            setIsLoggedIn(true);
        })
        .catch(error => {
            Swal.fire(
                'Login Gagal',
                error.message,
                'error'
            );
        });
    }, [history, input]);

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });

        if(event.target.name === 'role') {
            if(event.target.value === 'administrator' || event.target.value === 'customer') {
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
                                                <CInputGroupPrepend style={{height: 35}}>
                                                    <CButton 
                                                        color="secondary"
                                                        onClick={() => {
                                                            if(inputPassword === 'password') setInputPassword('text');
                                                            else setInputPassword('password');
                                                        }}
                                                    >
                                                        <CIcon name="cil-lock-locked" />
                                                    </CButton>
                                                </CInputGroupPrepend>
                                                <CInput type={inputPassword} name="password" placeholder="Password" value={input.password} onChange={changeHandler} />
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
                                                    <option value="user">Employee</option>
                                                    <option value="administrator">Administrator</option>
                                                    <option value="customer">Customer</option>
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
                                        <h2>Sistem Informasi Twincom Service Center</h2>
                                        <img src="https://drive.google.com/thumbnail?id=12ubasd0uZrQ3LFlQ3Hw1mG4Q8ORLZ3Ao" width="180" height="180" alt="" className="mr-2 mb-2" />
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
