import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const DataMerekHelper = () => {
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
            key: 'merek',
            label: 'Merek',
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
    const [dataMerek, setDataMerek] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataMerek, setCurrentDataMerek] = useState('');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        id: '',
        merek: '',
        kategori: ''
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
                merek: '',
                kategori: ''
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
            postDataMerek();
        } else if(action === 'Update') {
            updateDataMerek(currentDataMerek.id);
        }
    }

    const getCurrentUser = () => {
        getDataMerek();
    }

    const getDataMerek = async () => {
        await axios.get(`${baseUrl}/merek`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            if(response.status === 200) {
                setDataMerek(response.data.data);
            }
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataMerekById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/merek/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataMerek(result);
            setInput({
                merek: result.merek,
                kategori: result.kategori
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
                    deleteDataMerek(id);
                }
            });
        }
    }

    const postDataMerek = async () => {
        let message = null;
        if(!input.merek) message = 'Merek harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/merek`, {
                merek: input.merek,
                kategori: input.kategori,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Merek', 'POST', `${currentUser.name} menambahkan ${response.data.data.merek} sebagai data baru`);
                getDataMerek();
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

    const updateDataMerek = async id => {
        let message = null;
        if(!input.merek) message = 'Merek harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/merek/${id}`, {
                merek: input.merek,
                kategori: input.kategori,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Merek', 'UPDATE', `${currentUser.name} mengubah data ${currentDataMerek.merek} menjadi ${response.data.data.merek}`);
                getDataMerek(); 
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

    const deleteDataMerek = async id => {
        await axios.delete(`${baseUrl}/merek/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Merek', 'DELETE', `${currentUser.name} menghapus data ${currentDataMerek.merek}`);
            getDataMerek();
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
        dataMerek,
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
        getDataMerekById,
    }
}

export default DataMerekHelper;