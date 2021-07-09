import React, { Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { useSelector } from 'react-redux';

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
    const [routes, setRoutes] = useState([]);
    const [routesLoading, setRoutesLoading] = useState(true);
    const { currentUser } = useSelector(state => ({ ...state }));
    const { jabatan } = currentUser;

    const getRoute = () => {
        if(jabatan == 'administrator') setRoutes(administratorRoutes);
        else if(jabatan == 'admin service') setRoutes(adminRoutes);
        else if(jabatan == 'teknisi') setRoutes(teknisiRoutes);
        else if(jabatan == 'sales') setRoutes(salesRoutes);
        else if(jabatan == 'reviewer') setRoutes(reviewerRoutes);
        else setRoutes(customerRoutes);

        setRoutesLoading(false);
    }

    useEffect(() => {
        getRoute();
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