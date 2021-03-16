import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';

const DataBarangHelper = () => {
    const { writeActivityLog } = LogHelper();
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const jenis = item => {
        switch (item) {
            case 0:
            case '0':
                return 'Barang'
            case 1:
            case '1':
                return 'Jasa'
            default:
                return ''
        }
    }
    
    const formDataPenting = item => {
        switch (item) {
            case 0:
            case '0':
                return 'Disembunyikan'
            case 1:
            case '1':
                return 'Ditampilkan'
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
            key: 'nama_bj',
            label: 'Nama Barang/Jasa',
            _style: { textAlign: 'center' },
        },
        {
            key: 'jenis',
            label: 'Jenis',
            _style: { textAlign: 'center' },
        },
        {
            key: 'form_data_penting',
            label: 'Input Data Penting',
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
    const [dataBarang, setDataBarang] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataBarang, setCurrentDataBarang] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        nama_bj: '',
        jenis: '1',
        form_data_penting: '1'
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
                    nama_bj: '',
                    jenis: '1',
                    form_data_penting: '1'
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
                    nama_bj: '',
                    jenis: '1',
                    form_data_penting: '1'
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
            postDataBarang();
        } else if(action === 'Update') {
            updateDataBarang(currentDataBarang.id);
        } else if(action === 'Delete') {
            deleteDataBarang(currentDataBarang.id);
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
            getDataBarang();
        })
        .catch(error => {
            console.log('DataCabang.js line 61', error);
        });
    }

    const getDataBarang = async () => {
        await axios.get(`${baseUrl}/bj`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataBarang(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataBarangById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/bj/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataBarang(result);
            setInput({
                nama_bj: result.nama_bj,
                jenis: result.jenis,
                form_data_penting: result.form_data_penting
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

    const postDataBarang = async () => {
        let message = null;
        if(input.nama_bj == '') message = 'Nama barang harus diisi!';
        else if(input.jenis == '') message = 'Jenis harus diisi!';
        else if(input.form_data_penting == '') message = 'Form data penting harus diisi!';

        await axios.post(`${baseUrl}/bj`, {
            nama_bj: input.nama_bj,
            jenis: input.jenis,
            form_data_penting: input.form_data_penting
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

            writeActivityLog(currentUser.id, role, 'Data Barang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_bj} sebagai data baru`);
            getDataBarang();
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

    const updateDataBarang = async id => {
        let message = null;
        if(input.nama_bj == '') message = 'Nama barang harus diisi!';
        else if(input.jenis == '') message = 'Jenis harus diisi!';
        else if(input.form_data_penting == '') message = 'Form data penting harus diisi!';

        await axios.put(`${baseUrl}/bj/${id}`, {
            nama_bj: input.nama_bj,
            jenis: input.jenis,
            form_data_penting: input.form_data_penting
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

            writeActivityLog(currentUser.id, role, 'Data Barang', 'UPDATE', `${currentUser.name} mengubah data ${currentDataBarang.nama_bj} menjadi ${response.data.data.nama_bj}`);
            getDataBarang();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                message != null ? message : error.response.data.message,
                'error'
            );
        });

        closeModalHandler('Not Delete');
    }

    const deleteDataBarang = async id => {
        await axios.delete(`${baseUrl}/bj/${id}`, {
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

            writeActivityLog(currentUser.id, role, 'Data Barang', 'DELETE', `${currentUser.name} menghapus data ${currentDataBarang.nama_bj}`);
            getDataBarang();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        closeModalHandler('Delete');
    }

    return {
        jenis, 
        formDataPenting, 
        fields,
        success, setSuccess,
        danger,  
        color, 
        isLoading,
        dataBarang,
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
        getDataBarangById,
    }
}

export default DataBarangHelper;