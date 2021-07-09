import { useState } from 'react';
import axios from 'axios';

const DashboardAdministratorHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL; 
    const fieldsRatingAdmin = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'name',
            label: 'Nama',
            _style: { textAlign: 'center' },
        },
        {
            key: 'cab_penempatan',
            label: 'Cabang',
            _style: { textAlign: 'center' },
        },
        {
            key: 'created_at',
            label: 'Terdaftar',
            _style: { textAlign: 'center' },
        },
        {
            key: 'rating',
            label: 'Rating',
            _style: { textAlign: 'center' },
        },
    ];

    const fieldsRatingTeknisi = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'name',
            label: 'Nama',
            _style: { textAlign: 'center' },
        },
        {
            key: 'cab_penempatan',
            label: 'Cabang',
            _style: { textAlign: 'center' },
        },
        {
            key: 'created_at',
            label: 'Terdaftar',
            _style: { textAlign: 'center' },
        },
        {
            key: 'rating',
            label: 'Rating',
            _style: { textAlign: 'center' },
        },
    ];

    const [info, setInfo] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [dataNotifikasi, setDataNotifikasi] = useState([]);
    const [currentNotification, setCurrentNotification] = useState({});
    const [loadCurrentNotification, setLoadCurrentNotification] = useState(true);
    const [dataRatingAdmin, setDataRatingAdmin] = useState([]);
    const [loadDataRatingAdmin, setLoadDataRatingAdmin] = useState(true);
    const [dataRatingTeknisi, setDataRatingTeknisi] = useState([]);
    const [loadDataRatingTeknisi, setLoadDataRatingTeknisi] = useState(true);
    const [selectedUser, setSelectedUser] = useState({});
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

    const closeModalHandler = () => {
        setInfo(!info);
    }

    const getDataNotifikasi = async role => {
        await axios.get(`${baseUrl}/notifikasi/role/${role}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataNotifikasi(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    
        setLoadData(false);
    }  

    const getCurrentNotification = async id => {
        await axios.get(`${baseUrl}/notifikasi/user/teknisi/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }      
        })
        .then(response => {
            console.log(response.data.data[0]);
            setCurrentNotification(response.data.data[0]);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentNotification(false);
        setInfo(!info);
    }

    const getDataRatingAdmin = async () => {
        await axios.get(`${baseUrl}/user/rating-admin/service`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }      
        })
        .then(response => {
            let users = [];
            response.data.data.map(itemUser => {
                users.push({ 
                    id: itemUser.id, 
                    name: itemUser.name, 
                    cabang: itemUser.cab_penempatan, 
                    created_at: itemUser.created_at,
                    rating: itemUser.average.slice(0, 3) 
                });
            });
            setDataRatingAdmin(users);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataRatingAdmin(false);
    }

    const getDataRatingTeknisi = async () => {
        await axios.get(`${baseUrl}/user/rating-teknisi/service`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }      
        })
        .then(response => {
            let users = [];
            response.data.data.map(itemUser => {
                users.push({ 
                    id: itemUser.id, 
                    name: itemUser.name, 
                    cabang: itemUser.cab_penempatan, 
                    created_at: itemUser.created_at,
                    rating: itemUser.average.slice(0, 3) 
                });
            });
            setDataRatingTeknisi(users);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataRatingTeknisi(false);
    }

    const getUserById = async id => {
        await axios.get(`${baseUrl}/user/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }      
        })
        .then(response => {
            setSelectedUser(response.data.data);
        })
        .catch(error => {   
            console.log(error);
        });
    }

    return {
        fieldsRatingAdmin,
        fieldsRatingTeknisi,
        info, 
        loadData,
        dataNotifikasi,
        currentNotification,
        loadCurrentNotification,
        dataRatingAdmin,
        loadDataRatingAdmin,
        dataRatingTeknisi,
        loadDataRatingTeknisi,
        details,
        toggleDetails,
        getDataNotifikasi,
        getCurrentNotification,
        closeModalHandler,
        getDataRatingAdmin,
        getDataRatingTeknisi,
        getUserById
    }
}

export default DashboardAdministratorHelper;