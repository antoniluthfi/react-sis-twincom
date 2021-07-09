import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const PembelianBarangSecondHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
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
    const [warning, setWarning] = useState(false);
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [currentDataPengajuan, setCurrentDataPengajuan] = useState({});
    const [loadCurrentDataPengajuan, setLoadCurrentDataPengajuan] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [hargaBeliVisibility, setHargaBeliVisibility] = useState('d-none');
    const [alasanBatalVisibility, setAlasanBatalVisibility] = useState('d-none');
    const [input, setInput] = useState({

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

        if(event.target.name === 'dibeli' && event.target.value === '1') {
            setHargaBeliVisibility('d-block');
            setAlasanBatalVisibility('d-none');
        } else if(event.target.name === 'dibeli' && event.target.value === '0') {
            setHargaBeliVisibility('d-none');
            setAlasanBatalVisibility('d-block');
        }
    }

    const closeModalHandler = action => {
        if(action === 'update') {
            setSuccess(!success);
        } else if(action === 'view') {
            setInfo(!info);
        }
    }

    const submitHandler = action => {
        if(action === 'update') {
            updateDataPengajuan(currentDataPengajuan.no_service, 'update');
        } else if(action === 'delete') {
            updateDataPengajuan(currentDataPengajuan.no_service, 'reset');
        }
    }

    const getCurrentUser = async () => {
        getDataPengajuan();
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
                    updateDataPengajuan(no_service, 'reset');
                }
            })
        }
    }

    const updateDataPengajuan = async (no_service, action) => {
        await axios.put(`${baseUrl}/pengajuan-pembelian-barang-second/${no_service}`, {
            dibeli: action === 'update' ? input.dibeli : '',
            harga_beli: action === 'update' ? input.harga_beli : 0,
            alasan_batal: action === 'update' ? input.alasan_batal : ''
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengajuan Pembelian Barang Second', 'UPDATE', `${currentUser.name} mengubah data nomor service ${currentDataPengajuan.no_service}`);
            updateDataPengerjaan(currentDataPengajuan.pengerjaan.no_pengerjaan, action);
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

    const updateDataPengerjaan = async (no_pengerjaan, action) => {
        await axios.put(`${baseUrl}/pengerjaan/${no_pengerjaan}`, {
            harga_beli: action === 'update' ? input.harga_beli : 0,
            alasan_batal: action === 'update' ? input.alasan_batal : ''
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
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    return {
        fields,
        success, setSuccess,
        info,
        warning, setWarning,
        dataPengajuan,
        isLoading,
        currentDataPengajuan,
        loadCurrentDataPengajuan,
        input, 
        modalTitle,
        hargaBeliVisibility,
        alasanBatalVisibility,
        details, setDetails, 
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        getCurrentUser,
        getDataPengajuanByNoService
    }
}

export default PembelianBarangSecondHelper;