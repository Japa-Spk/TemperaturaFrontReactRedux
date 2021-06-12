import store from "../store";
import { inicializar_ciudad, INIT_CIUDAD } from '../actions/inicioAction'

fetch('http://192.168.0.16:8080/Temperatura/rest/ciudades', { method: 'POST', body: '' }).then(res => res.json())
    .then(
        (result) => {
            console.log(result);
            store.dispatch(inicializar_ciudad(result));
        },

        (error) => {

        }
    )


const default_ciudades = {
    ciudades: []
}

const ciudades = (state = default_ciudades, action) => {

    switch (action.type) {

        case INIT_CIUDAD: {
            return {
                ...state,
                ciudades: action.payload
            }
        }

        default: return state;
    }

};


export default ciudades;