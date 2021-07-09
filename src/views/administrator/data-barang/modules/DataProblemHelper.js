import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const DataProblemHelper = () => {
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
            key: 'nama_problem',
            label: 'Nama Problem',
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
    const [dataProblem, setDataProblem] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataProblem, setCurrentDataProblem] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        nama_problem: ''
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
                nama_problem: ''
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
            postDataProblem();
        } else if(action === 'Update') {
            updateDataProblem(currentDataProblem.id);
        } else if(action === 'Delete') {
            deleteDataProblem(currentDataProblem.id);
        }
    }

    const getCurrentUser = async () => {
        getDataProblem();
    }

    const getDataProblem = async () => {
        await axios.get(`${baseUrl}/problem`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataProblem(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataProblemById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/problem/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataProblem(result);
            setInput({
                nama_problem: result.nama_problem,
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
                    deleteDataProblem(id);
                }
            });
        }
    }

    const postDataProblem = async () => {
        let message = null;
        if(!input.nama_problem) message = 'Nama problem harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/problem`, {
                nama_problem: input.nama_problem,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Problem', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_problem} sebagai data baru`);
                getDataProblem();
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

    const updateDataProblem = async id => {
        let message = null;
        if(!input.nama_problem) message = 'Nama problem harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/problem/${id}`, {
                nama_problem: input.nama_problem,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Problem', 'UPDATE', `${currentUser.name} mengubah data ${currentDataProblem.nama_problem}`);
                getDataProblem();
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

    const deleteDataProblem = async id => {
        await axios.delete(`${baseUrl}/problem/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Problem', 'DELETE', `${currentUser.name} menghapus data ${currentDataProblem.nama_problem}`);
            getDataProblem();
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
        success, setSuccess,
        color,
        currentUser,
        isLoading,
        dataProblem,
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
        getDataProblemById
    }
}

export default DataProblemHelper;