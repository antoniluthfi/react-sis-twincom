import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const PembayaranHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'no_pembayaran',
            label: 'No Pembayaran',
            _style: { textAlign: 'center' },
        },
        {
            key: 'no_service',
            label: 'No Service',
            _style: { textAlign: 'center' },
        },
        {
            key: 'bj',
            label: 'Barang/Jasa',
            _style: { textAlign: 'center' },
        },
        {
            key: 'norekening',
            label: 'Rekening',
            _style: { textAlign: 'center' },
        },
        {
            key: 'kas',
            label: 'Kas',
            _style: { textAlign: 'center' },
        },
        {
            key: 'pembayaran',
            label: 'Pembayaran',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nominal',
            label: 'Nominal',
            _style: { textAlign: 'center' },
        },
        {
            key: 'diskon',
            label: 'Diskon',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status_pembayaran',
            label: 'Status Pembayaran',
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
    
    const kodeCabang = item => {
        switch (item) {
            case 'banjarbaru':
                return 'S.BJB.';
            case 'banjarmasin':
                return 'S.BJM.';
            case 'landasan ulin':
                return 'S.LNU.';
            default:
                return '';
        }
    }

    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [openLunasModal, setOpenLunasModal] = useState(false);
    const [color, setColor] = useState('success');
    const [dataPembayaran, setDataPembayaran] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPembayaran, setCurrentPembayaran] = useState({});
    const [loadDataPembayaran, setLoadDataPembayaran] = useState(true);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [dataRekening, setDataRekening] = useState({});
    const [loadDataRekening, setLoadDataRekening] = useState(true);
    const [rekeningVisibility, setRekeningVisibility] = useState('d-none');
    const [dataCabang, setDataCabang] = useState({});
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] = useState('d-none');
    const [filterCabang, setFilterCabang] = useState('d-none');
    const [filterShift, setFilterShift] = useState('d-none');
    const [adminOptions, setAdminOptions] = useState([]);
    const [nominalVisibility, setNominalVisibility] = useState('d-none');
    const [sandiTransaksi, setSandiTransaksi] = useState([]);
    const [loadSandiTransaksi, setLoadSandiTransaksi] = useState(true);
    const [currentAdmin, setCurrentAdmin] = useState({
        name: ''
    });
    const [details, setDetails] = useState([]);
    const [input, setInput] = useState({
        biaya_service: '',
        norekening: '',
        dp: '',
        kas: '',
        keterangan: '',
        id_sandi: '',
        id_admin: '',
        diskon: '',
        diskon_kecewa: ''
    });
    const [cetakLaporan, setCetakLaporan] = useState({
        dari: '',
        sampai: '',
        cabang: '',
        shift: ''
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
            ...input, [event.target.name]:event.target.value
        });

        if(event.target.name == 'dp' && event.target.value == '1') {
            setNominalVisibility('d-block');
            setInput({
                ...input, biaya_service: 0, dp: 1
            });
        } else if(event.target.name == 'dp' && event.target.value == '0') {
            setNominalVisibility('d-none');
            setInput({
                ...input, biaya_service: currentPembayaran.pengerjaan.biaya_service, dp: 0
            });
        }

        if(event.target.name == 'kas' && event.target.value == '1') {
            setRekeningVisibility('d-block');
        } else if(event.target.name == 'kas' && event.target.value == '0') {
            setRekeningVisibility('d-none');
        }
    }

    const cetakLaporanHandler = event => {
        setCetakLaporan({
            ...cetakLaporan, [event.target.name]:event.target.value
        });

        if(event.target.name == 'filter_lebih_dari_satuhari' && event.target.checked) {
            setFilterLebihDariSatuHari('d-block');
        } else if(event.target.name == 'filter_lebih_dari_satuhari' && !event.target.checked) {
            setFilterLebihDariSatuHari('d-none');
        }

        if(event.target.name == 'filter_cabang' && event.target.checked) {
            setFilterCabang('d-block');
        } else if(event.target.name == 'filter_cabang' && !event.target.checked) {
            setFilterCabang('d-none');
        }

        if(event.target.name == 'filter_shift' && event.target.checked) {
            setFilterShift('d-block');
        } else if(event.target.name == 'filter_shift' && !event.target.checked) {
            setFilterShift('d-none');
        }
    }

    const submitHandler = action => {
        if(action == 'Bayar') {
            updateDataPembayaran(currentPembayaran.no_pembayaran);
        } else if(action == 'Lunasi') {
            bayarSisaKekuranganPembayaran(currentPembayaran.no_pembayaran);
        } else if(action == 'CetakLaporan') {
            getDataLaporan();
        }
    }   

    const closeModalHandler = action => {
        setInput({
            biaya_service: '',
            norekening: '',
            dp: '',
            kas: '',
            keterangan: '',
            id_sandi: '',
            id_admin: '',
            diskon: '',
            diskon_kecewa: ''
        });

        setCurrentAdmin({
            name: ''
        });

        if(action == 'Bayar') {
            setSuccess(!success);
        } else if(action == 'Lunasi') {
            setOpenLunasModal(!openLunasModal);
        }
    }

    const getCurrentUser = () => {
        getDataPembayaran();
        getDataAdmin();
    }

    const getDataPembayaran = async () => {
        await axios.get(`${baseUrl}/pembayaran`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataPembayaran(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getDataPembayaranById = async (no_pembayaran, actionModal) => {
        await axios.get(`${baseUrl}/pembayaran/${no_pembayaran}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentPembayaran(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataPembayaran(false);

        if(actionModal == 'view') {
            setInfo(!info);
        } else if(actionModal == 'bayar') {
            setSuccess(!success);
        } else if(actionModal == 'lunasi') {
            setOpenLunasModal(!openLunasModal);
        } else if(actionModal == 'delete') {
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
                    deleteDataPembayaran(no_pembayaran);
                }
            })
        }
    }

    const getDataAdmin = async () => {
        await axios.get(`${baseUrl}/user/role/admin service`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            setAdminOptions(data);
        })
        .catch(error => {
            console.log(error);
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

    const updateDataPembayaran = async no_pembayaran => {
        let inputBiaya;
        let status_pembayaran = 0;
        let diskon;
        let inputDiskon = 0;
        
        if(input.dp == 1) {
            inputBiaya = input.biaya_service.replace(/[^0-9]+/g, "");
        } else {
            status_pembayaran = 1;
            inputBiaya = currentPembayaran.pengerjaan.biaya_service;

            if(input.diskon == '1') {
                inputDiskon = 1;
                diskon = currentPembayaran.penerimaan.customer.member.diskon.replace(/[^0-9]+/g, "");
                if(currentPembayaran.penerimaan.customer.member.diskon.includes('Rp')) {
                    inputBiaya = inputBiaya - parseInt(diskon);
                } else if(currentPembayaran.penerimaan.customer.member.diskon.includes('%')) {
                    inputBiaya = inputBiaya - (inputBiaya * parseInt(diskon) / 100);
                }
            }
        }

        if(input.diskon_kecewa != '') {
            inputDiskon = 1;
            status_pembayaran = 1;
            diskon = input.diskon_kecewa.replace(/[^0-9]+/g, "");
            if(input.diskon_kecewa.includes('Rp')) inputBiaya = currentPembayaran.pengerjaan.biaya_service - parseInt(diskon);
        }
    
        let nominal = parseInt(currentPembayaran.nominal) + parseInt(inputBiaya);
        await axios.put(`${baseUrl}/pembayaran/${no_pembayaran}`, {
            status_pembayaran: status_pembayaran,
            keterangan_pembayaran: input.keterangan,
            dp: input.dp,
            nominal: nominal,
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-',
            id_admin: currentUser.id,
            diskon: inputDiskon,
            diskon_kecewa: input.diskon_kecewa
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            } 
        })
        .then(response => {
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pembayaran', 'UPDATE', `${currentUser.name} mengubah data nomor pembayaran ${currentPembayaran.no_pembayaran}`);
            postDataAruskas();
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

    const postDataAruskas = async () => {
        let inputBiaya;
        let diskon;
        if(input.dp == 1) {
            inputBiaya = input.biaya_service.replace(/[^0-9]+/g, "");
        } else {
            inputBiaya = currentPembayaran.pengerjaan.biaya_service;

            if(input.diskon == '1') {
                diskon = currentPembayaran.penerimaan.customer.member.diskon.replace(/[^0-9]+/g, "");
                if(currentPembayaran.penerimaan.customer.member.diskon.includes('Rp')) {
                    inputBiaya = inputBiaya - parseInt(diskon);
                } else if(currentPembayaran.penerimaan.customer.member.diskon.includes('%')) {
                    inputBiaya = inputBiaya - (inputBiaya * parseInt(diskon) / 100);
                }
            }
        }

        await axios.post(`${baseUrl}/arus-kas`, {
            no_pembayaran: currentPembayaran.no_pembayaran,
            no_service: currentPembayaran.no_service,
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-',
            dp: input.dp,
            nominal: inputBiaya,
            id_admin: input.id_admin,
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
            postListRating(currentPembayaran.no_service);
            getDataPembayaran(currentUser.cab_penempatan);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setSuccess(!success);
    }

    const postListRating = async no_service => {
        let teknisi = [];
        await currentPembayaran.teknisi.map(item => teknisi.push(item.teknisi.name));
        await teknisi.toString();

        await axios.post(`${baseUrl}/review-kepuasan-pelanggan`, {
            no_service: no_service,
            user_id: `${teknisi},${currentUser.name}`,
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
                'Berhasil',
                'Data berhasil ditambahkan',
                'success'
            );
        });
    }

    const bayarSisaKekuranganPembayaran = async no_pembayaran => {
        let inputBiaya;
        if(input.biaya_service != currentPembayaran.pengerjaan.biaya_service) {
            if(input.biaya_service.indexOf(',') !== -1 || input.biaya_service.indexOf('.') !== -1) {
                inputBiaya = input.biaya_service.replace(/[^0-9]+/g, "");
            } else {
                inputBiaya = input.biaya_service;
            }
        } else {
            inputBiaya = input.biaya_service;
        }

        let total = parseInt(currentPembayaran.nominal) + parseInt(inputBiaya);
        let status_pembayaran = 0;
        if(total <= parseInt(currentPembayaran.pengerjaan.biaya_service)) {
            status_pembayaran = 1;
        }

        await axios.put(`${baseUrl}/pembayaran/${no_pembayaran}`, {
            nominal: total,
            status_pembayaran: status_pembayaran,
            dp: 0,
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-'
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pembayaran', 'UPDATE', `${currentUser.name} mengubah data nomor pembayaran ${currentPembayaran.no_pembayaran}`);
            updateLunasDataAruskas();
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
        if(input.biaya_service != currentPembayaran.pengerjaan.biaya_service) {
            if(input.biaya_service.indexOf(',') !== -1 || input.biaya_service.indexOf('.') !== -1) {
                inputBiaya = input.biaya_service.replace(/[^0-9]+/g, "");
            } else {
                inputBiaya = input.biaya_service;
            }
        } else {
            inputBiaya = input.biaya_service;
        }

        const nominal = parseInt(inputBiaya);
        const dataSandi = sandiTransaksi.filter(item => item.sandi_transaksi.toLowerCase() == 'penerimaan biaya service');

        await axios.post(`${baseUrl}/arus-kas`, {
            no_pengembalian: currentPembayaran.no_pengembalian,
            no_service: currentPembayaran.no_service,
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-',
            dp: 0,
            nominal: nominal,
            id_admin: input.id_admin,
            keterangan: `${currentPembayaran.penerimaan.merek} ${currentPembayaran.penerimaan.tipe}`,
            id_sandi: dataSandi[0].id
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
            getDataPembayaran(currentUser.cab_penempatan);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenLunasModal(!openLunasModal);
    }

    const deleteDataPembayaran = async no_pembayaran => {
        await axios.put(`${baseUrl}/pembayaran/${no_pembayaran}`, {
            status_pembayaran: 0,
            keterangan_pembayaran: '',
            dp: 0,
            nominal: 0,
            kas: 0,
            norekening: '',
            id_admin: 0,
            diskon: 0,
            diskon_kecewa: null
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pembayaran', 'UPDATE', `${currentUser.name} mereset data nomor pembayaran ${currentPembayaran.no_pembayaran}`);
            deleteDataArusKas(no_pembayaran);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })
    }

    const deleteDataArusKas = async no_pembayaran => {
        await axios.delete(`${baseUrl}/arus-kas/pembayaran/${no_pembayaran}`, {
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

            getDataPembayaran(currentUser.cab_penempatan);
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
        success, setSuccess,
        info, 
        warning, setWarning,
        openLunasModal,
        color, 
        dataPembayaran, 
        isLoading,
        currentPembayaran,
        loadDataPembayaran,
        details,
        modalTitle,
        buttonSubmitName,
        dataRekening,
        loadDataRekening,
        dataCabang,
        loadDataCabang,
        rekeningVisibility,
        nominalVisibility,
        adminOptions,
        currentAdmin, setCurrentAdmin,
        sandiTransaksi,
        loadSandiTransaksi,
        input, setInput,
        cetakLaporan,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPembayaranById,
        getSandiTransaksi,
        getDataRekening,
        cetakLaporanHandler,
        getDataCabang
    }
}

export default PembayaranHelper;