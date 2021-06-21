import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

export const PrivateRoute = ({
    isAuthenticated, // me fijo si es true o false
    component: Component, // lo renombro con mayuscula para que haya coherencia con las otras componentes porque es una componente
    ...rest // el resto de las props que recibo
}) => {

    return (
        <Route { ...rest }
            component={ (props) => (
                ( isAuthenticated )
                    ? ( <Component {...props} /> ) // si es true, en component={<Component y sus props} history, los demas
                    : ( <Redirect to="/auth/login" /> ) // caso contrario, me mando al la ruta del login de nuevo
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}