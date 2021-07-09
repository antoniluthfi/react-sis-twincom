import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const SandiTransaksiHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const jenisTransaksi = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Keluar'
            case '1':
            case 1:
                return 'Masuk'
            default:
                return ''
        }
    }
    
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'sandi_transaksi',
            label: 'Sandi Transaksi',
            _style: { textAlign: 'center' },
        },
        {
            key: 'jenis_transaksi',
            label: 'Jenis Transaksi',
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
    const [color, setColor] = useState('success');
    const [isLoading, setIsLoading] = useState(true);
    const [dataSandiTransaksi, setDataSandiTransaksi] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentSandiTransaksi, setCurrentSandiTransaksi] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        sandi_transaksi: '',
        jenis_transaksi: '0' // keluar
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

    const closeModalHandler = action => {
        setSuccess(!success);
        setTimeout(() => {
            setColor('success');
            setButtonVisibility('d-inline');
            setButtonSubmitName('Submit');
            setFormDisabled(false);
            setInput({
                sandi_transaksi: '',
                jenis_transaksi: '0' // keluar
            });                
        }, 1000);
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });
    }

    const submitHandler = action => {
        if(action === 'Submit') {
            postDataSandiTransaksi();
        } else if(action === 'Update') {
            updateDataSandiTransaksi(currentSandiTransaksi.id);
        } else if(action === 'Delete') {
            deleteDataSandiTransaksi(currentSandiTransaksi.id);
        }
    }

    const getCurrentUser = async () => {
        getDataSandiTransaksi();
    }

    const getDataSandiTransaksi = async () => {
        await axios.get(`${baseUrl}/sandi-transaksi`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataSandiTransaksi(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataSandiTransaksiById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/sandi-transaksi/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentSandiTransaksi(result);
            setInput({
                sandi_transaksi: result.sandi_transaksi,
                jenis_transaksi: result.jenis_transaksi
            });
        })
        .catch(error => {
            console.log(error);
        })

        if(actionModal === 'view') {
            setColor('info');
            setModalTitle('View Data');
            setFormDisabled(true);
            setButtonVisibility('d-none');
            setSuccess(!success);
        } else if(actionModal === 'update') {
            setColor('success');
            setModalTitle('Update Data');
            setFormDisabled(false);
            setButtonVisibility('d-inline');
            setButtonSubmitName('Update');
            setSuccess(!success);
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
                    deleteDataSandiTransaksi(id);
                }
            })
        }
    }

    const postDataSandiTransaksi = async () => {
        let message = null;
        if(!input.sandi_transaksi) message = 'Sandi transaksi harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/sandi-transaksi`, {
                sandi_transaksi: input.sandi_transaksi,
                jenis_transaksi: input.jenis_transaksi
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Sandi Transaksi', 'POST', `${currentUser.name} menambahkan ${response.data.data.sandi_transaksi} sebagai data baru`);
                getDataSandiTransaksi();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            })
    
            closeModalHandler('Not Delete');
        }
    }

    const updateDataSandiTransaksi = async id => {
        let message = null;
        if(!input.sandi_transaksi) message = 'Sandi transaksi harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/sandi-transaksi/${id}`, {
                sandi_transaksi: input.sandi_transaksi,
                jenis_transaksi: input.jenis_transaksi
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Sandi Transaksi', 'UPDATE', `${currentUser.name} mengubah data ${currentSandiTransaksi.sandi_transaksi}`);
                getDataSandiTransaksi();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            })
    
            closeModalHandler('Not Delete');
        }
    }

    const deleteDataSandiTransaksi = async id => {
        await axios.delete(`${baseUrl}/sandi-transaksi/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Sandi Transaksi', 'DELETE', `${currentUser.name} menghapus data ${currentSandiTransaksi.sandi_transaksi}`);
            getDataSandiTransaksi();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })

        closeModalHandler('Delete');
    }

    return {
        jenisTransaksi,
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataSandiTransaksi,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getCurrentUser,
        getDataSandiTransaksiById,
    }
}

export default SandiTransaksiHelper;