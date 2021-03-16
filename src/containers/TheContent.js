import React, { Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import administratorRoutes from '../routes/administrator-routes'
import adminRoutes from '../routes/admin-service-routes'
import teknisiRoutes from '../routes/teknisi-routes'
import salesRoutes from '../routes/sales-routes'
import customerRoutes from '../routes/customer-routes';
import reviewerRoutes from '../routes/reviewer-routes';
  
const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const TheContent = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const [routes, setRoutes] = useState([]);
    const [routesLoading, setRoutesLoading] = useState(true);

    const getUserRole = async () => {
        const role = localStorage.getItem('sis-role');
        let url;
        if(role === 'user') {
            url = `${baseUrl}/user/my/profile`;
        } else if(role === 'customer') {
            url = `${baseUrl}/customer/my/profile`;
        }

        await axios.get(url, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sis-token')}`
            }
        })
        .then(response => {
            if(role === 'user') {
                if(response.data.data.jabatan === 'administrator') {
                    setRoutes(administratorRoutes);
                } else if(response.data.data.jabatan === 'admin service') {
                    setRoutes(adminRoutes);
                } else if(response.data.data.jabatan === 'teknisi') {
                    setRoutes(teknisiRoutes);
                } else if(response.data.data.jabatan === 'sales') {
                    setRoutes(salesRoutes);
                } else if(response.data.data.jabatan === 'reviewer') {
                    setRoutes(reviewerRoutes);
                }    
            } else if(role === 'customer') {
                setRoutes(customerRoutes);
            }
        })
        .catch(error => {
            localStorage.clear();
            window.location.reload(true);
        });

        setRoutesLoading(false);
    }

    useEffect(() => {
        getUserRole();
    }, []);

    return (
        <main className="c-main">
            <CContainer fluid>
                <Suspense fallback={loading}>
                    {routesLoading ? null :
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={props => (
                                            <CFade>
                                                <route.component {...props} />
                                            </CFade>
                                        )} 
                                    />
                                )
                            })}
                            <Redirect from="/" to={routesLoading ? '/dashboard' : routes[1].path} />
                        </Switch>
                    }
                </Suspense>
            </CContainer>
        </main>
    )
}

export default React.memo(TheContent);