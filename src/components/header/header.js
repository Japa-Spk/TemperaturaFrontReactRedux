import '../../css/bootstrap.min.css';
import '../../css/small-business.css';
import '../../css/styles.css';

import { NavLink } from "react-router-dom";

const Header = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#">Temperatura</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/inicio">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/formulario">Formulario</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/estadistica">Estadistica</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Header;