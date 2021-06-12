import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../css/bootstrap.min.css';
import '../../css/small-business.css';
import '../../css/styles.css';

const Formulario = () => {



    //Hooks
    const [registro, newRegistro] = useState({ adicionando: false });
    const [registroAuto, newRegistroAuto] = useState({ adicionando: false });
    const [loadingSregistro, setCargando] = useState({ cargando: false });
    const [formulario, addRegistro] = useState({ temperatura: '', humedad: '', fecha: '', id: '', id_ciudad: '', hora: '' });

    //Seleccionar Pais Formulario
    const paises = useSelector((state) => state.paises);
    console.log('paises en formulario', paises);
    const [paisSel, setPaissel] = useState({ nombre: '', id: 0 });
    //Seleccionar de Ciudades Formulario
    const [ciudades, addCiudades] = useState([]);
    console.log('paises en formulario', paises);


    var form;
    var btnguardar;
    //Actions

    var handleChange = (event) => {
        console.log('Cambio en select pais', event.target.value);
        const busqueda = paises.paises.find(pais => pais.id == event.target.value);
        console.log('Res Busqueda->  ', busqueda);
        if (busqueda != undefined) {
            setPaissel(busqueda);
            addCiudades(busqueda.ciudades);
        }
    };

    var nuevoRegistro = () => {
        newRegistro({ adicionando: true });
    };

    var nuevoRegistroAuto = () => {
        newRegistroAuto({ adicionando: true });
    };

    var cancelarRegistro = () => {
        newRegistroAuto({ adicionando: false });
        newRegistro({ adicionando: false });
    };
    //Armado de JSON para enviar a guardar registro en BACKEND
    var guardarRegistro = () => {
        console.log('a guardar registro');
        console.log('valores de formulario -  >', formulario);
        setCargando({ cargando: true });
        fetch('http://192.168.0.16:8080/Temperatura/rest/createregistro', { method: 'POST', body: JSON.stringify(formulario) }).then(res => res.json())
            .then(
                (result) => {
                    console.log('resultado de adicionar reg  - >', result);
                    setCargando({ cargando: false });
                    newRegistro({ adicionando: false });
                },

                (error) => {

                }
            )
    };


    var handleInputChangeAuto = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const busqueda = ciudades.find(ciudad => ciudad.id == target.value);
        console.log('Res Busqueda->  ', busqueda);
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + busqueda.nombre + '&APPID=8790a97dd9c578e899caef563d5b2cd4', { method: 'POST', body: '' }).then(res => res.json())
            .then(
                (result) => {
                    console.log('result api', result, formulario);
                    addRegistro({ ...formulario,[name]: parseInt(value), ['humedad']: parseInt(result.main.humidity), ['temperatura']: parseInt(result.main.temp - 273.15) });
                },

                (error) => {

                }
            )
        console.log('valor de formulario ->', formulario);
    }

    //Manejo de Formulario
    var handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        addRegistro({ ...formulario, [name]: parseInt(value) });
        console.log('valor de formulario ->', formulario);
    }


    var handleInputChangeFec = (event) => {
        const target = event.target;
        const fecforid = new Date(target.value);
        const idfec = fecforid.getFullYear() + '' + fecforid.getMonth() + '' + fecforid.getDay() + '' + fecforid.getHours() + '' + fecforid.getMinutes() + '' + fecforid.getSeconds() + '' + fecforid.getMilliseconds();
        const hora = fecforid.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        console.log('Id de registro ->', idfec, hora);
        addRegistro({ ...formulario, ['id']: parseInt(idfec), ['hora']: hora, ['fecha']: parseInt(fecforid.getTime()) });
    };

    var fechaActual = () => {
        const fecforid = new Date();
        const idfec = fecforid.getFullYear() + '' + fecforid.getMonth() + '' + fecforid.getDay() + '' + fecforid.getHours() + '' + fecforid.getMinutes() + '' + fecforid.getSeconds() + '' + fecforid.getMilliseconds();
        const hora = fecforid.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        console.log('Id de registro ->', idfec, hora);
        addRegistro({ ...formulario, ['id']: parseInt(idfec), ['hora']: hora, ['fecha']: parseInt(fecforid.getTime()) });
    };



    if (formulario.temperatura.length != 0 && formulario.humedad.length != 0 && formulario.fecha.length != 0) {
        btnguardar = <button type="button" className="btn btn-secondary" onClick={guardarRegistro}>Guardar</button>
    }

    if (registro.adicionando != true && registroAuto.adicionando == false && loadingSregistro.cargando == false) {
        form = <div>
            <h1 className="font-weight-light text-center" style={{ color: 'green' }}>Crear registro de humedad y temperatura</h1>
            <div className="col text-center">
                <button className="btn btn-secondary btn-center" onClick={nuevoRegistro}>Nuevo Registro</button>
            </div>
            <br></br>
            <div className="col text-center">
                <button className="btn btn-secondary btn-center" onClick={nuevoRegistroAuto}>Nuevo Registro Automatico</button>
            </div>
        </div>;
    } if (registro.adicionando == true && registroAuto.adicionando == false && loadingSregistro.cargando == false) {
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
                                <select className="form-control" id="FormControlCiudad" name="id_ciudad" onChange={handleInputChange}>
                                    <option>Seleccione Ciudad</option>
                                    {ciudades.map((ciudad) =>
                                        <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Fecha y Hora</label>
                                <input type="datetime-local" className="form-control" id="inputFecha" name="fecha" onChange={handleInputChangeFec}></input>
                            </div>
                        </div>
                        <hr className="text-center" style={{ width: '750px' }}></hr>
                        {btnguardar}
                        <button type="button" className="btn btn-danger" onClick={cancelarRegistro}>Cancelar</button>
                    </form>
                </div>

            </div>;
    } if (registro.adicionando == false && registroAuto.adicionando == true && loadingSregistro.cargando == false) {
        form =
            <div>
                <div className="row">
                    <div className="col">
                        <select className="form-control" id="FormControlPais" onChange={handleChange} onClick={fechaActual}>
                            <option >Seleccione Pais</option>
                            {paises.paises.map((pais) =>
                                <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                            )}
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-control" id="FormControlCiudad" name="id_ciudad" onChange={handleInputChangeAuto}>
                            <option>Seleccione Ciudad</option>
                            {ciudades.map((ciudad) =>
                                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                            )}
                        </select>
                    </div>
                </div>
                <br></br>
                <br></br>
                <button type="button" className="btn btn-secondary" disabled={!(formulario.id_ciudad.length != 0 && formulario.humedad.length != 0 && formulario.temperatura.length != 0)} onClick={guardarRegistro}>Guardar Auto</button>
                <button type="button" className="btn btn-danger" onClick={cancelarRegistro}>Cancelar</button>
            </div>
    }

    if (loadingSregistro.cargando == true) {

        form = <div>
            <h1 className="font-weight-light text-center" style={{ color: 'green' }}>Creando registro de humedad y temperatura</h1>
            <img src="loading-buffering.gif"></img>
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