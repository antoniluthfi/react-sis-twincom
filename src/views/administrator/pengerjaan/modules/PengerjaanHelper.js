import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const PengerjaanHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'no_pengerjaan',
            label: 'No Pengerjaan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'no_service',
            label: 'No Service',
            _style: { textAlign: 'center' },
        },
        {
            key: 'teknisi',
            label: 'Teknisi',
            _style: { textAlign: 'center' },
        },
        {
            key: 'customer',
            label: 'Nama Pelanggan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_bj',
            label: 'Barang Jasa',
            _style: { textAlign: 'center' },
        },
        {
            key: 'merek',
            label: 'Merek',
            _style: { textAlign: 'center' },
        },
        {
            key: 'tipe',
            label: 'Tipe',
            _style: { textAlign: 'center' },
        },
        {
            key: 'problem',
            label: 'Problem',
            _style: { textAlign: 'center' },
        },
        {
            key: 'kondisi',
            label: 'Kondisi',
            _style: { textAlign: 'center' },
        },
        {
            key: 'permintaan',
            label: 'Permintaan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'keterangan',
            label: 'Keterangan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'tempo',
            label: 'Tempo',
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
            case 'Banjarmasin':
                return 'S.BJM.'
            case 'Banjarbaru': 
                return 'S.BJB.'
            case 'Landasan Ulin':
                return 'S.LNU.'
            default:
                return ''
        }
    }

    const statusPengerjaan = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Belum dikerjakan' 
            case '1':
            case 1: 
                return 'Cancel'
            case '2':
            case 2:
                return 'Sedang dikerjakan'
            case '3':
            case 3:
                return 'Selesai'
            default:
                return ''
        }
    }
    
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [color, setColor] = useState('success');
    const [formDisabled, setFormDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState([]);
    const [dataPengerjaan, setDataPengerjaan] = useState([]);
    const [currentTeknisipj, setCurrentTeknisipj] = useState([]);
    const [currentPengerjaan, setCurrentPengerjaan] = useState({});
    const [loadCurrentPengerjaan, setLoadCurrentPengerjaan] = useState(true);
    const [partnerOptions, setPartnerOptions] = useState([]);
    const [garansiVisible, setGaransiVisible] = useState('d-none');
    const [alasanBatalVisible, setAlasanBatalVisible] = useState('d-none');
    const [input, setInput] = useState({
        no_pengerjaan: '',
        status_pengerjaan: '2',
        biaya_service: '',
        id_partner: '',
        garansi: '',
        alasan_batal: '',
        pengerjaan: '',
        keterangan: '',
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

    const submitHandler = action => {
        if(action === 'Submit') {
            postDataPengerjaan(currentPengerjaan.no_pengerjaan);
        } else if(action === 'Update') {
            updateDataPengerjaan(currentPengerjaan.no_pengerjaan);
        }

        setInput({
            no_pengerjaan: '',
            status_pengerjaan: '2',
            biaya_service: '',
            garansi: '',
            alasan_batal: '',
            pengerjaan: '',
            keterangan: '',    
        });
    }

    const closeModalHandler = action => {
        if(action === 'Update') {
            setOpenUpdateModal(!openUpdateModal);
        } else if(action === 'Submit') {
            setSuccess(!success);
        } else if(action === 'View') {
            setInfo(!info);
        }

        setInput({
            no_pengerjaan: '',
            status_pengerjaan: '2',
            biaya_service: '',
            garansi: '',
            alasan_batal: '',
            pengerjaan: '',
            keterangan: '',    
        });
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });

        if(event.target.name === 'status_pengerjaan') {
            if(event.target.value === '3') {
                setGaransiVisible('d-block');
                setAlasanBatalVisible('d-none');
            } else {
                setGaransiVisible('d-none');
                setAlasanBatalVisible('d-block');
            }
        }
    }

    const getCurrentUser = async () => {
        getDataPengerjaan();
    }

    const getDataPengerjaan = async () => {
        await axios.get(`${baseUrl}/pengerjaan`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataPengerjaan(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getDataPengerjaanById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/pengerjaan/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentPengerjaan(response.data.data);

            if(actionModal.toLowerCase() === 'update progress') {
                setInput({
                    biaya_service: response.data.data.biaya_service,
                    keterangan: response.data.data.detail_pengerjaan == null ? '' : response.data.data.detail_pengerjaan.keterangan,
                    pengerjaan: response.data.data.detail_pengerjaan == null ? '' : response.data.data.detail_pengerjaan.pengerjaan,
                });
            }

            let teknisi = [];
            response.data.data.teknisi.map(item => teknisi.push(item.teknisi.name));
            setCurrentTeknisipj(teknisi.toString())
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentPengerjaan(false);

        if(actionModal.toLowerCase() === 'view') {
            setInfo(!info);
        } else if(actionModal.toLowerCase() === 'kerjakan') {
            setSuccess(!success);
        } else if(actionModal.toLowerCase() === 'update progress') {
            setOpenUpdateModal(true);
        } else if(actionModal.toLowerCase() === 'delete') {
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
                    deleteDataPengerjaan(id);
                }
            })
        }
    }

    const postDataPengerjaan = async no_pengerjaan => {
        let inputBiaya;
        if(input.biaya_service != currentPengerjaan.biaya_service) {
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

        await axios.put(`${baseUrl}/pengerjaan/${no_pengerjaan}`, {
            id_partner: input.id_partner,
            status_pengerjaan: input.status_pengerjaan,
            biaya_service: inputBiaya,
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            postDetailPengerjaan(currentPengerjaan);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengerjaan Barang & Jasa', 'UPDATE', `${currentUser.name} mengubah data nomor pengerjaan ${currentPengerjaan.no_pengerjaan}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const postDetailPengerjaan = async payload => {
        await axios.post(`${baseUrl}/detail-pengerjaan`, {
            no_pengerjaan: payload.no_pengerjaan,
            no_service: payload.no_service,
            keterangan: input.keterangan,
            pengerjaan: input.pengerjaan
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

            getDataPengerjaan(currentUser.id);
            setInput({
                no_pengerjaan: '',
                status_pengerjaan: '2',
                biaya_service: '',
                keterangan: ''
            });
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

    const getDataPartner = async () => {
        await axios.get(`${baseUrl}/partner`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setPartnerOptions(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const updateDataPengerjaan = async no_pengerjaan => {
        let inputBiaya;
        if(input.biaya_service != currentPengerjaan.biaya_service) {
            if(input.biaya_service.indexOf(',') !== -1 || input.biaya_service.indexOf('.') !== -1) {
                inputBiaya = input.biaya_service.replace(/[^0-9]+/g, "");
            } else {
                inputBiaya = input.biaya_service;
            }
        } else {
            inputBiaya = input.biaya_service;
        }

        await axios.put(`${baseUrl}/pengerjaan/${no_pengerjaan}`, {
            status_pengerjaan: input.status_pengerjaan,
            cek_stiker: input.cek_stiker,
            garansi: input.garansi,
            biaya_service: inputBiaya,
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            updateDetailPengerjaan(no_pengerjaan);
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Pengerjaan Barang & Jasa', 'UPDATE', `${currentUser.name} mengubah data nomor pengerjaan ${currentPengerjaan.no_pengerjaan}`);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const updateDetailPengerjaan = async no_pengerjaan => {
        let status;
        if(input.status_pengerjaan == '3') {
            status = 'selesai';
        } else {
            status = 'belum selesai';
        }

        await axios.put(`${baseUrl}/detail-pengerjaan/${no_pengerjaan}`, {
            pengerjaan: input.pengerjaan,
            keterangan: input.keterangan,
            waktu_selesai: status
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            if((input.status_pengerjaan == '3' || input.status_pengerjaan == '1') && (currentPengerjaan.penerimaan.jenis_penerimaan == 'Penerimaan Barang Service' || currentPengerjaan.penerimaan.jenis_penerimaan == 'Persiapan Barang Baru')) {
                postDataPengembalian(currentPengerjaan.penerimaan.cabang.nama_cabang);
            }

            if(input.status_pengerjaan == '3' && currentPengerjaan.penerimaan.jenis_penerimaan == 'Jasa Lain-lain') {
                postDataPembayaran();
            }
        })
        .catch(error => {
            console.log(error);
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });

        setOpenUpdateModal(!openUpdateModal);
    }

    const postDataPengembalian = async cabang => {
        await axios.post(`${baseUrl}/pengembalian`, {
            no_service: currentPengerjaan.no_service,
            cabang: currentPengerjaan.penerimaan.cabang.nama_cabang,
            status_pengerjaan: input.status_pengerjaan,
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

            getDataPengerjaan(currentUser.id);
            sendMessage();
        })
        .catch(error => {
            console.log(error);
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const postDataPembayaran = async () => {
        await axios.post(`${baseUrl}/pembayaran`, {
            no_service: currentPengerjaan.no_service,
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

            getDataPengerjaan(currentUser.id);
            sendMessage();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const sendMessage = async () => {
        await axios.post(`http://127.0.0.1:5000/send-message`, {
            number: currentPengerjaan.penerimaan.customer.nomorhp,
            message: `*Hai ${currentPengerjaan.penerimaan.customer.nama}*, saya *${currentUser.name}* selaku teknisi *Twincom Service Center cabang ${currentPengerjaan.penerimaan.cabang.nama_cabang}* ingin memberitahukan kepada anda bahwa *${currentPengerjaan.penerimaan.bj.nama_bj} telah selesai dikerjakan*. Silahkan datang ke *Twincom Service Center ${currentPengerjaan.penerimaan.cabang.nama_cabang}* untuk mengambil barang anda. Terima Kasih`,
        },
        {
            headers: {
                'Accept': 'Application/json',
                'SecretKey': process.env.SECRET_KEY
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const deleteDataPengerjaan = async no_pengerjaan => {
        await axios.put(`${baseUrl}/pengerjaan/${no_pengerjaan}`, {
            biaya_service: 0,
            status_pengerjaan: 0,
            alasan_batal: '',
            harga_beli: '',
            alasan_tidak_beli: '',
            garansi: 0
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            deleteDetailPengerjaan(no_pengerjaan);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const deleteDetailPengerjaan = async no_pengerjaan => {
        await axios.delete(`${baseUrl}/detail-pengerjaan/${no_pengerjaan}`, {
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

            getDataPengerjaan(currentUser.id);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const sendEmailNotification = async payload => {
        await axios.post(`${baseUrl}/pengerjaan/send-email`, {
            id: payload.penerimaan.customer.id,
            email: payload.penerimaan.customer.email,
            name: payload.penerimaan.customer.nama,
            no_service: `${kodeCabang(payload.penerimaan.cabang.nama_cabang)}${payload.no_service}`,
            place: payload.penerimaan.cabang.nama_cabang
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
        .then(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const getOneSignalPlayerId = async payload => {
        await axios.get(`${baseUrl}/onesignal/${payload.id_customer}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            let data = [];
            response.data.data.map(item => data.push(item.player_id));
            sendPushNotifcation(payload, data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const sendPushNotifcation = async (payload, player_id) => {
        await axios.post('https://onesignal.com/api/v1/notifications', {
            app_id: process.env.REACT_APP_ONESIGNAL_APP_ID,
            include_player_ids: player_id,
            data: {"foo": "bar"},
            contents: {"en": `Hai ${payload.customer}, ${kodeCabang(payload.nama_cabang)}${payload.no_service_penerimaan} sudah selesai kami kerjakan`}
        }, {})
        .then(response => {
            Swal.fire(
                'Berhasil',
                'Notifikasi berhasil dikirimkan',
                'success'
            );
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                'Notifikasi gagal dikirimkan',
                'error'
            );
        });
    }

    return {
        fields,
        success, setSuccess,
        info,
        openUpdateModal,
        color,
        formDisabled,
        isLoading,
        details,
        dataPengerjaan,
        currentTeknisipj,
        currentPengerjaan,
        loadCurrentPengerjaan,
        input, setInput,
        partnerOptions,
        garansiVisible,
        alasanBatalVisible,
        kodeCabang,
        statusPengerjaan,
        toggleDetails,
        submitHandler,
        changeHandler,
        closeModalHandler,
        getCurrentUser,
        getDataPengerjaanById,
        getDataPartner,
        sendEmailNotification,
        getOneSignalPlayerId
    }
}

export default PengerjaanHelper;