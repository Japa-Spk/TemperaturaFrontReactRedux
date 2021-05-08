import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../css/bootstrap.min.css';
import '../../css/small-business.css';
import '../../css/styles.css';



const Inicio = () => {

    //Llamado al State
    const ciudades = useSelector((state) => state.ciudades);
    console.log('Ciudades en inicio->', ciudades);
    //Variables de HTML
    const [ciudadSel, setCiudadsel] = useState({ descripcion: 'Descripcion de la ciudad seleccionada, porfavor elegir una.', img: 'http://placehold.it/900x400' });

    const [listciudadesSel, addCiudadSel] = useState([])

    const [registro, setRegistro] = useState({ nombre: 'Ciudad Nombre', temperatura: 0, humedad: 0 });
    //Funciones de cambio
    var handleChange = (event) => {
        console.log('Cambio en select', event.target.value);
        const busqueda = ciudades.ciudades.find(ciudad => ciudad.id == event.target.value);
        console.log('Res Busqueda->  ', busqueda);
        if (busqueda != undefined) {
            setCiudadsel(busqueda);
        }
    };


    var adicionarCiudad = () => {
        console.log('Adicionar ciudad');
        const busqueda = listciudadesSel.find(ciudad => ciudad.id == ciudadSel.id);
        console.log('Busqueda addciudad', busqueda);
        if (busqueda != undefined) {
            alert('Ya agrego la ciudad');
        } else {
            const newLista = listciudadesSel.concat(ciudadSel);
            addCiudadSel(newLista);
            console.log('lista html ciudades->', listciudadesSel);
        }
    };



    var verInfo = (ciudad) => {
        console.log('Ver Info ', ciudad);
        if (ciudad.registros.length != 0) {
            setRegistro({ nombre: ciudad.nombre, temperatura: ciudad.registros[0].temperatura, humedad: ciudad.registros[0].humedad });
        } else {
            alert(ciudad.nombre +' No tiene Registros');
            setRegistro({ nombre: ciudad.nombre +' No tiene Registros', temperatura: 0, humedad: 0 });
        };
    };

    return (
        <div className="container page-section">


            <div className="row align-items-center my-5">
                <div className="col-lg-7">
                    <img id="imagen" className="img-fluid rounded mb-4 mb-lg-0" src={ciudadSel.img} alt=""></img>
                </div>

                <div className="col-lg-5">
                    <h1 id="txtciudad" className="font-weight-light">Seleccione Ciudad</h1>
                    <hr style={{ width: '450px' }}></hr>
                    <select className="form-control" name="ciudades" id="FormControlCiudad" onChange={handleChange}>
                        <option >Seleccione Ciudad</option>
                        {ciudades.ciudades.map((ciudad) =>
                            <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre + '-' + ciudad.pais.nombre}</option>
                        )}
                    </select>
                    <hr style={{ width: '450px' }}></hr>
                    <p align="justify" name="descripcion">{ciudadSel.descripcion}</p>
                    <hr style={{ width: '450px' }}></hr>
                    <button className="btn btn-secondary" id="adicionarCiudad" onClick={adicionarCiudad}>Adicionar Ciudad</button>
                </div>

            </div>



            <hr style={{ width: '1145px' }}></hr>
            <h1 className="font-weight-light text-center">Ciudades Seleccionadas</h1>
            <div className="row" name="ciudadesList">
                {listciudadesSel.map((ciudad) =>
                    <div className="col-md-4 mb-5" key={ciudad.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h2 className="card-title">{ciudad.nombre}</h2>
                                <p className="card-text" align="justify">{ciudad.descripcion}</p>
                            </div>
                            <div className="card-footer">
                                <button id="seleCiudad" className="btn btn-secondary btn-sm" onClick={() => verInfo(ciudad)}>Ver Informacion</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <hr style={{ width: '1145px' }}></hr>
            <h2 id="txtciudadnom" className="font-weight-light">{registro.nombre}</h2>
            <div className="text-center">
                <br></br>
                <br></br>
                <h2 id="txttemp" className="font-weight-light">Temperatura: {registro.temperatura}°<i className="fa fa-thermometer"></i></h2>
                <br></br>
                <br></br>
                <h2 id="txthum" className="font-weight-light">Humedad: {registro.humedad}% <i className="fa fa-eyedropper"/></h2>
            </div>
            <hr style={{ width: '1145px' }}></hr>
        </div>
    );
}






export default Inicio;