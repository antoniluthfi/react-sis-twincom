import { useState } from 'react';
import axios from 'axios';

const WidgetsHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const [loadData, setLoadData] = useState(true);
    const [belumDikerjakan, setBelumDikerjakan] = useState(0);
    const [sedangDikerjakan, setSedangDikerjakan] = useState(0);
    const [selesai, setSelesai] = useState(0);
    const [cancel, setCancel] = useState(0);
    const [dataNotifikasi, setDataNotifikasi] = useState([]);
    const [loadNotifikasi, setLoadNotifikasi] = useState(true);
    const [ratingCabang, setRatingCabang] = useState(0);
    const [ourRating, setOurRating] = useState(0);
    const [currentUser, setCurrentUser] = useState({});

    const getCurrentUser = async () => {
        await axios.get(`${baseUrl}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentUser(response.data.data);
            getDataPengerjaan(response.data.data.id);
            getNotification(response.data.data.id);
            getRatingCabang(response.data.data.cab_penempatan);
            getOurRating(response.data.data.id);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getDataPengerjaan = async id_teknisi => {
        await axios.get(`${baseUrl}/teknisi-pj/teknisi/${id_teknisi}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setBelumDikerjakan(result.belum_dikerjakan);
            setSedangDikerjakan(result.sedang_dikerjakan);
            setSelesai(result.selesai);
            setCancel(result.cancel);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadData(false);
    }

    const getNotification = async id_teknisi => {
        await axios.get(`${baseUrl}/notifikasi/user/teknisi/${id_teknisi}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            // console.log(response.data.data);
            setDataNotifikasi(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadNotifikasi(false);
    }

    const getRatingCabang = async cabang => {
        await axios.get(`${baseUrl}/review-kepuasan-pelanggan/cabang/${cabang}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setRatingCabang(response.data.data[0].average.slice(0, 3));
        })
        .catch(error => {
            console.log(error);
        }); 
    }

    const getOurRating = async id => {
        await axios.get(`${baseUrl}/review-kepuasan-pelanggan/user/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setOurRating(response.data.data[0].average.slice(0, 3));
        })
        .catch(error => {
            console.log(error);
        });
    }

    return {
        loadData,
        belumDikerjakan,
        sedangDikerjakan,
        selesai,
        cancel,
        dataNotifikasi,
        loadNotifikasi,
        ratingCabang,
        ourRating,
        currentUser,
        getCurrentUser
    }
}

export default WidgetsHelper;