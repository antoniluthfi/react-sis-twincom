import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const WidgetsHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const currentUser = useSelector(state => state.currentUser);
    const [loadData, setLoadData] = useState(true);
    const [pemasukanService, setPemasukanService] = useState(0);
    const [pemasukanKeseluruhan, setPemasukanKeseluruhan] = useState(0);
    const [success, setSuccess] = useState(false);
    const [dataCabang, setDataCabang] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] = useState('d-none');
    const [filterCabang, setFilterCabang] = useState('d-none');
    const [filterShift, setFilterShift] = useState('d-none');
    const [ratingCabang, setRatingCabang] = useState(0);
    const [ourRating, setOurRating] = useState(0);
    const [cetakLaporan, setCetakLaporan] = useState({
        dari: '',
        sampai: '',
        cabang: '',
        shift: ''
    });

    const getCurrentUser = () => {
        getDataArusKas(currentUser.cab_penempatan);
        getRatingCabang(currentUser.cab_penempatan);
        getOurRating(currentUser.id)
    }

    const getDataArusKas = async cabang => {
        await axios.get(`${baseUrl}/arus-kas/laporan/count/${cabang}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            let pemasukan = 0;
            response.data.data.map(item => {
                if(item.no_service !== 0) {    
                    pemasukan = item.pemasukan - item.pengeluaran;
                    setPemasukanService(pemasukan);
                }
            });

            response.data.data.map(item => {
                pemasukan = item.pemasukan - item.pengeluaran;
                setPemasukanKeseluruhan(pemasukan);
            });
        })
        .catch(error => {
            console.log(error);
        });

        setLoadData(false);
    }

    const cetakLaporanHandler = event => {
        setCetakLaporan({
            ...cetakLaporan, [event.target.name]: event.target.value
        });

        if(event.target.name === 'filter_lebih_dari_satuhari' && event.target.checked) {
            setFilterLebihDariSatuHari('d-block');
        } else if(event.target.name === 'filter_lebih_dari_satuhari' && !event.target.checked) {
            setFilterLebihDariSatuHari('d-none');
        }

        if(event.target.name === 'filter_cabang' && event.target.checked) {
            setFilterCabang('d-block');
        } else if(event.target.name === 'filter_cabang' && !event.target.checked) {
            setFilterCabang('d-none');
        }

        if(event.target.name === 'filter_shift' && event.target.checked) {
            setFilterShift('d-block');
        } else if(event.target.name === 'filter_shift' && !event.target.checked) {
            setFilterShift('d-none');
        }
    }

    const getDataLaporan = () => {
        let dari;
        if(cetakLaporan.dari == '') {
            dari = 'x';
        } else {
            dari = cetakLaporan.dari;
        }

        let sampai;
        if(cetakLaporan.sampai == '') {
            sampai = 'x';
        } else {
            sampai = cetakLaporan.sampai;
        }

        let cabang;
        if(cetakLaporan.cabang == '') {
            cabang = currentUser.cab_penempatan;
        } else {
            cabang = cetakLaporan.cabang;
        }

        let shift;
        if(cetakLaporan.shift == '') {
            shift = 'x';
        } else {
            shift = cetakLaporan.shift;
        }

        window.open(`http://localhost:8000/laporan-arus-kas/${dari}/${sampai}/${cabang}/${shift}/Administrator`);
    }

    const getDataCabang = async () => {
        await axios.get(`${baseUrl}/cabang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataCabang(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataCabang(false);
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
        pemasukanService,
        pemasukanKeseluruhan,
        success, setSuccess,
        dataCabang,
        loadDataCabang,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        cetakLaporan,
        currentUser,
        ratingCabang,
        ourRating,
        getCurrentUser,
        cetakLaporanHandler,
        getDataLaporan,
        getDataCabang,
    }
}

export default WidgetsHelper;