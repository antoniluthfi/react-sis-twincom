import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';

const PengembalianBarangHelper = () => {
    const { writeActivityLog } = LogHelper();
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'no_pengembalian',
            label: 'No Pengembalian',
            _style: { textAlign: 'center' },
        },
        {
            key: 'no_service',
            label: 'No Service',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_pelanggan',
            label: 'Nama Pelanggan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'merek_tipe',
            label: 'Merek Tipe',
            _style: { textAlign: 'center' },
        },
        {
            key: 'bj',
            label: 'Barang/Jasa',
            _style: { textAlign: 'center' },
        },
        {
            key: 'admin',
            label: 'Admin',
            _style: { textAlign: 'center' },
        },
        {
            key: 'teknisi_pj',
            label: 'Teknisi PJ',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status_pembayaran',
            label: 'Status Pembayaran',
            _style: { textAlign: 'center' },
        },
        {
            key: 'stiker',
            label: 'Stiker Twincom',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status_pengembalian',
            label: 'Status Pengembalian',
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

    const kodeCabang = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'S.BJB.';
            case 'Landasan Ulin':
                return 'S.LNU.';
            case 'Banjarmasin':
                return 'S.BJM.';
            default:
                return '';
        }
    }

    const statusPembayaran = item => {
        switch (item) {
            case 0:
                return 'Belum Lunas';
            case 1:
                return 'Lunas';
            default:
                return '';
        }
    }

    const statusPengerjaan = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Belum Dikerjakan';
            case '1':
            case 1:
                return 'Cancel';
            case '2':
            case 2:
                return 'Sedang Dikerjakan';
            case '3':
            case 3:
                return 'Selesai';
            default:
                return ''
        }
    }

    const stiker = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Belum Ditempel';
            case '1':
            case 1:
                return 'Sudah Ditempel';
            default:
                return 'Belum Ditempel';
        }
    }

    const statusPengembalian = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Belum Dikembalikan';
            case '1':
            case 1:
                return 'Sudah Dikembalikan';
            default:
                return '';
        }
    }

    const [success, setSuccess] = useState(false);
    const [danger, setDanger] = useState(false);
    const [info, setInfo] = useState(false);
    const [openModalKembalikanBarang, setOpenModalKembalikanBarang] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openBayarModal, setOpenBayarModal] = useState(false);
    const [warning, setWarning] = useState(false);
    const [color, setColor] = useState('success');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [currentUser, setCurrentUser] = useState({});
    const [dataPengembalian, setDataPengembalian] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPengembalian, setCurrentPengembalian] = useState({});
    const [loadDataPengembalian, setLoadDataPengembalian] = useState(true);
    const [dataRekening, setDataRekening] = useState({});
    const [loadDataRekening, setLoadDataRekening] = useState(true);
    const [rekeningVisibility, setRekeningVisibility] = useState('d-none');
    const [nominalVisibility, setNominalVisibility] = useState('d-none');
    const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] = useState('d-none');
    const [filterCabang, setFilterCabang] = useState('d-none');
    const [filterShift, setFilterShift] = useState('d-none');
    const [sandiTransaksi, setSandiTransaksi] = useState({});
    const [loadSandiTransaksi, setLoadSandiTransaksi] = useState(true);
    const [dataCabang, setDataCabang] = useState({});
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [input, setInput] = useState({
        biaya_service: '',
        norekening: '',
        dp: '',
        kas: '',
        keterangan: '',
        id_sandi: '',
        cek_stiker: '',
        id_admin: ''
    });
    const [cetakLaporan, setCetakLaporan] = useState({
        dari: '',
        sampai: '',
        cabang: '',
        shift: ''
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
            ...input, [event.target.name]:event.target.value
        });

        if(event.target.name === 'dp' && event.target.value === '1') {
            setNominalVisibility('d-block');
        } else if(event.target.name === 'dp' && event.target.value === '0') {
            setNominalVisibility('d-none');
        }

        if(event.target.name === 'kas' && event.target.value === '1') {
            setRekeningVisibility('d-block');
        } else if(event.target.name === 'kas' && event.target.value === '0') {
            setRekeningVisibility('d-none');
        }
    }

    const cetakLaporanHandler = event => {
        setCetakLaporan({
            ...cetakLaporan, [event.target.name]:event.target.value
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

    const submitHandler = action => {
        if(action === 'Kembalikan' || action === 'Cancel') {
            updateDataPengembalian(currentPengembalian.no_pengembalian, action);
        } else if(action === 'Bayar') {
            bayarSisaKekuranganPembayaran(currentPengembalian.no_pengembalian);
        } else if(action === 'Delete') {
            deleteDataPengembalian(currentPengembalian.no_pengembalian);
        } else if(action === 'CetakLaporan') {
            getDataLaporan();
        }

        setInput({
            biaya_service: '',
            norekening: '',
            dp: '',
            kas: '',
            keterangan: '',
            id_sandi: '',
            cek_stiker: '',
            id_admin: ''    
        });
    }

    const closeModalHandler = action => {
        if(action === 'Cancel') {
            setOpenCancelModal(!openCancelModal);
        } else if(action === 'Kembalikan') {
            setOpenModalKembalikanBarang(!openModalKembalikanBarang);
        } else if(action === 'View') {
            setInfo(!info);
        } else if(action === 'Bayar') {
            setOpenBayarModal(!openBayarModal);
        } else if(action === 'Delete') {
            setDanger(!danger);
        }
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
            getDataPengembalian(response.data.data.cab_penempatan);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getDataPengembalian = async cabang => {
        await axios.get(`${baseUrl}/pengembalian/cabang/${cabang}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataPengembalian(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getDataPengembalianById = async (no_pengembalian, actionModal) => {
        await axios.get(`${baseUrl}/pengembalian/${no_pengembalian}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentPengembalian(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataPengembalian(false);

        if(actionModal === 'view') {
            setInfo(!info);
        } else if(actionModal === 'kembalikan') {
            setOpenModalKembalikanBarang(!openModalKembalikanBarang);
        } else if(actionModal === 'cancel') {
            setOpenCancelModal(!openCancelModal);
        } else if(actionModal === 'bayar') {
            setOpenBayarModal(!openBayarModal);
        } else if(actionModal === 'delete') {
            setDanger(!danger);
        }
    } 

    const updateDataPengembalian = async (no_pengembalian, actionHandler) => {
        let inputBiaya = input.biaya_service.replace(/[^a-z\d\s]+/gi, "");
        inputBiaya = inputBiaya.split('Rp ');
        inputBiaya = inputBiaya[1];

        if(parseInt(currentPengembalian.pengerjaan.biaya_service) <= parseInt(inputBiaya)) {
            var status_pembayaran = 1;
        } else {
            var status_pembayaran = 0;
        }

        await axios.put(`${baseUrl}/pengembalian/${no_pengembalian}`, {
            status_pengembalian: 1,
            status_pembayaran: input.dp == 1 ? status_pembayaran : 1,
            cek_stiker: input.cek_stiker,
            id_admin: currentUser.id,
            nominal: input.dp == 1 ? inputBiaya : currentPengembalian.pengerjaan.biaya_service,
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            } 
        })
        .then(response => {
            if(actionHandler === 'Kembalikan') {
                postDataAruskas();
            } else {
                Swal.fire(
                    'Berhasil',
                    'Data berhasil diupdate',
                    'success'
                );    
            }

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengembalian Barang', 'UPDATE', `${currentUser.name} mengubah data nomor pengembalian ${currentPengembalian.no_pengembalian}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        if(actionHandler === 'Kembalikan') {
            setOpenModalKembalikanBarang(!openModalKembalikanBarang);
        } else if(actionHandler === 'Cancel') {
            setOpenCancelModal(!openCancelModal);
        }
    }

    const postDataAruskas = async () => {
        let inputBiaya;
        if(input.biaya_service != currentPengembalian.pengerjaan.biaya_service) {
            if(input.biaya_service.indexOf(',') !== -1 || input.biaya_service.indexOf('.') !== -1) {
                inputBiaya = input.biaya_service.replace(/[^a-z\d\s]+/gi, "");
                inputBiaya = inputBiaya.split('Rp ');
                inputBiaya = inputBiaya[1];
            } else {
                inputBiaya = input.biaya_service;
            }
        } else {
            inputBiaya = input.biaya_service;
        }

        await axios.post(`${baseUrl}/arus-kas`, {
            no_pengembalian: currentPengembalian.no_pengembalian,
            no_service: currentPengembalian.no_service,
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-',
            dp: input.dp,
            nominal: input.dp == 1 ? inputBiaya : currentPengembalian.pengerjaan.biaya_service,
            id_admin: currentUser.id,
            keterangan: input.keterangan,
            id_sandi: input.id_sandi,
            cabang: currentUser.cab_penempatan
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
                'Data berhasil diupdate',
                'success'
            );
            getDataPengembalian(currentUser.cab_penempatan);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const getDataRekening = async () => {
        await axios.get(`${baseUrl}/rekening`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataRekening(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataRekening(false);
    }

    const getSandiTransaksi = async () => {
        await axios.get(`${baseUrl}/sandi-transaksi/transaksi/pengembalian`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setSandiTransaksi(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadSandiTransaksi(false);
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

    const bayarSisaKekuranganPembayaran = async no_pengembalian => {
        let inputBiaya;
        if(input.biaya_service != currentPengembalian.pengerjaan.biaya_service) {
            if(input.biaya_service.indexOf(',') !== -1 || input.biaya_service.indexOf('.') !== -1) {
                inputBiaya = input.biaya_service.replace(/[^a-z\d\s]+/gi, "");
                inputBiaya = inputBiaya.split('Rp ');
                inputBiaya = inputBiaya[1];
            } else {
                inputBiaya = input.biaya_service;
            }
        } else {
            inputBiaya = input.biaya_service;
        }

        let total = parseInt(currentPengembalian.nominal) + parseInt(inputBiaya);
        let status_pembayaran = 0;
        if(total == parseInt(currentPengembalian.pengerjaan.biaya_service) || total > parseInt(currentPengembalian.pengerjaan.biaya_service)) {
            status_pembayaran = 1;
        }

        await axios.put(`${baseUrl}/pengembalian/${no_pengembalian}`, {
            nominal: inputBiaya,
            status_pembayaran: status_pembayaran
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            updateLunasDataAruskas();
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengembalian Barang', 'UPDATE', `${currentUser.name} mengubah data nomor pengembalian ${currentPengembalian.no_pengembalian}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })
    }

    const updateLunasDataAruskas = async () => {
        let inputBiaya;
        if(input.biaya_service != currentPengembalian.pengerjaan.biaya_service) {
            if(input.biaya_service.indexOf(',') !== -1 || input.biaya_service.indexOf('.') !== -1) {
                inputBiaya = input.biaya_service.replace(/[^a-z\d\s]+/gi, "");
                inputBiaya = inputBiaya.split('Rp ');
                inputBiaya = inputBiaya[1];
            } else {
                inputBiaya = input.biaya_service;
            }
        } else {
            inputBiaya = input.biaya_service;
        }

        let nominal = parseInt(inputBiaya) + parseInt(currentPengembalian.nominal);

        await axios.post(`${baseUrl}/arus-kas`, {
            no_pengembalian: currentPengembalian.no_pengembalian,
            no_service: currentPengembalian.no_service,
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-',
            dp: 0,
            nominal: nominal,
            id_admin: currentUser.id,
            keterangan: `${currentPengembalian.penerimaan.merek} ${currentPengembalian.penerimaan.tipe}`,
            id_sandi: 4
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
                'Data berhasil diupdate',
                'success'
            );
            getDataPengembalian(currentUser.cab_penempatan);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenBayarModal(!openBayarModal);
    }

    const deleteDataPengembalian = async no_pengembalian => {
        await axios.put(`${baseUrl}/pengembalian/${no_pengembalian}`, {
            id_admin: '',
            status_pengembalian: 0,
            status_pembayaran: 0,
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            deleteDataArusKas(no_pengembalian);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengembalian Barang', 'DELETE', `${currentUser.name} menghapus data nomor pengembalian ${currentPengembalian.no_pengembalian}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })
    }

    const deleteDataArusKas = async no_pengembalian => {
        await axios.delete(`${baseUrl}/arus-kas/pengembalian/${no_pengembalian}`, {
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
            getDataPengembalian(currentUser.cab_penempatan);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setDanger(!danger);
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
            var cabang = currentUser.cab_penempatan;
        } else {
            var cabang = cetakLaporan.cabang;
        }

        if(cetakLaporan.shift == '') {
            var shift = 'x';
        } else {
            var shift = cetakLaporan.shift;
        }

        window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan-pengembalian-barang/${dari}/${sampai}/${cabang}/${shift}/${currentUser.name}`);
    }

    return {
        fields,
        kodeCabang,
        statusPembayaran,
        statusPengerjaan,
        statusPengembalian,
        stiker,
        success, setSuccess,
        info,
        danger,
        openModalKembalikanBarang,
        openCancelModal,
        openBayarModal,
        warning, setWarning,
        color, 
        modalTitle,
        dataPengembalian,
        isLoading,
        currentPengembalian,
        loadDataPengembalian,
        dataRekening,
        loadDataRekening, 
        rekeningVisibility,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        input, setInput,
        cetakLaporan,
        details,
        nominalVisibility,
        sandiTransaksi,
        loadSandiTransaksi,
        dataCabang,
        loadDataCabang,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPengembalianById,
        getDataRekening,
        getSandiTransaksi,
        cetakLaporanHandler,
        getDataCabang
    }
}

export default PengembalianBarangHelper;