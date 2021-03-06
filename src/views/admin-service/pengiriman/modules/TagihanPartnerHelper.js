import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const TagihanPartnerHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'no_service',
            label: 'No Service',
            _style: { textAlign: 'center' },
        },
        {
            key: 'partner',
            label: 'Partner',
            _style: { textAlign: 'center' },
        },
        {
            key: 'biaya_service',
            label: 'Biaya Service',
            _style: { textAlign: 'center' },
        },
        {
            key: 'keterangan',
            label: 'Keterangan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status_pembayaran',
            label: 'status_pembayaran',
            _style: { textAlign: 'center' },
        },
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ];

    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [dataTagihanPartner, setDataTagihanPartner] = useState([]);
    const [loadDataTagihanPartner, setLoadDataTagihanPartner] = useState(true);
    const [currentDataTagihanPartner, setCurrentDataTagihanPartner] = useState({});
    const [loadCurrentDataTagihanPartner, setLoadCurrentDataTagihanPartner] = useState(true);
    const [nominalVisibility, setNominalVisibility] = useState('d-none');
    const [input, setInput] = useState({
        nominal: '',
        status_pembayaran: '',
        keterangan: ''
    });
    const [details, setDetails] = useState([]);

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]: event.target.value
        });

        if(event.target.name === 'status_pembayaran' && event.target.value === '0') {
            setNominalVisibility('d-block');
        } else if(event.target.name === 'status_pembayaran' && event.target.value === '1') {
            setNominalVisibility('d-none');
        }
    }

    const closeModalHandler = action => {
        if(action === 'Update') {
            setSuccess(!success);
        }
    }

    const submitHandler = action => {
        if(action === 'Update') {
            updateTagihanPartner(currentDataTagihanPartner.no_service);
        } else if(action === 'Reset') {
            resetTagihanPartner(currentDataTagihanPartner.no_service);
        }
    }

    const getCurrentUser = () => {
        getDataTagihanPartner(currentUser.id);
    }

    const getDataTagihanPartner = async () => {
        await axios.get(`${baseUrl}/tagihan-partner`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataTagihanPartner(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataTagihanPartner(false);
    }

    const getDataTagihanPartnerByNoService = async (no_service, actionModal) => {
        await axios.get(`${baseUrl}/tagihan-partner/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentDataTagihanPartner(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentDataTagihanPartner(false);

        if(actionModal === 'update') {
            setSuccess(!success);
        } else if(actionModal === 'reset') {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    resetTagihanPartner(no_service);
                }
            })
        }
    } 

    const updateTagihanPartner = async no_service => {
        if(input.status_pembayaran === '1') {
            var nominal = currentDataTagihanPartner.biaya_service;
        } else {
            var nominal = input.nominal;
        }

        await axios.put(`${baseUrl}/tagihan-partner/${no_service}`, {
            nominal: nominal,
            keterangan: input.keterangan,
            status_pembayaran: input.status_pembayaran
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Tagihan Partner', 'UPDATE', `${currentUser.name} mengubah data nomor service ${currentDataTagihanPartner.no_service}`);
            getDataTagihanPartner(currentUser.id);
        })
        .catch(error => {
            console.log(error);
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setSuccess(!success);
    }

    const resetTagihanPartner = async no_service => {
        await axios.put(`${baseUrl}/tagihan-partner/${no_service}`, {
            nominal: 0,
            keterangan: '',
            status_pembayaran: 0
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Tagihan Partner', 'UPDATE', `${currentUser.name} mereset data nomor service ${currentDataTagihanPartner.no_service}`);
            getDataTagihanPartner(currentUser.id);
        })
        .catch(error => {
            console.log(error);
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    return {
        fields,
        success,
        info,
        currentUser,
        dataTagihanPartner,
        loadDataTagihanPartner,
        currentDataTagihanPartner,
        input,
        nominalVisibility,
        details, setDetails,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataTagihanPartnerByNoService
    }
}

export default TagihanPartnerHelper;