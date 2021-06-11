import { INIT_USUARIO } from '../actions/authAction'


const default_usuario = {
    usuario: '',
    logeado: false
}

const usuario = (state = default_usuario, action) => {

    switch (action.type) {

        case INIT_USUARIO: {
            return {
                ...state,
                usuario: action.user,
                logeado: action.log
            }
        }

        default: return state;
    }

};


export default usuario;