import React from 'react';
import { Route, redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Loader from '../layout/Loader';
const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading, user },
    rol,
    ...rest
}) => {

    return (
        <Route
            {...rest}
            render={props =>
                loading ? (
                    <Loader />
                ) : (isAuthenticated && user.tipo == rol) ? (
                    <Component {...props} />
                ) : (
                    redirect("/permission-deny")
                )
            }
        />
    )
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
