import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = ({ component:Component, ...rest }) => {
    const user = useSelector(state => state.currentUser);

    return (
        <Route {...rest} render={
            props => {
                if(!user) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/dashboard" />
                }
            }
        } />
    )
}

export default GuestRoute;