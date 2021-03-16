import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AuthHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const [forgotPassword, setForgotPassword] = useState({ email: '' });

    const forgotPasswordChangeHandler = e => {
        setForgotPassword({
            email: e.target.value
        });
    }

    const logout = async () => {
        await axios.post(`${baseUrl}/logout`, {}, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            localStorage.clear();
            window.location.reload(true);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const verifyForgotPassword = async () => {
        if(forgotPassword.email == '') {
            Swal.fire(
                'Error',
                'Masukkan Alamat Email!',
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/forgot-password`, {
                email: forgotPassword.email,
                url: process.env.REACT_APP_RESET_PASSWORD
            }, 
            {
                headers: {
                    'Accept': 'Application/json',
                }
            })
            .then(response => {
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

    return { 
        forgotPassword, setForgotPassword,
        forgotPasswordChangeHandler,
        logout, 
        verifyForgotPassword
    }
}

export default AuthHelper;