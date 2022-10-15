import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import "../../sass/components/navbar.scss"
import Login from "../auth/Login";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const authLinks = (
        <ul >
            <li>

                <Link to={`/dashboard-${user ? user.tipo.toLowerCase() : ''}`}>
                    <i className='bx bxs-user-detail' ></i>{' '}
                    <span className="hide-sm">Perfil</span>
                </Link>
            </li>
            <li>
                <a onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("form_id"); }} href="/">
                    <i className='bx bx-log-out' ></i>{' '}
                    <span className="hide-sm">Salir</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Button onClick={handleOpen}>Ingresar</Button>
            </li>
        </ul>
    );

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                
                    <Login />
                </Box>
            </Modal>
            <nav className="navbar bg-dark">
            
                <h1>
                    <Link to="/">
                        <h2>Review<span>App</span></h2>
                    </Link>
                </h1>
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            </nav>
        </Fragment>
        
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
