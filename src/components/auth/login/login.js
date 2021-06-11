import '../../../css/bootstrap.min.css';
import '../../../css/small-business.css';
import '../../../css/styles.css';
import '../login/login.css'

import React, { useState } from 'react';
import firebase from '../../../firebase'



const Login = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    async function login() {
        try {
            await firebase.login(email, pass);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="container cont">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <div id="first">
                        <div className="myform form ">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1>Iniciar Sesion</h1>
                                </div>
                            </div>
                            <form name="login">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input type="email" name="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)}
                                        aria-describedby="emailHelp" placeholder="Email"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Contraseña</label>
                                    <input type="password" name="password" id="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)}
                                        aria-describedby="emailHelp" placeholder="Password"></input>
                                </div>
                                <div className="form-group">
                                    <p className="text-center">Al registrarse, acepta nuestros <a>Términos de uso</a></p>
                                </div>
                                <div className="col-md-12 text-center ">
                                    <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={login}>Iniciar</button>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="login-or">
                                        <hr className="hr-or"></hr>
                                        <span className="span-or">o</span>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p className="text-center">
                                        <a className="google btn mybtn"><i className="fa fa-google-plus">
                                        </i> Iniciar con Google
                                </a>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <p className="text-center">¿No tienes cuenta? <a id="signup">Registrate aquí</a></p>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Login;