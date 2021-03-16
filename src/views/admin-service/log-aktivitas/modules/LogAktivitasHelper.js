import { useState } from 'react';
import axios from 'axios';

const LogAktivitasHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama',
            label: 'Nama',
            _style: { textAlign: 'center' },
        },
        {
            key: 'hak_akses',
            label: 'Hak Akses',
            _style: { textAlign: 'center' },
        },
        {
            key: 'halaman',
            label: 'Halaman',
            _style: { textAlign: 'center' },
        },
        {
            key: 'method',
            label: 'Aksi',
            _style: { textAlign: 'center' },
        },
        {
            key: 'keterangan',
            label: 'Keterangan',
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
    const [dataLog, setDataLog] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [currentDataLog, setCurrentDataLog] = useState({});
    const [loadDataLog, setLoadDataLog] = useState(true);
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

    const getCurrentUser = async () => {
        await axios.get(`${baseUrl}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentUser(response.data.data);
            getLogAktivitas(response.data.data.id)
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getLogAktivitas = async userId => {
        await axios.get(`${baseUrl}/log-aktivitas/user/${userId}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataLog(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getLogAktivitasById = async id => {
        await axios.get(`${baseUrl}/log-aktivitas/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentDataLog(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataLog(false);
        setInfo(!info);
    }

    return {
        fields,
        info, setInfo,
        dataLog,
        isLoading,
        details,
        currentDataLog,
        loadDataLog,
        toggleDetails,
        getCurrentUser,
        getLogAktivitasById
    }
}

export default LogAktivitasHelper;