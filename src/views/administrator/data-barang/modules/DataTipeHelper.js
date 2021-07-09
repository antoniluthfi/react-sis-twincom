import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const DataTipeHelper = () => {
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
            key: 'tipe',
            label: 'Tipe',
            _style: { textAlign: 'center' },
        },
        {
            key: 'kategori',
            label: 'Kategori',
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
    const [dataTipe, setDataTipe] = useState([]);
    const [dataMerek, setDataMerek] = useState({});
    const [loadDataMerek, setLoadDataMerek] = useState(true);
    const [dataBjBarang, setDataBjBarang] = useState([]);
    const [loadDataBjBarang, setLoadDataBjBarang] = useState(true);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataTipe, setCurrentDataTipe] = useState('');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput] = useState({
        tipe: '',
        merek: 'Asus',
        kategori: 'Laptop'
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
                tipe: '',
                merek: 'Asus',
                kategori: 'Laptop'
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
            postDataTipe();
        } else if(action === 'Update') {
            updateDataTipe(currentDataTipe.id);
        } else if(action === 'Delete') {
            deleteDataTipe(currentDataTipe.id);
        }
    }

    const getCurrentUser = async () => {
        getDataTipe();
    }

    const getDataTipe = async () => {
        await axios.get(`${baseUrl}/tipe`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataTipe(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataTipeById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/tipe/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataTipe(result);
            setInput({
                tipe: result.tipe,
                merek: result.merek,
                kategori: result.kategori,
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
                    deleteDataTipe(id);
                }
            })
        }
    }

    const getDataMerek = async () => {
        await axios.get(`${baseUrl}/merek`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataMerek(response.data.data);
            setLoadDataMerek(false);
        })
        .catch(error => {
            console.log(error)
        });
    }

    const getDataBjBarang = async () => {
        await axios.get(`${baseUrl}/bj/jenis/barang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataBjBarang(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataBjBarang(false);
    }

    const postDataTipe = async () => {
        let message = null;
        if(!input.tipe) message = 'Tipe harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.post(`${baseUrl}/tipe`, {
                tipe: input.tipe,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Tipe', 'POST', `${currentUser.name} menambahkan ${response.data.data.tipe} sebagai data baru`);
                getDataTipe();
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

    const updateDataTipe = async id => {
        let message = null;
        if(!input.tipe) message = 'Tipe harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/tipe/${id}`, {
                tipe: input.tipe,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Tipe', 'UPDATE', `${currentUser.name} mengubah data ${currentDataTipe.tipe} menjadi ${response.data.data.tipe}`);
                getDataTipe();
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

    const deleteDataTipe = async id => {
        await axios.delete(`${baseUrl}/tipe/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Tipe', 'DELETE', `${currentUser.name} menghapus data ${currentDataTipe.tipe}`);
            getDataTipe();
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
        dataTipe,
        dataMerek,
        loadDataMerek,
        dataBjBarang,
        loadDataBjBarang,
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
        getDataTipeById,
        getDataMerek,
        getDataBjBarang
    }
}

export default DataTipeHelper;