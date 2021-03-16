import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DashboardCustomerHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'no_service',
            label: 'No Service',
            _style: { textAlign: 'center' },
        },
        {
            key: 'merek',
            label: 'Merek',
            _style: { textAlign: 'center' },
        },
        {
            key: 'bj',
            label: 'Barang Jasa',
            _style: { textAlign: 'center' },
        },
        {
            key: 'sn',
            label: 'Serial Number',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status_pengerjaan',
            label: 'Status Pengerjaan',
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

    const [info, setInfo] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [dataService, setDataService] = useState([]);
    const [loadDataService, setLoadDataService] = useState(true);
    const [currentPenerimaan, setCurrentPenerimaan] = useState({});
    const [loadCurrentPenerimaan, setLoadCurrentPenerimaan] = useState(true);
    const [details, setDetails] = useState([]);
    const [input, setInput] = useState({
        rating_admin: '',
        rating_teknisi: '',
        ulasan_admin: '',
        ulasan_teknisi: ''
    });

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
    }

    const getCurrentUser = async () => {
        await axios.get(`${baseUrl}/customer/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentUser(response.data.data);
            getDataPenerimaan(response.data.data.id);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getDataPenerimaan = async id_customer => {
        await axios.get(`${baseUrl}/penerimaan-barang/customer/${id_customer}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataService(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataService(false);
    }

    const getDataPenerimaanByNoService = async (no_service, actionModal) => {
        await axios.get(`${baseUrl}/penerimaan-barang/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentPenerimaan(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentPenerimaan(false);

        if(actionModal === 'view') {
            setInfo(!info);
        } else if(actionModal === 'review') {
            setSuccess(!success);
        }
    }

    const updateReviewKepuasan = async () => {
        await axios.put(`${baseUrl}/review-kepuasan-pelanggan`, {
            no_service: currentPenerimaan.no_service_penerimaan,
            rating_admin: input.rating_admin,
            rating_teknisi: input.rating_teknisi,
            ulasan_admin: input.ulasan_admin,
            ulasan_teknisi: input.ulasan_teknisi
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
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });

        setSuccess(!success);
    }

    return {
        fields,
        info, setInfo,
        success, setSuccess,
        dataService,
        loadDataService,
        currentPenerimaan,
        loadCurrentPenerimaan,
        details, 
        input, setInput,
        changeHandler,
        toggleDetails,
        getCurrentUser,
        getDataPenerimaanByNoService,
        updateReviewKepuasan
    }
}

export default DashboardCustomerHelper;