import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../../log/LogHelper';

const DataAdministratorHelper = () => {
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
            label: 'Hak Akses',
            _style: { textAlign: 'center' },
        },
        {
            key: 'cab_penempatan',
            label: 'Cabang Penempatan',
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
    const [color, setColor] = useState('success');
    const [isLoading, setIsLoading] = useState(true);
    const [dataAdministrator, setDataAdministrator] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [dataCabang, setDataCabang] = useState({});
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataAdministrator, setCurrentDataAdministrator] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        name: '',
        alamat: '',
        email: '',
        nomorhp: '',
        jabatan: 'administrator',
        cab_penempatan: 'Landasan Ulin',
        status_akun: '1',
        password: ''
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

    const closeModalHandler = () => {
        setSuccess(!success);
        setTimeout(() => {
            setButtonVisibility('d-inline');
            setButtonSubmitName('Submit');
            setFormDisabled(false);
            setColor('success');
            setInput({
                name: '',
                alamat: '',
                email: '',
                nomorhp: '',
                jabatan: 'administrator',
                cab_penempatan: 'Landasan Ulin',
                status_akun: '1',
                password: ''
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
            postDataAdministrator();
        } else if(action === 'Update') {
            updateDataAdministrator(currentDataAdministrator.id);
        }
    }

    const getDataAdministrator = async () => {
        await axios.get(`${baseUrl}/user/role/administrator`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataAdministrator(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataAdministratorById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/user/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataAdministrator(result);

            if(actionModal === 'update' || actionModal === 'view') {
                setInput({
                    name: result.name,
                    alamat: result.alamat,
                    email: result.email,
                    nomorhp: result.nomorhp,
                    jabatan: result.jabatan,
                    cab_penempatan: result.cab_penempatan,
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
                    deleteDataAdminstrator(id);
                }
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

    const postDataAdministrator = async () => {
        let message = null;
        if(!input.name) message = 'Nama harus harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';

        if(message != null) {
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
                jabatan: 'administrator',
                cab_penempatan: input.cab_penempatan,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Administrator', 'POST', `${currentUser.name} menambahkan ${response.data.data.name} sebagai data baru`);
                getDataAdministrator();
                closeModalHandler();
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

    const updateDataAdministrator = async id => {
        let message = null;
        if(!input.name) message = 'Nama harus harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';

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
                jabatan: 'administrator',
                cab_penempatan: input.cab_penempatan,
                status_akun: input.status_akun,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Administrator', 'UPDATE', `${currentUser.name} mengubah data ${currentDataAdministrator.name}`);
                getDataAdministrator();
                closeModalHandler();
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

    const deleteDataAdminstrator = async id => {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Administrator', 'DELETE', `${currentUser.name} menghapus data ${currentDataAdministrator.name}`);
            getDataAdministrator();
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
        statusAkun,
        fields,
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataAdministrator, setDataAdministrator,
        loadDataCabang, setLoadDataCabang,
        dataCabang, setDataCabang,
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
        getDataAdministrator,
        getDataAdministratorById,
        getDataCabang
    }
}

export default DataAdministratorHelper;