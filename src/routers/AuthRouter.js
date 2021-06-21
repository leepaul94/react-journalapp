// El encargado de tener todas las paginas quee esten relacionadas con el auth
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route 
                        exact
                        path="/auth/login"
                        component={ LoginScreen }
                    />

                    <Route
                        exact
                        path="/auth/register"
                        component={ RegisterScreen }
                    />

                    <Redirect to="/auth/login" /> {/*Si no va a ninguna de las dos primeras rutas, me manda a esta. */}
                </Switch>
            </div>
            
        </div>
    )
}
