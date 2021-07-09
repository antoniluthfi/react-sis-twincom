import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const ArusKasHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'no_bukti',
            label: 'No Bukti',
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
            key: 'dp',
            label: 'Pembayaran',
            _style: { textAlign: 'center' },
        },
        {
            key: 'masuk',
            label: 'Masuk',
            _style: { textAlign: 'center' },
        },
        {
            key: 'keluar',
            label: 'Keluar',
            _style: { textAlign: 'center' },
        },
        {
            key: 'id_admin',
            label: 'Admin',
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

    const kas = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Tunai';
            case '1':
            case 1:
                return 'Bank';
            default:
                return '';
        }
    }

    const pembayaran = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Cash';
            case '1':
            case 1:
                return 'DP';
            default:
                return '';
        }
    }

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

    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [color, setColor] = useState('success');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [dataCabang, setDataCabang] = useState({});
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] = useState('d-none');
    const [filterCabang, setFilterCabang] = useState('d-none');
    const [filterShift, setFilterShift] = useState('d-none');
    const [arusKas, setArusKas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentArusKas, setCurrentArusKas] = useState({});
    const [loadCurrentArusKas, setLoadCurrentArusKas] = useState(true);
    const [details, setDetails] = useState([]);
    const [dataRekening, setDataRekening] = useState({});
    const [loadDataRekening, setLoadDataRekening] = useState(true);
    const [rekeningVisibility, setRekeningVisibility] = useState('d-none');
    const [sandiTransaksiOptions, setSandiTransaksiOptions] = useState([]);
    const [currentSandiTransaksi, setCurrentSandiTransaksi] = useState({
        sandi_transaksi: ''
    });
    const [adminOptions, setAdminOptions] = useState([]);
    const [currentAdmin, setCurrentAdmin] = useState({
        name: ''
    });
    const [input, setInput] = useState({
        kas: '',
        norekening: '',
        nominal: '',
        id_sandi: '',
        id_admin: '',
        keterangan: ''
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
        if(action === 'Submit') {
            postDataArusKas();
        } else if(action === 'Update') {
            updateDataArusKas(currentArusKas.no_bukti);
        } else if(action === 'CetakLaporan') {
            getDataLaporan();
        }
    }

    const closeModalHandler = action => {
        if(action === 'Submit' || action === 'Update') {
            setSuccess(false);
        } else if(action === 'view') {
            setInfo(false);
        }

        setModalTitle('Tambah Data');
        setButtonSubmitName('Submit');
        setInput({
            kas: '',
            norekening: '',
            nominal: '',
            id_sandi: '',
            keterangan: ''    
        });

        setCurrentSandiTransaksi({
            sandi_transaksi: ''
        });

        setCurrentAdmin({
            name: ''
        });
    }

    const getCurrentUser = () => {
        getDataArusKas();
        getDataAdmin(currentUser.cab_penempatan);
    }

    const getDataArusKas = async () => {
        await axios.get(`${baseUrl}/arus-kas`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setArusKas(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getDataArusKasById = async (no_bukti, actionModal) => {
        await axios.get(`${baseUrl}/arus-kas/${no_bukti}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentArusKas(response.data.data);

            if(actionModal === 'update') {
                let keterangan = response.data.data.keterangan.split(response.data.data.transaksi.sandi_transaksi);
    
                setInput({
                    kas: response.data.data.kas,
                    norekening: response.data.data.norekening,
                    nominal: response.data.data.nominal,
                    id_sandi: response.data.data.id_sandi,
                    keterangan: keterangan[1].trim()     
                });
    
                setCurrentSandiTransaksi({
                    sandi_transaksi: response.data.data.transaksi.sandi_transaksi
                });
    
                setCurrentAdmin({
                    name: response.data.data.admin.name
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentArusKas(false);

        if(actionModal === 'view') {
            setInfo(true);
        } else if(actionModal === 'update') {
            setModalTitle('Updata Data');
            setButtonSubmitName('Update');
            setSuccess(true);
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
                    deleteDataArusKas(no_bukti);
                }
            })
        }
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

    const getDataSandiTransaksi = async () => {
        await axios.get(`${baseUrl}/sandi-transaksi`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`                   
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item));
            setSandiTransaksiOptions(data);
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

    const getDataAdmin = async cabang => {
        await axios.get(`${baseUrl}/user/role/admin service/${cabang}`, {
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

    const postDataArusKas = async () => {
        let inputNominal;
        if(input.nominal != currentArusKas.nominal) {
            if(input.nominal.indexOf(',') !== -1 || input.nominal.indexOf('.') !== -1) {
                inputNominal = input.nominal.replace(/[^a-z\d\s]+/gi, "");
                inputNominal = inputNominal.split('Rp ');
                inputNominal = inputNominal[1];
            } else {
                inputNominal = input.nominal;
            }
        } else {
            inputNominal = input.nominal;
        }

        await axios.post(`${baseUrl}/arus-kas`, {
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-',
            id_admin: currentUser.id,
            nominal: inputNominal,
            dp: 0,
            id_sandi: input.id_sandi,
            keterangan: input.keterangan,
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
                response.data.message,
                'success'
            );

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Arus Kas', 'POST', `${currentUser.name} menambahkan nomor bukti ${response.data.data.no_bukti} sebagai data baru`);
            getDataArusKas(currentUser.id);
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

    const updateDataArusKas = async no_bukti => {
        let inputNominal;
        if(input.nominal != currentArusKas.nominal) {
            if(input.nominal.indexOf(',') !== -1 || input.nominal.indexOf('.') !== -1) {
                inputNominal = input.nominal.replace(/[^0-9]+/g, "");
            } else {
                inputNominal = input.nominal;
            }
        } else {
            inputNominal = input.nominal;
        }

        await axios.put(`${baseUrl}/arus-kas/${no_bukti}`, {
            kas: input.kas,
            norekening: input.kas == 1 ? input.norekening : '-',
            nominal: inputNominal,
            dp: 0,
            id_sandi: input.id_sandi,
            keterangan: input.keterangan
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Arus Kas', 'UPDATE', `${currentUser.name} mengubah data nomor bukti ${currentArusKas.no_bukti}`);
            getDataArusKas(currentUser.id);
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

    const deleteDataArusKas = async no_bukti => {
        await axios.delete(`${baseUrl}/arus-kas/${no_bukti}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Arus Kas', 'DELETE', `${currentUser.name} menghapus data nomor bukti ${currentArusKas.no_bukti}`);
            getDataArusKas(currentUser.id);
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

        window.open(`${process.env.REACT_APP_PUBLIC_URL}/laporan-arus-kas/${dari}/${sampai}/${cabang}/${shift}/${currentUser.name}`);
    }

    return {
        fields,
        kas,
        pembayaran,
        kodeCabang,
        success, setSuccess, 
        info, 
        warning, setWarning,
        color, 
        modalTitle,
        buttonSubmitName,
        arusKas,
        isLoading,
        currentArusKas,
        loadCurrentArusKas,
        currentUser,
        details,
        dataCabang,
        loadDataCabang,
        filterLebihDariSatuHari,
        filterCabang,
        filterShift,
        dataRekening,
        loadDataRekening,
        rekeningVisibility,
        sandiTransaksiOptions,
        currentSandiTransaksi, setCurrentSandiTransaksi,
        adminOptions,
        currentAdmin, setCurrentAdmin,
        input, setInput,
        cetakLaporan,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataArusKasById,
        getDataRekening,
        getDataSandiTransaksi,
        getDataAdmin,
        getDataCabang,
        cetakLaporanHandler
    }
}

export default ArusKasHelper;