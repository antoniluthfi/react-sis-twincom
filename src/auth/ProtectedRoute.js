import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component:Component, ...rest }) => {
    const token = localStorage.getItem('sis-token');

    return (
        <Route {...rest} render={
            props => {
                if(token && token !== '') {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/login" />
                }
            }
        } />
    )
}

export default ProtectedRoute;