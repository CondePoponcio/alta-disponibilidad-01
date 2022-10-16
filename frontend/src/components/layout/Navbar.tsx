import React, { Fragment, useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, register } from "../../actions/auth";
import "../../sass/components/navbar.scss";
import Login from "../auth/Login";
import CustomizedButtons from "./CustomizedButtons.tsx";
import Modal from "@mui/material/Modal";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { purple, deepPurple } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {login} from '../../actions/auth';

const theme = createTheme({
    palette: {
      background: {
        paper: '#263238',
      },
      text: {
        primary: '#fff',
        secondary: '#46505A',
      },
      action: {
        active: '#001E3C',
      }
    },
});

const pages = [];
const settings = ['Salir'];

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
    zIndex: -1
};

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout, login, register }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Login register={register} login={login} onClose={handleClose} />
                </Box>
            </Modal>
            <ThemeProvider theme={theme} >
                <AppBar position="sticky" sx={{bgcolor: 'background.paper'}}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                Review APP
                            </Typography>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Typography textAlign="center">
                                                {page}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <AdbIcon
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                LOGO
                            </Typography>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                        }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                            {isAuthenticated ? (
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="/static/images/avatar/2.jpg"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px", color:'red' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem
                                                key={setting}
                                                onClick={handleCloseUserMenu}
                                            >
                                                <Typography textAlign="center" onClick={()=>{
                                                    if(setting == 'Logout'){
                                                        logout()
                                                    }
                                                }}>
                                                    {setting}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            ) : (
                                <CustomizedButtons
                                    text={"Ingresar"}
                                    handleOpen={handleOpen}
                                />
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </Fragment>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout, login, register })(Navbar);
