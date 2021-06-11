import '../../css/bootstrap.min.css';
import '../../css/small-business.css';
import '../../css/styles.css';

import { useSelector } from 'react-redux';

import { NavLink } from "react-router-dom";

import store from "../../redux/store";

import { inicializar_usuario } from '../../redux/actions/authAction'


import firebase from '../../firebase'

const Header = () => {

    const usuario = useSelector((state) => state.usuario);
    var navbar;
    console.log('Estado de usuario ->', usuario);

    async function fbConsulta() {
        try {
            await firebase.isInitialized().then((res) => {
                console.log('Respuesta', res);
                if (res != undefined) {
                    if (usuario.logeado != true) {
                        store.dispatch(inicializar_usuario(res.email, true));
                    }
                }
            });
        } catch (error) {
            alert(error.message)
        }
    }

    fbConsulta();


    if (usuario.logeado) {
        navbar = <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/inicio">Inicio</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/formulario">Formulario</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/estadistica">Estadistica</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Cerrar Sesion</NavLink>
            </li>
        </ul>
    } else {
        navbar = <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/inicio">Inicio</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Iniciar Sesion</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Registrar</NavLink>
            </li>
        </ul>
    }





    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand">Temperatura</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    {navbar}
                </div>
            </div>
        </nav>

    );
}

export default Header;