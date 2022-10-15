import "../../sass/components/login.scss"

import $ from 'jquery';
import React, { Fragment, useState, useEffect } from 'react';
import {api} from '../../utils/api';

const Login = (props) => {
    const [estado, setstate] = useState(true)
    const [loginUsername, setloginUsername] = useState('')
    const [loginPassword, setloginPassword] = useState('')

    const [signupUsername, setsignupUsername] = useState('')
    const [signupPassword, setsignupPassword] = useState('')
    const [signupConfirmPassword, setsignupConfirmPassword] = useState('')

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        console.log("Login: ", {loginUsername, loginPassword})
        
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault()
        console.log("Registro: ", {signupUsername, signupPassword, signupConfirmPassword})
    }
    return <section className="content forms-section">

        {false && <h1 className="section-title">Animated Forms</h1>}
        <div className="forms">
            <div className={`form-wrapper ${estado ? 'is-active' : ''}`}>
                <button type="button" className="switcher switcher-login" onClick={() => {
                    setstate(true)
                }}>
                    Iniciar Sesión
                    <span className="underline"></span>
                </button>
                <form className="form form-login" onSubmit={handleSubmitLogin}>
                    <fieldset>
                        <legend>Ingrese su usuario y contraseña para ingresar.</legend>
                        <div className="input-block">
                            <label htmlFor="login-username">Usuario</label>
                            <input id="login-username" value={loginUsername} onChange={(val) => {setloginUsername(val.target.value)}} type="text" required />
                        </div>
                        <div className="input-block">
                            <label htmlFor="login-password">Contraseña</label>
                            <input id="login-password" type="password" value={loginPassword} onChange={(val) => {setloginPassword(val.target.value)}} required />
                        </div>
                    </fieldset>
                    <button type="submit" className="btn-login">Acceder</button>
                </form>
            </div>
            <div className={`form-wrapper ${!estado ? 'is-active' : ''}`}>
                <button type="button" className="switcher switcher-signup" onClick={() => {
                    setstate(false)
                }}>
                    Registro
                    <span className="underline"></span>
                </button>
                <form className="form form-signup" onSubmit={handleSubmitRegister}>
                    <fieldset>
                        <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                        <div className="input-block">
                            <label htmlFor="signup-username">Usuario</label>
                            <input id="signup-username" type="username" value={signupUsername} onChange={(val) => {setsignupUsername(val.target.value)}} required />
                        </div>
                        <div className="input-block">
                            <label htmlFor="signup-password">Contraseña</label>
                            <input id="signup-password" type="password" value={signupPassword} onChange={(val) => {setsignupPassword(val.target.value)}} required />
                        </div>
                        <div className="input-block">
                            <label htmlFor="signup-password-confirm">Confirme contraseña</label>
                            <input id="signup-password-confirm" type="password" value={signupConfirmPassword} onChange={(val) => {setsignupConfirmPassword(val.target.value)}} required />
                        </div>
                    </fieldset>
                    <button type="submit" className="btn-signup">Continuar</button>
                </form>
            </div>
        </div>
    </section>

}

export default Login