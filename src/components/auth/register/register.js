import '../../../css/bootstrap.min.css';
import '../../../css/small-business.css';
import '../../../css/styles.css';
import '../register/register.css'

import React, { useState } from 'react';
import firebase from '../../../firebase'



const Register = () => {

    const [firstname, setFName] = useState('');
    const [lastname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    async function onRegister() {
        try {
            await firebase.register(firstname + ' ' + lastname, email, pass);
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="container cont">
            <div className="row">
                <div>
                    <div className="myform form ">
                        <div className="logo mb-3">
                            <div className="col-md-12 text-center">
                                <h1>Registrarse</h1>
                            </div>
                        </div>
                        <form name="registration">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Primer Nombre</label>
                                <input type="text" name="firstname" className="form-control" id="firstname" value={firstname} onChange={e => setFName(e.target.value)}
                                    aria-describedby="emailHelp" placeholder="Enter Firstname"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Segundo Nombre</label>
                                <input type="text" name="lastname" className="form-control" id="lastname" value={lastname} onChange={e => setLName(e.target.value)}
                                    aria-describedby="emailHelp" placeholder="Enter Lastname"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email" name="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)}
                                    aria-describedby="emailHelp" placeholder="Enter email"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Contraseña</label>
                                <input type="password" name="password" id="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)}
                                    aria-describedby="emailHelp" placeholder="Enter Password"></input>
                            </div>
                            <div className="col-md-12 text-center mb-3">
                                <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={onRegister}>Registrar</button>
                            </div>
                            <div className="col-md-12 ">
                                <div className="form-group">
                                    <p className="text-center"><a id="signin">¿Ya tienes una cuenta?</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;