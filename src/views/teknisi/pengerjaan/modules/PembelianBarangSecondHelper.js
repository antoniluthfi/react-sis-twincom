import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';

const PembelianBarangSecondHelper = () => {
    const { writeActivityLog } = LogHelper();
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
            key: 'toko_asal',
            label: 'Nama Toko Asal',
            _style: { textAlign: 'center' },
        },
        {
            key: 'lama_pemakaian',
            label: 'Lama Pemakaian',
            _style: { textAlign: 'center' },
        },
        {
            key: 'alasan_menjual',
            label: 'Alasan Menjual',
            _style: { textAlign: 'center' },
        },
        {
            key: 'pengecek',
            label: 'Pengecek',
            _style: { textAlign: 'center' },
        },
        {
            key: 'harga_beli',
            label: 'Harga Beli',
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

    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [danger, setDanger] = useState(false);
    const [warning, setWarning] = useState(false);
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [currentDataPengajuan, setCurrentDataPengajuan] = useState({});
    const [loadCurrentDataPengajuan, setLoadCurrentDataPengajuan] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [modalTitle, setModalTitle] = useState('Update Data');
    const [input, setInput] = useState({
        processor: '',
        memory: '',
        harddisk: '',
        graphic_card: '',
        cd_dvd: '0',
        keyboard: '0',
        lcd: '0',
        usb: '0',
        camera: '0',
        charger: '0',
        casing: '0',
        touchpad: '0',
        wifi: '0',
        lan: '0',
        sound: '0',
        baterai: '0',
        nota: '0',
        kotak: '0',
        tas: '0',
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
            ...input, [event.target.name]: event.target.value
        });
    }

    const checkboxChangeHandler = event => {
        if(event.target.checked) {
            setInput({
                ...input, [event.target.name]: '1'
            });
        } else {
            setInput({
                ...input, [event.target.name]: '0'
            });
        }
    }

    const closeModalHandler = action => {
        if(action === 'update') {
            setSuccess(!success);
        } else if(action === 'view') {
            setInfo(!info);
        } else if(action === 'delete') {
            setDanger(!danger);
        }
    }

    const submitHandler = action => {
        if(action === 'update') {
            updateDataPengajuan(currentDataPengajuan.no_service, 'update');
        } else if(action === 'delete') {
            updateDataPengajuan(currentDataPengajuan.no_service, 'delete');
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
            getDataPengajuan();
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getDataPengajuan = async () => {
        await axios.get(`${baseUrl}/pengajuan-pembelian-barang-second`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataPengajuan(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getDataPengajuanByNoService = async (no_service, actionModal) => {
        await axios.get(`${baseUrl}/pengajuan-pembelian-barang-second/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentDataPengajuan(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentDataPengajuan(false);

        if(actionModal === 'update') {
            setSuccess(!success);
        } else if(actionModal === 'view') {
            setInfo(!info);
        } else if(actionModal === 'delete') {
            setDanger(!danger);
        }
    }

    const updateDataPengajuan = async (no_service, action) => {
        await axios.put(`${baseUrl}/pengajuan-pembelian-barang-second/${no_service}`, {
            processor: action === 'update' ? input.processor : '',
            memory: action === 'update' ? input.memory : '',
            harddisk: action === 'update' ? input.harddisk : '',
            graphic_card: action === 'update' ? input.graphic_card : '',
            cd_dvd: action === 'update' ? input.cd_dvd : 0,
            keyboard: action === 'update' ? input.keyboard : 0,
            lcd: action === 'update' ? input.lcd : 0,
            usb: action === 'update' ? input.usb : 0,
            camera: action === 'update' ? input.camera : 0,
            charger: action === 'update' ? input.charger : 0,
            casing: action === 'update' ? input.casing : 0,
            touchpad: action === 'update' ? input.touchpad : 0,
            wifi: action === 'update' ? input.wifi : 0,
            lan: action === 'update' ? input.lan : 0,
            sound: action === 'update' ? input.sound : 0,
            baterai: action === 'update' ? input.baterai : 0,
            nota: action === 'update' ? input.nota : 0,
            kotak: action === 'update' ? input.kotak : 0,
            tas: action === 'update' ? input.tas : 0,
            id_teknisi: action === 'update' ? currentUser.id : ''   
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            getDataPengajuan();
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengajuan Pembelian Barang Second', 'UPDATE', `${currentUser.name} ${action === 'update' ? 'mengubah' : 'mereset'} data nomor service ${currentDataPengajuan.no_service}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        if(action === 'update') {
            setSuccess(!success);
        } else if(action === 'delete') {
            setDanger(!danger);
        }
    }

    return {
        fields,
        success, setSuccess,
        info,
        danger,
        warning, setWarning,
        dataPengajuan,
        isLoading,
        currentDataPengajuan,
        loadCurrentDataPengajuan,
        input, 
        modalTitle,
        details, setDetails, 
        toggleDetails,
        changeHandler,
        checkboxChangeHandler,
        closeModalHandler,
        submitHandler,
        getCurrentUser,
        getDataPengajuanByNoService
    }
}

export default PembelianBarangSecondHelper;