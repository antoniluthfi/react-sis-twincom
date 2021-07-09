import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../log/LogHelper';
import { useSelector } from 'react-redux';
import { useInput, useModal } from '../../../hooks/customHooks';

const DataCabangHelper = () => {
    const {
        writeActivityLog
    } = LogHelper();
    const currentUser = useSelector(state => state.currentUser);
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

    const [successToggle, success] = useModal();
    const [color, setColor] = useState('success');
    const [isLoading, setIsLoading] = useState(true);
    const [dataCabang, setDataCabang] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataCabang, setCurrentDataCabang] = useState('');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [input, setInput, changeHandler, reset] = useInput();
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
        setColor('success');
        setButtonVisibility('d-inline');
        setButtonSubmitName('Submit');
        setFormDisabled(false);
        setModalTitle('Tambah Data');
        reset();
    }

    const submitHandler = action => {
        if(action === 'submit') {
            postDataCabang();
        } else if(action === 'update') {
            updateDataCabang(currentDataCabang.id);
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
            const result = response.data.data;
            setCurrentDataCabang(result);

            if(actionModal === 'update' || actionModal === 'view') {
                setInput({
                    nama_cabang: result.nama_cabang,
                    alamat: result.alamat,
                    email: result.email,
                    nomorhp: result.nomorhp
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        if(actionModal === 'view') {
            setColor('info');
            setModalTitle('View Data');
            setFormDisabled(true);
            setButtonVisibility('d-none');
            successToggle();
        } else if(actionModal === 'update') {
            setColor('success');
            setModalTitle('Update Data');
            setFormDisabled(false);
            setButtonVisibility('d-inline');
            setButtonSubmitName('Update');
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
                    deleteDataCabang(id);
                }
            })
        }
    }

    const postDataCabang = async () => {
        let message = null;
        if(!input.nama_cabang) message = 'Nama cabang harus diisi!';
        else if(!input.alamat) message = 'Alamat harus diisi!';
        else if(!input.email) message = 'Email harus diisi!';
        else if(!input.nomorhp) message = 'Nomor hp harus diisi!';

        if(message) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Cabang', 'POST', `${currentUser.name} menambahkan ${response.data.data.nama_cabang} sebagai data baru`);
                getDataCabang();
                closeModalHandler();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            })
        }
    }

    const updateDataCabang = async id => {
        await axios.put(`${baseUrl}/cabang/${id}`, {
            nama_cabang: input.nama_cabang || currentDataCabang.nama_cabang,
            alamat: input.alamat || currentDataCabang.alamat,
            email: input.email || currentDataCabang.email,
            nomorhp: input.nomorhp || currentDataCabang.nomorhp,
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Cabang', 'UPDATE', `${currentUser.name} mengubah data ${currentDataCabang.nama_cabang} menjadi ${response.data.data.nama_cabang}`);
            getDataCabang(); 
            closeModalHandler();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        })
    }

    const deleteDataCabang = async id => {
        await axios.delete(`${baseUrl}/cabang/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Cabang', 'DELETE', `${currentUser.name} menghapus data ${currentDataCabang.nama_cabang}`);
            getDataCabang();
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
        success, successToggle,
        color,
        currentUser,
        isLoading,
        dataCabang, setDataCabang,
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
        getDataCabang,
        getDataCabangById,
    }
}

export default DataCabangHelper;