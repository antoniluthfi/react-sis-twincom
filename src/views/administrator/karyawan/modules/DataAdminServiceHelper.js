import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';

const DataAdminServiceHelper = () => {
    const { writeActivityLog } = LogHelper();
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
    const [danger, setDanger] = useState(false);
    const [color, setColor] = useState('success');
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState('');
    const [dataAdminService, setDataAdminService] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [dataCabang, setDataCabang] = useState({});
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [currentDataAdminService, setCurrentDataAdminService] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        name: '',
        alamat: '',
        email: '',
        nomorhp: '',
        jabatan: 'admin service',
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

    const closeModalHandler = action => {
        if(action === 'Delete') {
            setDanger(!danger);
            setTimeout(() => {
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
        } else {
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
                    jabatan: 'administrator',
                    cab_penempatan: 'Landasan Ulin',
                    status_akun: '1',
                    password: ''
                });                
            }, 1000);
        }
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]:event.target.value
        });
    }

    const submitHandler = action => {
        if(action === 'Submit') {
            postDataAdminService();
        } else if(action === 'Update') {
            updateDataAdminService(currentDataAdminService.id);
        } else if(action === 'Delete') {
            deleteDataAdminService(currentDataAdminService.id);
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
            setRole(response.data.data.jabatan);
            getDataAdminService();
        })
        .catch(error => {
            console.log('DataCabang.js line 61', error);
        });
    }

    const getDataAdminService = async () => {
        await axios.get(`${baseUrl}/user/role/admin service`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            if(response.status === 200) {
                setDataAdminService(response.data.data);
            }
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataAdminServiceById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/user/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataAdminService(result);
            setInput({
                name: result.name,
                alamat: result.alamat,
                email: result.email,
                nomorhp: result.nomorhp,
                jabatan: result.jabatan,
                cab_penempatan: result.cab_penempatan,
                status_akun: result.status_akun,
            });
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
            setDanger(!danger);
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

    const postDataAdminService = async () => {
        let message = null;
        if(input.name == '') message = 'Nama harus harus diisi!';
        else if(input.alamat == '') message = 'Alamat harus diisi!';
        else if(input.email == '') message = 'Email harus diisi!';
        else if(input.nomorhp == '') message = 'Nomor hp harus diisi!';

        await axios.post(`${baseUrl}/user`, {
            name: input.name,
            alamat: input.alamat,
            email: input.email,
            nomorhp: input.nomorhp,
            jabatan: 'admin service',
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

            writeActivityLog(currentUser.id, role, 'Data Admin Service', 'POST', `${currentUser.name} menambahkan ${response.data.data.name} sebagai data baru`);
            getDataAdminService();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                message != null ? message : error.response.data.message,
                'error'
            );
        })

        closeModalHandler('Not Delete');
    }

    const updateDataAdminService = async id => {
        let message = null;
        if(input.name == '') message = 'Nama harus harus diisi!';
        else if(input.alamat == '') message = 'Alamat harus diisi!';
        else if(input.email == '') message = 'Email harus diisi!';
        else if(input.nomorhp == '') message = 'Nomor hp harus diisi!';

        await axios.put(`${baseUrl}/user/${id}`, {
            name: input.name,
            alamat: input.alamat,
            email: input.email,
            nomorhp: input.nomorhp,
            jabatan: 'admin service',
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

            writeActivityLog(currentUser.id, role, 'Data Admin Service', 'UPDATE', `${currentUser.name} mengubah data ${currentDataAdminService.name}`);
            getDataAdminService();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                message != null ? message : error.response.data.message,
                'error'
            );
        })

        closeModalHandler('Not Delete');
    }

    const deleteDataAdminService = async id => {
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

            writeActivityLog(currentUser.id, role, 'Data Admin Service', 'DELETE', `${currentUser.name} menghapus data ${currentDataAdminService.name}`);
            getDataAdminService();
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
        statusAkun,
        fields,
        success, setSuccess,
        danger,
        color,
        isLoading,
        dataAdminService,
        loadDataCabang,
        dataCabang,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input,
        role,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getCurrentUser,
        getDataAdminServiceById,
        getDataCabang,
    }
}

export default DataAdminServiceHelper;