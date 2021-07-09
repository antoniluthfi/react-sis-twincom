import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogHelper from '../../../../log/LogHelper';
import { useSelector } from 'react-redux';
import { useInput, useModal } from '../../../../hooks/customHooks';

const DataMemberHelper = () => {
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
            key: 'name',
            label: 'Nama',
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
            key: 'poin',
            label: 'Poin',
            _style: { textAlign: 'center' },
        },
        {
            key: 'diskon',
            label: 'Diskon',
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
    const [dataMember, setDataMember] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [currentDataMember, setCurrentDataMember] = useState('');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [currentCustomer, setCurrentCustomer, customerChangeHandler, resetCustomer] = useInput();
    const [input, setInput] = useState({
        user_id: '',
        diskon_langsung: '',
        diskon_persen: '',
        poin: '',
        status: ''
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

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]: event.target.value
        });

        if(event.target.name === 'diskon_persen' && event.target.value) {
            setInput({
                ...input, 
                diskon_persen: event.target.value,
                diskon_langsung: ''
            });
        } else if(event.target.name === 'diskon_langsung' && event.target.value) {
            setInput({
                ...input, 
                diskon_langsung: event.target.value,
                diskon_persen: ''
            });
        }
    }

    const closeModalHandler = () => {
        successToggle();
        setColor('success');
        setButtonVisibility('d-inline');
        setButtonSubmitName('Submit');
        setFormDisabled(false);
        setModalTitle('Tambah Data');
        setInput({
            user_id: '',
            diskon_langsung: '',
            diskon_persen: '',
            poin: '',
            status: ''        
        });
    }

    const submitHandler = action => {
        if(action === 'submit') {
            postDataMember();
        } else if(action === 'update') {
            updateDataMember(currentDataMember.id);
        }
    }

    const getDataMember = async () => {
        await axios.get(`${baseUrl}/customer-member`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            setDataMember(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });

        setIsLoading(false);
    }

    const getDataMemberById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/customer-member/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            const result = response.data.data;
            setCurrentDataMember(result);

            if(actionModal === 'update') {
                setInput({
                    user_id: result.usr_id,
                    poin: result.poin,
                    diskon: result.diskon,
                    status: result.status
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
                    deleteDataMember(id);
                }
            })
        }
    }

    const getDataCustomerNonMember = async () => {
        await axios.get(`${baseUrl}/user/role/customer`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            let data = response.data.data.filter(item => item.member == null);
            setCustomerOptions(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const postDataMember = async () => {
        let message = null;
        if(!input.user_id) message = 'Nama harus diisi!';
        else if(!input.status) message = 'Status harus diisi!';

        if(message != null) {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            let diskon = null;
            if(input.diskon_persen) diskon = `${input.diskon_persen} %`;
            else if(input.diskon_langsung) diskon = input.diskon_langsung;

            await axios.post(`${baseUrl}/customer-member`, {
                user_id: input.user_id,
                poin: input.poin,
                diskon: diskon,
                status: input.status,
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
    
                writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Member', 'POST', `${currentUser.name} menambahkan user id ${response.data.data.user_id} sebagai data baru`);
                getDataMember();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.response.data.message,
                    'error'
                );
            })
    
            closeModalHandler('submit');
        }
    }

    const updateDataMember = async id => {
        let diskon = null;
        if(input.diskon_persen) diskon = `${input.diskon_persen} %`;
        else if(input.diskon_langsung) diskon = input.diskon_langsung;

        await axios.put(`${baseUrl}/customer-member/${id}`, {
            user_id: input.user_id || currentDataMember.user_id,
            poin: input.poin || currentDataMember.poin,
            diskon: diskon || currentDataMember.diskon,
            status: input.status || currentDataMember.status,
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Member', 'UPDATE', `${currentUser.name} mengubah data user id ${currentDataMember.user_id}`);
            getDataMember(); 
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.response.data.message,
                'error'
            );
        });

        closeModalHandler('update');
    }

    const deleteDataMember = async id => {
        await axios.delete(`${baseUrl}/api/customer-member/${id}`, {
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

            writeActivityLog(currentUser.id, currentUser.jabatan, 'Data Member', 'DELETE', `${currentUser.name} menghapus data user id ${currentDataMember.user_id}`);
            getDataMember();
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
        isLoading, setIsLoading,
        dataMember, setDataMember,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        modalTitle,
        input, setInput,
        currentCustomer, setCurrentCustomer,
        customerOptions, setCustomerOptions,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getDataMember,
        getDataMemberById,
        getDataCustomerNonMember
    }
}

export default DataMemberHelper;