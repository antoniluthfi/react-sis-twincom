import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';

const DataCabangHelper = () => {
    const {
        writeActivityLog
    } = LogHelper();
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_cabang',
            label: 'Nama Cabang',
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
    const [dataCabang, setDataCabang] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataCabang, setCurrentDataCabang] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        nama_cabang: '',
        alamat: '',
        email: '',
        nomorhp: ''
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
                    nama_cabang: '',
                    alamat: '',
                    email: '',
                    nomorhp: ''
                });                
            }, 1000);
        } else {
            setSuccess(!success);
            setTimeout(() => {
                setColor('success');
                setButtonVisibility('d-inline');
                setButtonSubmitName('Submit');
                setFormDisabled(false);
                setModalTitle('Tambah Data');
                setInput({
                    nama_cabang: '',
                    alamat: '',
                    email: '',
                    nomorhp: ''
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
            postDataCabang();
        } else if(action === 'Update') {
            updateDataCabang(currentDataCabang.id);
        } else if(action === 'Delete') {
            deleteDataCabang(currentDataCabang.id);
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
            setCurrentUser(response.data.data);
            getDataCabang();
        })
        .catch(error => {
            console.log('DataCabang.js line 61', error);
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
            if(response.status === 200) {
                setDataCabang(response.data.data);
            }
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataCabangById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/cabang/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setCurrentDataCabang(response.data.data);
            setInput({
                nama_cabang: response.data.data.nama_cabang,
                alamat: response.data.data.alamat,
                email: response.data.data.email,
                nomorhp: response.data.data.nomorhp
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
            setDanger(!danger);
        }
    }

    const postDataCabang = async () => {
        let message = null;
        if(input.nama_cabang == '') message = 'Nama cabang harus diisi!';
        else if(input.alamat) message = 'Alamat harus diisi!';
        else if(input.email) message = 'Email harus diisi!';
        else if(input.nomorhp) message = 'Nomor hp harus diisi!';

        await axios.post(`${baseUrl}/cabang`, {
            nama_cabang: input.nama_cabang,
            alamat: input.alamat,
            email: input.email,
            nomorhp: input.nomorhp
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

            writeActivityLog(currentUser.id, role, 'Data Cabang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_cabang} sebagai data baru`);
            getDataCabang();
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

    const updateDataCabang = async id => {
        let message = null;
        if(input.nama_cabang == '') message = 'Nama cabang harus diisi!';
        else if(input.alamat) message = 'Alamat harus diisi!';
        else if(input.email) message = 'Email harus diisi!';
        else if(input.nomorhp) message = 'Nomor hp harus diisi!';

        await axios.put(`${baseUrl}/cabang/${id}`, {
            nama_cabang: input.nama_cabang,
            alamat: input.alamat,
            email: input.email,
            nomorhp: input.nomorhp
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

            writeActivityLog(currentUser.id, role, 'Data Cabang', 'UPDATE', `${currentUser.name} mengubah data ${currentDataCabang.nama_cabang} menjadi ${response.data.data.nama_cabang}`);
            getDataCabang(); 
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

    const deleteDataCabang = async id => {
        await axios.delete(`${baseUrl}/api/cabang/${id}`, {
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

            writeActivityLog(currentUser.id, role, 'Data Cabang', 'DELETE', `${currentUser.name} menghapus data ${currentDataCabang.nama_cabang}`);
            getDataCabang();
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
        fields,
        success, setSuccess,
        danger,
        color,
        isLoading,
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
        getDataCabangById,
        getCurrentUser
    }
}

export default DataCabangHelper;