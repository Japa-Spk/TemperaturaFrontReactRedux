import store from "../store";
import { inicializar_pais, INIT_PAIS } from '../actions/inicioAction'

fetch('http://192.168.0.16:8080/Temperatura/rest/paises', { method: 'POST', body: '' }).then(res => res.json())
    .then(
        (result) => {
            console.log('paises init -> ', result);
            store.dispatch(inicializar_pais(result));
        },

        (error) => {

        }
    )


const default_paises = {
    paises: []
}

const paises = (state = default_paises, action) => {

    switch (action.type) {

        case INIT_PAIS: {
            return {
                ...state,
                paises: action.payload
            }
        }

        default: return state;
    }

};


export default paises;