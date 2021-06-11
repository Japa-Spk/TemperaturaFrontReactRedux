import { combineReducers } from "redux";
import  ciudades  from './inicioReducer'
import  usuario  from './authReducer'
import paises from './formularioReducer'
const rootReducers = combineReducers({
    ciudades,
    usuario,
    paises
});

export default rootReducers;