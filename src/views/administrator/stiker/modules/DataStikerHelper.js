import { useState } from 'react';
import { useInput, useModal } from '../../../hooks/customHooks';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LogHelper from '../../../log/LogHelper';

const DataStikerHelper = () => {
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
            key: 'jenis_stiker',
            label: 'Jenis Stiker',
            _style: { textAlign: 'center' },
        },
        {
            key: 'jumlah',
            label: 'Jumlah Stiker',
            _style: { textAlign: 'center' },
        },
        {
            key: 'cabang',
            label: 'Cabang',
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

    const [successToggle, success] = useModal();
    const [input, setInput, changeHandler, reset] = useInput();
    const [dataStiker, setDataStiker] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDataStiker, setCurrentDataStiker] = useState({});
    const [dataCabang, setDataCabang] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [color, setColor] = useState('success');
    const [formDisabled, setFormDisabled] = useState(false);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
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
        successToggle();
        setButtonSubmitName('Submit');
        setButtonVisibility('d-inline');
        setColor('success');
        setFormDisabled(false);
        setModalTitle('Tambah Data');
        reset();
    }

    const submitHandler = action => {
        if(action === 'submit') {
            postDataStiker();
        } else if(action === 'update') {
            updateDataStiker(currentDataStiker.id);
        }
    }

    const getCurrentUser = async () => {
        getDataStiker();
    }

    const getDataStiker = async () => {
        await axios.get(`${baseUrl}/stiker`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataStiker(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })

        setIsLoading(false);
    }

    const getDataStikerById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/stiker/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataStiker(result);

            setInput({
                jenis_stiker: result.jenis_stiker,
                jumlah: result.jumlah,
                cabang: result.cabang
            });
        })
        .catch(error => {
            console.log(error);
        });

        if(actionModal === 'view') {
            setModalTitle('View Data');
            setFormDisabled(true);
            setButtonVisibility('d-none');
            setColor('info');
            successToggle();
        } else if(actionModal === 'update') {
            setModalTitle('Update Data');
            setFormDisabled(false);
            setButtonVisibility('d-inline');
            setButtonSubmitName('Update');
            setColor('success');
            successToggle();
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
                    deleteDataStiker(id);
                }
            })
        }
    }

    const postDataStiker = async () => {
        await axios.post(`${baseUrl}/stiker`, {
            jenis_stiker: input.jenis_stiker,
            jumlah: input.jumlah,
            cabang: input.cabang
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Stiker', 'POST', `${currentUser.name} menambahkan ${response.data.data.jenis_stiker} sebagai data baru`);
            getDataStiker();
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

    const updateDataStiker = async id => {
        await axios.put(`${baseUrl}/stiker/${id}`, {
            jenis_stiker: input.jenis_stiker,
            jumlah: input.jumlah,
            cabang: input.cabang
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Stiker', 'UPDATE', `${currentUser.name} mengubah data ${currentDataStiker.jenis_stiker}`);
            getDataStiker();
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

    const deleteDataStiker = async id => {
        await axios.delete(`${baseUrl}/stiker/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Stiker', 'DELETE', `${currentUser.name} menghapus data ${currentDataStiker.jenis_stiker}`);
            getDataStiker();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })
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

    return {
        fields,
        input,
        success,
        details,
        toggleDetails,
        successToggle,
        changeHandler, 
        submitHandler,
        closeModalHandler,
        currentUser,
        dataStiker,
        isLoading,
        dataCabang,
        loadDataCabang,
        buttonSubmitName,
        buttonVisibility,
        color,
        formDisabled,
        modalTitle,
        getCurrentUser,
        getDataStikerById,
        getDataCabang
    }
}

export default DataStikerHelper;