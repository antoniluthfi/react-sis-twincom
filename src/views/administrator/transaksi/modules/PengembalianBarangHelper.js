import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';
import { useSelector } from 'react-redux';
import { useModal } from '../../../hooks/customHooks';

const PengembalianBarangHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
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
            key: 'biaya_service',
            label: 'Total Biaya',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status_pembayaran',
            label: 'Status Pembayaran',
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
            case '0':
            case 0:
                return 'Belum Lunas';
            case '1':
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

    const [successToggle, success] = useModal();
    const [infoToggle, info] = useModal();
    const [openModalKembalikanBarangToggle, openModalKembalikanBarang] = useModal();
    const [openCancelModalToggle, openCancelModal] = useModal();
    const [openBayarModalToggle, openBayarModal] = useModal();
    const [warningToggle, warning] = useModal();
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
    const [adminOptions, setAdminOptions] = useState([]);
    const [currentAdmin, setCurrentAdmin] = useState({
        name: ''
    });
    const [input, setInput] = useState({
        biaya_service: '',
        norekening: '',
        dp: '',
        kas: '',
        keterangan: '',
        id_sandi: '',
        cek_stiker: '',
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

        if(event.target.name === 'value' && event.target.value === '1') {
            setInput({
                ...input, diskon: '1'
            });
        } else if(event.target.name === 'value' && event.target.value === '0') {
            setInput({
                ...input, diskon: '0'
            });
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
        } else if(action === 'CetakLaporan') {
            getDataLaporan();
        }
    }

    const closeModalHandler = action => {
        if(action === 'Cancel') {
            openCancelModalToggle();
        } else if(action === 'Kembalikan') {
            openModalKembalikanBarangToggle();
        } else if(action === 'View') {
            infoToggle();
        } else if(action === 'Bayar') {
            openBayarModalToggle();
        }

        setInput({
            biaya_service: '',
            norekening: '',
            dp: '',
            kas: '',
            keterangan: '',
            id_sandi: '',
            cek_stiker: '',
            id_admin: '',
            diskon: '',
            diskon_kecewa: ''
        });

        setCurrentAdmin({
            name: ''
        });
    }

    const getCurrentUser = () => {
        getDataPengembalian();
        getDataAdmin();
    }

    const getDataPengembalian = async () => {
        await axios.get(`${baseUrl}/pengembalian`, {
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
            infoToggle();
        } else if(actionModal === 'kembalikan') {
            openModalKembalikanBarangToggle();
        } else if(actionModal === 'cancel') {
            openCancelModalToggle();
        } else if(actionModal === 'bayar') {
            openBayarModalToggle();
        } else if(actionModal === 'delete') {
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
                    deleteDataPengembalian(no_pengembalian);
                }
            })
        }
    } 

    const updateDataPengembalian = async (no_pengembalian, actionHandler) => {
        let message = '';
        if(!input.dp) message = 'Metode pembayaran harus dipilih salah satu!';
        else if(input.dp == '1' && !input.biaya_service) message = 'Biaya service harus diisi!';
        else if(input.kas == '') message = 'Kas harus dipilih salah satu!';
        else if(input.kas == '1' && !input.norekening) message = 'Nomor rekening harus dipilih salah satu!';
        else if(!input.cek_stiker) message = 'Cek stiker harus dipilih salah satu!';
        else if(!input.id_sandi) message = 'Sandi transaksi harus dipilih salah satu!';
        else if(!input.id_admin) message = 'Admin harus diisi!';

        if(message != '') {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            let inputBiaya;
            let status_pembayaran = 0;
            let diskon;
            let inputDiskon = 0;
            
            if(input.dp == 1) {
                inputBiaya = input.biaya_service.replace(/[^0-9]+/g, "");
            } else {
                status_pembayaran = 1;
                inputBiaya = currentPengembalian.pengerjaan.biaya_service;
    
                if(input.diskon == '1') {
                    inputDiskon = 1;
                    diskon = currentPengembalian.penerimaan.customer.member.diskon.replace(/[^0-9]+/g, "");
                    if(currentPengembalian.penerimaan.customer.member.diskon.includes('Rp')) {
                        inputBiaya = inputBiaya - parseInt(diskon);
                    } else if(currentPengembalian.penerimaan.customer.member.diskon.includes('%')) {
                        inputBiaya = inputBiaya - (inputBiaya * parseInt(diskon) / 100);
                    }
                }
            }

            if(input.diskon_kecewa != '') {
                inputDiskon = 1;
                status_pembayaran = 1;
                diskon = input.diskon_kecewa.replace(/[^0-9]+/g, "");
                if(input.diskon_kecewa.includes('Rp')) inputBiaya = currentPengembalian.pengerjaan.biaya_service - parseInt(diskon);
            }
    
            await axios.put(`${baseUrl}/pengembalian/${no_pengembalian}`, {
                status_pengembalian: 1,
                status_pembayaran: status_pembayaran,
                cek_stiker: input.cek_stiker,
                id_admin: input.id_admin,
                nominal: parseInt(currentPengembalian.nominal) + inputBiaya,
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
    
            closeModalHandler(actionHandler);
        }
    }

    const postDataAruskas = async () => {
        let inputBiaya;
        let diskon;
        if(input.dp == 1) {
            inputBiaya = input.biaya_service.replace(/[^0-9]+/g, "");
        } else {
            inputBiaya = currentPengembalian.pengerjaan.biaya_service;

            if(input.diskon == '1') {
                diskon = currentPengembalian.penerimaan.customer.member.diskon.replace(/[^0-9]+/g, "");
                if(currentPengembalian.penerimaan.customer.member.diskon.includes('Rp')) {
                    inputBiaya = inputBiaya - parseInt(diskon);
                } else if(currentPengembalian.penerimaan.customer.member.diskon.includes('%')) {
                    inputBiaya = inputBiaya - (inputBiaya * parseInt(diskon) / 100);
                }
            }
        }

        await axios.post(`${baseUrl}/arus-kas`, {
            no_pengembalian: currentPengembalian.no_pengembalian,
            no_service: currentPengembalian.no_service,
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
            postListRating(currentPengembalian.no_service);
            getDataPengembalian();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const postListRating = async no_service => {
        let teknisi = [];
        await currentPengembalian.penerimaan.teknisi.map(item => teknisi.push(item.teknisi.name));
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
                inputBiaya = input.biaya_service.replace(/[^0-9]+/g, "");
            } else {
                inputBiaya = input.biaya_service;
            }
        } else {
            inputBiaya = input.biaya_service;
        }

        let total = parseInt(currentPengembalian.nominal) + parseInt(inputBiaya);
        let status_pembayaran = 0;
        if(total <= parseInt(currentPengembalian.pengerjaan.biaya_service)) {
            status_pembayaran = 1;
        }

        await axios.put(`${baseUrl}/pengembalian/${no_pengembalian}`, {
            nominal: total,
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
            no_pengembalian: currentPengembalian.no_pengembalian,
            no_service: currentPengembalian.no_service,
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-',
            dp: 0,
            nominal: nominal,
            id_admin: input.id_admin,
            keterangan: `${currentPengembalian.penerimaan.merek} ${currentPengembalian.penerimaan.tipe}`,
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
            getDataPengembalian();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        closeModalHandler('Bayar');
    }

    const deleteDataPengembalian = async no_pengembalian => {
        await axios.put(`${baseUrl}/pengembalian/${no_pengembalian}`, {
            id_admin: '',
            status_pengembalian: 0,
            status_pembayaran: 0,
            nominal: 0,
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
            deleteDataArusKas(no_pengembalian);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengembalian Barang', 'UPDATE', `${currentUser.name} mereset data nomor pengembalian ${currentPengembalian.no_pengembalian}`);
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
            deleteListRating(currentPengembalian.no_service);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const deleteListRating = async no_service => {
        await axios.delete(`${baseUrl}/review-kepuasan-pelanggan/${no_service}`, {
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
            getDataPengembalian();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const getDataLaporan = () => {
        let dari;
        let sampai;
        let cabang;
        let shift;
        
        if(cetakLaporan.dari == '') {
            dari = 'x';
        } else {
            dari = cetakLaporan.dari;
        }

        if(cetakLaporan.sampai == '') {
            sampai = 'x';
        } else {
            sampai = cetakLaporan.sampai;
        }

        if(cetakLaporan.cabang == '') {
            cabang = currentUser.cab_penempatan;
        } else {
            cabang = cetakLaporan.cabang;
        }

        if(cetakLaporan.shift == '') {
            shift = 'x';
        } else {
            shift = cetakLaporan.shift;
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
        success, successToggle,
        info,
        openModalKembalikanBarang,
        openCancelModal,
        openBayarModal,
        warning, warningToggle,
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
        adminOptions, 
        currentAdmin, setCurrentAdmin,
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