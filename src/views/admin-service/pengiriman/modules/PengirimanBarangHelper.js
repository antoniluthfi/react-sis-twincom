import { useState, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const PengirimanBarangHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'no_surat_jalan',
            label: 'No Surat Jalan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'tujuan',
            label: 'Tujuan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'alamat',
            label: 'Alamat',
            _style: { textAlign: 'center' },
        },
        {
            key: 'pengirim',
            label: 'Pengirim',
            _style: { textAlign: 'center' },
        },
        {
            key: 'pengantar',
            label: 'Pengantar',
            _style: { textAlign: 'center' },
        },
        {
            key: 'admin',
            label: 'Admin',
            _style: { textAlign: 'center' },
        },
        {
            key: 'created_at',
            label: 'Tanggal Dibuat',
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

    const kodeSuratJalan = item => {
        switch (item) {
            case 'Banjarbaru':
                return 'SJ.BJB.';
            case 'Landasan Ulin':
                return 'SJ.LNU.';
            case 'Banjarmasin':
                return 'SJ.BJM.';
            default:
                return '';
        }
    }

    const kodeCabang = item => {
        switch (item) {
            case 1:
            case 'Banjarbaru':
                return 'S.BJB.';
            case 2:
            case 'Banjarmasin':
                return 'S.BJM.';
            case 3:
            case 'Landasan Ulin':
                return 'S.LNU.';
            default:
                return '';
        }
    }

    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [openModalBarang, setOpenModalBarang] = useState(false);
    const [color, setColor] = useState('success');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [isLoading, setIsLoading] = useState(true);
    const [dataPengiriman, setDataPengiriman] = useState([]);
    const [dataListPengiriman, setDataListPengiriman] = useState({});
    const [loadDataListPengiriman, setLoadDataListPengiriman] = useState(true);
    const [currentPengiriman, setCurrentPengiriman] = useState({});
    const [loadCurrentPengiriman, setLoadCurrentPengiriman] = useState(true);
    const [dataPartner, setDataPartner] = useState({});
    const [loadDataPartner, setLoadDataPartner] = useState(true);
    const [dataTeknisi, setDataTeknisi] = useState({});
    const [loadDataTeknisi, setLoadDataTeknisi] = useState(true);
    const [dataBarangService, setDataBarangService] = useState([]);
    const [loadDataBarangService, setLoadDataBarangService] = useState(true);
    const [dataBarangForCurrentSuratJalan, setDataBarangForCurrentSuratJalan] = useState({});
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [input, setInput] = useState({
        id_partner: '',
        id_pengirim: '',
        id_pengantar: '',
        keterangan: '',
    });
    const [currentPartner, setCurrentPartner] = useState({
        nama: ''
    });
    const [currentPengirim, setCurrentPengirim] = useState({
        name: ''
    });
    const [currentPengantar, setCurrentPengantar] = useState({
        name: ''
    });
    const [currentBarangService, setCurrentBarangService] = useState({
        merek: '',
        tipe: '',
        id_cabang: '',
        no_service: '',
        kelengkapan: ''
    });
    const [inputBarang, setInputBarang] = useState([
        { no_service: '', sn: '', kelengkapan: '', kerusakan: '' }
    ]);
    const [currentKelengkapan, setCurrentKelengkapan] = useState({});
    const [loadCurrentKelengkapan, setLoadCurrentKelengkapan] = useState(true);
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
    }

    const barangChangeHandler = (index, event) => {
        const values = [...inputBarang];
        values[index][event.target.name] = event.target.value;
        setInputBarang(values);
    }

    const addBarangHandler = useCallback(() => {
        setInputBarang([...inputBarang, { no_service: '', kelengkapan: '', kerusakan: '' }]);
    }, [inputBarang]);

    const removeBarangHandler = useCallback(index => {
        const values = [...inputBarang];
        values.splice(index, 1);
        setInputBarang(values);
    }, [inputBarang]);

    const submitHandler = action => {
        if(action === 'Submit') {
            postNewSuratJalan();
        } else if(action === 'Tambah Barang') {
            postNewDataBarang();
        } else if(action === 'Delete') {
            deletePengiriman(currentPengiriman.no_surat_jalan);
        }
    }

    const closeModalHandler = action => {
        if(action === 'view') {
            setInfo(!info);
        } else if(action === 'submit') {
            setSuccess(!success);
        } else if(action === 'tambah barang') {
            setOpenModalBarang(!openModalBarang);
        }

        setInput({
            id_partner: '',
            id_pengirim: '',
            id_pengantar: '',
            keterangan: '',    
        });

        setCurrentPengantar({
            name: ''
        });

        setCurrentPengirim({
            name: ''
        });

        setCurrentPartner({
            nama: ''
        });

        setInputBarang([
            { no_service: '', sn: '', kelengkapan: '', kerusakan: '' }
        ]);
    }

    const getCurrentUser = () => {
        getDataPengirimanBarang(currentUser.id);
    }

    const getDataPengirimanBarang = async id_admin => {
        await axios.get(`${baseUrl}/pengiriman-barang/admin/${id_admin}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataPengiriman(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getDataPengirimanBarangById = async (no_surat_jalan, actionModal) => {
        await axios.get(`${baseUrl}/pengiriman-barang/${no_surat_jalan}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentPengiriman(response.data.data);
            setCurrentBarangService({
                ...currentBarangService, id_cabang: kodeCabang(currentUser.cab_penempatan)
            });
            getDataBarangService(response.data.data.id_partner);
            console.log('no', no_surat_jalan);
            getDataListPengiriman(no_surat_jalan);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentPengiriman(false);

        if(actionModal === 'view') {
            setInfo(!info);
        } else if(actionModal === 'tambah barang') {
            setOpenModalBarang(!openModalBarang);
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
                    deletePengiriman(no_surat_jalan);
                }
            })
        }
    }

    const getDataPartner = async () => {
        await axios.get(`${baseUrl}/partner`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataPartner(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataPartner(false);
    }

    const getDataTeknisi = async () => {
        await axios.get(`${baseUrl}/user/role/teknisi`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataTeknisi(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataTeknisi(false);
    }

    const getDataBarangService = async id_partner => {
        await axios.get(`${baseUrl}/pengerjaan/2/${id_partner}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item.penerimaan));
            setDataBarangService(data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataBarangService(false);
    }

    const getListKelengkapanByNoService = async no_service => {
        await axios.get(`${baseUrl}/list-kelengkapan-penerimaan-barang/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentKelengkapan(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentKelengkapan(false);
    }

    const getDataListPengiriman = async no_surat_jalan => {
        await axios.get(`${baseUrl}/list-pengiriman/${no_surat_jalan}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            console.log(response.data.data);
            setDataListPengiriman(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataListPengiriman(false);
    }

    const postNewSuratJalan = async () => {
        await axios.post(`${baseUrl}/pengiriman-barang`, {
            id_admin: currentUser.id,
            id_pengirim: input.id_pengirim,
            id_pengantar: input.id_pengantar,
            id_partner: input.id_partner,
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengiriman Barang', 'POST', `${currentUser.name} menambahkan nomor surat jalan ${kodeCabang(response.data.data.cabang)}${response.data.data.no_surat_jalan} sebagai data baru`);
            getDataPengirimanBarang(currentUser.id);
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

    const postNewDataBarang = async () => {
        await axios.post(`${baseUrl}/list-pengiriman`, {
            no_surat_jalan: currentPengiriman.no_surat_jalan,
            payload: inputBarang
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengiriman Barang', 'POST', `${currentUser.name} menambahkan barang pada nomor surat jalan ${kodeCabang(response.data.data.cabang)}${response.data.data.no_surat_jalan}`);
            getDataPengirimanBarang(currentUser.id);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        setOpenModalBarang(!openModalBarang);
    }

    const deletePengiriman = async no_surat_jalan => {
        await axios.delete(`${baseUrl}/pengiriman-barang/${no_surat_jalan}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            deleteListPengiriman(no_surat_jalan);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengiriman Barang', 'DELETE', `${currentUser.name} menghapus data nomor surat ${kodeCabang(currentPengiriman.cabang)}${currentPengiriman.no_surat_jalan}`);
        })
        .catch(error => {
            console.log(error);
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })
    }

    const deleteListPengiriman = async no_surat_jalan => {
        await axios.delete(`${baseUrl}/list-pengiriman/${no_surat_jalan}`, {
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

            getDataPengirimanBarang(currentUser.id);
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
        kodeSuratJalan,
        kodeCabang,
        success, setSuccess,
        info, 
        openModalBarang, setOpenModalBarang,
        color,
        isLoading,
        dataPengiriman,
        dataListPengiriman,
        loadDataListPengiriman,
        input, setInput,
        inputBarang, setInputBarang,
        buttonSubmitName,
        modalTitle,
        details, setDetails,
        currentUser,
        currentPengiriman,
        loadCurrentPengiriman,
        dataBarangService,
        loadDataBarangService,
        dataPartner,
        loadDataPartner,
        currentPartner, setCurrentPartner,
        dataTeknisi,
        loadDataTeknisi,
        currentPengirim, setCurrentPengirim,
        currentPengantar, setCurrentPengantar,
        currentBarangService, setCurrentBarangService,
        dataBarangForCurrentSuratJalan,
        currentKelengkapan,
        loadCurrentKelengkapan,
        toggleDetails,
        changeHandler,
        barangChangeHandler,
        addBarangHandler,
        removeBarangHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPengirimanBarangById,
        getDataPartner,
        getDataTeknisi,
        getListKelengkapanByNoService
    }
}

export default PengirimanBarangHelper;