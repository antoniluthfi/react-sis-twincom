import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';

const DataKelengkapanHelper = () => {
    const { writeActivityLog } = LogHelper();
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_kelengkapan',
            label: 'Nama Kelengkapan',
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
    const [dataKelengkapan, setDataKelengkapan] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataKelengkapan, setCurrentDataKelengkapan] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        nama_kelengkapan: ''
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
                    nama_kelengkapan: ''
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
                    nama_kelengkapan: ''
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
            postDataKelengkapan();
        } else if(action === 'Update') {
            updateDataKelengkapan(currentDataKelengkapan.id);
        } else if(action === 'Delete') {
            deleteDataKelengkapan(currentDataKelengkapan.id);
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
            const result = response.data.data;
            setCurrentUser(result);
            setRole(result.jabatan);
            getDataKelengkapan();
        })
        .catch(error => {
            console.log('DataCabang.js line 61', error);
        });
    }

    const getDataKelengkapan = async () => {
        await axios.get(`${baseUrl}/kelengkapan`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataKelengkapan(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataKelengkapanById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/kelengkapan/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataKelengkapan(result);
            setInput({
                nama_kelengkapan: result.nama_kelengkapan,
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

    const postDataKelengkapan = async () => {
        let message = null;
        if(input.nama_kelengkapan == '') message = 'Nama kelengkapan harus diisi!';

        await axios.post(`${baseUrl}/kelengkapan`, {
            nama_kelengkapan: input.nama_kelengkapan,
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

            writeActivityLog(currentUser.id, role, 'Data Kelengkapan', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_kelengkapan} sebagai data baru`);
            getDataKelengkapan();
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

    const updateDataKelengkapan = async id => {
        let message = null;
        if(input.nama_kelengkapan == '') message = 'Nama kelengkapan harus diisi!';

        await axios.put(`${baseUrl}/kelengkapan/${id}`, {
            nama_kelengkapan: input.nama_kelengkapan,
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

            writeActivityLog(currentUser.id, role, 'Data Kelengkapan', 'UPDATE', `${currentUser.name} mengubah data ${currentDataKelengkapan.nama_kelengkapan}`);
            getDataKelengkapan();
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

    const deleteDataKelengkapan = async id => {
        await axios.delete(`${baseUrl}/kelengkapan/${id}`, {
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

            writeActivityLog(currentUser.id, role, 'Data Kelengkapan', 'DELETE', `${currentUser.name} menghapus data ${currentDataKelengkapan.nama_kelengkapan}`);
            getDataKelengkapan();
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
        dataKelengkapan,
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
        getDataKelengkapanById
    }
}

export default DataKelengkapanHelper;