import { Bar } from 'react-chartjs-2';
const Estadistica = () => {
    const data = {
        labels: ['USA', 'MEXICO', 'ITALIA'],
        datasets: [{
            label: 'Tiempo',
            data: [20, 30, 45]
        }]
    };

    const opciones = {
        maintanceAspectyRatio: false,
        responsive: true
    }

    return (
        <div className="container page-section">
            <Bar data={data} options={opciones} />
        </div>
    );
}






export default Estadistica;