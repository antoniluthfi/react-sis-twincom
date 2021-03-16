import axios from 'axios';

const LogHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;

    const writeActivityLog = async (userId, hakAkses, halaman, method, keterangan) => {
        await axios.post(`${baseUrl}/log-aktivitas`, {
            user_id: userId,
            hak_akses: hakAkses,
            halaman: halaman,
            method: method,
            keterangan: keterangan
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            console.log(response.data.message);
        })  
        .catch(error => {
            console.log(error);
        });
    }

    const createNotification = async (userId, hakAkses, keterangan) => {
        await axios.post(`${baseUrl}/notifikasi`, {
            user_id: userId,
            hak_akses: hakAkses,
            keterangan: keterangan
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            console.log(response.data.message);
        })  
        .catch(error => {
            console.log(error);
        });
    }

    return { writeActivityLog, createNotification }
}

export default LogHelper;