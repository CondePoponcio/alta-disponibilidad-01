import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Deny = (props) => {

    
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                  <i className="fas fa-code" /> Revie App
                </Link>
            </h1>
            <Fragment>No tienes Autorización</Fragment>
        </nav>
    );
};


export default Deny;
