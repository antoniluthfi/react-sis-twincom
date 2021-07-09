import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../../log/LogHelper';

const DataPelangganHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const statusAkun = item => {
        switch (item) {
            case '0':
            case 0:
                return 'Tidak aktif'
            case '1':
            case 1:
                return 'Aktif'
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
            key: 'name',
            label: 'Nama',
            _style: { textAlign: 'center' },
        },
        {
            key: 'alamat',
            label: 'Alamat',
            _style: { textAlign: 'center' },
        },
        {
            key: 'email',
            label: 'Email',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nomorhp',
            label: 'Nomor HP',
            _style: { textAlign: 'center' },
        },
        {
            key: 'jabatan',
            label: 'Segmen',
            _style: { textAlign: 'center' },
        },
        {
            key: 'status_akun',
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
    const [diskonModal, setDiskonModal] = useState(false);
    const [color, setColor] = useState('success');
    const [isLoading, setIsLoading] = useState(true);
    const [dataPelanggan, setDataPelanggan] = useState([]);
    const [dataCabang, setDataCabang] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataPelanggan, setCurrentDataPelanggan] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        name: '',
        alamat: '',
        email: '',
        nomorhp: '',
        jabatan: 'user',
        status_akun: '1',
        password: ''
    });
    const [inputDiskon, setInputDiskon] = useState({
        user_id: '',
        diskon_persen: '',
        diskon_langsung: '',
        poin: '',
        status: ''
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
        if(action === 'Not Delete') {
            setSuccess(!success);
            setTimeout(() => {
                setColor('success');
                setButtonVisibility('d-inline');
                setButtonSubmitName('Submit');
                setFormDisabled(false);
                setInput({
                    name: '',
                    alamat: '',
                    email: '',
                    nomorhp: '',
                    jabatan: 'user',
                    status_akun: '1',
                    password: ''
                });    
            }, 1000);
        } else if(action === 'diskon') {
            setDiskonModal(!diskonModal);
            setInputDiskon({
                user_id: '',
                diskon: '',
                status: ''            
            });
        }
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });
    }

    const diskonChangeHandler = event => {
        setInputDiskon({
            ...inputDiskon, [event.target.name]: event.target.value
        });

        if(event.target.name === 'diskon_persen' && event.target.value) {
            setInputDiskon({
                ...inputDiskon, 
                diskon_persen: event.target.value,
                diskon_langsung: ''
            });
        } else if(event.target.name === 'diskon_langsung' && event.target.value) {
            setInputDiskon({
                ...inputDiskon, 
                diskon_langsung: event.target.value,
                diskon_persen: ''
            });
        }
    }

    const submitHandler = action => {
        if(action === 'Submit') {
            postDataPelanggan();
        } else if(action === 'Update') {
            updateDataPelanggan(currentDataPelanggan.id);
        } else if(action === 'submit diskon') {
            postDiskon(currentDataPelanggan.id);
        } else if(action === 'update diskon') {
            updateDiskon(currentDataPelanggan.id);
        }
    }

    const getDataPelanggan = async () => {
        await axios.get(`${baseUrl}/user/role/customer`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataPelanggan(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataPelangganById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/user/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataPelanggan(result);

            if(actionModal === 'update') {
                setInput({
                    name: result.name,
                    alamat: result.alamat,
                    email: result.email,
                    nomorhp: result.nomorhp,
                    jabatan: result.jabatan,
                    status_akun: result.status_akun,
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        if(actionModal === 'view') {
            setModalTitle('View Data');
            setFormDisabled(true);
            setButtonVisibility('d-none');
            setColor('info');
            setSuccess(!success);
        } else if(actionModal === 'update') {
            setModalTitle('Update Data');
            setFormDisabled(false);
            setButtonVisibility('d-inline');
            setButtonSubmitName('Update');
            setColor('success');
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
                    deleteDataPelanggan(id);
                }
            });
        } else if(actionModal === 'aktifkan member') {
            setDiskonModal(!diskonModal);
        }
    }

    const postDataPelanggan = async () => {
        let message = null;
        if(!input.name) message = 'Nama harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';
        else if(!input.status_akun) message = 'Status akun harus diisi!';

        if(message) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/user`, {
                name: input.name,
                alamat: input.alamat,
                email: input.email,
                nomorhp: input.nomorhp,
                jabatan: input.jabatan,
                cab_penempatan: null,
                status_akun: input.status_akun,
                password: input.name
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Pelanggan', 'POST', `${currentUser.name} menambahkan ${response.data.data.name} sebagai data baru`);
                getDataPelanggan();
                closeModalHandler('Not Delete');
            })
            .catch(error => {
                const err = error.response.data;
                let message = err.message;

                if(err.errors.email) message = err.errors.email[0];
                else if(err.errors.nomorhp) message = err.errors.nomorhp[0];

                Swal.fire(
                    'Gagal',
                    message,
                    'error'
                );
            });
        }
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

    const postDiskon = async id => {
        let message = null;
        if (!inputDiskon.status) message = 'Status harus dipilih salah satu!';

        if(message) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            let diskon = null;
            if(inputDiskon.diskon_persen) diskon = `${inputDiskon.diskon_persen} %`;
            else if(inputDiskon.diskon_langsung) diskon = inputDiskon.diskon_langsung;

            await axios.post(`${baseUrl}/customer-member`, {
                user_id: id,
                diskon: diskon,
                poin: inputDiskon.poin,
                status: inputDiskon.status
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

                getDataPelanggan();
                closeModalHandler('diskon');
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            });
        }
    }

    const updateDataPelanggan = async id => {
        let message = null;
        if(!input.name) message = 'Nama harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';
        else if(!input.status_akun) message = 'Status akun harus diisi!';

        if(message) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/user/${id}`, {
                name: input.name,
                alamat: input.alamat,
                email: input.email,
                nomorhp: input.nomorhp,
                jabatan: input.jabatan,
                cab_penempatan: null,
                status_akun: input.status_akun,
                password: input.name
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Pelanggan', 'UPDATE', `${currentUser.name} mengubah data ${currentDataPelanggan.name}`);
                getDataPelanggan();
                closeModalHandler('Not Delete');
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    message != null ? message : error.response.data.message,
                    'error'
                );
            });
        }
    }

    const updateDiskon = async id => {
        let diskon = null;
        if(inputDiskon.diskon_persen) diskon = `${inputDiskon.diskon_persen} %`;
        else if(inputDiskon.diskon_langsung) diskon = inputDiskon.diskon_langsung;

        await axios.put(`${baseUrl}/customer-diskon/${id}`, {
            diskon: diskon,
            poin: inputDiskon.poin,
            status: inputDiskon.status
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
                'Diskon berhasil diupdate',
                'success'
            );
        })
        .catch(error => {
            const err = error.response.data;
            let message = err.message;

            if(err.errors.email) message = err.errors.email[0];
            else if(err.errors.nomorhp) message = err.errors.nomorhp[0];

            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        });
    }

    const deleteDataPelanggan = async id => {
        await axios.delete(`${baseUrl}/user/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Pelanggan', 'DELETE', `${currentUser.name} menghapus data ${currentDataPelanggan.name}`);
            getDataPelanggan();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })
    }
    
    return {
        statusAkun,
        fields,
        success, setSuccess,
        diskonModal,
        color,
        currentUser,
        isLoading, setIsLoading,
        dataPelanggan, setDataPelanggan,
        dataCabang, setDataCabang,
        loadDataCabang, setLoadDataCabang,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input,
        inputDiskon,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        diskonChangeHandler,
        submitHandler,
        getDataPelanggan,
        getDataPelangganById,
        getDataCabang
    }
}

export default DataPelangganHelper;