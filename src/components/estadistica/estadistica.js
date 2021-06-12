import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

const Estadistica = () => {
    //Bool cargo estadisticas
    const [cargoEstadisticas, setCargoEs] = useState({ cargo: false });
    //
    const ciudades = useSelector((state) => state.ciudades);
    console.log('Ciudades en estadisticas->', ciudades, ciudades.ciudades.length);
    //Estructura de Graficas
    const [promedioTempCiudad, setPromedioTempCiudad] = useState({ labels: [''], datasets: [{ label: 'Promedio Temperatura', data: [], backgroundColor: ['rgba(54, 162, 235, 0.2)',], borderColor: ['rgba(54, 162, 235, 1)',], }] });
    const [promedioHumCiudad, setPromedioHumCiudad] = useState({ labels: [''], datasets: [{ label: 'Promedio Humedad', data: [], backgroundColor: ['rgba(54, 162, 235, 0.2)',], borderColor: ['rgba(54, 162, 235, 1)',], }] });
    const [tempMaxCiudad, setTempMaxCiudad] = useState({ labels: [''], datasets: [{ label: 'Maxima Temperatura', data: [], backgroundColor: ['rgba(54, 162, 235, 0.2)',], borderColor: ['rgba(54, 162, 235, 1)',], }] });
    const [humMaxCiudad, setHumMaxCiudad] = useState({ labels: [''], datasets: [{ label: 'Maxima Humedad', data: [], backgroundColor: ['rgba(54, 162, 235, 0.2)',], borderColor: ['rgba(54, 162, 235, 1)',], }] });
    //Armado de estadisticas
    var promedioTemperatura = () => {
        var labels = [];
        var data = [];
        for (let i of ciudades.ciudades) {
            var count = 0;
            var sumtemp = 0;
            var promtemp = 0;
            for (let j of i.registros) {
                sumtemp = sumtemp + j.temperatura;
                count++;
            }
            promtemp = sumtemp / count;
            console.log('Calculo prom temperatura -> ', i.nombre, sumtemp, count, promtemp);
            //Nombre de ciudad y promedio
            labels.push(i.nombre);
            data.push(promtemp);
        }
        console.log('datos', labels, data);
        setPromedioTempCiudad({ ...promedioTempCiudad, ['labels']: labels, datasets: [{ ['label']: 'Promedio Temperatura', ['data']: data, ['backgroundColor']: ['rgba(54, 162, 235, 0.2)',], ['borderColor']: ['rgba(54, 162, 235, 1)',], }] });
    };


    var promedioHumedad = () => {
        var labels = [];
        var data = [];
        for (let i of ciudades.ciudades) {
            var count = 0;
            var sumhum = 0;
            var promhum = 0;
            for (let j of i.registros) {
                sumhum = sumhum + j.humedad;
                count++;
            }
            promhum = sumhum / count;
            console.log('Calculo prom humedad -> ', i.nombre, sumhum, count, promhum);
            //Nombre de ciudad y promedio
            labels.push(i.nombre);
            data.push(promhum);
        }
        console.log('datos', labels, data);
        setPromedioHumCiudad({ ...promedioHumCiudad, ['labels']: labels, datasets: [{ ['label']: 'Promedio Humedad', ['data']: data, ['backgroundColor']: ['rgba(54, 162, 235, 0.2)',], ['borderColor']: ['rgba(54, 162, 235, 1)',], }] });
    };


    var temperaturaMax = () => {
        var labels = [];
        var data = [];
        for (let i of ciudades.ciudades) {
            var tempmax = 0;
            var registros = i.registros;
            registros = registros.sort((a, b) => {
                return (b.temperatura - a.temperatura);
            });
            //console.log('reg temperatura ordenada', registros);
            tempmax = registros[0].temperatura;
            labels.push(i.nombre);
            data.push(tempmax);
        }
        setTempMaxCiudad({ ...tempMaxCiudad, ['labels']: labels, datasets: [{ ['label']: 'Maxima Temperatura', ['data']: data, ['backgroundColor']: ['rgba(54, 162, 235, 0.2)',], ['borderColor']: ['rgba(54, 162, 235, 1)',], }] });
    };


    var humedadMax = () => {
        var labels = [];
        var data = [];
        for (let i of ciudades.ciudades) {
            var humemax = 0;
            var registros = i.registros;
            registros = registros.sort((a, b) => {
                return (b.humedad - a.humedad);
            });
            //console.log('reg humedad ordenada', registros);
            humemax = registros[0].humedad;
            labels.push(i.nombre);
            data.push(humemax);
        }
        setHumMaxCiudad({ ...humMaxCiudad, ['labels']: labels, datasets: [{ ['label']: 'Maxima Humedad', ['data']: data, ['backgroundColor']: ['rgba(54, 162, 235, 0.2)',], ['borderColor']: ['rgba(54, 162, 235, 1)',], }] });
    };




    if (ciudades.ciudades.length && cargoEstadisticas.cargo == false) {
        console.log('entro a armar estadisticas');
        promedioTemperatura();
        promedioHumedad();
        temperaturaMax();
        humedadMax();
        setCargoEs({ cargo: true });
    }





    const data = {
        labels: ['USA', 'MEXICO', 'ITALIA'],
        datasets: [{
            label: 'Tiempo',
            data: [20, 30, 45],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
        }]
    };

    const opciones = {
        maintanceAspectyRatio: false,
        responsive: true
    }

    return (
        <div>
            <br></br>
            <br></br>
            <h1>Estadisticas de promedio</h1>
            <br></br>
            <div className="row">
                <div className="col">
                    <h2>Temperatura</h2>
                    <div className="container page-section">
                        <Bar data={promedioTempCiudad} options={opciones} />
                    </div>
                </div>
                <div className="col">
                    <h2>Humedad</h2>
                    <div className="container page-section">
                        <Bar data={promedioHumCiudad} options={opciones} />
                    </div>
                </div>
            </div>
            <hr style={{ width: '1145px' }}></hr>
            <h1>Estadisticas registro maximo</h1>
            <br></br>
            <div className="row">
                <div className="col">
                    <h2>Temperatura</h2>
                    <div className="container page-section">
                        <Bar data={tempMaxCiudad} options={opciones} />
                    </div>
                </div>
                <div className="col">
                    <h2>Humedad</h2>
                    <div className="container page-section">
                        <Bar data={humMaxCiudad} options={opciones} />
                    </div>
                </div>
            </div>
        </div>

    );
}






export default Estadistica;