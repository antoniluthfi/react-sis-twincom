import { useState } from 'react';
import axios from 'axios';

const WidgetsLaporanHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const [success, setSuccess] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [pemasukanBanjarbaru, setPemasukanBanjarbaru] = useState(0);
    const [pemasukanLandasanUlin, setPemasukanLandasanUlin] = useState(0);
    const [pemasukanBanjarmasin, setPemasukanBanjarmasin] = useState(0);
    const [dataCabang, setDataCabang] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [currentCabang, setCurrentCabang] = useState('');
    const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] = useState('d-none');
    const [filterCabang, setFilterCabang] = useState('d-none');
    const [filterShift, setFilterShift] = useState('d-none');
    const [cetakLaporan, setCetakLaporan] = useState({
        dari: '',
        sampai: '',
        cabang: '',
        shift: ''
    });

    const getPendinganTeknisi = async () => {
        await axios.get(`${baseUrl}/arus-kas/laporan/count/all`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            let pemasukan = 0;
            response.data.data.map(item => {
                if(item.cabang === 'Banjarbaru') {
                    pemasukan = item.pemasukan - item.pengeluaran;
                    setPemasukanBanjarbaru(pemasukan);
                } else if(item.cabang === 'Landasan Ulin') {
                    pemasukan = item.pemasukan - item.pengeluaran;
                    setPemasukanLandasanUlin(pemasukan);
                } else if(item.cabang === 'Banjarmasin') {
                    pemasukan = item.pemasukan - item.pengeluaran;
                    setPemasukanBanjarmasin(pemasukan);
                }
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
        if(cetakLaporan.dari == '') {
            var dari = 'x';
        } else {
            var dari = cetakLaporan.dari;
        }

        if(cetakLaporan.sampai == '') {
            var sampai = 'x';
        } else {
            var sampai = cetakLaporan.sampai;
        }

        if(cetakLaporan.cabang == '') {
            var cabang = currentCabang;
        } else {
            var cabang = cetakLaporan.cabang;
        }

        if(cetakLaporan.shift == '') {
            var shift = 'x';
        } else {
            var shift = cetakLaporan.shift;
        }

        window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan-arus-kas/${dari}/${sampai}/${cabang}/${shift}/Administrator`);
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

    return {
        success, setSuccess,
        loadData,
        pemasukanBanjarbaru,
        pemasukanLandasanUlin,
        pemasukanBanjarmasin,
        dataCabang,
        loadDataCabang,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        cetakLaporan,
        setCurrentCabang,
        getPendinganTeknisi,
        cetakLaporanHandler,
        getDataLaporan,
        getDataCabang
    }
}

export default WidgetsLaporanHelper;