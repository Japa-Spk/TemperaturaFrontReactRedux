import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../css/bootstrap.min.css';
import '../../css/small-business.css';
import '../../css/styles.css';

const Formulario = () => {



    //Hooks
    const [registro, newRegistro] = useState({ adicionando: false });
    const [formulario, addRegistro] = useState({ temperatura: '', humedad: '', fecha: '', id: '', id_ciudad: '' });

    //Seleccionar Pais Formulario
    const paises = useSelector((state) => state.paises);
    console.log('paises en formulario', paises);
    const [paisSel, setPaissel] = useState({ nombre: '', id: 0 });



    var form;
    var btnguardar;
    //Actions

    var handleChange = (event) => {
        console.log('Cambio en select pais', event.target.value);
        const busqueda = paises.paises.find(pais => pais.id == event.target.value);
        console.log('Res Busqueda->  ', busqueda);
        if (busqueda != undefined) {
            setPaissel(busqueda);
        }
    };


    var nuevoRegistro = () => {
        newRegistro({ adicionando: true });
    };

    var cancelarRegistro = () => {
        newRegistro({ adicionando: false });
    };

    var guardarRegistro = () => {
        console.log('a guardar registro');
    };

    //Manejo de Formulario
    var handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        addRegistro({ ...formulario, [name]: value });
        console.log('valor de formulario ->', formulario);
    }

    if (formulario.temperatura.length != 0 && formulario.humedad.length != 0 && formulario.fecha.length != 0) {
        btnguardar = <button type="button" className="btn btn-secondary" onClick={guardarRegistro}>Guardar</button>
    } if (formulario.temperatura.length > 0 && formulario.humedad.length > 0 && formulario.fecha.length > 0) {
        btnguardar = <button type="button" className="btn btn-secondary" disabled>Guardar</button>
    }

    if (registro.adicionando != true) {
        form = <div>
            <h1 className="font-weight-light text-center" style={{ color: 'green' }}>Crear registro de humedad y temperatura</h1>
            <div className="col text-center">
                <button className="btn btn-secondary btn-center" onClick={nuevoRegistro}>Nuevo Registro</button>
            </div>
        </div>;
    } if (registro.adicionando == true) {
        form =
            <div>
                <h1 className="font-weight-light text-center">Registro de humedad y temperatura</h1>
                <hr className="text-center" style={{ width: '750px' }}></hr>
                <div className="container" style={{ width: '750px' }}>
                    <form>
                        <div className="row">
                            <div className="col">
                                <label>Temperatura</label>
                                <input type="number" className="form-control" id="inputTemperatura" placeholder="0°" name="temperatura" onChange={handleInputChange}></input>
                            </div>
                            <div className="col">
                                <label >Humedad</label>
                                <input type="number" className="form-control" id="inputHumedad" placeholder="0%" name="humedad" onChange={handleInputChange}></input>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="row">
                            <div className="col">
                                <select className="form-control" id="FormControlPais" onChange={handleChange}>
                                    <option >Seleccione Pais</option>
                                    {paises.paises.map((pais) =>
                                        <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-control" id="FormControlCiudad">
                                    <option>Seleccione Ciudad</option>
                                    <option>Ciudad</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Fecha y Hora</label>
                                <input type="date" className="form-control" id="inputFecha" name="fecha" onChange={handleInputChange}></input>
                            </div>
                        </div>
                        <hr className="text-center" style={{ width: '750px' }}></hr>
                        {btnguardar}
                        <button type="button" className="btn btn-danger" onClick={cancelarRegistro}>Cancelar</button>
                    </form>
                </div>

            </div>;
    }

    return (

        <div className="container page-section">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {form}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default Formulario;