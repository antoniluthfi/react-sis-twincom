import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);   
        }, 1000);

        // redirect once count is equal to 0
        count === 0 && history.push('/login');

        // clean up
        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className="text-center" style={{ height: 400, paddingTop: 180 }}>
            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                <p className="sr-only">Loading...</p>
            </div>
            <h6 className="text-center">Redirecting you in {count} seconds</h6>
        </div>
    )
}

export default LoadingToRedirect;