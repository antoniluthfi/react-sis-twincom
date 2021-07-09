import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const DataRmaHelper = () => {
    const { writeActivityLog } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
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
    const [dataRma, setDataRma] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataRma, setCurrentDataRma] = useState('');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        nama: ''
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
                nama: ''
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
            postDataRma();
        } else if(action === 'Update') {
            updateDataRma(currentDataRma.id);
        } else if(action === 'Delete') {
            deleteDataRma(currentDataRma.id);
        }
    }

    const getCurrentUser = async () => {
        getDataRma();
    }

    const getDataRma = async () => {
        await axios.get(`${baseUrl}/rma`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataRma(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataRmaById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/rma/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataRma(result);
            setInput({
                nama: result.name,
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
                    deleteDataRma(id);
                }
            })
        }
    }

    const postDataRma = async () => {
        let message = null;
        if(!input.nama) message = 'Nama harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/rma`, {
                name: input.nama,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data RMA', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama} sebagai data baru`);
                getDataRma();
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

    const updateDataRma = async id => {
        let message = null;
        if(!input.nama) message = 'Nama harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {            
            await axios.put(`${baseUrl}/rma/${id}`, {
                name: input.nama,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data RMA', 'UPDATE', `${currentUser.name} mengubah data ${currentDataRma.nama}  menjadi ${response.data.data.nama}`);
                getDataRma();
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

    const deleteDataRma = async id => {
        await axios.delete(`${baseUrl}/rma/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data RMA', 'DELETE', `${currentUser.name} menghapus data ${currentDataRma.nama}`);
            getDataRma();
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
        fields,
        success, setSuccess,
        color, 
        currentUser,
        isLoading,
        dataRma,
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
        getDataRmaById,
    }
}

export default DataRmaHelper;