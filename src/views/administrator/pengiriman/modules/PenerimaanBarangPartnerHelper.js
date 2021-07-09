import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const PenerimaanBarangPartnerHelper = () => {
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
            key: 'no_service',
            label: 'No Service',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status',
            label: 'Status',
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
    const [dataPenerimaan, setDataPenerimaan] = useState([]);
    const [loadDataPenerimaan, setLoadDataPenerimaan] = useState(true);
    const [dataTagihanPartner, setDataTagihanPartner] = useState({});
    const [currentDataPenerimaan, setCurrentDataPenerimaan] = useState({});
    const [loadCurrentDataPenerimaan, setLoadCurrentDataPenerimaan] = useState(true);
    const [formDisabled, setFormDisabled] = useState(false);
    const [input, setInput] = useState({
        biaya_service: '',
        keterangan: ''
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

        setDetails(newDetails);
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]: event.target.value
        });
    }

    const submitHandler = action => {
        if(action === 'Update') {
            updateDataPenerimaan(currentDataPenerimaan[0].no_service);
        }
    }

    const closeModalHandler = action => {
        if(action === 'Update') {
            setSuccess(!success);
        }

        setInput({
            biaya_service: '',
            keterangan: ''    
        });
    }

    const getCurrentUser = async () => {
        getDataListPengiriman();
    }

    const getDataListPengiriman = async () => {
        await axios.get(`${baseUrl}/pengiriman-barang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            let data = [];
            let tagihan = [];
            response.data.data.map(item => {
                tagihan.push(item.tagihan_partner);
                data.push(item.list_pengiriman);
            });

            setDataTagihanPartner(tagihan);
            setDataPenerimaan(data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataPenerimaan(false);
    }

    const getDataListPengirimanByNoService = async (no_service, actionModal) => {
        await axios.get(`${baseUrl}/list-pengiriman/no-service/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentDataPenerimaan(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentDataPenerimaan(false);

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
                    resetDataPenerimaan(no_service);
                }
            })
        }
    }  

    const getDataTagihanPartnerByNoService = async no_service => {
        await axios.get(`${baseUrl}/tagihan-partner/${no_service}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            updateTagihanPartner(no_service);
        })
        .catch(error => {
            postTagihanPartner();
        });
    }
    
    const updateDataPenerimaan = async no_service => {
        await axios.put(`${baseUrl}/list-pengiriman/no-service/${no_service}`, {
            status_pengiriman: 1,
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang Partner', 'UPDATE', `${currentUser.name} mengubah data nomor service ${currentDataPenerimaan.no_service}`);
            getDataTagihanPartnerByNoService(no_service);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const postTagihanPartner = async () => {
        let inputBiaya = input.biaya_service.replace(/[^a-z\d\s]+/gi, "");
        inputBiaya = inputBiaya.split('Rp ');
        inputBiaya = inputBiaya[1];

        await axios.post(`${baseUrl}/tagihan-partner`, {
            no_surat_jalan: currentDataPenerimaan[0].no_surat_jalan,
            no_service: currentDataPenerimaan[0].no_service,
            id_partner: currentDataPenerimaan[0].surat_jalan.id_partner,
            biaya_service: inputBiaya,
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
            getDataListPengiriman(currentUser.id);
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

    const updateTagihanPartner = async no_service => {
        let inputBiaya = input.biaya_service.replace(/[^a-z\d\s]+/gi, "");
        inputBiaya = inputBiaya.split('Rp ');
        inputBiaya = inputBiaya[1];

        await axios.put(`${baseUrl}/tagihan-partner/${no_service}`, {
            biaya_service: inputBiaya,
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
            getDataListPengiriman(currentUser.id);
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

    const resetDataPenerimaan = async no_service => {
        await axios.put(`${baseUrl}/list-pengiriman/no-service/${no_service}`, {
            status_pengiriman: 0
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            writeActivityLog(currentUser.id, currentUser.jabatan, 'Penerimaan Barang Partner', 'UPDATE', `${currentUser.name} mereset data nomor service ${currentDataPenerimaan.no_service}`);
            deleteTagihanPartner(no_service);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });
    }

    const deleteTagihanPartner = async no_service => {
        await axios.delete(`${baseUrl}/tagihan-partner/${no_service}`, {
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
            getDataListPengiriman(currentUser.id);
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
        success,
        info,
        currentUser,
        dataPenerimaan,
        loadDataPenerimaan,
        dataTagihanPartner,
        currentDataPenerimaan,
        loadCurrentDataPenerimaan,
        formDisabled,
        input,
        details, setDetails,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getCurrentUser,
        getDataListPengirimanByNoService
    }
}

export default PenerimaanBarangPartnerHelper;