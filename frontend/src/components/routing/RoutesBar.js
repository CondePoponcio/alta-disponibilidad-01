import React from 'react';
import { Route, Switch, Routes } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Navbar from '../layout/Navbar.tsx';
import Landing from '../layout/Landing';
import Movie from '../Movie';

const RoutesBar = ({ match }) => {

    return (
        <section className="container RoutesBar">
            <Navbar />
            <Alert />

            <Routes>
                <Route path={``} element={<Landing />} />
                <Route path={`/pelicula/:id`} element={<Movie />} />
                
                <Route element={<NotFound />} />
            </Routes>
        </section>
    );
};

export default RoutesBar;
