import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const DataPartnerHelper = () => {
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
            key: 'nama',
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
    const [dataPartner, setDataPartner] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataPartner, setCurrentDataPartner] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        nama: '',
        alamat: '',
        email: '',
        nomorhp: '',
        status_akun: '1',
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
            setColor('success');
            setButtonVisibility('d-inline');
            setButtonSubmitName('Submit');
            setFormDisabled(false);
            setInput({
                nama: '',
                alamat: '',
                email: '',
                nomorhp: '',
                status_akun: '1',
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
            postDataPartner();
        } else if(action === 'Update') {
            updateDataPartner(currentDataPartner.id);
        }
    }

    const getCurrentUser = () => {
        getDataPartner();
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
        })

        setIsLoading(false);
    }

    const getDataPartnerById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/partner/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataPartner(result);

            if(actionModal === 'update') {
                setInput({
                    nama: result.nama,
                    alamat: result.alamat,
                    email: result.email,
                    nomorhp: result.nomorhp,
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
                    deleteDataPartner(id);
                }
            })
        }
    }

    const postDataPartner = async () => {
        let message = null;
        if(!input.nama) message = 'Nama harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';
        else if(!input.status_akun) message = 'Status akun harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/partner`, {
                nama: input.nama,
                alamat: input.alamat,
                email: input.email,
                nomorhp: input.nomorhp,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Partner', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama} sebagai data baru`);
                getDataPartner();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            })
    
            closeModalHandler();
        }
    }

    const updateDataPartner = async id => {
        let message = null;
        if(!input.nama) message = 'Nama harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';
        else if(!input.status_akun) message = 'Status akun harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/partner/${id}`, {
                nama: input.nama,
                alamat: input.alamat,
                email: input.email,
                nomorhp: input.nomorhp,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Partner', 'UPDATE', `${currentUser.name} mengubah data ${currentDataPartner.nama}`);
                getDataPartner();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            });
    
            closeModalHandler();
        }
    }

    const deleteDataPartner = async id => {
        await axios.delete(`${baseUrl}/partner/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Partner', 'DELETE', `${currentUser.name} menghapus data ${currentDataPartner.nama}`);
            getDataPartner();
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
        color,
        currentUser,
        isLoading,
        dataPartner,
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
        getDataPartnerById,
    }
}

export default DataPartnerHelper;